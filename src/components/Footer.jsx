import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-slate-300 py-20 mt-auto border-t border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <svg viewBox="0 0 56 42" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="36" height="8" rx="4" fill="#4ade80" />
              <rect x="2" y="12" width="36" height="8" rx="4" fill="#60a5fa" />
              <rect x="18" y="22" width="36" height="8" rx="4" fill="#4ade80" />
              <rect x="18" y="32" width="36" height="8" rx="4" fill="#60a5fa" />
              <circle cx="48" cy="8" r="2.5" fill="#4ade80" opacity="0.9" />
              <circle cx="8" cy="32" r="2.5" fill="#60a5fa" opacity="0.9" />
            </svg>
            <span className="text-2xl font-bold tracking-tight font-sans">
              <span className="text-white">Silvora</span>
              <span className="text-emerald-400"> Labs</span>
            </span>
          </div>
          <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
            We build robust, reliable, and production-grade web systems designed to scale seamlessly.
          </p>
        </div>

        <div>
          <h3 className="!text-white !font-black uppercase tracking-widest text-sm mb-6">Company</h3>
          <ul className="space-y-4 text-slate-400 text-xs">
            <li><a href="/" className="hover:text-[#60a5fa] transition-colors">Home</a></li>
            <li><a href="/about" className="hover:text-[#60a5fa] transition-colors">About</a></li>
            <li><a href="/services" className="hover:text-[#60a5fa] transition-colors">Services</a></li>
            <li><a href="/blog" className="hover:text-[#60a5fa] transition-colors">Blog</a></li>
            <li><a href="/portfolio" className="hover:text-[#60a5fa] transition-colors">Projects</a></li>
            <li><a href="/marketplace" className="hover:text-[#60a5fa] transition-colors">Market</a></li>
            <li><a href="/pricing" className="hover:text-[#60a5fa] transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h3 className="!text-white !font-black uppercase tracking-widest text-sm mb-6">Industries</h3>
          <ul className="space-y-4 text-slate-400 text-xs">
            <li><a href="/industries/healthcare" className="hover:text-[#60a5fa] transition-colors">Healthcare</a></li>
            <li><a href="/industries/education" className="hover:text-[#60a5fa] transition-colors">Education</a></li>
            <li><a href="/industries/agriculture" className="hover:text-[#60a5fa] transition-colors">Agriculture</a></li>
            <li><a href="/industries/ecommerce" className="hover:text-[#60a5fa] transition-colors">E-Commerce</a></li>
            <li><a href="/industries/finance" className="hover:text-[#60a5fa] transition-colors">Finance</a></li>
          </ul>
        </div>

        <div>
          <h3 className="!text-white !font-black uppercase tracking-widest text-sm mb-6">Connect</h3>
          <ul className="space-y-4 text-slate-400 text-xs">
            <li><a href="https://github.com/S-loo" target="_blank" rel="noopener noreferrer" className="hover:text-[#60a5fa] transition-colors">GitHub</a></li>
            <li><a href="#" className="hover:text-[#60a5fa] transition-colors">LinkedIn</a></li>
            <li><a href="/contact" className="hover:text-[#60a5fa] transition-colors">Contact</a></li>
            <li><a href="/schedule" className="hover:text-[#60a5fa] transition-colors">Schedule Session</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-700/60 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest">
        <p>Copyright © {new Date().getFullYear()} Silvora Labs. All rights reserved.</p>
        <div className="flex gap-6 text-slate-400">
          <Github className="w-4 h-4 cursor-pointer hover:text-emerald-400 transition-colors" />
          <Linkedin className="w-4 h-4 cursor-pointer hover:text-[#60a5fa] transition-colors" />
          <Twitter className="w-4 h-4 cursor-pointer hover:text-emerald-400 transition-colors" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
