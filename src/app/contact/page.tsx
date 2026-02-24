
"use client";
import ContactForm from '../../components/ContactForm';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect, useState } from 'react';

export default function Contact() {
  const { t } = useLanguage();
  const [siteInfo, setSiteInfo] = useState({ contactEmail: '', helpInfo: '' });
  useEffect(() => {
    fetch('/api/info')
      .then(res => res.json())
      .then(data => setSiteInfo({
        contactEmail: data.contactEmail || '',
        helpInfo: data.helpInfo || ''
      }));
  }, []);
  return (
    <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-neon-orange/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-black gradient-text mb-6">{t('contact.title')}</h1>
            <div className="h-1 w-32 bg-gradient-to-r from-primary-500 to-neon-orange mx-auto mb-6 animate-bar-reveal"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('contact.intro')}
            <span className="text-white font-semibold"> {t('contact.collabTagline')}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 gradient-text">{t('contact.connectTitle')}</h2>
            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-neon-orange rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-white mb-2">{t('contact.emailTitle')}</h3>
                  <p className="text-primary-400 hover:text-primary-300 transition-colors cursor-pointer">{siteInfo.contactEmail || 'nathan.roos@example.com'}</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-neon-orange rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-white mb-2">{t('contact.locationTitle')}</h3>
                  <p className="text-gray-300">{t('contact.locationDesc')}</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-neon-orange rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-white mb-2">{t('contact.responseTitle')}</h3>
                  <p className="text-gray-300">{t('contact.responseDesc')}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-primary-500/20">
              <h3 className="text-xl font-bold text-white mb-6 gradient-text">{t('contact.helpTitle')}</h3>
              <div className="text-gray-300 whitespace-pre-line">{siteInfo.helpInfo}</div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}