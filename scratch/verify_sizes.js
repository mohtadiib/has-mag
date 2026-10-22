const fs = require('fs');

const keys = [
  'Electrical', 'Communication', 'Building', 'AFL', 'Mechanical',
  'Landscaping', 'Janitorial', 'HVAC', 'PowerPlant', 'PestControl',
  'PG', 'MotorPool', 'Warehouse'
];

for (const k of keys) {
  const origBuf = fs.readFileSync(`temp_${k}.png`);
  const cleanBuf = fs.readFileSync(`temp_${k}_clean.png`);
  console.log(`${k}: original size=${origBuf.length}, clean size=${cleanBuf.length}`);
}
