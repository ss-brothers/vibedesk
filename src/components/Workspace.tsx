'use client';

import { useState } from 'react';
import { ThemeConfig, BackgroundType } from '@/config/themes';
import Greeting from '@/components/Greeting';
import MusicPlayer from '@/components/MusicPlayer';
import Dock from '@/components/Dock';
import TodoList from '@/components/TodoList';
import PomodoroTimer from '@/components/PomodoroTimer';
import BreathingVisualizer from '@/components/BreathingVisualizer';
import MiniGames from '@/components/MiniGames';
import Quote from '@/components/Quote';
import Watermark from '@/components/Watermark';
import { Monitor, Image as ImageIcon, PaintBucket } from 'lucide-react';

interface WorkspaceProps {
  theme: ThemeConfig;
  onGoHome: () => void;
}

export default function Workspace({ theme, onGoHome }: WorkspaceProps) {
  const [activeWidgets, setActiveWidgets] = useState<Record<string, boolean>>({
    todo: false,
    timer: false,
    breathing: false,
    gaming: false
  });
  
  const [bgType, setBgType] = useState<BackgroundType>(theme.defaultType);

  const toggleWidget = (id: string) => {
    setActiveWidgets(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className={`min-h-[100dvh] w-full overflow-x-hidden overflow-y-auto relative ${theme.fontClass}`}>
      {/* Background Layer */}
      {bgType === 'video' ? (
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="fixed inset-0 w-full h-full object-cover z-0"
          src={theme.videoUrl}
        />
      ) : bgType === 'gradient' ? (
        <div 
          className="fixed inset-0 w-full h-full z-0"
          style={{ background: theme.gradient }}
        />
      ) : (
        <div 
          className="fixed inset-0 w-full h-full bg-cover bg-center z-0 transition-transform duration-10000"
          style={{ backgroundImage: `url(${theme.imageUrl})` }}
        />
      )}
      
      {/* Overlay to ensure text readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>
      
      {/* Theme specific overlays */}
      {theme.id === 'scifi' && (
        <div className="pointer-events-none fixed inset-0 z-10 opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"></div>
      )}

      {/* Main UI Layer */}
      <div className="relative z-20 w-full min-h-[100dvh] flex flex-col justify-between p-4 md:p-8">
        
        {/* Top Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
          <div className="flex flex-col gap-3">
            <Greeting theme={theme} />
            
            {/* Background Toggle Controls */}
            <div className="flex gap-2 bg-black/40 p-1.5 rounded-lg backdrop-blur-md border overflow-x-auto w-full md:w-auto" style={{ borderColor: `${theme.colors.primary}40` }}>
              <button 
                onClick={() => setBgType('image')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${bgType === 'image' ? 'bg-white/20 font-bold' : 'hover:bg-white/10'}`}
                style={{ color: bgType === 'image' ? theme.colors.primary : '#9ca3af' }}
              >
                <ImageIcon size={14} /> 
                <span className="text-[10px] md:text-xs uppercase tracking-wider">Image</span>
              </button>
              <button 
                onClick={() => setBgType('video')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${bgType === 'video' ? 'bg-white/20 font-bold' : 'hover:bg-white/10'}`}
                style={{ color: bgType === 'video' ? theme.colors.primary : '#9ca3af' }}
              >
                <Monitor size={14} />
                <span className="text-[10px] md:text-xs uppercase tracking-wider">Motion</span>
              </button>
              <button 
                onClick={() => setBgType('gradient')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${bgType === 'gradient' ? 'bg-white/20 font-bold' : 'hover:bg-white/10'}`}
                style={{ color: bgType === 'gradient' ? theme.colors.primary : '#9ca3af' }}
              >
                <PaintBucket size={14} />
                <span className="text-[10px] md:text-xs uppercase tracking-wider">Color</span>
              </button>
            </div>
          </div>
          
          <MusicPlayer theme={theme} />
        </header>

        {/* Floating Workspace Area */}
        <div className="flex-1 w-full mt-6 flex flex-wrap gap-6 justify-center items-start relative z-10 pb-32">
          
          {activeWidgets.todo && (
            <div className="w-full sm:w-96 h-[400px] xl:h-[500px]">
              <TodoList theme={theme} onClose={() => toggleWidget('todo')} />
            </div>
          )}
          
          {activeWidgets.breathing && (
            <div className="w-full sm:w-80">
              <BreathingVisualizer theme={theme} onClose={() => toggleWidget('breathing')} />
            </div>
          )}

          {activeWidgets.timer && (
            <div className="w-full sm:w-80">
              <PomodoroTimer theme={theme} onClose={() => toggleWidget('timer')} />
            </div>
          )}

          {activeWidgets.gaming && (
            <div className="w-full sm:w-[450px] h-[350px]">
              <MiniGames theme={theme} onClose={() => toggleWidget('gaming')} />
            </div>
          )}

          {/* Persistent Quote */}
          <div className="w-full xl:w-auto xl:absolute xl:right-0 xl:bottom-0 flex justify-center xl:justify-end mt-4 xl:mt-auto pointer-events-none">
            <Quote theme={theme} />
          </div>
        </div>

        {/* Fixed Bottom Footer / Dock */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto overflow-x-auto custom-scrollbar flex justify-center">
          <Dock 
            theme={theme} 
            activeWidgets={activeWidgets} 
            toggleWidget={toggleWidget}
            onGoHome={onGoHome}
          />
        </div>
        
        <div className="fixed right-4 bottom-20 md:bottom-4 z-40 pointer-events-none">
          <Watermark theme={theme} />
        </div>
      </div>
      
      {/* Custom Theme Styles (Scrollbar and Cursor) */}
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --theme-primary: ${theme.colors.primary};
        }
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.5);
        }
        ::-webkit-scrollbar-thumb {
          background: ${theme.colors.primary};
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${theme.colors.primary}cc;
        }
        /* Custom Cursor */
        body {
          cursor: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="${encodeURIComponent(theme.colors.primary)}" xmlns="http://www.w3.org/2000/svg"><path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2 1-3.2-7.4-4.4 4.5z" stroke="white" stroke-width="1"/></svg>'), auto !important;
        }
      `}} />
    </main>
  );
}
