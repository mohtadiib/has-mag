const fs = require('fs');

const keys = [
  'Electrical', 'Communication', 'Building', 'AFL', 'Mechanical',
  'Landscaping', 'Janitorial', 'HVAC', 'PowerPlant', 'PestControl',
  'PG', 'MotorPool', 'Warehouse', 'WorkControl'
];

let iconsContent = fs.readFileSync('js/icons.js', 'utf8');

for (const k of keys) {
  const cleanPath = `temp_${k}_clean.png`;
  if (fs.existsSync(cleanPath)) {
    const buf = fs.readFileSync(cleanPath);
    const b64 = buf.toString('base64');
    const dataUri = `data:image/png;base64,${b64}`;
    
    // Replace in iconsContent
    const regex = new RegExp(`(${k}:\\s*)"data:image\\/png;base64,[^"]+"`, 'g');
    if (regex.test(iconsContent)) {
      iconsContent = iconsContent.replace(regex, `$1"${dataUri}"`);
      console.log(`Replaced ${k} in js/icons.js`);
    } else {
      console.log(`Key ${k} not matched in js/icons.js`);
    }
  }
}

fs.writeFileSync('js/icons.js', iconsContent, 'utf8');
console.log('Updated js/icons.js successfully!');
