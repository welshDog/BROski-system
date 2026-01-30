# Technical Debt – Sprint Notes

- Firestore rules tests require emulator; current tests skip when emulator not running.
- R3F in tests needs mocking and polyfills; consider a dedicated test harness.
- Storybook currently includes a dummy UI story; add 3D stories with Canvas provider.
- Bundle size exceeds 500 kB; plan code-splitting and lazy loading.
- Moderate npm vulnerabilities flagged; schedule audit fixes.
