import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const RatingModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || stars < 1) return;
    setSubmitting(true);
    try {
      await axios.post('/api/ratings/', { name, stars, comment });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        type="button"
        key={i}
        onClick={() => setStars(i + 1)}
        className={`w-6 h-6 ${i < stars ? 'text-[#06b6d4]' : 'text-gray-400'} transition-colors`}
        aria-label={`Rate ${i + 1} star`}
      >
        ★
      </button>
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-slate-900">Leave a Rating</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            {renderStars()}
          </div>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-gray-50 text-gray-900"
            required
          />
          <textarea
            placeholder="Optional comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-gray-50 text-gray-900"
            rows={3}
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#06b6d4] hover:bg-cyan-400 text-[#090d16] py-2 rounded font-bold transition-colors"
          >
            {submitting ? 'Submitting…' : 'Submit Rating'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;
