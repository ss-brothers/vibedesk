'use client';

import { useState, useEffect } from 'react';
import { ThemeConfig } from '@/config/themes';
import { X, Play, Pause, RotateCcw, Timer } from 'lucide-react';

interface PomodoroTimerProps {
  theme: ThemeConfig;
  onClose: () => void;
}

export default function PomodoroTimer({ theme, onClose }: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div 
      className="border p-6 rounded-2xl backdrop-blur-md flex flex-col items-center relative shadow-2xl h-full justify-center"
      style={{ 
        backgroundColor: theme.colors.panelBg, 
        borderColor: `${theme.colors.primary}40`
      }}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
      >
        <X size={18} />
      </button>

      <h2 
        className="text-xs tracking-widest uppercase mb-2 flex items-center gap-2"
        style={{ color: theme.colors.primary }}
      >
        <Timer size={14} /> Focus Timer
      </h2>
      
      <div 
        className="text-6xl md:text-7xl font-bold tracking-widest my-8"
        style={{ color: '#fff', textShadow: `0 0 20px ${theme.colors.primary}80` }}
      >
        {minutes}:{seconds}
      </div>
      
      <div className="flex gap-3 w-full mt-4">
        <button 
          onClick={toggleTimer}
          className="flex-1 flex items-center justify-center gap-2 border px-4 py-3 rounded-xl text-sm transition-colors uppercase tracking-wider font-bold"
          style={{ 
            borderColor: theme.colors.primary, 
            color: isActive ? '#000' : theme.colors.primary,
            backgroundColor: isActive ? theme.colors.primary : 'transparent'
          }}
        >
          {isActive ? <Pause size={16} /> : <Play size={16} />}
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={resetTimer}
          className="flex-1 flex items-center justify-center gap-2 bg-black/40 border border-gray-600 text-gray-300 px-4 py-3 rounded-xl text-sm hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-colors uppercase tracking-wider"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}
