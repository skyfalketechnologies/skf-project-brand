import React, { useState } from 'react';
import api from '../services/api';
import { Calendar, Clock, Phone, Mail, User, ShieldAlert } from 'lucide-react';

const SchedulePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await api.post('/schedule/', formData);
      setStatus({ 
        type: 'success', 
        message: `Consultation requested successfully for ${formData.date} at ${formData.time}. I will confirm via email shortly.` 
      });
      setFormData({ name: '', phone: '', email: '', date: '', time: '' });
    } catch (err) {
      console.error(err);
      setStatus({ 
        type: 'error', 
        message: 'Unable to schedule at this time. Please double-check the inputs or try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 max-w-4xl mx-auto px-6 font-sans bg-white text-slate-900">
      <div className="text-center max-w-xl mx-auto mb-16">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">
          Schedule a Consultation
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Book a 1:1 strategy session. We'll discuss your system requirements, technical challenges, and build plan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
        {/* Info Sidebar */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h3 className="text-xs font-bold text-[#06b6d4] uppercase tracking-widest mb-4">
              What to Expect
            </h3>
            <ul className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#06b6d4] font-bold">01/</span>
                <span>Requirement scoping: Translating business objectives to scalable system architecture.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#06b6d4] font-bold">02/</span>
                <span>Security & isolation standards checklist.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#06b6d4] font-bold">03/</span>
                <span>High-level delivery roadmap, timelines, and milestones.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#06b6d4]" />
              Reliability Guarantee
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              All discussions are protected under standard NDA conditions. No sales pitch, purely engineering feasibility analysis.
            </p>
          </div>
        </div>

        {/* Schedule Form */}
        <div className="md:col-span-3 bg-white border border-slate-200 p-8 rounded-3xl shadow-lg">
          {status.message && (
            <div className={`p-4 mb-6 rounded-xl text-xs font-semibold ${
              status.type === 'success' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full text-xs px-4 py-3 bg-white border border-slate-200 focus:border-cyan-500 rounded-lg text-slate-900 outline-none transition-colors"
                placeholder="eg. Sarah Jenkins"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  className="w-full text-xs px-4 py-3 bg-white border border-slate-200 focus:border-cyan-500 rounded-lg text-slate-900 outline-none transition-colors"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full text-xs px-4 py-3 bg-white border border-slate-200 focus:border-cyan-500 rounded-lg text-slate-900 outline-none transition-colors"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full text-xs px-4 py-3 bg-white border border-slate-200 focus:border-cyan-500 rounded-lg text-slate-900 outline-none transition-colors"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  Preferred Time
                </label>
                <input
                  type="time"
                  required
                  className="w-full text-xs px-4 py-3 bg-white border border-slate-200 focus:border-cyan-500 rounded-lg text-slate-900 outline-none transition-colors"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#06b6d4] hover:bg-cyan-400 text-white font-bold text-xs py-3 px-6 rounded-lg transition-all shadow-md shadow-cyan-500/10 disabled:opacity-50 mt-4"
            >
              {isSubmitting ? 'Booking Session...' : 'Confirm Availability'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
