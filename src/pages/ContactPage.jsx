import React, { useState } from 'react';
import api from '../services/api';
import RatingsSection from '../components/RatingsSection';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await api.post('/contact/', formData);
      setStatus({ type: 'success', message: 'Message sent successfully. I will get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: 'There was an error sending your message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-6 bg-white text-slate-900">
      <div className="max-w-xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Get in touch</h1>
          <p className="text-slate-500">Have a question or project? Drop me a line.</p>
        </header>

        {status.message && (
          <div className={`p-4 mb-8 rounded text-sm font-medium ${
            status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
          }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-tighter mb-2">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-tighter mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-tighter mb-2">Subject</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-tighter mb-2">Message</label>
            <textarea 
              rows={5}
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      <RatingsSection />
    </div>
  );
};

export default ContactPage;
