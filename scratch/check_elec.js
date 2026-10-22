const fs = require('fs');
const zlib = require('zlib');

const buf = fs.readFileSync('temp_Electrical.png');
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

// Print pixel colors around lightning (x=33, y=24)
const idx = (24 * w + 33) * 4;
console.log('Pixel at (33,24):', uncompressed[idx], uncompressed[idx+1], uncompressed[idx+2], uncompressed[idx+3]);
// also at (20, 28)
const idx2 = (28 * w + 20) * 4;
console.log('Pixel at (20,28):', uncompressed[idx2], uncompressed[idx2+1], uncompressed[idx2+2], uncompressed[idx2+3]);
// at (5, 5)
const idx3 = (5 * w + 5) * 4;
console.log('Pixel at (5,5):', uncompressed[idx3], uncompressed[idx3+1], uncompressed[idx3+2], uncompressed[idx3+3]);
