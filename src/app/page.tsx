'use client';

import { useState, useEffect } from 'react';
import { ThemeConfig, themes } from '@/config/themes';
import HomeScreen from '@/components/HomeScreen';
import Workspace from '@/components/Workspace';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig | null>(null);

  useEffect(() => {
    setMounted(true);
    // Optionally load last used theme from localStorage
    const savedThemeId = localStorage.getItem('vibeSelectedTheme');
    if (savedThemeId) {
      const found = themes.find(t => t.id === savedThemeId);
      if (found) setCurrentTheme(found);
    }
  }, []);

  const handleSelectTheme = (theme: ThemeConfig) => {
    setCurrentTheme(theme);
    localStorage.setItem('vibeSelectedTheme', theme.id);
  };

  const handleGoHome = () => {
    setCurrentTheme(null);
    localStorage.removeItem('vibeSelectedTheme');
  };

  if (!mounted) return null;

  return (
    <>
      {!currentTheme ? (
        <HomeScreen onSelectTheme={handleSelectTheme} />
      ) : (
        <Workspace theme={currentTheme} onGoHome={handleGoHome} />
      )}
    </>
  );
}
