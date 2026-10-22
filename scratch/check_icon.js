const fs = require('fs');
let content = fs.readFileSync('js/icons.js', 'utf8');
content = content.replace('const ICON_PATHS', 'global.ICON_PATHS');
eval(content);
const icon = global.ICON_PATHS.Electrical;
const base64Data = icon.replace(/^data:image\/png;base64,/, '');
fs.writeFileSync('temp_electrical.png', Buffer.from(base64Data, 'base64'));
console.log('Saved temp_electrical.png!');
