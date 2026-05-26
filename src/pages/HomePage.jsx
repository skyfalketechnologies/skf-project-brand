import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { blogService } from '../services/dataService';
import { Code, Layout, Database, BookOpen, Clock } from 'lucide-react';
import heroBg from '../assets/teleworker-working-from-home-typing-laptop-keyboard-close-up.jpg';
import SkeletonLoader from '../components/SkeletonLoader';
import { getImageUrl } from '../utils/helpers';

const HomePage = () => {
  // Fetch latest 3 blog posts
  const { data: postsData, isLoading } = useQuery({
    queryKey: ['latest-blog-posts'],
    queryFn: () => blogService.getPosts(),
  });

  const latestPosts = postsData?.results?.slice(0, 3) || [];

  return (
    <div className="w-full bg-white min-h-screen font-sans text-slate-900">
      {/* Hero Section */}
      <section
        className="text-slate-900 py-32 relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark Navy / Deep Slate immersive overlay */}
        <div className="absolute inset-0 bg-white/85"></div>

        {/* Glow effect matching Ardena tech-glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block px-4 py-1 rounded-full border border-cyan-600/30 text-cyan-700 text-[10px] font-bold uppercase tracking-widest mb-8 bg-cyan-50">
            Enterprise Systems & Web Engineering
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight tracking-tight">
            Building robust systems that <br />
            <span className="text-[#06b6d4] drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">power the modern web</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Secure, scalable, and high-availability solutions. We design and build enterprise-grade <br />
            web systems with rock-solid security, data isolation, and optimized pipelines.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/portfolio" className="bg-[#06b6d4] hover:bg-cyan-400 text-[#090d16] px-10 py-4 rounded-full font-bold transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30">
              View Systems
            </Link>
            <Link to="/blog" className="border border-cyan-600 hover:bg-cyan-50 text-slate-800 px-10 py-4 rounded-full font-bold transition-all">
              Read Insights
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          <StatItem value="100%" label="On-Time Delivery" />
          <StatItem value="99.9%" label="System Uptime Guarantee" />
          <StatItem value="Zero" label="Critical Vulnerabilities" />
        </div>
      </section>

      {/* Skills Section (Light Zone - Slate White Background) */}
      <section className="py-24 bg-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-[2px] bg-[#06b6d4]"></div>
              <span className="text-[#06b6d4] font-bold uppercase tracking-[0.2em] text-[10px]">What We Do</span>
            </div>
            <h2 className="text-4xl font-serif font-bold text-slate-900">Capabilities & services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkillCard
              icon={<Code className="text-[#06b6d4]" />}
              title="Scalable Backend Architecture"
              description="High-availability API engines featuring secure multi-tenant data isolation, role-based access controls, and performant transaction pipelines."
            />
            <SkillCard
              icon={<Layout className="text-[#06b6d4]" />}
              title="Interactive Interfaces"
              description="Seamless, lightning-fast client-side interfaces crafted with micro-animations and clean user journeys to maximize retention."
            />
            <SkillCard
              icon={<Database className="text-[#06b6d4]" />}
              title="Data Modeling & Scaling"
              description="Highly optimized schemas, indexed query planning, and persistent cache integration to handle concurrent traffic at scale."
            />
          </div>
        </div>
      </section>

      {/* Work CTA Section */}
      <section className="pb-24 px-6 bg-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#06b6d4] to-blue-600 rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between shadow-xl shadow-cyan-500/10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Want to collaborate on your <br className="hidden md:block" /> next system?
            </h2>
          </div>
          <Link to="/contact" className="mt-8 md:mt-0 bg-white hover:bg-slate-50 text-slate-900 px-10 py-4 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg border border-white/80">
            Get In Touch
          </Link>
        </div>
      </section>

      {/* Blog Section (Zoned Light Grey / Dark Section) */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-[2px] bg-[#06b6d4]"></div>
                <span className="text-[#06b6d4] font-bold uppercase tracking-[0.2em] text-[10px]">Latest blogs</span>
              </div>
              <h2 className="text-4xl font-serif font-bold text-slate-900">Engineering Insights</h2>
            </div>
            <Link to="/blog" className="text-xs font-bold text-[#06b6d4] hover:text-cyan-400 transition-colors uppercase tracking-wider">
              View All Insights →
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col gap-4">
                  <SkeletonLoader className="h-48 w-full rounded-2xl" />
                  <SkeletonLoader className="h-4 w-1/4" />
                  <SkeletonLoader className="h-6 w-3/4" />
                  <SkeletonLoader className="h-16 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  slug={post.slug}
                  coverImage={post.cover_image}
                  type={post.tags && post.tags.length > 0 ? post.tags[0].name : "Insight"}
                  title={post.title}
                  description={post.meta_description}
                  date="Mar 2026"
                  readTime={`${post.read_time} min read`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const StatItem = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl font-extrabold text-[#06b6d4] mb-1 drop-shadow-[0_0_10px_rgba(6,182,212,0.2)]">{value}</span>
    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{label}</span>
  </div>
);

const SkillCard = ({ icon, title, description }) => (
  <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-lg transition-all group border border-slate-100 hover:-translate-y-1">
    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#06b6d4]/20 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
  </div>
);

const BlogCard = ({ slug, coverImage, type, title, description, date, readTime }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all border border-slate-100 flex flex-col justify-between">
    <div>
      {coverImage ? (
        <div className="h-48 overflow-hidden border-b border-slate-100">
          <img
            src={getImageUrl(coverImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg">
            <BookOpen className="w-8 h-8 text-[#06b6d4]" />
          </div>
        </div>
      )}

      <div className="p-8 flex flex-col">
        <span className="text-[10px] font-bold text-[#06b6d4] mb-4 uppercase tracking-[0.2em]">{type}</span>
        <h3 className="text-xl font-serif font-bold text-slate-900 mb-4 hover:text-[#06b6d4] transition-colors leading-tight">
          <Link to={`/blog/${slug}`}>
            {title}
          </Link>
        </h3>
        <p className="text-slate-500 text-xs mb-6 line-clamp-2 leading-relaxed">{description}</p>
      </div>
    </div>

    <div className="px-8 pb-8 pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      <span>{date}</span>
      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {readTime}</span>
    </div>
  </div>
);

export default HomePage;
