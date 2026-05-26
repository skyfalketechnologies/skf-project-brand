import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, Briefcase, PenTool, ShoppingBag, Mail, X } from 'lucide-react';

const actions = [
  { id: 'home', title: 'Home', icon: <Home size={16} />, path: '/' },
  { id: 'portfolio', title: 'Portfolio', icon: <Briefcase size={16} />, path: '/portfolio' },
  { id: 'blog', title: 'Writing', icon: <PenTool size={16} />, path: '/blog' },
  { id: 'marketplace', title: 'Marketplace', icon: <ShoppingBag size={16} />, path: '/marketplace' },
  { id: 'contact', title: 'Contact', icon: <Mail size={16} />, path: '/contact' },
];

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const togglePalette = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        togglePalette();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePalette]);

  const filteredActions = actions.filter((action) =>
    action.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (path) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
    } else if (e.key === 'Enter' && filteredActions[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredActions[selectedIndex].path);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="text-slate-400" size={18} />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                className="flex-grow bg-transparent border-none outline-none text-slate-900 text-sm placeholder-slate-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
              />
              <div className="px-1.5 py-0.5 rounded border border-slate-200 text-[10px] text-slate-400 uppercase font-medium">
                Esc
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2">
              {filteredActions.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Navigation
                  </div>
                  {filteredActions.map((action, index) => (
                    <button
                      key={action.id}
                      onClick={() => handleSelect(action.path)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        index === selectedIndex
                          ? 'bg-slate-100 text-slate-900'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className={index === selectedIndex ? 'text-blue-600' : 'text-slate-400'}>
                        {action.icon}
                      </span>
                      {action.title}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <p className="text-sm italic">No results found for "{query}"</p>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-slate-100 flex justify-between items-center">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="px-1 py-0.5 rounded border border-slate-200">↵</span> Select
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="px-1 py-0.5 rounded border border-slate-200">↑↓</span> Navigate
                </div>
              </div>
              <p className="text-[10px] text-slate-300 font-mono italic">
                Uncodixify Palette v1.0
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
