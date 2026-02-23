import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FantasyButton } from '../components/ui/FantasyButton';

export const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) return <div className="min-h-screen flex items-center justify-center text-white text-2xl animate-pulse">Summoning Adventurer...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden font-serif">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 animate-pulse"></div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 bg-gradient-to-b from-black/90 to-transparent border-b border-yellow-600/30 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center font-bold text-black text-xl">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-yellow-100 drop-shadow-md">{user.username}</h2>
            <p className="text-yellow-400 text-sm font-mono tracking-wider flex items-center gap-1">
              <span className="text-lg">💰</span> {user.gold.toLocaleString()} G
            </p>
          </div>
        </div>
        <FantasyButton onClick={logout} variant="danger" className="text-sm px-4 py-2">
          Retire
        </FantasyButton>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto p-8 space-y-12">
        {/* Gacha Selection */}
        <section>
          <h3 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-sm filter">
            ✨ Choose Your Destiny ✨
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <Link to="/gacha/weapon" className="group transform transition-all hover:-translate-y-2">
              <div className="relative h-80 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border-2 border-gray-700 hover:border-blue-500 shadow-xl hover:shadow-blue-500/30">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595590424283-b8f17842773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h4 className="text-2xl font-bold text-blue-300 mb-2">Weapon Gacha</h4>
                  <p className="text-gray-300 text-sm mb-4">Summon legendary blades and firearms.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold">100 G</span>
                    <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Summon</span>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/gacha/material" className="group transform transition-all hover:-translate-y-2">
              <div className="relative h-80 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border-2 border-gray-700 hover:border-green-500 shadow-xl hover:shadow-green-500/30">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615800098779-1be8287d6b34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h4 className="text-2xl font-bold text-green-300 mb-2">Material Gacha</h4>
                  <p className="text-gray-300 text-sm mb-4">Gather rare resources for crafting.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold">100 G</span>
                    <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Summon</span>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/gacha/gold" className="group transform transition-all hover:-translate-y-2">
              <div className="relative h-80 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border-2 border-gray-700 hover:border-yellow-500 shadow-xl hover:shadow-yellow-500/30">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1610375461246-83df859cd871?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h4 className="text-2xl font-bold text-yellow-300 mb-2">Treasure Gacha</h4>
                  <p className="text-gray-300 text-sm mb-4">Discover ancient relics and riches.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold">100 G</span>
                    <span className="bg-yellow-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-black">Summon</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* History */}
        <section className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-inner">
          <h3 className="text-xl font-bold text-gray-300 mb-4 border-b border-gray-600 pb-2">📜 Summoning History</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {user.history.length === 0 ? (
              <p className="text-gray-500 text-center py-8 italic">No summoning records found...</p>
            ) : (
              user.history.slice().reverse().map((record, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors border border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md min-w-[3rem] text-center ${
                      record.item.rarity === 'UR' ? 'bg-yellow-500 text-black' :
                      record.item.rarity === 'SSR' ? 'bg-red-600 text-white' :
                      record.item.rarity === 'SR' ? 'bg-purple-600 text-white' :
                      record.item.rarity === 'R' ? 'bg-blue-600 text-white' :
                      'bg-gray-600 text-gray-300'
                    }`}>
                      {record.item.rarity}
                    </span>
                    <span className="font-medium text-gray-200">{record.item.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">
                    {new Date(record.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
