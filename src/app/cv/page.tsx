"use client";
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function CVPage() {
  const { t } = useLanguage();
  const [cvUrl, setCvUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    const fetchCV = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nathandevprogrammer.info';
      const res = await fetch(`${baseUrl}/api/cv`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setCvUrl(data.url);
        if (data.url && data.url.includes('cloudinary.com')) {
          setPreviewUrl(
            data.url
              .replace('/raw/upload/', '/image/upload/pg_1,w_900/')
              .replace(/\.pdf($|\?)/, '.png$1')
          );
        }
      }
    };
    fetchCV();
  }, []);

  return (
    <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-black gradient-text mb-6">{t('cv.title')}</h1>
            <div className="h-1 w-32 bg-gradient-to-r from-primary-500 to-neon-orange mx-auto mb-6 animate-bar-reveal"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('cv.intro')}
          </p>
        </div>
        <div className="flex flex-col items-center gap-8">
          {cvUrl ? (
            <>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 mb-4 bg-primary-600 text-white font-semibold rounded-lg shadow hover:bg-primary-500 transition text-lg"
              >
                  {t('cv.button')}
              </a>
            </>
          ) : (
            <div className="py-12 text-center text-gray-400 text-xl font-semibold glass-card rounded-2xl">
              No CV available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
