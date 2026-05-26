import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Star, StarOff, Send, MessageSquare } from 'lucide-react';

const RatingsSection = () => {
  const [ratings, setRatings] = useState([]);
  const [formData, setFormData] = useState({ name: '', stars: 5, comment: '' });
  const [hoveredStars, setHoveredStars] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const fetchRatings = async () => {
    try {
      const response = await api.get('/ratings/');
      // Django rest framework lists could be paginated. Let's handle both array response and paginated response.
      const data = response.data.results || response.data;
      setRatings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching ratings:", err);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please provide your name.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      await api.post('/ratings/', formData);
      setSuccess(true);
      setFormData({ name: '', stars: 5, comment: '' });
      fetchRatings();
    } catch (err) {
      console.error(err);
      setError('Failed to submit rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter 5-star reviews to highlight premium feedback as requested ("rendering back the 5star one with user name")
  const fiveStarRatings = ratings.filter(r => r.stars === 5);
  const otherRatings = ratings.filter(r => r.stars < 5);

  return (
    <div className="mt-16 pt-12 border-t border-slate-200">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">
          What Clients Say
        </h2>
        <p className="text-sm text-slate-500">
          Read reviews from clients or leave your feedback below.
        </p>
      </div>

      {/* Five Star Highlights */}
      {fiveStarRatings.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xs font-bold text-[#06b6d4] uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#06b6d4]"></span>
            5-Star Client Reviews
            <span className="w-6 h-[1px] bg-[#06b6d4]"></span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fiveStarRatings.map((rating) => (
              <div 
                key={rating.id} 
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-sm text-slate-800">{rating.name}</span>
                  <div className="flex gap-0.5 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                {rating.comment && (
                  <p className="text-xs text-slate-650 leading-relaxed italic">
                    "{rating.comment}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Ratings */}
      {otherRatings.length > 0 && (
        <div className="mb-12">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">
            Other Feedback
          </h4>
          <div className="flex flex-wrap gap-4 justify-center">
            {otherRatings.map((rating) => (
              <div 
                key={rating.id} 
                className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 max-w-xs"
              >
                <div className="flex justify-between items-center gap-4 mb-1">
                  <span className="font-bold text-xs text-slate-700">{rating.name}</span>
                  <div className="flex gap-0.5 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      i < rating.stars ? (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ) : (
                        <StarOff key={i} className="w-3 h-3 text-slate-300" />
                      )
                    ))}
                  </div>
                </div>
                {rating.comment && (
                  <p className="text-[11px] text-slate-500 italic">
                    "{rating.comment}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Rating Form */}
      <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 max-w-lg mx-auto">
        <h3 className="text-lg font-serif font-bold text-slate-900 mb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#06b6d4]" />
          Leave your feedback
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Your review will help me refine web system designs and maintain high standard interfaces.
        </p>

        {success && (
          <div className="p-3 mb-4 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg">
            Thank you! Your feedback has been recorded successfully.
          </div>
        )}

        {error && (
          <div className="p-3 mb-4 text-xs font-semibold text-red-650 bg-red-50 border border-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((starValue) => {
                const isSelected = starValue <= formData.stars;
                const isHovered = hoveredStars !== null && starValue <= hoveredStars;
                return (
                  <button
                    type="button"
                    key={starValue}
                    className="p-1 transition-transform active:scale-95 focus:outline-none"
                    onMouseEnter={() => setHoveredStars(starValue)}
                    onMouseLeave={() => setHoveredStars(null)}
                    onClick={() => setFormData({ ...formData, stars: starValue })}
                  >
                    <Star 
                      className={`w-5 h-5 transition-colors ${
                        isHovered || (!hoveredStars && isSelected)
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-slate-350'
                      }`} 
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <input 
              type="text" 
              placeholder="Your Name / Organization" 
              required
              className="w-full text-xs px-4 py-3 border border-slate-200 rounded-lg bg-white focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] outline-none transition-colors"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <textarea 
              rows={3} 
              placeholder="Review comments / description of collaboration..."
              className="w-full text-xs px-4 py-3 border border-slate-200 rounded-lg bg-white focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] outline-none transition-colors"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-[#06b6d4] hover:bg-cyan-400 text-[#090d16] font-bold text-xs py-3 px-6 rounded-lg transition-all shadow-md shadow-cyan-500/10 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : (
              <>
                Submit Review
                <Send className="w-3 h-3" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RatingsSection;
