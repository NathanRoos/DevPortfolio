'use client';

import { AuthProvider } from '../context/AuthContext';
import Navbar from './Navbar';
import { ToastContainer } from './Toast';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <AuthProvider>
      <Navbar />
      <ToastContainer />
      <main className="pt-16">
        {children}
      </main>
    </AuthProvider>
  );
}
