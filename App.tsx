import React, { useState, useCallback } from 'react';
import { MagicButton } from './components/MagicButton';
import { QuoteCard } from './components/QuoteCard';
import { generateInspiration } from './services/geminiService';
import { Sparkles, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateInspiration();
      setContent(result);
    } catch (err) {
      console.error(err);
      setError("The magic faded momentarily. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-900 text-white selection:bg-purple-500 selection:text-white">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <header className="mb-12 text-center z-10">
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-xl">
            <Sparkles className="w-6 h-6 text-amber-400 mr-2" />
            <h1 className="text-xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-400">
                Daily Inspiration
            </h1>
        </div>
        <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base font-light">
          Tap the button below to summon a burst of wisdom powered by Gemini AI.
        </p>
      </header>

      <main className="flex flex-col items-center w-full max-w-lg gap-8 z-10">
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <MagicButton onClick={handleButtonClick} disabled={isLoading}>
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin w-5 h-5" />
                        Summoning...
                    </span>
                ) : (
                    "Inspire Me"
                )}
            </MagicButton>
        </div>

        <div className="w-full min-h-[200px] flex items-center justify-center transition-all duration-500 ease-in-out">
            {error && (
                <div className="text-red-400 bg-red-900/20 px-6 py-4 rounded-xl border border-red-500/30 text-center animate-fade-in">
                    {error}
                </div>
            )}
            {!error && (
                <QuoteCard content={content} isLoading={isLoading} />
            )}
        </div>
      </main>

      <footer className="absolute bottom-6 text-slate-600 text-xs">
        Powered by Google Gemini 3 Flash
      </footer>
    </div>
  );
};

export default App;