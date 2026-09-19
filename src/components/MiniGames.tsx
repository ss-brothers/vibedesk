'use client';

import { ThemeConfig } from '@/config/themes';

export default function MiniGames({ theme, onClose }: { theme: ThemeConfig, onClose: () => void }) {
  
  // Choose placeholder game info based on theme
  let gameTitle = 'Lofi Tetris';
  let gameDesc = 'A chill puzzle game for your vibe.';
  
  if (theme.id === 'zombie' || theme.id === 'hell') {
    gameTitle = theme.id === 'hell' ? 'Doom Clone' : 'Zombie Survival';
    gameDesc = 'Survive the horde in this retro shooter.';
  } else if (theme.id === 'scifi' || theme.id === 'alien' || theme.id === 'y2k') {
    gameTitle = theme.id === 'y2k' ? 'Cyber Skater 2000' : 'Space Invaders 3000';
    gameDesc = 'Retro futuristic arcade action.';
  } else if (theme.id === 'city' || theme.id === 'gaming') {
    gameTitle = 'Neon Driver';
    gameDesc = 'Endless city driving.';
  } else if (theme.id === 'backrooms' || theme.id === 'liminal') {
    gameTitle = 'Maze Runner';
    gameDesc = 'Find the exit before it finds you.';
  }

  return (
    <div 
      className="flex flex-col h-full rounded-2xl backdrop-blur-md shadow-2xl border overflow-hidden"
      style={{ 
        backgroundColor: theme.colors.panelBg,
        borderColor: `${theme.colors.primary}40`
      }}
    >
      <div className="flex justify-between items-center p-4 border-b" style={{ borderColor: `${theme.colors.primary}40` }}>
        <h2 className="font-bold tracking-widest uppercase text-sm" style={{ color: theme.colors.primary }}>
          Web Gaming
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      
      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        {theme.gameUrl ? (
          <iframe 
            src={theme.gameUrl} 
            className="w-full h-full rounded-xl border-0 shadow-lg"
            title={gameTitle}
            allow="fullscreen; pointer-lock"
          />
        ) : (
          <>
            <div 
              className="w-full aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center mb-6 bg-black/30"
              style={{ borderColor: `${theme.colors.primary}40` }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth="1.5" className="mb-4 opacity-70">
                <rect x="2" y="6" width="20" height="12" rx="2"/>
                <path d="M6 12h4M8 10v4M15 12h.01M18 12h.01"/>
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">{gameTitle}</h3>
              <p className="text-sm text-gray-400 max-w-xs">{gameDesc}</p>
            </div>
            
            <p className="text-xs text-gray-500 max-w-sm">
              (Insert your live iframe or web game URL here before publishing to GitHub)
            </p>
          </>
        )}
      </div>
    </div>
  );
}
