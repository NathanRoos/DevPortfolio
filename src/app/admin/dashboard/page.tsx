'use client';

import { useState, useEffect } from 'react';
import AdminGuard from '../../../components/AdminGuard';
import AdminDashboardHeader from '../../../components/AdminDashboardHeader';
import AdminDashboardStats from '../../../components/AdminDashboardStats';
import Link from 'next/link';

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="glass-card rounded-2xl p-8 border border-primary-500/30 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center">
                  <div className="p-4 rounded-full bg-dark-800/50 border border-primary-500/30 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="h-8 w-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider">Total Projects</p>
                    <p className="text-4xl font-black text-white">{stats.projectCount}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 border border-primary-500/30 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center">
                  <div className="p-4 rounded-full bg-dark-800/50 border border-primary-500/30 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="h-8 w-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider">Total Testimonials</p>
                    <p className="text-4xl font-black text-white">{stats.testimonialCount}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 border border-primary-500/30 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center">
                  <div className="p-4 rounded-full bg-dark-800/50 border border-primary-500/30 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="h-8 w-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider">Contact Messages</p>
                    <p className="text-4xl font-black text-white">{stats.messageCount}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 border border-primary-500/30 hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center">
                  <div className="p-4 rounded-full bg-dark-800/50 border border-primary-500/30 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="h-8 w-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider">Pending Reviews</p>
                    <p className="text-4xl font-black text-white">{stats.pendingTestimonials}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-8 gradient-text flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link 
                  href="/admin/projects" 
                  className="group glass-card p-6 rounded-xl border border-primary-500/30 hover:border-primary-400/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center">
                    {loading ? (
                      <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 shadow-neon"></div>
                      </div>
                    ) : (
                      <AdminDashboardStats stats={stats} />
                    )}
                className="group glass-card p-6 rounded-xl border border-primary-500/30 hover:border-primary-400/50 transition-all duration-300 hover:-translate-y-1 block"
              >
                <div className="flex items-center">
                  <div className="flex-1">
                    <h4 className="font-bold text-primary-400 mb-2 text-lg flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Public Site
                    </h4>
                    <p className="text-sm text-gray-300">See how visitors view your portfolio</p>
                  </div>
                  <svg className="h-6 w-6 text-primary-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </AdminGuard>
  );
}