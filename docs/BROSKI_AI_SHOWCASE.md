# BROski AI Showcase

## Quick Start

- Dev: `npm run dev`
- Build + Preview: `npm run build && npm run preview`
- Open preview: http://localhost:4173/

## Demo Script

- Home route
  - Observe minimal payload; three/drei not loaded.
  - Hover and focus nav links to trigger intent-based prefetch tiers.
  - Watch analytics events for prefetch tiers in the console (development mode).

- Product 3D
  - Navigate to /product-3d; a calm skeleton shows while code splits load.
  - Click in canvas; OrbitControls chunk loads only after interaction.
  - Toggle High Material in nav; physical-material plugin loads lazily.
  - Monitor & Auto-Pause; throttle the network; Avatar motion pauses.
  - Use “Override” in PerfIndicator to resume/pause explicitly.

- Compression
  - Place decoders under public/decoders/basis/ and public/decoders/draco/
  - Load the ExampleModel; verify KTX2/DRACO fetch on 3D routes only.

## Architecture Highlights

- Animation adapter: centralized easing presets, perf-aware motion
  - [adapter.ts](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/src/animation/adapter.ts)

- Intent-based prefetch: hover, focus, proximity tiers, with analytics
  - [prefetch.ts](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/src/config/prefetch.ts)
  - [main.tsx](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/src/main.tsx)

- Performance observer: auto-pauses animations under poor conditions
  - [observer.ts](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/src/perf/observer.ts)
  - [perf store](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/src/stores/perfStore.ts)

- Compact perf indicator: status + override toggle, accessible by keyboard
  - [PerfIndicator.tsx](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/src/components/PerfIndicator.tsx)

- Calm skeletons: low-density loading states with ARIA status
  - [Skeletons.tsx](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/src/components/3D/Skeletons.tsx)

- 3D loaders: KTX2 + DRACO wired into GLTFLoader
  - [loaders.js](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/src/three/loaders.js)
  - [ExampleModel.tsx](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/src/components/3D/ExampleModel.tsx)

- Scenes registry: lazy-loaded scenes and prefetch hooks
  - [registry.js](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/src/scenes/registry.js)

## Neurodivergent-First Design

- Reduce visual noise: calm skeletons, readable shapes, restrained motion.
- Predictable interactions: consistent toggle positions and wording.
- Immediate feedback: perf indicator reflects network/CPU status in real time.

## Accessibility (WCAG 2.1 AA)

- Keyboard toggles in nav with aria-pressed and clear labels.
- role=status + aria-live on skeletons for loading announcements.
- Performance override button accessible via keyboard.

## Performance Hygiene

- Vendor chunks: three/drei load only on 3D routes.
- Controls deferred until first interaction (pointer down).
- Prefetch tiers gated by network quality.
- Baselines: see [bundle-size-baseline.json](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/perf-baselines/bundle-size-baseline.json)

## Compression Workflow

- Guide: [3D_COMPRESSION_WORKFLOW.md](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/docs/3D_COMPRESSION_WORKFLOW.md)
- KTX2 textures and DRACO meshes configured via loaders.

## Validation Checklist

- Guide: [PERFORMANCE_VALIDATION.md](file:///c:/Users/lyndz/Downloads/BROski%20System/BROski-system/broski-app/docs/PERFORMANCE_VALIDATION.md)
- Includes steps, metrics, throttling profiles, and deployment budgets.

## Multi-Agent Workflow

- Standards: naming, commit messages, tests, and security checks.
- Conventions in codebase align with calm UX and progressive loading.

## PR Reviewer Guide

- Include: bundle report, LHCI diffs, links to artifacts.
- Summarize: what changed (features, UX, perf), why it improves clarity.

