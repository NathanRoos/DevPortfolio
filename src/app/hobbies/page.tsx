"use client";
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function HobbiesPage() {
  const { t } = useLanguage();
  const [hobbies, setHobbies] = useState<any[]>([]);

  useEffect(() => {
    async function fetchHobbies() {
      const res = await fetch('/api/hobbies');
      if (res.ok) {
        setHobbies(await res.json());
      }
    }
    fetchHobbies();
  }, []);

  return (
    <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-black gradient-text mb-6">{t('hobbies.title')}</h1>
            <div className="h-1 w-32 bg-gradient-to-r from-primary-500 to-neon-orange mx-auto mb-6 animate-bar-reveal"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('hobbies.intro')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {hobbies.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12 glass-card rounded-2xl">
              {t('hobbies.empty')}
            </div>
          ) : (
            hobbies.map((hobby, index) => {
              const isUrl = typeof hobby.icon === 'string' && hobby.icon.startsWith('http');
              return (
                <div key={hobby.id} className="glass-card p-6 rounded-2xl animate-scale-in text-center group hover:bg-primary-500/10 transition-colors duration-300 transform hover:scale-105" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="mb-4 flex justify-center">
                    {isUrl ? (
                      <img
                        src={hobby.icon}
                        alt={hobby.name}
                        className="w-40 h-40 object-contain rounded"
                        style={{ background: '#222' }}
                      />
                    ) : (
                      <span className="text-6xl transform transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300">{hobby.icon || '✨'}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-primary-300 transition-colors">
                    {hobby.name}
                  </h3>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
