'use client';

import ManageGuard from '../../components/AdminGuard';
import AdminSidebar from '../../components/AdminSidebar';

import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <ManageGuard>
      <div className="h-[calc(100vh-5rem)] bg-mesh-gradient relative overflow-hidden flex">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 cyber-grid opacity-30 pointer-events-none"></div>

        {/* Sidebar: hidden on small screens, overlay on mobile */}
        <div>
          <div className="hidden lg:block">
            <AdminSidebar />
          </div>
          {/* Overlay sidebar for mobile/tablet */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)}>
              <div className="absolute left-0 top-0 h-full w-64 bg-dark-900 shadow-xl animate-slide-in z-50" onClick={e => e.stopPropagation()}>
                <AdminSidebar />
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 relative z-10 p-4 sm:p-6 md:p-8 h-full overflow-y-auto custom-scrollbar lg:ml-64">
          {/* Sidebar toggle button for mobile/tablet */}
          <button
            className="lg:hidden fixed top-6 left-4 z-50 bg-primary-500 text-white rounded-full p-2 shadow-md focus:outline-none"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </ManageGuard>
  );
}