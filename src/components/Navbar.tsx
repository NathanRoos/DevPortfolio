'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUser } from '../context/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { user, error, isLoading, logout } = useUser();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(currentScrollY);
          setScrolled(currentScrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dynamic opacity and blur based on scroll position
  const navOpacity = Math.min(scrollY / 100, 0.95);
  const blurIntensity = Math.min(scrollY / 50, 20);
  
  return (
    <nav 
      className="fixed w-full z-50 smooth-navbar"
      style={{
        backgroundColor: `rgba(10, 10, 10, ${navOpacity})`,
        backdropFilter: `blur(${blurIntensity}px) saturate(180%)`,
        WebkitBackdropFilter: `blur(${blurIntensity}px) saturate(180%)`,
        borderBottom: scrolled ? '1px solid rgba(240, 160, 75, 0.2)' : '1px solid transparent',
        boxShadow: scrolled 
          ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
          : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <div>
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <span className="font-black text-3xl gradient-text hover:scale-105 transition-transform duration-300 pulse-glow">
                    NR
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-neon-orange rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
                </div>
                <div className="ml-3 hidden sm:block">
                  <span className="text-white font-bold text-lg drop-shadow-lg">Nathan Roos</span>
                  <div className="text-xs text-neon-orange font-mono font-semibold drop-shadow-md">&lt;DevOps Developer/&gt;</div>
                </div>
              </Link>
            </div>
            
            <div className="hidden lg:flex items-center space-x-1">
              {[
                { href: '/projects', label: 'Projects' },
                { href: '/skills', label: 'Skills' },
                { href: '/experience', label: 'Experience' },
                { href: '/education', label: 'Education' },
                { href: '/hobbies', label: 'Hobbies' },
                { href: '/testimonials', label: 'Testimonials' },
                { href: '/contact', label: 'Contact' }
              ].map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="group px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 relative overflow-hidden rounded-lg"
                >
                  <span className="relative z-10 font-medium">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-neon-orange/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-neon-orange group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-4">
            {isLoading && (
              <div className="flex items-center space-x-2 text-primary-300">
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-mono">Loading...</span>
              </div>
            )}
            {error && (
              <span className="text-red-400 text-sm font-mono bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20">
                Error loading user
              </span>
            )}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-right hidden md:block">
                  <div className="text-sm font-medium text-white">{user.name || 'Admin'}</div>
                  <div className="text-xs text-primary-400 font-mono">authenticated</div>
                </div>
                <Link 
                  href="/admin/dashboard" 
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-500 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-primary-400 hover:text-white border border-primary-500/30 hover:border-primary-400 rounded-lg transition-all duration-300 hover:bg-primary-500/10 backdrop-blur-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/api/auth/login" 
                prefetch={false}
                className="group px-6 py-2 text-sm font-medium text-primary-400 hover:text-white border border-primary-500/30 hover:border-primary-400 rounded-lg transition-all duration-300 hover:bg-primary-500/10 backdrop-blur-sm relative overflow-hidden"
              >
                <span className="relative z-10">Admin Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-neon-orange/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-primary-500/10 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out transform-gpu ${
          isMenuOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
        } overflow-hidden`}>
          <div className="glass-card m-4 p-6 space-y-4 will-change-transform">
            {[
              { href: '/projects', label: 'Projects' },
              { href: '/testimonials', label: 'Testimonials' },
              { href: '/contact', label: 'Contact' },
              { href: '/architecture', label: 'Architecture' }
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-primary-500/10 rounded-lg transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {user ? (
              <div className="pt-4 border-t border-primary-500/20 space-y-3">
                <Link 
                  href="/admin/dashboard"
                  className="block px-4 py-3 text-center bg-gradient-to-r from-primary-500 to-neon-orange text-dark-900 font-semibold rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="w-full px-4 py-3 text-primary-400 border border-primary-500/30 rounded-lg font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                prefetch={false}
                href="/api/auth/login"
                className="block px-4 py-3 text-center text-primary-400 border border-primary-500/30 rounded-lg font-medium mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}