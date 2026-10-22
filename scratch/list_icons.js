const fs = require('fs');
let content = fs.readFileSync('js/icons.js', 'utf8');
content = content.replace('const ICON_PATHS', 'global.ICON_PATHS');
eval(content);

console.log('Icon keys:', Object.keys(global.ICON_PATHS));
for (const key of Object.keys(global.ICON_PATHS)) {
  const val = global.ICON_PATHS[key];
  if (val.startsWith('data:image/svg')) {
    console.log(key, 'is SVG');
  } else if (val.startsWith('data:image/png')) {
    console.log(key, 'is PNG, base64 length:', val.length);
  } else {
    console.log(key, 'other:', val.substring(0, 30));
  }
}
