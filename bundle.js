const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const css = fs.readFileSync(path.join(projectDir, 'css/style.css'), 'utf8');
const iconsJs = fs.readFileSync(path.join(projectDir, 'js/icons.js'), 'utf8');
const dataJs = fs.readFileSync(path.join(projectDir, 'js/data.js'), 'utf8');
const stateJs = fs.readFileSync(path.join(projectDir, 'js/state.js'), 'utf8');
const navJs = fs.readFileSync(path.join(projectDir, 'js/navigation.js'), 'utf8');
const modalsJs = fs.readFileSync(path.join(projectDir, 'js/modals.js'), 'utf8');
const viewsJs = fs.readFileSync(path.join(projectDir, 'js/views.js'), 'utf8');
const appJs = fs.readFileSync(path.join(projectDir, 'js/app.js'), 'utf8');

let html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

// Replace stylesheet link with inline style
html = html.replace('<link rel="stylesheet" href="css/style.css">', '<style>\n' + css + '\n</style>');

// Replace script tags with inline scripts
const scriptsBlock = [
  '<script>',
  '// --- ICONS ---',
  iconsJs,
  '// --- DATA ---',
  dataJs,
  '// --- STATE ---',
  stateJs,
  '// --- NAVIGATION ---',
  navJs,
  '// --- MODALS ---',
  modalsJs,
  '// --- VIEWS ---',
  viewsJs,
  '// --- APP ---',
  appJs,
  '</script>'
].join('\n\n');

const scriptTagRegex = /<script src="js\/icons\.js"><\/script>[\s\S]*?<script src="js\/app\.js"><\/script>/;
html = html.replace(scriptTagRegex, scriptsBlock);

const outFile = path.join(projectDir, 'google_sites_embed.html');
fs.writeFileSync(outFile, html, 'utf8');
console.log('BUNDLE_SUCCESS, bytes:', html.length, 'file:', outFile);
