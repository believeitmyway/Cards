import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FantasyButton } from '../components/ui/FantasyButton';

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/');
    } else {
      alert('Login failed!');
    }
  };

  const handleRegister = () => {
    if (username && password) {
      if (register(username, password)) {
        navigate('/');
      } else {
        alert('Registration failed (User might exist)');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-[url('https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-black/80 border-2 border-yellow-600 rounded-xl shadow-2xl transform transition-all hover:scale-[1.01]">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Fantasy Gacha
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-yellow-100/80 mb-1">Adventurer Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
              placeholder="Enter your ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-100/80 mb-1">Secret Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <FantasyButton type="submit" className="flex-1 w-full">
              Login
            </FantasyButton>
            <FantasyButton type="button" variant="secondary" onClick={handleRegister} className="flex-1 w-full">
              Register
            </FantasyButton>
          </div>
        </form>
      </div>
    </div>
  );
};
