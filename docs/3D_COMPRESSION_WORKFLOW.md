# 3D Compression Workflow

## Goals

- Reduce texture and geometry payloads for faster 3D route loads
- Maintain visual quality while optimizing transfer and decoding

## KTX2 (Basis Universal)

- Use KTX2 for textures; supports GPU-friendly formats
- Place Basis transcoder files under public/decoders/basis/
- Loader configuration done in [loaders.ts](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/src/three/loaders.ts)

### Steps (KTX2)

- Convert textures to KTX2 using toktx or appropriate tooling
- Reference KTX2 textures in materials or GLTF files

## DRACO (Geometry)

- Use DRACO for mesh compression within GLTF
- Place DRACO decoder files under public/decoders/draco/
- Loader configuration done in [loaders.ts](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/src/three/loaders.ts)

### Steps (DRACO)

- Export GLTF with DRACO compression enabled (in DCC tools or CLI)
- Ensure GLTFLoader is configured with DRACOLoader

## Preload Minimal Critical Assets

- Use rel=preload for small icons and tiny JSON configs on 3D routes
- Configures preloading in [preload.ts](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/src/config/preload.ts)

## Validation

- Build and verify route loads via DevTools network tab
- Confirm KTX2/DRACO decoders are fetched only on 3D routes

## Notes

- Align compression quality with neurodivergent-first principles: avoid overly detailed textures that increase visual noise
- Balance file size with clarity; prefer readable shapes and calm materials
