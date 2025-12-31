import React from 'react';
import { Quote } from 'lucide-react';

interface QuoteCardProps {
  content: string | null;
  isLoading: boolean;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ content, isLoading }) => {
  if (!content && !isLoading) {
    return (
        <div className="text-slate-600 italic text-sm animate-pulse">
            Waiting for inspiration...
        </div>
    );
  }

  if (isLoading) {
      return (
          <div className="w-full h-32 flex flex-col items-center justify-center gap-2">
            <div className="w-full max-w-[200px] h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 animate-shimmer w-[50%]" style={{ animation: 'shimmer 1.5s infinite linear' }}></div>
            </div>
          </div>
      )
  }

  return (
    <div className="relative w-full bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 shadow-2xl animate-fade-in-up transform transition-all hover:bg-slate-800/60">
      <Quote className="absolute top-4 left-4 w-8 h-8 text-indigo-500/30 -rotate-12" />
      <div className="relative z-10 text-center">
        <p className="text-xl md:text-2xl font-light leading-relaxed text-slate-100 font-serif">
          "{content}"
        </p>
      </div>
      <Quote className="absolute bottom-4 right-4 w-8 h-8 text-purple-500/30 rotate-12" />
      
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-tr-2xl pointer-events-none" />
    </div>
  );
};