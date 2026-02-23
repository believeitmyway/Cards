import React from 'react';

interface FantasyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export const FantasyButton: React.FC<FantasyButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyle = "relative px-8 py-3 font-bold text-white rounded-lg shadow-lg transform transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 border-2 border-blue-400 shadow-blue-500/50",
    secondary: "bg-gradient-to-r from-purple-600 to-pink-700 hover:from-purple-500 hover:to-pink-600 border-2 border-purple-400 shadow-purple-500/50",
    danger: "bg-gradient-to-r from-red-600 to-orange-700 hover:from-red-500 hover:to-orange-600 border-2 border-red-400 shadow-red-500/50",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      <span className="absolute inset-0 w-full h-full bg-white opacity-10 rounded-lg animate-pulse"></span>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
