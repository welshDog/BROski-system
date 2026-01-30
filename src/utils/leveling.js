export function xpNeededFor(level) {
    return Math.max(100, level * 100);
}
export const MAX_LEVEL = 100;
export function addCoinsToLeveling(state, coins) {
    const addedXp = Math.floor(coins / 25);
    let level = state.level;
    let xp = state.experience + addedXp;
    while (xp >= xpNeededFor(level) && level < MAX_LEVEL) {
        xp -= xpNeededFor(level);
        level += 1;
    }
    if (level >= MAX_LEVEL)
        xp = 0;
    return { level, experience: xp };
}
