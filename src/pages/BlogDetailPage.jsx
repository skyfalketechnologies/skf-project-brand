import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { blogService } from '../services/dataService';
import SkeletonLoader from '../components/SkeletonLoader';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { getImageUrl } from '../utils/helpers';

const BlogDetailPage = () => {
  const { slug } = useParams();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => blogService.getPost(slug),
  });

  if (isLoading) {
    return (
      <div className="py-20 max-w-3xl mx-auto px-6 space-y-6">
        <SkeletonLoader className="h-6 w-24" />
        <SkeletonLoader className="h-12 w-full" />
        <SkeletonLoader className="h-4 w-1/3" />
        <SkeletonLoader className="h-80 w-full" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="py-20 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error loading insight</h2>
        <p className="text-slate-400 mb-8">The insight could not be found or there was an error fetching it.</p>
        <Link to="/blog" className="text-[#06b6d4] hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <article className="py-20 max-w-3xl mx-auto px-6 font-sans bg-white text-slate-900">
      {/* Back Button */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#06b6d4] transition-colors mb-12 uppercase tracking-widest"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Insights
      </Link>

      {/* Tags / Categories */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-[10px] font-bold text-[#06b6d4] uppercase tracking-wider bg-[#06b6d4]/5 border border-[#06b6d4]/10 rounded-full px-3.5 py-1.5"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Heading Title */}
      <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-8">
        {post.title}
      </h1>

      {/* Meta Dates/Read Time */}
      <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium border-b border-slate-200 pb-8 mb-12">
        <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> March 2026</span>
        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /> {post.read_time} min read</span>
        <span className="flex items-center gap-2"><Tag className="w-4 h-4 text-slate-400" /> Published</span>
      </div>

      {/* Cover Image Banner */}
      {post.cover_image && (
        <div className="w-full h-64 md:h-[400px] overflow-hidden rounded-3xl border border-slate-200/60 mb-12 shadow-sm">
          <img
            src={getImageUrl(post.cover_image)}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content Rendering */}
      <div className="prose prose-slate max-w-none text-sm md:text-base leading-relaxed text-slate-700 space-y-6">
        {post.content.split('\n\n').map((paragraph, index) => {
          // Render Headings
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={index} className="text-xl font-bold text-slate-900 mt-10 mb-4">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={index} className="text-2xl font-bold text-slate-900 mt-12 mb-6 border-b border-slate-100 pb-2">
                {paragraph.replace('## ', '')}
              </h2>
            );
          }

          // Render bullet list
          if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
            return (
              <ul key={index} className="list-disc pl-6 space-y-2 my-6">
                {paragraph.split('\n').map((li, idx) => (
                  <li key={idx} className="text-slate-600">
                    {li.replace(/^[\-\*]\s+/, '')}
                  </li>
                ))}
              </ul>
            );
          }

          // Render numbered list
          if (/^\d+\.\s/.test(paragraph)) {
            return (
              <ol key={index} className="list-decimal pl-6 space-y-2 my-6">
                {paragraph.split('\n').map((li, idx) => (
                  <li key={idx} className="text-slate-600">
                    {li.replace(/^\d+\.\s+/, '')}
                  </li>
                ))}
              </ol>
            );
          }

          // Regular paragraph
          return (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Strategy Consultation Prompt */}
      <div className="mt-20 bg-gradient-to-r from-[#06b6d4]/10 to-blue-600/10 border border-[#06b6d4]/20 rounded-3xl p-8 md:p-12 text-center">
        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
          Looking to implement secure, custom software?
        </h3>
        <p className="text-xs text-slate-500 mb-6 max-w-md mx-auto">
          Partner with our team for high-availability systems engineering, data isolation, and scalable web solutions.
        </p>
        <Link
          to="/schedule"
          className="inline-block bg-[#06b6d4] hover:bg-cyan-400 text-slate-900 font-bold text-xs py-3.5 px-8 rounded-full transition-all shadow-md shadow-cyan-500/10"
        >
          Book Consultation
        </Link>
      </div>
    </article>
  );
};

export default BlogDetailPage;
