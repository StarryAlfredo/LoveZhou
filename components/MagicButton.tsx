import React from 'react';

interface MagicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const MagicButton: React.FC<MagicButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        relative px-12 py-5 rounded-full 
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
        text-white font-bold text-lg tracking-wider uppercase
        shadow-[0_0_20px_rgba(79,70,229,0.5)] 
        transition-all duration-300 ease-out transform
        hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:-translate-y-1
        active:scale-95 active:translate-y-0 active:shadow-inner
        disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
        border border-white/10
        overflow-hidden
        group
        ${className || ''}
      `}
      {...props}
    >
      {/* Glossy overlay */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      
      {/* Content wrapper */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
      
      {/* Hover ripple effect hint */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300 pointer-events-none" />
    </button>
  );
};