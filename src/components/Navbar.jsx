import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Projects', path: '/portfolio' },
    { name: 'Market', path: '/marketplace' },
  ];

  const industries = [
    { name: 'Healthcare', path: '/industries/healthcare' },
    { name: 'Education', path: '/industries/education' },
    { name: 'Agriculture', path: '/industries/agriculture' },
    { name: 'E-Commerce', path: '/industries/ecommerce' },
    { name: 'Finance', path: '/industries/finance' },
  ];

  const moreLinks = [
    { name: 'Pricing', path: '/pricing' },
    { name: 'Partners', path: '/partners' },
    { name: 'Team', path: '/team' },
    { name: 'Testimonials', path: '/testimonials' },
  ];

  const handleMobileLinkClick = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const linkClass = (path) =>
    `text-sm font-medium transition-colors ${
      isActive(path) ? 'text-emerald-300' : 'text-slate-200 hover:text-white'
    }`;

  return (
    <nav className="bg-gradient-to-r from-[#14532d] via-[#166534] to-[#0f172a] border-b border-emerald-800/40 text-white h-20 w-full flex items-center sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <svg viewBox="0 0 56 42" className="h-8 w-auto transform transition-transform group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="36" height="8" rx="4" fill="#4ade80" />
            <rect x="2" y="12" width="36" height="8" rx="4" fill="#60a5fa" />
            <rect x="18" y="22" width="36" height="8" rx="4" fill="#4ade80" />
            <rect x="18" y="32" width="36" height="8" rx="4" fill="#60a5fa" />
            <circle cx="48" cy="8" r="2.5" fill="#4ade80" opacity="0.9" />
            <circle cx="8" cy="32" r="2.5" fill="#60a5fa" opacity="0.9" />
          </svg>
          <span className="text-2xl font-bold tracking-tight font-sans">
            <span className="text-white">Silvora</span>
            <span className="text-emerald-300"> Labs</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={linkClass(link.path)}>
              {link.name}
            </Link>
          ))}

          <div className="relative group py-2">
            <button type="button" className="flex items-center gap-1 text-sm font-medium text-slate-200 hover:text-white transition-colors focus:outline-none">
              Industries
              <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 bg-[#0f172a] border border-emerald-800/50 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {industries.map((ind) => (
                <Link
                  key={ind.name}
                  to={ind.path}
                  className="block px-4 py-2.5 text-xs text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/50 transition-colors"
                >
                  {ind.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative group py-2">
            <button type="button" className="flex items-center gap-1 text-sm font-medium text-slate-200 hover:text-white transition-colors focus:outline-none">
              More
              <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 bg-[#0f172a] border border-emerald-800/50 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {moreLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-2.5 text-xs text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/50 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/contact"
            className="bg-[#1565C0] hover:bg-[#1976D2] text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-blue-900/30"
          >
            Reach Out
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-200 hover:text-white focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#0f172a] border-t border-emerald-800/40 md:hidden max-h-[calc(100vh-5rem)] overflow-y-auto z-50 shadow-xl">
          <div className="px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={handleMobileLinkClick}
                className={`text-lg font-medium ${isActive(link.path) ? 'text-emerald-300' : 'text-slate-200'}`}
              >
                {link.name}
              </Link>
            ))}

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'industries' ? null : 'industries')}
                className="flex items-center justify-between w-full text-lg font-medium text-slate-200 focus:outline-none"
              >
                <span>Industries</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === 'industries' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'industries' && (
                <div className="pl-4 space-y-3 pt-1">
                  {industries.map((ind) => (
                    <Link key={ind.name} to={ind.path} onClick={handleMobileLinkClick} className="block text-base text-slate-400 hover:text-emerald-300">
                      {ind.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'more' ? null : 'more')}
                className="flex items-center justify-between w-full text-lg font-medium text-slate-200 focus:outline-none"
              >
                <span>More</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === 'more' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'more' && (
                <div className="pl-4 space-y-3 pt-1">
                  {moreLinks.map((item) => (
                    <Link key={item.name} to={item.path} onClick={handleMobileLinkClick} className="block text-base text-slate-400 hover:text-emerald-300">
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contact"
              onClick={handleMobileLinkClick}
              className="bg-[#1565C0] text-white px-6 py-3 rounded-full text-center font-bold"
            >
              Reach Out
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
