'use client';

import { useState, useEffect } from 'react';
import { ThemeConfig } from '@/config/themes';
import { X, Check, Plus, Trash2, ListTodo } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  theme: ThemeConfig;
  onClose: () => void;
}

export default function TodoList({ theme, onClose }: TodoListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('vibeTasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse tasks', e);
      }
    } else {
      setTasks([
        { id: '1', text: 'Initialize main thrusters', completed: false },
        { id: '2', text: 'Review mission logs', completed: false }
      ]);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('vibeTasks', JSON.stringify(tasks));
    }
  }, [tasks, mounted]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      text: newTask.trim(),
      completed: false
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  if (!mounted) return null;

  return (
    <div 
      className="border p-6 rounded-2xl backdrop-blur-md h-full flex flex-col shadow-2xl relative"
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
        className="text-sm tracking-widest uppercase mb-6 flex items-center gap-2 font-bold"
        style={{ color: theme.colors.primary }}
      >
        <ListTodo size={16} />
        Directives
      </h2>
      
      <div className="flex-1 overflow-y-auto mb-4 pr-2 custom-scrollbar">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-sm italic opacity-50 flex items-center justify-center h-full">All directives completed.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map(task => (
              <li 
                key={task.id} 
                className={`flex items-start gap-3 p-3 rounded-lg transition-all ${task.completed ? 'opacity-50' : 'bg-black/20'} hover:bg-white/10`}
              >
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-colors shrink-0`}
                  style={{ 
                    border: `1px solid ${theme.colors.primary}`,
                    backgroundColor: task.completed ? theme.colors.primary : 'transparent'
                  }}
                >
                  {task.completed && <Check size={14} className="text-black" />}
                </button>
                <span className={`flex-1 text-sm pt-0.5 ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                  {task.text}
                </span>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-500 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-colors"
                  title="Delete Task"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={addTask} className="mt-auto flex gap-2">
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New directive..."
          className="flex-1 bg-black/40 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 transition-all"
          style={{ borderColor: `${theme.colors.primary}40`, '--tw-ring-color': theme.colors.primary } as any}
        />
        <button 
          type="submit"
          disabled={!newTask.trim()}
          className="px-4 py-3 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: theme.colors.primary, color: '#000' }}
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      </form>
    </div>
  );
}
