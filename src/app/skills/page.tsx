"use client";
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function SkillsPage() {
  const { t } = useLanguage();
  const [skills, setSkills] = useState<any[]>([]);
  const [skillsByCategory, setSkillsByCategory] = useState<Record<string, any[]>>({});

  useEffect(() => {
    async function fetchSkills() {
      const res = await fetch('/api/skills');
      if (res.ok) {
        const fetchedSkills = await res.json();
        setSkills(fetchedSkills);
        // Group skills by category
        const grouped: Record<string, any[]> = {};
        fetchedSkills.forEach((skill: any) => {
          if (!grouped[skill.category]) grouped[skill.category] = [];
          grouped[skill.category].push(skill);
        });
        setSkillsByCategory(grouped);
      }
    }
    fetchSkills();
  }, []);

  return (
    <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-black gradient-text mb-6">{t('skills.title')}</h1>
            <div className="h-1 w-32 bg-gradient-to-r from-primary-500 to-neon-orange mx-auto mb-6 animate-bar-reveal"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('skills.intro')}
          </p>
        </div>

        <div className="space-y-12 mb-20">
          {Object.keys(skillsByCategory).length === 0 ? (
            <div className="text-center text-gray-400 py-12 glass-card rounded-2xl">
              {t('skills.empty')}
            </div>
          ) : (
            Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="glass-card p-8 rounded-2xl animate-slide-up">
                <h2 className="text-3xl font-bold text-white mb-8 border-b border-primary-500/30 pb-4 inline-block">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorySkills.map((skill) => {
                    const { language } = useLanguage();
                    const translation = skill.translations?.find((t: any) => t.language === language);
                    return (
                      <div key={skill.id} className="bg-dark-800/50 p-6 rounded-xl hover:bg-dark-700/50 transition-colors border border-primary-500/10 hover:border-primary-500/30 group">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                            {translation?.name || <span className="italic text-gray-400">No translation</span>}
                          </h3>
                          {skill.icon && <span className="text-2xl">{skill.icon}</span>}
                        </div>
                        <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-300 bg-primary-500/10">
                              {t('skills.proficiencyLabel')}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-primary-300">
                              {skill.proficiency}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-dark-900 border border-gray-700">
                          <div
                            style={{ width: `${skill.proficiency}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-primary-600 to-neon-orange transition-all duration-1000 ease-out"
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
