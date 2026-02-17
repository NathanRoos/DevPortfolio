'use client';

import { AuthProvider } from '../context/AuthContext';
import Navbar from './Navbar';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <AuthProvider>
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
    </AuthProvider>
  );
}