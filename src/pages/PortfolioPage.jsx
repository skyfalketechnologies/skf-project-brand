import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { portfolioService } from '../services/dataService';
import ProjectCard from '../components/ProjectCard';
import SkeletonLoader from '../components/SkeletonLoader';
import ProjectTrackerView, { SilvoraLogo } from '../components/ProjectTrackerView';
import { Layout, Globe, Shield, Sparkles } from 'lucide-react';

const PortfolioPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('public');

  // GLOBAL SESSION HOOKS
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('silvora_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const handleAuthChange = () => {
      const saved = localStorage.getItem('silvora_user');
      const userObj = saved ? JSON.parse(saved) : null;
      setCurrentUser(userObj);

      // Auto-revert if logged out while viewing tracker
      if (!userObj) {
        setActiveTab('public');
        setSearchParams({ view: 'public' });
      }
    };
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, [setSearchParams]);

  // Check URL query param '?view=tracker' or '?view=internal'
  useEffect(() => {
    const view = searchParams.get('view');
    const saved = localStorage.getItem('silvora_user');

    // Only allow navigating to tracker if authenticated
    if ((view === 'tracker' || view === 'internal') && saved) {
      setActiveTab('internal');
    } else {
      setActiveTab('public');
      // Clean up URL if unauthorized deep link
      if (view === 'tracker' || view === 'internal') {
        setSearchParams({ view: 'public' });
      }
    }
  }, [searchParams, setSearchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ view: tab === 'internal' ? 'tracker' : 'public' });
  };

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: portfolioService.getProjects,
  });

  const projectCount = projects?.results?.length || 0;
  const gridColsClass = projectCount === 1
    ? 'grid-cols-1'
    : projectCount === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  if (error) return <div className="p-12 text-center text-red-500 font-sans">Error loading case studies.</div>;

  return (
    <div className="py-12 max-w-7xl mx-auto px-6 text-slate-900 min-h-screen">

      {/* HEADER SECTION */}
      <header className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
            <SilvoraLogo className="h-5 w-auto" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 font-sans">Silvora Projects Desk</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans text-slate-900">
            Engineered Showcase
          </h1>
        </div>

        {/* MODERN GEOMETRIC TAB SLIDER CONTROLS */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex border border-slate-200/60 shadow-sm relative font-sans">
          <button
            type="button"
            onClick={() => handleTabChange('public')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 relative z-10 ${activeTab === 'public'
                ? 'bg-white text-[#1B3A5C] shadow-md border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            <Globe size={14} />
            Our Work
          </button>

          {currentUser && (
            <button
              type="button"
              onClick={() => handleTabChange('internal')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 relative z-10 ${activeTab === 'internal'
                  ? 'bg-gradient-to-r from-[#1B3A5C] to-[#0f172a] text-[#4ade80] shadow-md border-white/5'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              <Shield size={14} />
              Internal Dev Tracker
            </button>
          )}
        </div>
      </header>

      {/* RENDER ACTIVE VIEW */}
      <div className="transition-all duration-500">
        {activeTab === 'public' ? (
          <div className="space-y-8">

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => <SkeletonLoader key={i} className="h-72" />)}
              </div>
            ) : (
              <div className={`grid ${gridColsClass} gap-8`}>
                {projects?.results?.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
                {(!projects?.results || projects.results.length === 0) && (
                  <div className="col-span-full py-24 text-center bg-white border border-slate-200 rounded-2xl">
                    <p className="text-slate-400 italic font-sans text-xs">No public showcase projects logged in database yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="animate-fadeIn">
            <ProjectTrackerView />
          </div>
        )}
      </div>

    </div>
  );
};

export default PortfolioPage;
