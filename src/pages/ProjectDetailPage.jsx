import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { portfolioService } from '../services/dataService';
import SkeletonLoader from '../components/SkeletonLoader';
import { ArrowLeft, Github, Globe, Code } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => portfolioService.getProjectBySlug(slug),
  });

  if (isLoading) return (
    <div className="py-20 max-w-4xl mx-auto px-6 bg-white text-slate-900">
      <SkeletonLoader className="h-8 w-64 mb-8" />
      <SkeletonLoader className="h-96 w-full mb-8" />
      <SkeletonLoader className="h-4 w-full mb-2" />
      <SkeletonLoader className="h-4 w-full mb-2" />
      <SkeletonLoader className="h-4 w-2/3" />
    </div>
  );

  if (error || !project) return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-bold text-slate-900">Project not found</h2>
      <Link to="/portfolio" className="text-blue-600 hover:underline mt-4 inline-block">Back to Portfolio</Link>
    </div>
  );

  return (
    <div className="py-20 max-w-4xl mx-auto px-6 bg-white text-slate-900">
      <Link to="/portfolio" className="inline-flex items-center text-zinc-400 hover:text-zinc-900 transition-colors mb-12 text-xs font-bold uppercase tracking-widest gap-2">
        <ArrowLeft size={14} /> Back to Projects
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 mb-6 uppercase tracking-tight">{project.title}</h1>
        <div className="flex flex-wrap gap-6 text-sm">
          {project.github_link && (
            <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors">
              <Github size={16} /> <span className="font-mono">Source</span>
            </a>
          )}
          {project.live_link && (
            <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors">
              <Globe size={16} /> <span className="font-mono">Live Demo</span>
            </a>
          )}
        </div>
      </header>

      {project.image && (
        <div className="mb-16 rounded-lg overflow-hidden border border-zinc-100 shadow-xl shadow-zinc-200/50">
          <img src={project.image} alt={project.title} className="w-full h-auto object-cover" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <aside className="md:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, idx) => (
                <span key={idx} className="text-[10px] font-bold text-zinc-500 border border-zinc-100 px-2 py-1 rounded lowercase">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <main className="md:col-span-3 prose prose-zinc max-w-none">
          {project.content ? (
            <ReactMarkdown>{project.content}</ReactMarkdown>
          ) : (
            <p className="text-zinc-500 italic">No case study provided for this project yet.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
