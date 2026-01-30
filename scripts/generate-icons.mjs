import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const root = process.cwd();
const srcSvg = path.join(root, 'public', 'icons', 'icon.svg');
const out192 = path.join(root, 'public', 'icons', 'icon-192.png');
const out512 = path.join(root, 'public', 'icons', 'icon-512.png');

if (!fs.existsSync(srcSvg)) {
  console.error('Missing SVG icon at', srcSvg);
  process.exit(1);
}

const svg = fs.readFileSync(srcSvg, 'utf8');
const render = (size) => {
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: size } });
  const pngData = resvg.render();
  return pngData.asPng();
};
fs.writeFileSync(out192, render(192));
fs.writeFileSync(out512, render(512));
console.log('Generated PNG icons:', out192, out512);
