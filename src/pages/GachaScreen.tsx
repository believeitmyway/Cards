import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { rollGacha } from '../utils/gachaLogic';
import { Item, RARITY_CONFIG } from '../types';
import { ItemIcon } from '../components/ui/ItemIcon';
import { FantasyButton } from '../components/ui/FantasyButton';

export const GachaScreen = () => {
  const { type } = useParams<{ type: 'weapon' | 'material' | 'gold' }>();
  const { user, spendGold, addToHistory } = useAuth();
  const navigate = useNavigate();

  const [isAnimating, setIsAnimating] = useState(false);
  const [result, setResult] = useState<Item | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Backgrounds per gacha type
  const backgrounds = {
    weapon: "bg-[url('https://images.unsplash.com/photo-1595590424283-b8f17842773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')]",
    material: "bg-[url('https://images.unsplash.com/photo-1615800098779-1be8287d6b34?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')]",
    gold: "bg-[url('https://images.unsplash.com/photo-1610375461246-83df859cd871?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')]",
  };

  const handleRoll = () => {
    if (!user || user.gold < 100) {
      alert("Not enough gold!");
      return;
    }

    spendGold(100);
    setIsAnimating(true);
    setShowResult(false);

    // Simulate animation delay
    setTimeout(() => {
      const newItem = rollGacha(type || 'weapon');
      setResult(newItem);
      addToHistory(newItem);
      setIsAnimating(false);
      setShowResult(true);
    }, 3000); // 3 seconds of suspense
  };

  const handleClose = () => {
    setResult(null);
    setShowResult(false);
  };

  if (!user) return null;

  return (
    <div className={`min-h-screen relative overflow-hidden flex flex-col items-center justify-center ${backgrounds[type || 'weapon']} bg-cover bg-center`}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Header Info */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20">
        <FantasyButton onClick={() => navigate('/')} variant="secondary" className="text-sm">
          &larr; Retreat
        </FantasyButton>
        <div className="bg-black/50 px-4 py-2 rounded-full border border-yellow-500 text-yellow-400 font-bold shadow-lg">
          💰 {user.gold.toLocaleString()} G
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {!isAnimating && !showResult && (
          <div className="animate-float">
            <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] tracking-wider uppercase">
              Summon {type}
            </h1>
            <div className="mb-12">
               <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-b from-gray-700 to-gray-900 border-4 border-yellow-600 shadow-[0_0_50px_rgba(255,215,0,0.3)] flex items-center justify-center relative overflow-hidden group cursor-pointer" onClick={handleRoll}>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-spin-slow"></div>
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">🔮</span>
                  <div className="absolute bottom-4 text-yellow-300 text-sm font-bold tracking-widest">TAP TO SUMMON</div>
               </div>
            </div>
            <FantasyButton onClick={handleRoll} className="text-xl px-12 py-4 animate-pulse">
              Summon (100 G)
            </FantasyButton>
          </div>
        )}

        {/* Animation Sequence */}
        {isAnimating && (
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl animate-ping"></div>
              <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center animate-spin-slow">
                 <span className="text-4xl">✨</span>
              </div>
            </div>
            <p className="text-2xl text-blue-200 font-bold animate-pulse">Gathering Mana...</p>
          </div>
        )}

        {/* Result Reveal */}
        {showResult && result && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in" onClick={handleClose}>
            <div className={`relative p-12 rounded-2xl border-4 ${RARITY_CONFIG[result.rarity].border} ${RARITY_CONFIG[result.rarity].bg} shadow-[0_0_100px_rgba(0,0,0,0.8)] text-center max-w-lg w-full transform transition-all scale-100 hover:scale-105 cursor-pointer`}>

              {/* Rays for high rarity */}
              {(result.rarity === 'UR' || result.rarity === 'SSR') && (
                 <div className="absolute inset-0 -z-10 animate-spin-slow opacity-50">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45"></div>
                    <div className="w-full h-full bg-gradient-to-b from-transparent via-white to-transparent transform -rotate-45"></div>
                 </div>
              )}

              <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 mb-2 drop-shadow-md animate-bounce">
                {result.rarity}
              </h2>

              <div className="my-8 flex justify-center perspective-1000">
                <ItemIcon rarity={result.rarity} size="xl" className={`transform rotate-y-12 shadow-2xl ${result.rarity === 'UR' ? 'animate-pulse' : ''}`} />
              </div>

              <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">{result.name}</h3>
              <p className="text-white/80 italic mb-8 border-t border-white/20 pt-4">{result.description}</p>

              <div className="text-sm text-white/50 animate-pulse">Tap anywhere to close</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
