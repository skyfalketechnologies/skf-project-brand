import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { blogService } from '../services/dataService';
import { Code, BookOpen, Clock, Plug, Search, Settings } from 'lucide-react';
import heroBg from '../assets/teleworker-working-from-home-typing-laptop-keyboard-close-up.jpg';
import SkeletonLoader from '../components/SkeletonLoader';
import { getImageUrl } from '../utils/helpers';

const HomePage = () => {
  const { data: postsData, isLoading } = useQuery({
    queryKey: ['latest-blog-posts'],
    queryFn: () => blogService.getPosts(),
  });

  const latestPosts = postsData?.results?.slice(0, 3) || [];

  return (
    <div className="w-full min-h-screen font-sans text-slate-900">

      {/* Hero Section */}
      <section
        className="py-32 relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-slate-900/60"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block px-4 py-1 rounded-full border border-cyan-400/40 text-cyan-300 text-[10px] font-bold uppercase tracking-widest mb-8 bg-slate-800/50">
            Enterprise Systems & Web Engineering
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight tracking-tight text-white">
            Building robust systems that <br />
            <span className="text-[#06b6d4] drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">power the modern web</span>
          </h1>
          <p className="text-slate-200 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Secure, scalable, and high-availability solutions. We design and build enterprise-grade <br />
            web systems with rock-solid security, data isolation, and optimized pipelines.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/portfolio" className="bg-[#06b6d4] hover:bg-cyan-400 text-[#090d16] px-10 py-4 rounded-full font-bold transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30">
              View Systems
            </Link>
            <Link to="/blog" className="border border-white hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold transition-all">
              Read Insights
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          <StatItem value="100%" label="On-Time Delivery" />
          <StatItem value="99.9%" label="System Uptime Guarantee" />
          <StatItem value="Zero" label="Critical Vulnerabilities" />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-[2px] bg-[#06b6d4]"></div>
              <span className="text-[#06b6d4] font-bold uppercase tracking-[0.2em] text-[10px]">What We Do</span>
            </div>
            <h2 className="text-4xl font-serif font-bold text-slate-900">Capabilities & services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ServiceCard
              icon={<Code size={18} color="#fbbf24" />}
              tag="Custom Development"
              tagColor="#fbbf24"
              bannerBg="#0f172a"
              titleColor="#fde68a"
              descColor="#185FA5"
              dotColor="#fbbf24"
              title="Custom web application development"
              description="We provide custom online software when you need more than just a website. Our experts deliver end-to-end solutions tailored to your business."
              items={['Personalized solutions', 'Full development cycle', 'Integration of features', 'Customization and updates']}
            />
            <ServiceCard
              icon={<Plug size={18} color="#38bdf8" />}
              tag="Integration"
              tagColor="#38bdf8"
              bannerBg="#0c1f3f"
              titleColor="#bae6fd"
              descColor="#0369a1"
              dotColor="#38bdf8"
              title="Web integration services"
              description="We connect your website to other systems and software. Our specialists streamline how your platforms communicate and operate together."
              items={['Data exchange', 'Interoperability', 'Automation of processes', 'Cloud integration']}
            />
            <ServiceCard
              icon={<Search size={18} color="#34d399" />}
              tag="Audit & Optimization"
              tagColor="#34d399"
              bannerBg="#0f2218"
              titleColor="#a7f3d0"
              descColor="#065f46"
              dotColor="#34d399"
              title="Audit and optimization of an existing platform"
              description="We comprehensively audit your current website platform and identify exactly what's holding your performance back."
              items={['Page load times', 'Broken links', 'Metadata', 'Security risks']}
            />
            <ServiceCard
              icon={<Settings size={18} color="#c084fc" />}
              tag="Maintenance & Support"
              tagColor="#c084fc"
              bannerBg="#1e0a2e"
              titleColor="#e9d5ff"
              descColor="#6b21a8"
              dotColor="#c084fc"
              title="Maintenance and support"
              description="We are always ready to keep your digital presence running smoothly and securely, covering all key aspects of ongoing platform health."
              items={['Security updates', 'Performance optimization', 'Server maintenance', 'Software updates']}
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
          <Link
            to="/contact"
            className="mt-8 md:mt-0 bg-white hover:bg-slate-50 text-slate-900 px-10 py-4 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg border border-white/80"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      {/* Blog Section */}
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
                  type={post.tags && post.tags.length > 0 ? post.tags[0].name : 'Insight'}
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

// ─── Sub-components ───────────────────────────────────────────────

const StatItem = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl font-extrabold text-[#06b6d4] mb-1 drop-shadow-[0_0_10px_rgba(6,182,212,0.2)]">
      {value}
    </span>
    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{label}</span>
  </div>
);

const ServiceCard = ({ icon, tag, tagColor, bannerBg, titleColor, descColor, dotColor, title, description, items }) => (
  <div
    className="hover:-translate-y-1 transition-all duration-200"
    style={{
      borderRadius: '16px',
      overflow: 'hidden',
      border: '0.5px solid rgba(0,0,0,0.08)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      background: '#fff',
    }}
  >
    <div style={{ background: bannerBg, padding: '22px 22px 18px' }}>
      <span style={{
        fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: tagColor, display: 'block', marginBottom: '10px',
      }}>
        {tag}
      </span>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: `${tagColor}20`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
      }}>
        {icon}
      </div>
      <h3 style={{ color: titleColor, fontSize: '15px', fontWeight: 700, lineHeight: 1.3, margin: 0 }}>
        {title}
      </h3>
    </div>
    <div style={{ padding: '18px 22px 22px', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}>
      <p style={{ color: descColor, fontSize: '12.5px', lineHeight: 1.55, margin: '0 0 14px' }}>
        {description}
      </p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
        {items.map((item) => (
          <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '12px', fontWeight: 500, color: '#0f172a' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, flexShrink: 0, display: 'inline-block' }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const BlogCard = ({ slug, coverImage, type, title, description, date, readTime }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all border border-slate-100 flex flex-col justify-between">
    <div>
      {coverImage ? (
        <div className="h-48 overflow-hidden border-b border-slate-100">
          <img src={getImageUrl(coverImage)} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-103" />
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
          <Link to={`/blog/${slug}`}>{title}</Link>
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