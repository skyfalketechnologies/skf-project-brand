import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Layout, Database, Shield, Zap, RefreshCw } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8 text-cyan-600" />,
      title: "Scalable Backend Architecture",
      description: "High-availability, bulletproof API services designed to scale horizontally. We construct robust multi-tenant data structures, role-based access protocols, and fail-safe payment integration layers.",
      features: ["Token-Based Security Isolation", "Rate-Limiting & IP Protection", "Custom Payment Integrations", "Robust API Versioning Control"],
      colorClass: "from-cyan-50/70 to-blue-50/40",
      borderClass: "border-cyan-100 hover:border-cyan-500",
      accentColor: "#06b6d4"
    },
    {
      icon: <Layout className="w-8 h-8 text-blue-600" />,
      title: "Interactive Client Interfaces",
      description: "Performant, state-of-the-art frontends developed for responsiveness and conversion. Utilizing high-fidelity designs, micro-animations, and fluid transitions to establish a first-class user experience.",
      features: ["Fluid Micro-Animations", "Optimal Core Web Vitals", "Multi-Screen Compatibility", "Structured UX Journeys"],
      colorClass: "from-blue-5/70 to-indigo-50/40",
      borderClass: "border-blue-100 hover:border-blue-500",
      accentColor: "#3b82f6"
    },
    {
      icon: <Database className="w-8 h-8 text-emerald-600" />,
      title: "Data Modeling & Index Optimization",
      description: "Highly optimized data schemas built for speed and high concurrent traffic. We design index-mapped query flows, database caching strategies, and soft-delete protection pipelines.",
      features: ["Complex Schema Modeling", "Indexed Query Tuning", "Soft-Delete Protection Layers", "Robust Migration Automation"],
      colorClass: "from-emerald-50/70 to-teal-50/40",
      borderClass: "border-emerald-100 hover:border-emerald-500",
      accentColor: "#10b981"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "System Security & Compliance",
      description: "Ensuring all platform resources are securely sandboxed, user data is protected, and APIs conform to modern encryption standards.",
      features: ["Data Audits & Hardening", "JWT-based Session Guarding", "Secure Secrets Storage", "Multi-Tenant Resource Isolation"],
      colorClass: "from-purple-50/70 to-pink-50/40",
      borderClass: "border-purple-100 hover:border-purple-500",
      accentColor: "#a855f7"
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-600" />,
      title: "Performance Fine-Tuning",
      description: "Optimizing overall request-response latency, bundling strategies, and static media caching to achieve sub-second load times.",
      features: ["Lighthouse Score Optimization", "Server Response Latency Tuning", "Code Splitting & Lazy Loads", "Dynamic Content Caching"],
      colorClass: "from-amber-50/70 to-orange-50/40",
      borderClass: "border-amber-100 hover:border-amber-500",
      accentColor: "#f59e0b"
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-rose-600" />,
      title: "End-to-End System Audits",
      description: "Reviewing legacy system setups, documenting bottlenecks, and delivering actionable refactoring roadmaps for modernization.",
      features: ["Security & Isolation Review", "Bottleneck & Leak Auditing", "Codebase Quality Assessment", "Scaling Feasibility Report"],
      colorClass: "from-rose-50/70 to-red-50/40",
      borderClass: "border-rose-100 hover:border-rose-500",
      accentColor: "#f43f5e"
    }
  ];

  return (
    <div className="py-20 max-w-7xl mx-auto px-6 font-sans bg-white text-slate-900">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-20">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
          Our Capabilities
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          We design and build production-grade web systems designed to scale seamlessly and deliver exceptional user experiences.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {services.map((service, index) => (
          <div 
            key={index}
            className={`bg-gradient-to-br ${service.colorClass} border ${service.borderClass} p-8 rounded-3xl transition-all hover:-translate-y-1 duration-300 flex flex-col justify-between shadow-sm`}
          >
            <div>
              <div className="mb-6 w-14 h-14 rounded-2xl bg-white/80 border border-slate-200 flex items-center justify-center shadow-sm">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">{service.description}</p>
            </div>
            
            <ul className="space-y-2 border-t border-slate-200/60 pt-4">
              {service.features.map((feat, i) => (
                <li key={i} className="text-[10px] font-semibold text-slate-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.accentColor }}></span>
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Strategy CTA */}
      <div className="bg-gradient-to-r from-[#06b6d4] to-blue-600 rounded-3xl p-12 text-center md:text-left md:flex justify-between items-center shadow-xl shadow-cyan-500/5 max-w-5xl mx-auto">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
            Ready to secure and scale your software?
          </h2>
          <p className="text-xs text-cyan-100">
            Book a complimentary architecture session to discuss project feasibility and delivery.
          </p>
        </div>
        <Link 
          to="/schedule" 
          className="inline-flex items-center justify-center min-w-[180px] bg-white hover:bg-slate-50 text-slate-900 font-semibold text-sm md:text-base py-4 px-10 rounded-full transition-all shadow-lg border border-white/80"
        >
          Schedule Session
        </Link>
      </div>
    </div>
  );
};

export default ServicesPage;
