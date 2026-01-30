const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const BASELINE_DIR = path.join(__dirname, '..', 'perf-baselines');
const BASELINE_FILE = path.join(BASELINE_DIR, 'bundle-size-baseline.json');
const REPORT_FILE = path.join(__dirname, '..', 'docs', 'bundle-size-report.md');

function listFiles(dir) {
  const out = [];
  const stack = [dir];
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

function sizeBytes(file) {
  try {
    return fs.statSync(file).size;
  } catch {
    return 0;
  }
}

function toRel(p) {
  return path.relative(path.join(__dirname, '..'), p).replace(/\\/g, '/');
}

function readBaseline() {
  if (!fs.existsSync(BASELINE_FILE)) return null;
  return JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf-8'));
}

function getCommit() {
  try {
    const hash = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    return hash || 'unknown';
  } catch {
    return 'unknown';
  }
}

function gatherCurrent() {
  const files = listFiles(DIST_DIR);
  const items = files.map((f) => ({ file: toRel(f), bytes: sizeBytes(f) }));
  const total = items.reduce((a, b) => a + b.bytes, 0);
  return { total, items };
}

function writeReport(current, baseline, meta) {
  const now = new Date().toISOString();
  const lines = [];
  lines.push(`# Bundle Size Report`);
  lines.push(`Generated: ${now}`);
  lines.push(`Commit: ${meta.commit}`);
  lines.push('');
  const baseTotal = baseline ? baseline.total : 0;
  const deltaTotal = current.total - baseTotal;
  const pctTotal = baseTotal ? (deltaTotal / baseTotal) * 100 : 0;
  const arrowTotal = deltaTotal > 0 ? '↑' : deltaTotal < 0 ? '↓' : '→';
  lines.push(`## Totals`);
  lines.push(`- Current: ${current.total} bytes`);
  lines.push(`- Baseline: ${baseTotal} bytes`);
  lines.push(`- Delta: ${deltaTotal} bytes (${pctTotal.toFixed(2)}%) ${arrowTotal}`);
  lines.push('');

  const baseMap = new Map((baseline?.items || []).map((i) => [i.file, i.bytes]));
  const rows = current.items.map((i) => {
    const baseBytes = baseMap.get(i.file) || 0;
    const delta = i.bytes - baseBytes;
    const pct = baseBytes ? (delta / baseBytes) * 100 : 0;
    const arrow = delta > 0 ? '↑' : delta < 0 ? '↓' : '→';
    return { file: i.file, curr: i.bytes, base: baseBytes, delta, pct, arrow };
  });

  rows.sort((a, b) => Math.abs(b.pct) - Math.abs(a.pct));

  lines.push('## Chunks');
  lines.push('| File | Current (bytes) | Baseline (bytes) | Delta | % | Trend |');
  lines.push('|------|------------------:|------------------:|------:|----:|:-----:|');
  for (const r of rows) {
    lines.push(`| ${r.file} | ${r.curr} | ${r.base} | ${r.delta} | ${r.pct.toFixed(2)}% | ${r.arrow} |`);
  }
  lines.push('');

  const threshold = 10;
  const offenders = rows.filter((r) => Math.abs(r.pct) > threshold);
  lines.push('## Threshold (>10%)');
  if (offenders.length) {
    for (const r of offenders) {
      lines.push(`- ${r.file}: ${r.pct.toFixed(2)}% ${r.arrow}`);
    }
  } else {
    lines.push('- No chunks exceeded 10% change');
  }
  lines.push('');

  lines.push('## Recommendations');
  lines.push('- Investigate large increases: enable more granular dynamic imports, reduce unused exports.');
  lines.push('- Verify vendor-three and vendor-drei are only pulled on 3D routes.');
  lines.push('- Audit GSAP usage and ensure animations are not eagerly imported.');
  lines.push('- Consider asset compression and sprite atlasing for heavy textures.');
  lines.push('- Review tree-shaking and ensure ESM paths for libraries.');
  lines.push('');

  fs.mkdirSync(path.dirname(REPORT_FILE), { recursive: true });
  fs.writeFileSync(REPORT_FILE, lines.join('\n'));
}

function main() {
  const start = Date.now();
  if (!fs.existsSync(DIST_DIR)) {
    console.error('dist/ not found. Run build before analysis.');
    process.exit(1);
  }
  const baseline = readBaseline();
  const current = gatherCurrent();
  const commit = getCommit();
  writeReport(current, baseline, { commit });
  if (!baseline) {
    fs.mkdirSync(BASELINE_DIR, { recursive: true });
    fs.writeFileSync(BASELINE_FILE, JSON.stringify(current, null, 2));
    console.log('Baseline created at', BASELINE_FILE);
  }
  const dur = (Date.now() - start) / 1000;
  console.log(`Analysis done in ${dur.toFixed(2)}s. Report: ${REPORT_FILE}`);
}

main();
