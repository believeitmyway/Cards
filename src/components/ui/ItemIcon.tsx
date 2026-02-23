import React from 'react';
import { Rarity } from '../../types';

interface ItemIconProps {
  rarity: Rarity;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const rarityColors = {
  UR: 'bg-yellow-400 border-yellow-200',
  SSR: 'bg-red-500 border-red-300',
  SR: 'bg-purple-500 border-purple-300',
  R: 'bg-blue-400 border-blue-200',
  N: 'bg-gray-400 border-gray-200',
};

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-48 h-48',
};

export const ItemIcon: React.FC<ItemIconProps> = ({ rarity, className = '', size = 'md' }) => {
  return (
    <div className={`rounded-full border-4 shadow-inner flex items-center justify-center ${rarityColors[rarity]} ${sizes[size]} ${className}`}>
      <span className="text-white font-bold text-shadow-sm">?</span>
    </div>
  );
};
