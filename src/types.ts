export type Rarity = 'UR' | 'SSR' | 'SR' | 'R' | 'N';

export interface Item {
  id: string;
  name: string;
  rarity: Rarity;
  description: string;
  type: 'weapon' | 'material' | 'gold';
  imageUrl?: string;
}

export interface User {
  id: string;
  username: string;
  gold: number;
  inventory: Item[];
  history: {
    timestamp: number;
    item: Item;
  }[];
}

export const RARITY_CONFIG = {
  UR: { color: 'text-yellow-400', bg: 'bg-gradient-to-br from-yellow-600 via-yellow-300 to-yellow-800', border: 'border-yellow-400', dropRate: 0.01 }, // 1%
  SSR: { color: 'text-red-500', bg: 'bg-gradient-to-br from-red-600 via-red-400 to-red-900', border: 'border-red-500', dropRate: 0.04 }, // 4%
  SR: { color: 'text-purple-400', bg: 'bg-gradient-to-br from-purple-600 via-purple-400 to-purple-900', border: 'border-purple-400', dropRate: 0.15 }, // 15%
  R: { color: 'text-blue-400', bg: 'bg-gradient-to-br from-blue-600 via-blue-400 to-blue-900', border: 'border-blue-400', dropRate: 0.30 }, // 30%
  N: { color: 'text-gray-400', bg: 'bg-gradient-to-br from-gray-600 via-gray-400 to-gray-800', border: 'border-gray-400', dropRate: 0.50 }, // 50%
};
