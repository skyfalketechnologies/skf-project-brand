import React from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  Zap,
  Users,
  RefreshCw,
  Flame
} from 'lucide-react';
import aboutImage from '../assets/about.jpg';

const About = () => {
  return (
    <div className="w-full min-h-screen bg-white font-sans text-slate-900 py-20">
      <section className="w-full px-4 sm:px-8 lg:px-12">

        {/* ── Our Story Section ── */}
        <div className="mb-20 grid gap-10 lg:grid-cols-[1.35fr_0.75fr] items-start min-h-[56vh]">
          <div className="text-center sm:text-left lg:pr-8 xl:pr-12 h-full flex flex-col justify-between">
            <p className="text-[10px] letter-spacing-[0.24em] uppercase text-[#1D9E75] font-bold tracking-[0.2em] mb-3">Our story</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              Most businesses get handed a website <span className="italic text-[#1D9E75]">and a bill.</span>
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed mb-4">
              Then they're left to wonder why nothing changed. We started this because we believed the web deserved better than that — better than templates, better than forgotten promises, better than software that doesn't solve real problems.
            </p>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed mb-4">
              Over the past year, we've built software that actually <span className="font-semibold text-slate-900">moves businesses</span>. Not flashy websites. Not feature-bloated tools. <span className="font-semibold text-slate-900">Good solutions</span> — engineered for clarity, built for impact, designed to earn trust.</p>
            
          </div>

          <div className="w-full h-full min-h-[420px] overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-lg">
            <img
              src={aboutImage}
              alt="About page illustration"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ── Principles Section ── */}
        <div className="mb-20">
          <div className="mb-12 text-center sm:text-left">
            <p className="text-[10px] letter-spacing-[0.24em] uppercase text-[#1D9E75] font-bold tracking-[0.2em] mb-3">Our principles</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 leading-tight">
              This is what <span className="italic text-[#1D9E75]">defines</span> <br />
              <span className="text-slate-600">our craft.</span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
              Not rules handed down from above — but a way of thinking we've earned through every product, every client, and every line delivered.
            </p>
          </div>

          <div className="flex flex-col gap-5 w-full">

            {/* Card 1 */}
            <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden flex flex-col sm:flex-row gap-5 hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200">
              <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-[#1D9E75] rounded-l-2xl"></div>
              <div className="w-10 h-10 rounded-lg bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center shrink-0">
                <Lightbulb size={20} />
              </div>
              <div className="flex-1 flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div className="flex-1">
                  <span className="text-[10px] font-mono tracking-wider text-slate-600 mb-1 block">01</span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">People before tools</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We start with the human struggle, not the stack. Every decision — from architecture to color — must trace back to a real user need. Tools are servants, never the agenda.
                  </p>
                </div>
                <span className="inline-block text-[9px] font-bold tracking-wider px-3 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56] uppercase self-start shrink-0">
                  Core belief
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden flex flex-col sm:flex-row gap-5 hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200">
              <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-[#378ADD] rounded-l-2xl"></div>
              <div className="w-10 h-10 rounded-lg bg-[#E6F1FB] text-[#185FA5] flex items-center justify-center shrink-0">
                <Zap size={20} />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-mono tracking-wider text-slate-600 mb-1 block">02</span>
                <h4 className="text-base font-bold text-slate-900 mb-2">Speed matters</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Slow software disrespects people's time. We engineer for performance from day one — not as an afterthought. Every millisecond saved is value delivered.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden flex flex-col sm:flex-row gap-5 hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200">
              <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-[#D85A30] rounded-l-2xl"></div>
              <div className="w-10 h-10 rounded-lg bg-[#FAECE7] text-[#993C1D] flex items-center justify-center shrink-0">
                <Users size={20} />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-mono tracking-wider text-slate-600 mb-1 block">03</span>
                <h4 className="text-base font-bold text-slate-900 mb-2">Design for everyone</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Accessibility and low-bandwidth environments shape our defaults. If it works for the most constrained user, it works for everyone. Inclusion is engineering excellence.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden flex flex-col sm:flex-row gap-5 hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200">
              <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-[#D4537E] rounded-l-2xl"></div>
              <div className="w-10 h-10 rounded-lg bg-[#FBEAF0] text-[#993556] flex items-center justify-center shrink-0">
                <RefreshCw size={20} />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-mono tracking-wider text-slate-600 mb-1 block">04</span>
                <h4 className="text-base font-bold text-slate-900 mb-2">Ship, then improve</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Perfect is the enemy of useful. We release early, watch real people use it, and refine relentlessly. Assumptions die in production — that's where we want them.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden flex flex-col sm:flex-row gap-5 hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200">
              <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-[#BA7517] rounded-l-2xl"></div>
              <div className="w-10 h-10 rounded-lg bg-[#FAEEDA] text-[#854F0B] flex items-center justify-center shrink-0">
                <Flame size={20} />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-mono tracking-wider text-slate-600 mb-1 block">05</span>
                <h4 className="text-base font-bold text-slate-900 mb-2">Earn trust, always</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Trust is the only currency that compounds. Every release must leave users more confident — in the tool, in themselves, and in us. Reputation is built one honest interaction at a time.
                </p>
              </div>
            </div>

          </div>


        </div>

        <div className="text-center">
          <Link
            to="/contact"
            className="inline-block bg-[#06b6d4] hover:bg-cyan-400 text-[#090d16] px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-cyan-500/20"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;