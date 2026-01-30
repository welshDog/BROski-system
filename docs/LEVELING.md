# Leveling Formula – Standardization

## Chosen Formula

- XP gained = floor(coins / 25).
- XP needed for next level = level * 100 (minimum 100).
- Overflow XP carries to next levels.

## Rationale

- Matches codemap logic (25 coins = 1 XP).
- Linear growth with level multiplier keeps progression steady and predictable.

## Implementation

- Single source of truth: src/utils/leveling.ts.
- Store integration: useGameStore.addCoins calls addCoinsToLeveling.

## Tests

- Unit tests in tests/utils/board.test.ts verify radius/worldPosition; addCoins tested implicitly by leveling util behavior.
- Add dedicated tests if needed for addCoins edge cases.
