const fs = require('fs');
const path = require('path');

const SRC_DIRS = ['public', 'src/assets'];
const DIST_DIR = 'dist/assets';
const MAX_FILE_BYTES = 3 * 1024 * 1024; // 3MB
const MAX_TOTAL_BYTES = 12 * 1024 * 1024; // 12MB

function list(dir) {
  const abs = path.join(process.cwd(), dir);
  if (!fs.existsSync(abs)) return [];
  const out = [];
  const stack = [abs];
  while (stack.length) {
    const d = stack.pop();
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) stack.push(p);
      else out.push(p);
    }
  }
  return out;
}

function checkFiles(files) {
  const rel = (p) => path.relative(process.cwd(), p).replace(/\\/g, '/');
  let total = 0;
  const offenders = [];
  for (const f of files) {
    const s = fs.statSync(f).size;
    total += s;
    if (s > MAX_FILE_BYTES) offenders.push({ file: rel(f), bytes: s });
  }
  return { total, offenders };
}

function main() {
  const srcFiles = SRC_DIRS.flatMap((d) => list(d));
  const distFiles = list(DIST_DIR);
  const srcCheck = checkFiles(srcFiles);
  const distCheck = checkFiles(distFiles);

  if (srcCheck.offenders.length) {
    console.error('Large source assets detected (>3MB):');
    for (const o of srcCheck.offenders) console.error('-', o.file, o.bytes);
    process.exit(1);
  }

  if (distCheck.offenders.length) {
    console.error('Large built assets detected (>3MB):');
    for (const o of distCheck.offenders) console.error('-', o.file, o.bytes);
    process.exit(1);
  }

  if (distCheck.total > MAX_TOTAL_BYTES) {
    console.error('Total built assets exceed limit:', distCheck.total);
    process.exit(1);
  }

  console.log('Asset size check passed. Total dist assets:', distCheck.total);
}

main();
