const fs = require('fs');
let content = fs.readFileSync('js/icons.js', 'utf8');
content = content.replace('const ICON_PATHS', 'global.ICON_PATHS');
eval(content);

const keys = [
  'Electrical', 'Communication', 'Building', 'AFL', 'Mechanical',
  'Landscaping', 'Janitorial', 'HVAC', 'PowerPlant', 'PestControl',
  'PG', 'MotorPool', 'Warehouse', 'WorkControl'
];

for (const k of keys) {
  const data = global.ICON_PATHS[k];
  if (data && data.startsWith('data:image/png;base64,')) {
    const buf = Buffer.from(data.replace('data:image/png;base64,', ''), 'base64');
    fs.writeFileSync(`temp_${k}.png`, buf);
    console.log(`Saved temp_${k}.png`);
  }
}
