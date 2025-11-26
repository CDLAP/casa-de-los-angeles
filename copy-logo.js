const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'assets', 'logo-CDLA.png');
const dest = path.join(__dirname, 'public', 'images', 'logo-cdla.png');

fs.copyFileSync(source, dest);
console.log('Logo copiado exitosamente a public/images/');
