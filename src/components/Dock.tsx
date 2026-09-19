'use client';

import { ThemeConfig } from '@/config/themes';
import { Home, ListTodo, Timer, Wind, Gamepad2 } from 'lucide-react';

interface DockProps {
  theme: ThemeConfig;
  activeWidgets: Record<string, boolean>;
  toggleWidget: (widgetId: string) => void;
  onGoHome: () => void;
}

export default function Dock({ theme, activeWidgets, toggleWidget, onGoHome }: DockProps) {
  const dockItems = [
    { id: 'todo', label: 'Directives', icon: ListTodo },
    { id: 'timer', label: 'Focus Timer', icon: Timer },
    { id: 'breathing', label: 'Breathe', icon: Wind },
    { id: 'gaming', label: 'Play', icon: Gamepad2 }
  ];

  return (
    <div 
      className="flex items-center gap-2 md:gap-6 px-4 py-3 md:px-8 md:py-4 rounded-full border backdrop-blur-xl shadow-2xl shrink-0 min-w-max"
      style={{ 
        backgroundColor: theme.colors.panelBg, 
        borderColor: `${theme.colors.primary}40`
      }}
    >
      <button 
        onClick={onGoHome}
        className="flex flex-col items-center gap-1.5 group w-16 md:w-20"
      >
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/15 transition-colors">
          <Home size={20} className="text-gray-300 group-hover:text-white transition-colors" />
        </div>
        <span className="text-[9px] md:text-xs text-gray-400 uppercase tracking-wider font-semibold">Home</span>
      </button>

      <div className="w-px h-8 bg-gray-600/50 mx-1 md:mx-2"></div>

      {dockItems.map(item => {
        const isActive = activeWidgets[item.id];
        const Icon = item.icon;
        return (
          <button 
            key={item.id}
            onClick={() => toggleWidget(item.id)}
            className="flex flex-col items-center gap-1.5 group w-16 md:w-20 relative"
          >
            {isActive && (
              <div 
                className="absolute -top-1 w-1.5 h-1.5 rounded-full" 
                style={{ backgroundColor: theme.colors.primary, boxShadow: `0 0 10px ${theme.colors.primary}` }}
              />
            )}
            <div 
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white/20 scale-110 shadow-lg' : 'bg-white/5 group-hover:bg-white/15'}`}
              style={{ color: isActive ? theme.colors.primary : '#9ca3af' }}
            >
              <Icon size={20} />
            </div>
            <span 
              className="text-[9px] md:text-xs uppercase tracking-wider font-semibold transition-colors"
              style={{ color: isActive ? '#e5e7eb' : '#9ca3af' }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

