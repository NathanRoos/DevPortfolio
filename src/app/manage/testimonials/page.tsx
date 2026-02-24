'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import ManageGuard from '../../../components/AdminGuard';

interface Testimonial {
  id: string;
  author: string;
  rating: number;
  text: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

export default function AdminTestimonials() {
    const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials?admin=true');
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateTestimonialStatus = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) throw new Error('Failed to update testimonial');
      
      // Refresh the list
      fetchTestimonials();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete testimonial');
      
      // Refresh the list
      fetchTestimonials();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 shadow-neon"></div>
    </div>
  );
  if (error) return (
    <div className="glass-card rounded-2xl p-8 border border-red-500/30 text-center">
      <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <h3 className="text-2xl font-bold text-red-400 mb-2">Error Loading Testimonials</h3>
      <p className="text-gray-300">{error}</p>
    </div>
  );

  const pendingTestimonials = testimonials.filter(t => t.status === 'PENDING');
  const approvedTestimonials = testimonials.filter(t => t.status === 'APPROVED');
  const rejectedTestimonials = testimonials.filter(t => t.status === 'REJECTED');

  return (
    <ManageGuard>
      <div>
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-5xl font-black gradient-text mb-4 flex items-center gap-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {t('admin.testimonials.title')}
          </h2>
          <p className="text-xl text-gray-300">{t('admin.testimonials.subtitle')}
            <span className="gradient-text-alt font-semibold"> • {t('admin.testimonials.cta') || 'Real-time Updates • Easy Management'}</span>
          </p>
        </div>

      {/* Pending Testimonials */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-primary-400 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t('admin.testimonials.status.pending')}
          <span className="ml-3 px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium border border-primary-500/30">
            {pendingTestimonials.length}
          </span>
        </h3>
        {pendingTestimonials.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center border border-primary-500/20">
            <svg className="w-16 h-16 text-primary-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <h4 className="text-xl font-bold text-white mb-2">{t('admin.testimonials.empty')}</h4>
            <p className="text-gray-300">{t('admin.testimonials.emptyDesc')}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="glass-card rounded-2xl p-8 border border-primary-500/30 hover:border-primary-400/50 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-xl font-bold text-white">{testimonial.author}</h4>
                      <div className="flex text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < (testimonial.rating || 5) ? 'text-yellow-400' : 'text-gray-600'}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-yellow-400 font-medium mb-1">{testimonial.user?.email || 'Anonymous submission'}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(testimonial.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => updateTestimonialStatus(testimonial.id, 'APPROVED')}
                      className="px-4 py-2 bg-primary-500/20 text-primary-300 rounded-xl hover:bg-primary-500/30 transition-all duration-300 font-semibold hover:-translate-y-1 border border-primary-500/30 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t('admin.testimonials.status.approved')}
                    </button>
                    <button
                      onClick={() => updateTestimonialStatus(testimonial.id, 'REJECTED')}
                      className="px-4 py-2 bg-dark-800/50 text-gray-300 rounded-xl hover:bg-dark-700/50 transition-all duration-300 font-semibold hover:-translate-y-1 border border-gray-600/30 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {t('admin.testimonials.status.rejected')}
                    </button>
                    <button
                      onClick={() => deleteTestimonial(testimonial.id)}
                      className="px-4 py-2 bg-dark-800/50 text-gray-400 rounded-xl hover:bg-dark-700/50 transition-all duration-300 font-semibold hover:-translate-y-1 border border-gray-600/30 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {t('admin.testimonials.deleteButton')}
                    </button>
                  </div>
                </div>
                <div className="bg-primary-500/10 rounded-xl p-4 border border-primary-500/20">
                  <p className="text-gray-200 leading-relaxed italic">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Testimonials */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-primary-400 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {t('admin.testimonials.status.approved')}
          <span className="ml-3 px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium border border-primary-500/30">
            {approvedTestimonials.length}
          </span>
        </h3>
        <div className="space-y-6">
          {approvedTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="glass-card rounded-2xl p-6 border border-primary-500/30 hover:border-primary-400/50 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-bold text-white">{testimonial.author}</h4>
                    <span className="text-yellow-400 text-sm">{'★'.repeat(testimonial.rating || 5)}</span>
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(testimonial.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => updateTestimonialStatus(testimonial.id, 'REJECTED')}
                    className="px-3 py-1 bg-dark-800/50 text-gray-300 rounded-lg hover:bg-dark-700/50 transition-all duration-300 text-sm font-medium border border-gray-600/30 flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>
                  <button
                    onClick={() => deleteTestimonial(testimonial.id)}
                    className="px-3 py-1 bg-dark-800/50 text-gray-400 rounded-lg hover:bg-dark-700/50 transition-all duration-300 text-sm font-medium border border-gray-600/30 flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
              <div className="bg-primary-500/10 rounded-xl p-4 border border-primary-500/20">
                <p className="text-gray-200 leading-relaxed italic">"{testimonial.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rejected Testimonials */}
      {rejectedTestimonials.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('admin.testimonials.status.rejected')}
            <span className="ml-3 px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm font-medium border border-red-500/30">
              {rejectedTestimonials.length}
            </span>
          </h3>
          <div className="space-y-6">
            {rejectedTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="glass-card rounded-2xl p-6 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 opacity-75">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-bold text-white">{testimonial.author}</h4>
                      <span className="text-yellow-400 text-sm">{'★'.repeat(testimonial.rating || 5)}</span>
                    </div>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(testimonial.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => updateTestimonialStatus(testimonial.id, 'APPROVED')}
                      className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-lg hover:bg-primary-500/30 transition-all duration-300 text-sm font-medium border border-primary-500/30 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Approve
                    </button>
                    <button
                      onClick={() => deleteTestimonial(testimonial.id)}
                      className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-all duration-300 text-sm font-medium border border-gray-500/30 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                  <p className="text-gray-300 leading-relaxed italic line-through opacity-75">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </ManageGuard>
  );
}