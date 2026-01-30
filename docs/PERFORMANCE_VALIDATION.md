# Performance Validation Checklist

## Routes

- /
- /product-3d
- /configurator
- /ar-viewer

## Tools

- Browser DevTools Network tab
- Performance panel
- LHCI reports in broski-app/lhci and lhci-desktop
- Baselines and diffs in broski-app/perf-baselines

## Network Tab Metrics

- Initial document transfer size
- JS total downloaded per route (vendor-react, vendor-three, vendor-drei)
- Number of requests before first interaction
- Waterfall: ensure three/drei load only on 3D routes

## Acceptable Ranges

- Home: total-byte-weight <= 800 kB, three/drei absent
- 3D routes: total-byte-weight <= 1.5–2 MB, controls deferred until interaction

## Steps

- Start preview: npm run build && npm run preview
- Visit / and confirm no vendor-three/vendor-drei requested
- Navigate to a 3D route; observe dynamic chunks loading
- Interact (pointer down) and confirm OrbitControls chunk loads
- Verify gsap only loads when Avatar animates
- Toggle High Material in nav; confirm PhysicalMaterial chunk loads lazily
- Use Monitor & Auto-Pause in nav; simulate poor network (DevTools) and confirm animations pause

## Performance Panel

- Record on each route; review TTI, Speed Index, TBT
- Compare with LHCI budgets; investigate regressions if exceeded

## Throttling

- Use DevTools throttling profiles (Slow 3G, Fast 3G)
- Validate behavior under constrained networks; prefetch remains conditional

## A/B Prefetch

- Set localStorage.setItem('ab_prefetch_variant','B') to enable, 'A' to disable
- Confirm hover triggers prefetch under good network conditions

## Deployment Procedures

- CI runs mobile and desktop LHCI with budgets and compares against baselines
- Perf diffs written to perf-baselines/diff-*.json; pipeline fails if >10% regression
- Baselines auto-updated on successful runs; review diffs in PRs when failures occur
