# BROski App – Critical Path MVP

## Setup
- Node 18+
- `npm install`
- Env vars in `.env.local`:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`

## Scripts
- `npm run dev` – start app
- `npm run test:coverage` – unit tests (>=90% thresholds)
- `npm run typecheck` – TypeScript checks
- `npm run lint` – ESLint
- `npm run build` – production build

## Features
- Auth: Parent/Kid login, protected routes
- Task submission: optional photo via Firebase Storage
- Approval queue: role-based, atomic coin + position updates
- Streaks: increment on approval
- CoinCounter: live balance updates via event channel

## CI
- Lint, typecheck, tests with coverage, rules tests, build

## Notes
- Firestore rules require `familyId` on `taskInstances`
- Draco/KTX2 decoders should be hosted under `/public/decoders/`
