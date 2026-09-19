'use client';

import { useState, useEffect } from 'react';
import { ThemeConfig } from '@/config/themes';

const quotes = [
  "Stay focused, Commander.",
  "The future depends on what you do today.",
  "Optimize your workflow. Optimize your life.",
  "Even in the dark, neon shines bright.",
  "Code is poetry written in logic.",
  "One task at a time.",
  "System efficiency is at 100% when you are focused.",
  "Keep moving forward."
];

export default function Quote({ theme }: { theme: ThemeConfig }) {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuote(quotes[randomIndex]);
  }, []);

  if (!quote) return null;

  return (
    <div 
      className="border p-4 rounded-xl backdrop-blur-sm max-w-sm"
      style={{ 
        backgroundColor: theme.colors.panelBg, 
        borderColor: `${theme.colors.primary}20` 
      }}
    >
      <p className="text-sm italic text-gray-200">&quot;{quote}&quot;</p>
    </div>
  );
}
