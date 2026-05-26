import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { blogService } from '../services/dataService';
import SkeletonLoader from '../components/SkeletonLoader';
import SearchBar from '../components/SearchBar';
import { Mail, ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';
import { getImageUrl } from '../utils/helpers';

const BlogPage = () => {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedStatus, setSubscribedStatus] = useState(false);

  // Fetch Tags
  const { data: tagsData } = useQuery({
    queryKey: ['blog-tags'],
    queryFn: blogService.getTags,
  });

  // Fetch Blog Posts with tag and search params
  const { data: postsData, isLoading, error } = useQuery({
    queryKey: ['blog-posts', search, selectedTag],
    queryFn: () => blogService.getPosts({
      search,
      tags__slug: selectedTag || undefined
    }),
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribedStatus(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribedStatus(false), 5000);
    }
  };

  const results = postsData?.results || [];
  const featuredPost = results.length > 0 ? results[0] : null;
  const regularPosts = results.length > 1 ? results.slice(1) : [];

  if (error) return <div className="p-12 text-center text-red-500">Error loading insights.</div>;

  return (
    <div className="py-20 max-w-7xl mx-auto px-6 font-sans bg-white text-slate-900">
      {/* Hero Header */}
      <div className="mb-20">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-[2px] bg-[#06b6d4]"></div>
          <span className="text-[#06b6d4] font-bold uppercase tracking-[0.2em] text-[10px]">Knowledge & Updates</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
          Insights
        </h1>
        <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
          Analysis and practical guidance on digital growth, cloud modernization, AI strategy, and business transformation.
        </p>
      </div>

      {/* Newsletter Block */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 mb-20 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
        <div className="max-w-md">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-3">
            Get executive briefs in your inbox
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            One practical update every week on AI, cloud, and digital growth. No noise.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          {subscribedStatus ? (
            <div className="text-[#00dfa2] text-xs font-bold bg-[#00dfa2]/10 border border-[#00dfa2]/20 rounded-full px-6 py-4">
              Successfully subscribed! Welcome to Silvora Labs briefs.
            </div>
          ) : (
            <>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full sm:w-64 bg-slate-50 border border-slate-200 focus:border-[#06b6d4]/80 rounded-full py-3.5 pl-12 pr-6 text-xs text-slate-900 outline-none transition-all placeholder-slate-400"
                />
              </div>
              <button
                type="submit"
                className="bg-[#06b6d4] hover:bg-cyan-400 text-slate-900 font-bold text-xs py-3.5 px-8 rounded-full transition-all shadow-md shadow-cyan-500/10 hover:shadow-cyan-400/20 flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </form>
      </div>

      {/* Navigation Filter / Search */}
      <div className="border-b border-slate-200 pb-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag('')}
            className={`text-xs px-4 py-2 rounded-full transition-all font-medium border ${selectedTag === ''
                ? 'bg-slate-900 text-white border-slate-900'
                : 'border-slate-200 text-slate-600 hover:border-slate-400'
              }`}
          >
            All
          </button>

          {tagsData?.results?.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.slug)}
              className={`text-xs px-4 py-2 rounded-full transition-all font-medium border ${selectedTag === tag.slug
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'border-slate-200 text-slate-600 hover:border-slate-400'
                }`}
            >
              {tag.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full md:w-64">
          <SearchBar onSearch={setSearch} placeholder="Search insights..." />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col gap-4">
              <SkeletonLoader className="h-48 w-full rounded-2xl" />
              <SkeletonLoader className="h-4 w-1/4" />
              <SkeletonLoader className="h-6 w-3/4" />
              <SkeletonLoader className="h-20 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {results.length === 0 ? (
            <p className="text-center py-20 text-slate-500 italic">
              No insights found. Try another tag or search query.
            </p>
          ) : (
            <div className={`grid grid-cols-1 ${results.length === 1
                ? 'max-w-2xl mx-auto'
                : results.length === 2
                  ? 'md:grid-cols-2 max-w-5xl mx-auto'
                  : 'md:grid-cols-2 lg:grid-cols-3'
              } gap-8`}>
              {results.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border border-slate-200 p-8 rounded-3xl transition-all hover:border-[#06b6d4]/40 hover:-translate-y-1 duration-300 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    {post.cover_image && (
                      <div className="w-full h-48 overflow-hidden rounded-2xl border border-slate-200/60 mb-6">
                        <img
                          src={getImageUrl(post.cover_image)}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="text-[10px] font-bold text-[#06b6d4] uppercase tracking-wider">
                        {post.tags && post.tags.length > 0 ? post.tags[0].name : "Insight"}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> {post.read_time} min read
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-4 hover:text-[#06b6d4] transition-colors leading-snug">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mb-6 line-clamp-3">
                      {post.meta_description}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Mar 2026</span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs font-bold text-[#06b6d4] hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                    >
                      Read
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogPage;
