const fs = require('fs');
const zlib = require('zlib');

function decodePng(buf) {
  let idatChunks = [], offset = 8;
  while (offset < buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    if (type === 'IDAT') idatChunks.push(buf.slice(offset + 8, offset + 8 + len));
    offset += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const w = 48, h = 48;
  let uncompressed = Buffer.alloc(w * h * 4);
  let rawOffset = 0;
  for (let y = 0; y < h; y++) {
    const filter = raw[rawOffset++];
    for (let x = 0; x < w; x++) {
      for (let c = 0; c < 4; c++) {
        let b = raw[rawOffset++];
        let a = x > 0 ? uncompressed[(y * w + (x - 1)) * 4 + c] : 0;
        let b_up = y > 0 ? uncompressed[((y - 1) * w + x) * 4 + c] : 0;
        let c_diag = (x > 0 && y > 0) ? uncompressed[((y - 1) * w + (x - 1)) * 4 + c] : 0;
        let val = 0;
        if (filter === 0) val = b;
        else if (filter === 1) val = (b + a) & 0xff;
        else if (filter === 2) val = (b + b_up) & 0xff;
        else if (filter === 3) val = (b + Math.floor((a + b_up) / 2)) & 0xff;
        else if (filter === 4) {
          let p = a + b_up - c_diag;
          let pa = Math.abs(p - a), pb = Math.abs(p - b_up), pc = Math.abs(p - c_diag);
          let pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b_up : c_diag);
          val = (b + pr) & 0xff;
        }
        uncompressed[(y * w + x) * 4 + c] = val;
      }
    }
  }
  return { w, h, data: uncompressed };
}

// Encode raw RGBA into PNG
function encodePng(w, h, data) {
  // filter byte 0 for each line
  const raw = Buffer.alloc(h * (w * 4 + 1));
  let rawOffset = 0;
  for (let y = 0; y < h; y++) {
    raw[rawOffset++] = 0; // None filter
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      raw[rawOffset++] = data[idx];
      raw[rawOffset++] = data[idx+1];
      raw[rawOffset++] = data[idx+2];
      raw[rawOffset++] = data[idx+3];
    }
  }
  const idatData = zlib.deflateSync(raw);

  const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  
  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = createChunk('IHDR', ihdr);

  // IDAT
  const idatChunk = createChunk('IDAT', idatData);

  // IEND
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([pngHeader, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.slice(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}
function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function isBackgroundPixel(r, g, b, a) {
  if (a === 0) return true;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  
  // Outer surround rgb(251, 247, 244)
  if (r >= 240 && g >= 235 && b >= 230 && diff < 15) return true;
  // White card (pure white down to light gray card)
  if (r >= 225 && g >= 225 && b >= 225 && diff < 18) return true;
  // Soft gray card shadow along edges (e.g., 200..225 with very low saturation)
  if (r >= 195 && g >= 190 && b >= 185 && diff < 15) return true;

  return false;
}

function removeBackground(buf) {
  const { w, h, data } = decodePng(buf);
  const visited = new Uint8Array(w * h);
  const queue = [];

  // Seed with all border pixels
  for (let x = 0; x < w; x++) {
    queue.push([x, 0], [x, h - 1]);
    visited[0 * w + x] = 1;
    visited[(h - 1) * w + x] = 1;
  }
  for (let y = 1; y < h - 1; y++) {
    queue.push([0, y], [w - 1, y]);
    visited[y * w + 0] = 1;
    visited[y * w + (w - 1)] = 1;
  }

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    const idx = (y * w + x) * 4;
    const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];

    if (isBackgroundPixel(r, g, b, a)) {
      // Make transparent
      data[idx] = 0;
      data[idx+1] = 0;
      data[idx+2] = 0;
      data[idx+3] = 0;

      // Expand to 4 neighbors
      const neighbors = [
        [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
      ];
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          const nIdx = ny * w + nx;
          if (!visited[nIdx]) {
            visited[nIdx] = 1;
            queue.push([nx, ny]);
          }
        }
      }
    }
  }

  return encodePng(w, h, data);
}

// Test on Electrical, Building, Communication
['Electrical', 'Building', 'Communication'].forEach(k => {
  const inBuf = fs.readFileSync(`temp_${k}.png`);
  const outBuf = removeBackground(inBuf);
  fs.writeFileSync(`temp_${k}_clean.png`, outBuf);
  console.log(`Saved temp_${k}_clean.png`);
});
