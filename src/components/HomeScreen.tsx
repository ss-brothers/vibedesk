'use client';

import { useState, useMemo } from 'react';
import { themes, ThemeConfig } from '@/config/themes';

interface HomeScreenProps {
  onSelectTheme: (theme: ThemeConfig) => void;
}

const ALL_CATEGORIES = [
  'All', 'India', 'Global', 'Nature', 'Calm', 'Creepy', 
  'Cinematic', 'GenZ', 'Aesthetic', 'Daily Life', 'Seasons'
];

export default function HomeScreen({ onSelectTheme }: HomeScreenProps) {
  const [isLightMode, setIsLightMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter themes
  const filteredThemes = useMemo(() => {
    return themes.filter(theme => {
      // Name match
      const matchesSearch = theme.name.toLowerCase().includes(searchQuery.toLowerCase());
      // Category match
      const matchesCategory = activeCategory === 'All' || theme.tags.includes(activeCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-start p-6 md:p-12 transition-colors duration-500 ${isLightMode ? 'bg-[#f8f9fa] text-gray-900' : 'bg-[#050505] text-white'}`}>
      
      {/* Top Controls */}
      <div className="w-full max-w-7xl flex justify-end mb-8">
        <button
          onClick={() => setIsLightMode(!isLightMode)}
          className={`px-4 py-2 rounded-full border text-sm font-bold tracking-widest transition-colors ${
            isLightMode 
              ? 'border-gray-300 bg-white text-black hover:bg-gray-100' 
              : 'border-white/20 bg-white/5 text-white hover:bg-white/10'
          }`}
        >
          {isLightMode ? '☾ DARK MODE' : '☀ LIGHT MODE'}
        </button>
      </div>

      <div className="max-w-7xl w-full">
        <div className="text-center mb-10">
          <h1 className={`text-5xl md:text-6xl font-black tracking-tighter mb-4 ${isLightMode ? 'text-gray-900' : 'text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500'}`}>
            VibeDesk
          </h1>
          <p className={`text-base md:text-lg ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>
            Choose your aesthetic. Find your focus.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          
          <div className="w-full md:w-1/3">
            <input 
              type="text" 
              placeholder="Search aesthetics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-5 py-3 rounded-2xl outline-none border transition-colors ${
                isLightMode 
                  ? 'bg-white border-gray-200 text-black placeholder-gray-400 focus:border-gray-400' 
                  : 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-white/30'
              }`}
            />
          </div>

          <div className="w-full md:w-2/3 flex flex-wrap gap-2 justify-center md:justify-end">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors border ${
                  activeCategory === cat
                    ? (isLightMode ? 'bg-black text-white border-black' : 'bg-white text-black border-white')
                    : (isLightMode ? 'bg-transparent text-gray-600 border-gray-200 hover:border-gray-400' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30')
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Themes Grid */}
        {filteredThemes.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No themes found for "{searchQuery}" in {activeCategory}.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme)}
                className={`group relative h-40 md:h-48 rounded-2xl overflow-hidden text-left transition-transform hover:scale-[1.03] active:scale-95 shadow-xl border ${isLightMode ? 'border-black/5 shadow-black/10' : 'border-white/5 shadow-black/50'}`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${theme.thumbnailUrl})` }}
                />
                
                {/* Always use dark overlay for cards so vibrant colored text pops perfectly */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 p-5 w-full">
                  <h3 
                    className={`text-xl md:text-2xl font-bold tracking-wide ${theme.fontClass}`} 
                    style={{ color: theme.colors.primary, textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
                  >
                    {theme.name}
                  </h3>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {theme.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] uppercase tracking-widest text-white/70 bg-white/10 px-2 py-0.5 rounded-sm backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
