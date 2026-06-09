import React from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  Zap,
  Users,
  RefreshCw,
  Flame,
  ArrowRight
} from 'lucide-react';
import aboutBg from '../assets/about-bg.jpg';

const About = () => {
  return (
    <div className="w-full min-h-screen font-sans" style={{ color: 'var(--foreground)' }}>

      {/* ── Hero Banner ── */}
      <div
        className="w-full relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${aboutBg})` }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/95 via-[#0f172a]/90 to-[#1D9E75]/40"></div>

        {/* Decorative accent lines */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#1D9E75] to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-24 md:py-32 lg:py-40 max-w-5xl">
          <p className="text-[11px] uppercase text-[#4ade80] font-bold tracking-[0.25em] mb-5 flex items-center gap-2">
            Our story
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight" style={{ color: '#ffffff' }}>
            Most businesses get handed <br className="hidden md:block" />
            a website <span className="italic" style={{ color: '#ffffff' }}>and a bill.</span>
          </h1>

          <div className="max-w-2xl space-y-5">
            <p className="text-base md:text-lg text-[#e2e8f0] leading-relaxed">
              Then they're left to wonder why nothing changed. We started this because we believed the web deserved better than that — better than templates, better than forgotten promises, better than software that doesn't solve real problems.
            </p>
            <p className="text-base md:text-lg text-[#e2e8f0] leading-relaxed">
              Over the past year, we've built software that actually{' '}
              <span className="font-semibold text-[#fbbf24]">moves businesses</span>. Not flashy websites. Not feature-bloated tools.{' '}
              <span className="font-semibold text-[#fbbf24]">Good solutions</span> — engineered for clarity, built for impact, designed to earn trust.
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ backgroundColor: 'transparent' }}> {/* ← changed from var(--background) */}
        <section className="w-full px-6 sm:px-10 lg:px-16 py-20">

          {/* ── Principles Section ── */}
          <div className="mb-20">
            <div className="mb-12 text-center sm:text-left">
              <p className="text-[11px] uppercase text-[#1D9E75] font-bold tracking-[0.25em] mb-4 flex items-center gap-2 justify-center sm:justify-start">
                <span className="w-8 h-px bg-[#1D9E75] inline-block"></span>
                Our principles
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight" style={{ color: 'var(--foreground)' }}>
                This is what <span className="italic text-[#1D9E75]">defines</span> <br />
                <span style={{ color: 'var(--foreground)', opacity: 0.6 }}>our craft.</span>
              </h2>
              <p className="text-sm max-w-xl leading-relaxed" style={{ color: 'var(--foreground)', opacity: 0.65 }}>
                Not rules handed down from above — but a way of thinking we've earned through every product, every client, and every line delivered.
              </p>
            </div>

            <div className="flex flex-col gap-6 w-full">

              {/* Card 1 */}
              <div className="group w-full rounded-2xl p-6 relative overflow-hidden flex flex-col sm:flex-row gap-5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer" style={{ background: 'linear-gradient(135deg, var(--surface) 30%, rgba(29, 158, 117, 0.12) 100%)', border: '1px solid var(--border)' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#1D9E75]/0 to-[#1D9E75]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-[#1D9E75] rounded-l-2xl group-hover:w-[6px] transition-all duration-300"></div>
                <div className="w-10 h-10 rounded-lg bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 shadow-sm relative z-10">
                  <Lightbulb size={20} />
                </div>
                <div className="flex-1 flex flex-col sm:flex-row justify-between sm:items-start gap-4 relative z-10">
                  <div className="flex-1">
                    <span className="text-[10px] font-mono tracking-wider mb-1 block transition-colors duration-300 group-hover:text-[#1D9E75]" style={{ color: 'var(--foreground)', opacity: 0.5 }}>01</span>
                    <h4 className="text-base font-bold mb-2 transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--foreground)' }}>People before tools</h4>
                    <p className="text-xs leading-relaxed" style={{ color: '#fbbf24' }}>
                      We start with the human struggle, not the stack. Every decision — from architecture to color — must trace back to a real user need. Tools are servants, never the agenda.
                    </p>
                  </div>
                  <span className="inline-block text-[9px] font-bold tracking-wider px-3 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56] uppercase self-start shrink-0 group-hover:bg-[#1D9E75] group-hover:text-white transition-colors duration-300 shadow-sm">
                    Core belief
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group w-full rounded-2xl p-6 relative overflow-hidden flex flex-col sm:flex-row gap-5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer" style={{ background: 'linear-gradient(135deg, var(--surface) 30%, rgba(55, 138, 221, 0.12) 100%)', border: '1px solid var(--border)' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#378ADD]/0 to-[#378ADD]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-[#378ADD] rounded-l-2xl group-hover:w-[6px] transition-all duration-300"></div>
                <div className="w-10 h-10 rounded-lg bg-[#E6F1FB] text-[#185FA5] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-sm relative z-10">
                  <Zap size={20} />
                </div>
                <div className="flex-1 relative z-10">
                  <span className="text-[10px] font-mono tracking-wider mb-1 block transition-colors duration-300 group-hover:text-[#378ADD]" style={{ color: 'var(--foreground)', opacity: 0.5 }}>02</span>
                  <h4 className="text-base font-bold mb-2 transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--foreground)' }}>Speed matters</h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#fbbf24' }}>
                    Slow software disrespects people's time. We engineer for performance from day one — not as an afterthought. Every millisecond saved is value delivered.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group w-full rounded-2xl p-6 relative overflow-hidden flex flex-col sm:flex-row gap-5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer" style={{ background: 'linear-gradient(135deg, var(--surface) 30%, rgba(216, 90, 48, 0.12) 100%)', border: '1px solid var(--border)' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#D85A30]/0 to-[#D85A30]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-[#D85A30] rounded-l-2xl group-hover:w-[6px] transition-all duration-300"></div>
                <div className="w-10 h-10 rounded-lg bg-[#FAECE7] text-[#993C1D] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 shadow-sm relative z-10">
                  <Users size={20} />
                </div>
                <div className="flex-1 relative z-10">
                  <span className="text-[10px] font-mono tracking-wider mb-1 block transition-colors duration-300 group-hover:text-[#D85A30]" style={{ color: 'var(--foreground)', opacity: 0.5 }}>03</span>
                  <h4 className="text-base font-bold mb-2 transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--foreground)' }}>Design for everyone</h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#fbbf24' }}>
                    Accessibility and low-bandwidth environments shape our defaults. If it works for the most constrained user, it works for everyone. Inclusion is engineering excellence.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="group w-full rounded-2xl p-6 relative overflow-hidden flex flex-col sm:flex-row gap-5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer" style={{ background: 'linear-gradient(135deg, var(--surface) 30%, rgba(212, 83, 126, 0.12) 100%)', border: '1px solid var(--border)' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4537E]/0 to-[#D4537E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-[#D4537E] rounded-l-2xl group-hover:w-[6px] transition-all duration-300"></div>
                <div className="w-10 h-10 rounded-lg bg-[#FBEAF0] text-[#993556] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-180 transition-transform duration-700 shadow-sm relative z-10">
                  <RefreshCw size={20} />
                </div>
                <div className="flex-1 relative z-10">
                  <span className="text-[10px] font-mono tracking-wider mb-1 block transition-colors duration-300 group-hover:text-[#D4537E]" style={{ color: 'var(--foreground)', opacity: 0.5 }}>04</span>
                  <h4 className="text-base font-bold mb-2 transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--foreground)' }}>Ship, then improve</h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#fbbf24' }}>
                    Perfect is the enemy of useful. We release early, watch real people use it, and refine relentlessly. Assumptions die in production — that's where we want them.
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="group w-full rounded-2xl p-6 relative overflow-hidden flex flex-col sm:flex-row gap-5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer" style={{ background: 'linear-gradient(135deg, var(--surface) 30%, rgba(186, 117, 23, 0.12) 100%)', border: '1px solid var(--border)' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#BA7517]/0 to-[#BA7517]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-[#BA7517] rounded-l-2xl group-hover:w-[6px] transition-all duration-300"></div>
                <div className="w-10 h-10 rounded-lg bg-[#FAEEDA] text-[#854F0B] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-sm relative z-10">
                  <Flame size={20} />
                </div>
                <div className="flex-1 relative z-10">
                  <span className="text-[10px] font-mono tracking-wider mb-1 block transition-colors duration-300 group-hover:text-[#BA7517]" style={{ color: 'var(--foreground)', opacity: 0.5 }}>05</span>
                  <h4 className="text-base font-bold mb-2 transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--foreground)' }}>Earn trust, always</h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#fbbf24' }}>
                    Trust is the only currency that compounds. Every release must leave users more confident — in the tool, in themselves, and in us. Reputation is built one honest interaction at a time.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#1D9E75] hover:bg-[#178a66] text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-lg shadow-[#1D9E75]/20 text-sm"
            >
              Get In Touch
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;