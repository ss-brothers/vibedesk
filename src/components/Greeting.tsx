'use client';

import { useState, useEffect } from 'react';
import { ThemeConfig } from '@/config/themes';

export default function Greeting({ theme }: { theme: ThemeConfig }) {
  const [greeting, setGreeting] = useState(theme.greetingPrefix);

  useEffect(() => {
    const lastVisited = localStorage.getItem('lastVisited');
    const tasksStr = localStorage.getItem('vibeTasks');
    let pendingTasks = [];
    
    if (tasksStr) {
      try {
        const tasks = JSON.parse(tasksStr);
        pendingTasks = tasks.filter((t: any) => !t.completed);
      } catch (e) {}
    }

    if (lastVisited) {
      const timeDiff = Date.now() - parseInt(lastVisited);
      const hoursDiff = timeDiff / (1000 * 60 * 60);

      if (hoursDiff > 2 && pendingTasks.length > 0) {
        setGreeting(`${theme.greetingPrefix} Is '${pendingTasks[0].text}' ready?`);
      } else {
        setGreeting(theme.greetingPrefix);
      }
    }

    const updateVisited = () => {
      localStorage.setItem('lastVisited', Date.now().toString());
    };
    
    window.addEventListener('beforeunload', updateVisited);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        updateVisited();
      }
    });

    return () => {
      window.removeEventListener('beforeunload', updateVisited);
      updateVisited();
    };
  }, [theme]);

  return (
    <div className="flex flex-col gap-1 drop-shadow-xl">
      <h1 
        className={`text-4xl md:text-5xl font-bold tracking-tighter ${theme.animationClass || ''}`}
        style={{ 
          color: '#fff',
          textShadow: `0 0 20px ${theme.colors.primary}`
        }}
      >
        VibeDesk
      </h1>
      <p 
        className="text-sm md:text-base font-medium opacity-90 mt-2"
        style={{ color: theme.colors.primary }}
      >
        {greeting}
      </p>
    </div>
  );
}
