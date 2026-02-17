"use client";
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import AdminGuard from '../../../components/AdminGuard';
import Link from 'next/link';

interface DashboardStats {
  projectCount: number;
  testimonialCount: number;
  messageCount: number;
  pendingTestimonials: number;
}

export default function AdminDashboardClient() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<DashboardStats>({
    projectCount: 0,
    testimonialCount: 0,
    messageCount: 0,
    pendingTestimonials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminGuard>
      <div>
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-5xl font-black gradient-text mb-4">{t('admin.dashboard.welcome')}</h2>
          <p className="text-xl text-gray-300">
            {t('admin.dashboard.manage')}
            <span className="gradient-text-alt font-semibold"> • {t('admin.dashboard.realtime')} • {t('admin.dashboard.modern')}</span>
          </p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 shadow-neon"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="glass-card rounded-2xl p-8 border border-primary-500/30 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center">
                  <span className="text-4xl font-bold gradient-text mr-4">{stats.projectCount}</span>
                  <span className="text-lg text-gray-300">{t('admin.dashboard.projects')}</span>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-8 border border-primary-500/30 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center">
                  <span className="text-4xl font-bold gradient-text mr-4">{stats.testimonialCount}</span>
                  <span className="text-lg text-gray-300">{t('admin.dashboard.testimonials')}</span>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-8 border border-primary-500/30 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center">
                  <span className="text-4xl font-bold gradient-text mr-4">{stats.messageCount}</span>
                  <span className="text-lg text-gray-300">{t('admin.dashboard.messages')}</span>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-8 border border-primary-500/30 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center">
                  <span className="text-4xl font-bold gradient-text mr-4">{stats.pendingTestimonials}</span>
                  <span className="text-lg text-gray-300">{t('admin.dashboard.pending')}</span>
                </div>
              </div>
            </div>
            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/admin/projects" className="quick-link">{t('admin.dashboard.manageProjects')}</Link>
              <Link href="/admin/testimonials" className="quick-link">{t('admin.dashboard.manageTestimonials')}</Link>
              <Link href="/admin/messages" className="quick-link">{t('admin.dashboard.manageMessages')}</Link>
            </div>
          </>
        )}
      </div>
    </AdminGuard>
  );
}
