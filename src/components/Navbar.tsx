'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUser } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, error, isLoading, logout } = useUser();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navMenu = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: language === 'fr' ? '\u00C0 propos' : 'About' },
    { href: '/projects', label: t('nav.projects') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-white font-bold text-xl">Nathan Roos</span>
            <span className="hidden sm:inline text-xs text-primary-500 font-mono opacity-70">
              &lt;DevOps/&gt;
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-gray-400 hover:text-white border border-white/[0.06] hover:border-white/10 rounded-lg transition-all duration-200"
              title={language === 'en' ? 'Passer en fran\u00e7ais' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5" />
              {language === 'en' ? 'FR' : 'EN'}
            </button>

            {/* Auth */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  <Link
                    href="/manage/dashboard"
                    className="px-3.5 py-1.5 text-sm font-medium text-dark-950 bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="px-3.5 py-1.5 text-sm text-gray-400 hover:text-white border border-white/[0.06] rounded-lg hover:border-white/10 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/api/auth/login"
                  prefetch={false}
                  className="px-3.5 py-1.5 text-sm text-gray-400 hover:text-white border border-white/[0.06] rounded-lg hover:border-primary-500/30 transition-all"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-[60vh] opacity-100 pb-4' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="pt-2 space-y-1">
            {navMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-all font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-3 mt-3 border-t border-white/[0.06] space-y-2">
              {user ? (
                <>
                  <Link
                    href="/manage/dashboard"
                    className="block px-4 py-3 text-center text-dark-950 bg-primary-500 rounded-lg font-medium text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="w-full px-4 py-3 text-gray-400 border border-white/[0.06] rounded-lg text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/api/auth/login"
                  prefetch={false}
                  className="block px-4 py-3 text-center text-gray-400 border border-white/[0.06] rounded-lg text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
