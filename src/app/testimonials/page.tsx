'use client';

import { useState, useEffect } from 'react';
import TestimonialCard from '../../components/TestimonialCard';
import { useLanguage } from '../../context/LanguageContext';

interface Testimonial {
  id: string;
  author: string;
  text: string;
  rating: number;
  createdAt: string;
  user: {
    name: string;
  };
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ author: '', text: '', rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { user } = useUser();
  const { t } = useLanguage();

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.text.trim().length < 10) {
      alert('Please write at least 10 characters for your testimonial so we can hear your full story!');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit testimonial');
      }
      
      setFormData({ author: '', text: '', rating: 5 });
      setSubmitSuccess(true);
      setShowForm(false);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit testimonial');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.name === 'rating' ? parseInt(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30"></div>
        <div className="relative z-10 flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <span className="ml-4 text-primary-400 text-lg font-semibold">{t('testimonials.loading')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-neon-orange/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-black gradient-text mb-6">{t('testimonials.title')}</h1>
            <div className="h-1 w-32 bg-gradient-to-r from-primary-500 to-neon-orange mx-auto mb-6 animate-bar-reveal"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t('testimonials.intro')}
          </p>
        
        {submitSuccess && (
          <div className="mb-6 p-4 glass-card rounded-xl max-w-2xl mx-auto border border-green-500/30">
            <p className="text-green-300 font-medium">
              ✓ Thank you! Your testimonial has been submitted and is pending approval.
            </p>
          </div>
        )}

        <button 
          onClick={() => setShowForm(!showForm)}
          className="neon-button px-8 py-4 text-lg font-semibold hover:scale-105 transform transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          {showForm ? t('testimonials.cancel') || 'Cancel' : t('testimonials.button') || 'Share Your Experience'}
        </button>
      </div>

      {/* Testimonial Submission Form */}
      {showForm && (
        <div className="glass-card p-8 rounded-2xl border border-primary-500/20 mb-12 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 gradient-text">{t('testimonials.button')}</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="author" className="block text-sm font-semibold text-primary-400 mb-2">
                {t('testimonials.author')} *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-dark-800/50 border border-primary-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-400 transition-all duration-300 backdrop-blur-sm"
                placeholder={t('testimonials.author')}
                required
              />
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-semibold text-primary-400 mb-2">
                {t('testimonials.rating')}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  step="1"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-dark-800/50 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <span className="text-2xl font-bold text-primary-400 w-12 text-center">{formData.rating} ★</span>
              </div>
            </div>

            <div>
              <label htmlFor="text" className="block text-sm font-semibold text-primary-400 mb-2">
                {t('testimonials.textLabel') || 'Your Testimonial'} *
              </label>
              <textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-dark-800/50 border border-primary-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-400 transition-all duration-300 backdrop-blur-sm resize-none"
                placeholder={t('testimonials.textPlaceholder') || 'Share your experience working with me...'}
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={submitting}
                className="neon-button px-8 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex-1 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                {submitting ? t('testimonials.submitting') || 'Submitting...' : t('testimonials.submitButton') || 'Submit Testimonial'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-dark-700/50 text-gray-300 rounded-xl hover:bg-dark-600/50 transition-all duration-300 border border-gray-600/30"
              >
                {t('testimonials.cancel') || 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <svg className="w-16 h-16 text-primary-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-4">{t('testimonials.empty')}</h3>
            <p className="text-gray-300">
              {t('testimonials.emptyDesc') || 'Share your experience above!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}