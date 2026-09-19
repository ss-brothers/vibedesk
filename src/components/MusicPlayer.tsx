'use client';

import { useState, useRef, useEffect } from 'react';
import { ThemeConfig } from '@/config/themes';

interface MusicPlayerProps {
  theme: ThemeConfig;
}

export default function MusicPlayer({ theme }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentAudioUrl = theme.audioUrl;

  useEffect(() => {
    // When theme changes, handle audio
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio autoplay prevented:', e));
      }
    }
  }, [currentAudioUrl, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(e => console.log('Audio autoplay prevented:', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      onClick={togglePlay}
      className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full border backdrop-blur-md shadow-lg transition-transform hover:scale-105 active:scale-95"
      style={{ 
        backgroundColor: theme.colors.panelBg, 
        borderColor: `${theme.colors.primary}40`,
        color: theme.colors.primary
      }}
    >
      <div className="flex items-center justify-center">
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        )}
      </div>
      <span className="text-xs font-bold uppercase tracking-widest">{isPlaying ? 'Playing' : 'Play Vibe'}</span>
      <audio ref={audioRef} src={currentAudioUrl} loop />
    </button>
  );
}
