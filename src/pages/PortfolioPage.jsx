import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { portfolioService } from '../services/dataService';
import ProjectCard from '../components/ProjectCard';
import SkeletonLoader from '../components/SkeletonLoader';

const PortfolioPage = () => {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: portfolioService.getProjects,
  });

  if (error) return <div className="p-12 text-center text-red-500">Error loading projects.</div>;

  return (
    <div className="py-12 max-w-7xl mx-auto px-6 bg-white text-slate-900">
      <header className="mb-12">
        <p className="text-slate-500">Our work</p>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => <SkeletonLoader key={i} className="h-64" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.results?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {(!projects?.results || projects.results.length === 0) && (
            <p className="col-span-full text-center py-20 text-slate-400 italic">No projects found yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
