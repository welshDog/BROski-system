const fs = require('fs');
const path = require('path');

function readScores(dir) {
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const lhrFiles = files.filter((f) => f.endsWith('.json'));
  const metrics = [];
  for (const f of lhrFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'));
    metrics.push({
      url: data.requestedUrl || data.finalUrl,
      performance: data.categories?.performance?.score || 0,
      interactive: data.audits?.interactive?.numericValue || 0,
      speedIndex: data.audits?.speedIndex?.numericValue || 0,
      tbt: data.audits?.totalBlockingTime?.numericValue || 0
    });
  }
  return metrics;
}

function compare(current, baseline) {
  const byUrl = (arr) => Object.fromEntries(arr.map((m) => [new URL(m.url).pathname, m]));
  const a = byUrl(current);
  const b = byUrl(baseline);
  const diffs = [];
  for (const url of Object.keys(a)) {
    if (!b[url]) continue;
    const c = a[url];
    const p = b[url];
    const perfDrop = (p.performance - c.performance) / (p.performance || 1);
    const ttiRise = (c.interactive - p.interactive) / (p.interactive || 1);
    const siRise = (c.speedIndex - p.speedIndex) / (p.speedIndex || 1);
    const tbtRise = (c.tbt - p.tbt) / (p.tbt || 1);
    diffs.push({ url, perfDrop, ttiRise, siRise, tbtRise });
  }
  return diffs;
}

function main() {
  const mode = process.argv[2] || 'mobile';
  const currentDir = mode === 'desktop' ? 'lhci-desktop' : 'lhci';
  const baselineFile = mode === 'desktop' ? 'perf-baselines/desktop.json' : 'perf-baselines/mobile.json';
  const current = readScores(currentDir);
  if (!fs.existsSync(baselineFile)) {
    fs.mkdirSync('perf-baselines', { recursive: true });
    fs.writeFileSync(baselineFile, JSON.stringify(current, null, 2));
    console.log('Baseline created:', baselineFile);
    process.exit(0);
  }
  const baseline = JSON.parse(fs.readFileSync(baselineFile, 'utf-8'));
  const diffs = compare(current, baseline);
  fs.writeFileSync(`perf-baselines/diff-${mode}.json`, JSON.stringify(diffs, null, 2));
  const overThreshold = diffs.filter((d) => d.perfDrop > 0.1 || d.ttiRise > 0.1 || d.siRise > 0.1 || d.tbtRise > 0.1);
  if (overThreshold.length) {
    console.error('Performance regression detected:', overThreshold);
    process.exit(1);
  }
  console.log('No significant regression. Updating baseline.');
  fs.writeFileSync(baselineFile, JSON.stringify(current, null, 2));
}

main();
