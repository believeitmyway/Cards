import { Item, Rarity, RARITY_CONFIG } from '../types';

// Mock Data
const WEAPONS: Item[] = [
    { id: 'w_ur_1', name: 'Legendary Rocket Launcher', rarity: 'UR', type: 'weapon', description: 'Destroys everything in its path.' },
    { id: 'w_ssr_1', name: 'Flame Thrower', rarity: 'SSR', type: 'weapon', description: 'Burns enemies to a crisp.' },
    { id: 'w_ssr_2', name: 'Ice Wand', rarity: 'SSR', type: 'weapon', description: 'Freezes targets instantly.' },
    { id: 'w_sr_1', name: 'Assault Rifle', rarity: 'SR', type: 'weapon', description: 'Rapid fire capabilities.' },
    { id: 'w_sr_2', name: 'Sniper Rifle', rarity: 'SR', type: 'weapon', description: 'High precision long-range weapon.' },
    { id: 'w_r_1', name: 'Handgun', rarity: 'R', type: 'weapon', description: 'Standard issue sidearm.' },
    { id: 'w_r_2', name: 'Shotgun', rarity: 'R', type: 'weapon', description: 'Effective at close range.' },
    { id: 'w_n_1', name: 'Wooden Sword', rarity: 'N', type: 'weapon', description: 'Better than nothing.' },
    { id: 'w_n_2', name: 'Slingshot', rarity: 'N', type: 'weapon', description: 'For small game.' },
];

const MATERIALS: Item[] = [
    { id: 'm_ur_1', name: 'Dragon Scale', rarity: 'UR', type: 'material', description: 'Extremely rare crafting material.' },
    { id: 'm_ssr_1', name: 'Phoenix Feather', rarity: 'SSR', type: 'material', description: 'Radiates warmth.' },
    { id: 'm_sr_1', name: 'Mithril Ore', rarity: 'SR', type: 'material', description: 'Strong and lightweight metal.' },
    { id: 'm_r_1', name: 'Iron Ingot', rarity: 'R', type: 'material', description: 'Commonly used for tools.' },
    { id: 'm_n_1', name: 'Wood Log', rarity: 'N', type: 'material', description: 'Basic building block.' },
];

const GOLD_ITEMS: Item[] = [
    { id: 'g_ur_1', name: 'Crown of Kings', rarity: 'UR', type: 'gold', description: 'A symbol of ultimate power.' },
    { id: 'g_ssr_1', name: 'Diamond Ring', rarity: 'SSR', type: 'gold', description: 'Sparkles brilliantly.' },
    { id: 'g_sr_1', name: 'Gold Necklace', rarity: 'SR', type: 'gold', description: 'Shiny and valuable.' },
    { id: 'g_r_1', name: 'Silver Coin', rarity: 'R', type: 'gold', description: 'Standard currency.' },
    { id: 'g_n_1', name: 'Copper Coin', rarity: 'N', type: 'gold', description: 'Small change.' },
];


export const rollGacha = (poolType: 'weapon' | 'material' | 'gold'): Item => {
    let pool: Item[] = [];
    if (poolType === 'weapon') pool = WEAPONS;
    else if (poolType === 'material') pool = MATERIALS;
    else pool = GOLD_ITEMS;

    const rand = Math.random();
    let cumulative = 0;
    let selectedRarity: Rarity = 'N';

    // Rarity determination
    // Order matters: Check rarest first if implementing thresholds, or standard cumulative if probabilities sum to 1.
    // Here we use simple cumulative:
    // UR: 0.01 -> if rand < 0.01
    // SSR: 0.04 -> if rand < 0.05
    // etc.

    // We'll iterate through config to find rarity.
    // Note: The config object keys aren't ordered guaranteed, but we can hardcode checking order for safety.
    const rarityOrder: Rarity[] = ['UR', 'SSR', 'SR', 'R', 'N'];

    for (const rarity of rarityOrder) {
        cumulative += RARITY_CONFIG[rarity].dropRate;
        if (rand < cumulative) {
            selectedRarity = rarity;
            break;
        }
    }

    // Filter pool by rarity
    const rarityPool = pool.filter(item => item.rarity === selectedRarity);

    // Fallback if pool is empty for that rarity (shouldn't happen with good data)
    if (rarityPool.length === 0) {
        return pool.filter(item => item.rarity === 'N')[0] || pool[0];
    }

    // Pick random item from the rarity pool
    const itemIndex = Math.floor(Math.random() * rarityPool.length);
    return rarityPool[itemIndex];
};
