"use client";
import { useLanguage } from '../context/LanguageContext';

export default function AdminDashboardStats({ stats }) {
  const { t } = useLanguage();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      {/* Projects */}
      <div className="glass-card rounded-2xl p-8 border border-primary-500/30 hover:scale-105 transition-all duration-300 group flex flex-col items-center text-center">
        <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-4">{t('admin.dashboard.totalProjects')}</p>
        <div className="p-4 rounded-full bg-dark-800/50 border border-primary-500/30 shadow-lg group-hover:scale-110 transition-transform mb-4">
          <svg className="h-8 w-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-4xl font-black text-white">{stats.projectCount}</p>
      </div>
      {/* Testimonials */}
      <div className="glass-card rounded-2xl p-8 border border-primary-500/30 hover:scale-105 transition-all duration-300 group flex flex-col items-center text-center">
        <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-4">{t('admin.dashboard.totalTestimonials')}</p>
        <div className="p-4 rounded-full bg-dark-800/50 border border-primary-500/30 shadow-lg group-hover:scale-110 transition-transform mb-4">
          <svg className="h-8 w-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-4xl font-black text-white">{stats.testimonialCount}</p>
      </div>
      {/* Messages */}
      <div className="glass-card rounded-2xl p-8 border border-primary-500/30 hover:scale-105 transition-all duration-300 group flex flex-col items-center text-center">
        <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-4">{t('admin.dashboard.totalMessages')}</p>
        <div className="p-4 rounded-full bg-dark-800/50 border border-primary-500/30 shadow-lg group-hover:scale-110 transition-transform mb-4">
          <svg className="h-8 w-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-4xl font-black text-white">{stats.messageCount}</p>
      </div>
      {/* Pending Testimonials */}
      <div className="glass-card rounded-2xl p-8 border border-primary-500/30 hover:scale-105 transition-all duration-300 group flex flex-col items-center text-center">
        <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-4">{t('admin.dashboard.pendingTestimonials')}</p>
        <div className="p-4 rounded-full bg-dark-800/50 border border-primary-500/30 shadow-lg group-hover:scale-110 transition-transform mb-4">
          <svg className="h-8 w-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <p className="text-4xl font-black text-white">{stats.pendingTestimonials}</p>
      </div>
    </div>
  );
}
