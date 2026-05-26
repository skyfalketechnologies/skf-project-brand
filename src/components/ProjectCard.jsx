import React from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';
import { getImageUrl } from '../utils/helpers';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col h-full hover:border-slate-300 transition-colors">
      <div className="aspect-video bg-slate-100 overflow-hidden border-b border-slate-100">
        {project.image ? (
          <img 
            src={getImageUrl(project.image)} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            No Image
          </div>
        )}
      </div>
      
      <div className="p-5 flex-grow">
        <h3 className="text-base font-semibold text-slate-900 mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies?.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded border border-slate-200/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 pb-5 mt-auto flex gap-4 border-t border-slate-50 pt-4">
        {project.github_link && (
          <a 
            href={project.github_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-900 transition-colors"
          >
            <Github size={16} />
          </a>
        )}
        {project.live_link && (
          <a 
            href={project.live_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-900 transition-colors"
          >
            <ExternalLink size={16} />
          </a>
        )}
        <Link 
          to={`/portfolio/${project.id}`} 
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 ml-auto flex items-center gap-1"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
