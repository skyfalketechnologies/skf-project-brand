import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  const LIMIT = 160;
  const rawText = post.meta_description || post.content || '';
  const isLong = rawText.length > LIMIT;
  const displayText = expanded
    ? rawText
    : rawText.substring(0, LIMIT) + (isLong ? '...' : '');

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="group">
      <div className="flex flex-col md:flex-row gap-6 md:gap-12">

        {/* Left date column */}
        <div className="md:w-32 flex-shrink-0 pt-1">
          <time className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
            {formattedDate}
          </time>
          {post.read_time && (
            <span className="text-[10px] font-mono text-zinc-300 italic">
              {post.read_time} min read
            </span>
          )}
        </div>

        {/* Right content column */}
        <div className="flex-grow">

          {/* Cover image */}
          {post.image && (
            <Link to={`/blog/${post.slug}`}>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-90 transition-opacity"
              />
            </Link>
          )}

          {/* Title */}
          <Link to={`/blog/${post.slug}`} className="block group mb-3">
            <h2 className="text-xl font-bold text-zinc-900 group-hover:text-amber-600 transition-colors">
              {post.title}
            </h2>
          </Link>

          {/* Content preview with read more */}
          <p className="text-sm text-zinc-500 leading-relaxed mb-2 italic">
            {displayText}
          </p>

          {/* Read More / Show Less button */}
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[11px] font-bold text-amber-600 uppercase tracking-widest hover:underline mb-4 block"
            >
              {expanded ? 'Show Less ↑' : 'Read More →'}
            </button>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags?.map(tag => (
              <span
                key={tag.id}
                className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] border border-zinc-100 px-1.5 py-0.5 rounded"
              >
                {tag.name}
              </span>
            ))}
          </div>

        </div>
      </div>
    </article>
  );
};

export default BlogCard;
