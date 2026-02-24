"use client";

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const { t } = useLanguage();
  const [siteInfo, setSiteInfo] = useState({ homeTitle: '', homeDescription: '' });

  useEffect(() => {
    fetch('/api/info')
      .then(res => res.json())
      .then(data => {
        setSiteInfo({
          homeTitle: data.homeTitle || '',
          homeDescription: data.homeDescription || ''
        });
      });
  }, []);

  return (
    <div className="text-center mb-20 animate-fade-in">
      <div className="mb-8 animate-slide-up">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl transform -skew-y-1"></div>
          <h1 className="relative text-7xl md:text-8xl font-black mb-6 text-white drop-shadow-2xl px-8 py-4" style={{
            textShadow: '0 0 40px rgba(0,0,0,1), 0 6px 12px rgba(0,0,0,1), 0 0 80px rgba(255,255,255,0.3)',
            filter: 'contrast(1.2) brightness(1.1)'
          }}>
            {t('home.name')}
          </h1>
        </div>
        <div className="h-1 w-32 bg-gradient-to-r from-primary-500 to-neon-orange mx-auto mb-6 animate-bar-reveal"></div>
      </div>
      <h2 className="text-2xl md:text-3xl font-medium mb-8 animate-slide-up drop-shadow-2xl" style={{ 
        animationDelay: '0.3s',
        textShadow: '0 0 20px rgba(0,0,0,1), 0 4px 8px rgba(0,0,0,1)'
      }}>
        <span className="font-mono text-neon-orange font-bold drop-shadow-lg">&lt;</span>
        <span className="text-white font-bold">
          {siteInfo.homeTitle || t('home.title')}
        </span>
        <span className="font-mono text-neon-orange font-bold drop-shadow-lg">/&gt;</span>
      </h2>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.6s' }}>
        {siteInfo.homeDescription || t('home.subtitle')}
        <span className="text-white font-semibold"> {t('home.stack')}</span>
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.9s' }}>
        <Link 
          href="/projects" 
          className="group px-6 py-3 text-base font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-500 transition-all duration-300 shadow-lg shadow-primary-500/20 flex items-center justify-center"
        >
          <span className="flex items-center justify-center gap-2">
            <span>{t('home.exploreProjects')}</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </Link>
        <Link 
          href="/contact" 
          className="group px-6 py-3 text-base font-medium text-primary-300 border border-primary-500/50 rounded-lg hover:bg-primary-500/10 hover:border-primary-400 hover:text-primary-200 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
        >
          <span className="flex items-center justify-center gap-2">
            <span>{t('home.getInTouch')}</span>
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}
