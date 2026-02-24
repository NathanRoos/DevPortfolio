'use client';

import ManageGuard from '../../components/AdminGuard';
import AdminSidebar from '../../components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ManageGuard>
      <div className="h-[calc(100vh-5rem)] bg-mesh-gradient relative overflow-hidden flex">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 cyber-grid opacity-30 pointer-events-none"></div>
        
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 ml-64 relative z-10 p-8 h-full overflow-y-auto custom-scrollbar">
            <div className="max-w-6xl mx-auto">
                {children}
            </div>
        </div>
      </div>
    </ManageGuard>
  );
}