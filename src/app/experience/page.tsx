"use client";
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function ExperiencePage() {
  const { t } = useLanguage();
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const res = await fetch('/api/experience');
      if (res.ok) {
        setExperiences(await res.json());
      }
    }
    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-black gradient-text mb-6">{t('experience.title')}</h1>
            <div className="h-1 w-32 bg-gradient-to-r from-primary-500 to-neon-orange mx-auto mb-6 animate-bar-reveal"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('experience.intro')}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-neon-orange to-primary-900 opacity-30 transform -translate-x-1/2"></div>

          <div className="space-y-12">
            {experiences.length === 0 ? (
               <div className="text-center text-gray-400 py-12 glass-card rounded-2xl relative z-10">
                {t('experience.empty')}
              </div>
            ) : (
              experiences.map((exp, index) => (
                <div key={exp.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-dark-900 border-2 border-neon-orange rounded-full transform -translate-x-1/2 z-10 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(255,107,0,0.5)]"></div>
                  
                  {/* Content Card */}
                  <div className="w-full md:w-5/12 ml-20 md:ml-0 pl-0">
                    <div className="glass-card p-6 rounded-2xl border border-primary-500/10 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex flex-col mb-4">
                        <span className="text-neon-orange font-mono text-sm mb-1">
                          {new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Present'}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-1">{exp.position}</h3>
                        <h4 className="text-lg text-primary-300 font-medium flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                          {exp.company}
                        </h4>
                        {exp.location && (
                           <span className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                              {exp.location}
                           </span>
                        )}
                      </div>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
