# Bundle Size Report
Generated: 2026-01-30T18:50:24.726Z
Commit: 0d7e46e

## Totals
- Current: 16641181 bytes
- Baseline: 2835783 bytes
- Delta: 13805398 bytes (486.83%) ↑

## Chunks
| File | Current (bytes) | Baseline (bytes) | Delta | % | Trend |
|------|------------------:|------------------:|------:|----:|:-----:|
| dist/index.html | 1094 | 571 | 523 | 91.59% | ↑ |
| dist/assets/index-CL_bl1i1.js | 70726 | 70683 | 43 | 0.06% | ↑ |
| dist/assets/vision_bundle-Cg0OFbR3.js | 131995 | 131944 | 51 | 0.04% | ↑ |
| dist/manifest.json | 419 | 0 | 419 | 0.00% | ↑ |
| dist/sw.js | 703 | 0 | 703 | 0.00% | ↑ |
| dist/icons/3d.svg | 163 | 0 | 163 | 0.00% | ↑ |
| dist/icons/ar.svg | 161 | 0 | 161 | 0.00% | ↑ |
| dist/icons/gear.svg | 405 | 0 | 405 | 0.00% | ↑ |
| dist/icons/icon-192.png | 3907 | 0 | 3907 | 0.00% | ↑ |
| dist/icons/icon-512.png | 10651 | 0 | 10651 | 0.00% | ↑ |
| dist/icons/icon.svg | 280 | 0 | 280 | 0.00% | ↑ |
| dist/config/ar.json | 42 | 0 | 42 | 0.00% | ↑ |
| dist/config/configurator.json | 36 | 0 | 36 | 0.00% | ↑ |
| dist/config/scene.json | 67 | 0 | 67 | 0.00% | ↑ |
| dist/assets/ARViewerScene-B_3xcdM1.js | 510 | 0 | 510 | 0.00% | ↑ |
| dist/assets/ARViewerScene-B_3xcdM1.js.map | 1235 | 0 | 1235 | 0.00% | ↑ |
| dist/assets/ARViewerScene-CR7hx2cm.js | 510 | 0 | 510 | 0.00% | ↑ |
| dist/assets/ARViewerScene-CR7hx2cm.js.map | 1152 | 0 | 1152 | 0.00% | ↑ |
| dist/assets/ConfiguratorScene-B3s5ON0Z.js | 506 | 0 | 506 | 0.00% | ↑ |
| dist/assets/ConfiguratorScene-B3s5ON0Z.js.map | 1158 | 0 | 1158 | 0.00% | ↑ |
| dist/assets/ConfiguratorScene-DnTm8VzQ.js | 506 | 0 | 506 | 0.00% | ↑ |
| dist/assets/ConfiguratorScene-DnTm8VzQ.js.map | 1240 | 0 | 1240 | 0.00% | ↑ |
| dist/assets/GameBoard-DMLOfiF_.js | 7378 | 0 | 7378 | 0.00% | ↑ |
| dist/assets/GameBoard-DMLOfiF_.js.map | 27411 | 0 | 27411 | 0.00% | ↑ |
| dist/assets/index-CL_bl1i1.js.map | 374711 | 0 | 374711 | 0.00% | ↑ |
| dist/assets/index-DhTwm2ry.js | 584744 | 0 | 584744 | 0.00% | ↑ |
| dist/assets/index-DhTwm2ry.js.map | 2506535 | 0 | 2506535 | 0.00% | ↑ |
| dist/assets/PhysicalMaterial-C-B1G_jH.js | 289 | 0 | 289 | 0.00% | ↑ |
| dist/assets/PhysicalMaterial-C-B1G_jH.js.map | 705 | 0 | 705 | 0.00% | ↑ |
| dist/assets/preload-CrQAAXoQ.js | 477 | 0 | 477 | 0.00% | ↑ |
| dist/assets/preload-CrQAAXoQ.js.map | 1200 | 0 | 1200 | 0.00% | ↑ |
| dist/assets/vendor-drei-BvsnsyT1.js | 997574 | 0 | 997574 | 0.00% | ↑ |
| dist/assets/vendor-drei-BvsnsyT1.js.map | 3632438 | 0 | 3632438 | 0.00% | ↑ |
| dist/assets/vendor-react-D0K50pYM.js | 330025 | 0 | 330025 | 0.00% | ↑ |
| dist/assets/vendor-react-D0K50pYM.js.map | 1254451 | 0 | 1254451 | 0.00% | ↑ |
| dist/assets/vendor-three-DDDaaqjL.js | 1400587 | 0 | 1400587 | 0.00% | ↑ |
| dist/assets/vendor-three-DDDaaqjL.js.map | 4922797 | 0 | 4922797 | 0.00% | ↑ |
| dist/assets/vision_bundle-Cg0OFbR3.js.map | 347195 | 0 | 347195 | 0.00% | ↑ |
| dist/assets/vitals-BMSiacgF.js | 7269 | 0 | 7269 | 0.00% | ↑ |
| dist/assets/vitals-BMSiacgF.js.map | 17929 | 0 | 17929 | 0.00% | ↑ |

## Threshold (>10%)
- dist/index.html: 91.59% ↑

## Recommendations
- Investigate large increases: enable more granular dynamic imports, reduce unused exports.
- Verify vendor-three and vendor-drei are only pulled on 3D routes.
- Audit GSAP usage and ensure animations are not eagerly imported.
- Consider asset compression and sprite atlasing for heavy textures.
- Review tree-shaking and ensure ESM paths for libraries.
