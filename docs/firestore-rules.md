# Firestore Security Rules – Alignment & Rationale

## Schema Alignment

- families: add parentIds: string[] for parent membership and permissions.
- taskInstances: include familyId to scope access to the correct family.
- avatars: userId enforces kid-only read.

## Rules Summary

- families: parents listed in parentIds can read/write.
- avatars: kid (owner) can read; updates restricted.
- taskInstances: kid can create their own task; parents in the same family can read/update.
- cosmetics: public read.

## Business Logic Justification

- Parent control over family resources requires explicit membership (parentIds).
- Kid privacy: restrict avatar updates to backend/admin flows; kid can read only.
- Approval workflow: parents must be able to update taskInstances in their family.

## Test Strategy

- Use Firestore emulator.
- Run unit tests in tests/rules.test.ts.
- Tests cover: parent read on families, kid create taskInstance, parent update on taskInstance.

## How to Run

1. Install Firebase tools: npm i -D firebase-tools
2. Start emulator: firebase emulators:start --only firestore
3. In another terminal: npm run test
