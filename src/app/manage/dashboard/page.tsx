
'use client';

import { useState, useEffect } from 'react';
import AdminGuard from '../../../components/AdminGuard';
import AdminDashboardHeader from '../../../components/AdminDashboardHeader';
import AdminDashboardStats from '../../../components/AdminDashboardStats';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';

interface DashboardStats {
  projectCount: number;
  testimonialCount: number;
  messageCount: number;
  pendingTestimonials: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projectCount: 0,
    testimonialCount: 0,
    messageCount: 0,
    pendingTestimonials: 0,
  });
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Keep default stats on error
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  return (
    <AdminGuard>
      <div>
        <AdminDashboardHeader />
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 shadow-neon"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <AdminDashboardStats stats={stats} />

            {/* Quick Actions */}
            <div className="glass-card rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-8 gradient-text flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t('admin.dashboard.quickActions') || 'Quick Actions'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link 
                  href="/admin/projects" 
                  className="group glass-card p-6 rounded-xl border border-primary-500/30 hover:border-primary-400/50 transition-all duration-300 hover:-translate-y-1 block"
                >
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h4 className="font-bold text-primary-400 mb-2 text-lg flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {t('admin.dashboard.viewProjects') || 'View Projects'}
                      </h4>
                      <p className="text-sm text-gray-300">{t('admin.dashboard.manageProjects') || 'Manage your portfolio projects'}</p>
                    </div>
                    <svg className="h-6 w-6 text-primary-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminGuard>
  );
}