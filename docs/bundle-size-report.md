# Bundle Size Report
Generated: 2026-01-30T09:04:45.861Z
Commit: 9798335

## Totals
- Current: 2835783 bytes
- Baseline: 0 bytes
- Delta: 2835783 bytes (0.00%) ↑

## Chunks
| File | Current (bytes) | Baseline (bytes) | Delta | % | Trend |
|------|------------------:|------------------:|------:|----:|:-----:|
| dist/index.html | 571 | 0 | 571 | 0.00% | ↑ |
| dist/assets/ARViewerScene-CGTCfxuw.js | 459 | 0 | 459 | 0.00% | ↑ |
| dist/assets/ConfiguratorScene-BFEOh2cQ.js | 451 | 0 | 451 | 0.00% | ↑ |
| dist/assets/GameBoard-yZxUV6OA.js | 7161 | 0 | 7161 | 0.00% | ↑ |
| dist/assets/index-CL_bl1i1.js | 70683 | 0 | 70683 | 0.00% | ↑ |
| dist/assets/index-DDe9a02L.js | 3384 | 0 | 3384 | 0.00% | ↑ |
| dist/assets/vendor-drei-Dcl5Q0UN.js | 997509 | 0 | 997509 | 0.00% | ↑ |
| dist/assets/vendor-react-D8If-1Jv.js | 329637 | 0 | 329637 | 0.00% | ↑ |
| dist/assets/vendor-three-C9VK7XdB.js | 1293984 | 0 | 1293984 | 0.00% | ↑ |
| dist/assets/vision_bundle-Cg0OFbR3.js | 131944 | 0 | 131944 | 0.00% | ↑ |

## Threshold (>10%)
- No chunks exceeded 10% change

## Recommendations
- Investigate large increases: enable more granular dynamic imports, reduce unused exports.
- Verify vendor-three and vendor-drei are only pulled on 3D routes.
- Audit GSAP usage and ensure animations are not eagerly imported.
- Consider asset compression and sprite atlasing for heavy textures.
- Review tree-shaking and ensure ESM paths for libraries.
