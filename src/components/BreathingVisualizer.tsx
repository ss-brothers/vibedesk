'use client';

import { useState, useEffect } from 'react';
import { ThemeConfig } from '@/config/themes';
import { X, Wind } from 'lucide-react';

interface BreathingProps {
  theme: ThemeConfig;
  onClose: () => void;
}

export default function BreathingVisualizer({ theme, onClose }: BreathingProps) {
  const [phase, setPhase] = useState('Breathe In'); // Inhale, Hold, Exhale
  const [scale, setScale] = useState(1);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setScale(1);
      setPhase('Ready');
      return;
    }

    let currentPhase = 0;
    const phases = [
      { text: 'Breathe In', duration: 4000, endScale: 1.8 },
      { text: 'Hold', duration: 4000, endScale: 1.8 },
      { text: 'Breathe Out', duration: 4000, endScale: 1 },
      { text: 'Hold', duration: 4000, endScale: 1 }
    ];

    let timeout: NodeJS.Timeout;

    const cycle = () => {
      setPhase(phases[currentPhase].text);
      setScale(phases[currentPhase].endScale);
      
      const delay = phases[currentPhase].duration;
      currentPhase = (currentPhase + 1) % phases.length;
      
      timeout = setTimeout(cycle, delay);
    };

    cycle();

    return () => clearTimeout(timeout);
  }, [isActive]);

  return (
    <div 
      className="border p-8 rounded-2xl backdrop-blur-md flex flex-col items-center justify-center relative shadow-2xl h-full"
      style={{ 
        backgroundColor: theme.colors.panelBg, 
        borderColor: `${theme.colors.primary}40`
      }}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
      >
        <X size={18} />
      </button>

      <h2 
        className="absolute top-6 left-6 text-xs tracking-widest uppercase flex items-center gap-2 font-bold z-10"
        style={{ color: theme.colors.primary }}
      >
        <Wind size={14} /> Breathe
      </h2>

      <div 
        className="relative flex items-center justify-center my-12 cursor-pointer"
        style={{ width: '120px', height: '120px' }}
        onClick={() => setIsActive(!isActive)}
      >
        {/* Animated Circle */}
        <div 
          className="absolute rounded-full border-2 transition-transform ease-in-out"
          style={{ 
            width: '100%', 
            height: '100%', 
            transform: `scale(${scale})`,
            borderColor: theme.colors.primary,
            boxShadow: `0 0 30px ${theme.colors.primary}40`,
            opacity: scale > 1 ? 0.3 : 0.8,
            transitionDuration: isActive ? '4000ms' : '500ms'
          }}
        ></div>
        
        {/* Core */}
        <div 
          className="absolute w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-105"
          style={{ 
            backgroundColor: theme.colors.primary,
            boxShadow: `0 0 20px ${theme.colors.primary}60`
          }}
        >
          {!isActive && <span className="text-black text-xs font-bold uppercase tracking-wider">Start</span>}
        </div>
      </div>

      <p 
        className="text-lg tracking-widest uppercase h-6 font-bold"
        style={{ color: theme.colors.primary }}
      >
        {phase}
      </p>
    </div>
  );
}
