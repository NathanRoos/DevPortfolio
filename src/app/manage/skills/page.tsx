'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import ManageGuard from '../../../components/AdminGuard';

interface SkillTranslation {
  id: string;
  skillId: string;
  language: string;
  name: string;
}

interface Skill {
  id: string;
  category: string;
  proficiency: number;
  translations: SkillTranslation[];
}

export default function AdminSkills() {
    const { t } = useLanguage();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    en: { name: '' },
    fr: { name: '' },
    category: 'Frontend',
    proficiency: 50
  });

  const categories = [
    t('admin.skills.category.frontend'),
    t('admin.skills.category.backend'),
    t('admin.skills.category.devops'),
    t('admin.skills.category.mobile'),
    t('admin.skills.category.other')
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        category: formData.category,
        proficiency: formData.proficiency,
        translations: [
          { name: formData.en.name, language: 'en' },
          { name: formData.fr.name, language: 'fr' }
        ]
      };
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormData({ en: { name: '' }, fr: { name: '' }, category: 'Frontend', proficiency: 50 });
        fetchSkills();
      }
    } catch (error) {
      console.error('Error creating skill:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('admin.skills.confirmDelete'))) return;
    
    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSkills();
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  return (
    <ManageGuard>
      <div>
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-5xl font-black gradient-text mb-4">🎨 {t('admin.skills.title')}</h2>
          <p className="text-xl text-gray-300">{t('admin.skills.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Skill Form */}
          <div className="glass-card p-6 rounded-2xl h-fit">
            <h3 className="text-2xl font-bold text-white mb-6">{t('admin.skills.addTitle')}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">English Name</label>
                  <input
                    type="text"
                    value={formData.en.name}
                    onChange={(e) => setFormData({ ...formData, en: { name: e.target.value } })}
                    className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">French Name</label>
                  <input
                    type="text"
                    value={formData.fr.name}
                    onChange={(e) => setFormData({ ...formData, fr: { name: e.target.value } })}
                    className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">{t('admin.skills.categoryLabel')}</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  {t('admin.skills.proficiencyLabel')} ({formData.proficiency}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                  className="w-full h-2 bg-dark-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg transition-colors"
              >
                {t('admin.skills.addButton')}
              </button>
            </form>
          </div>

          {/* Skills List */}
          <div className="lg:col-span-2 space-y-6">
            {categories.map(category => {
              const categorySkills = skills.filter(s => s.category === category);
              if (categorySkills.length === 0) return null;

              return (
                <div key={category} className="glass-card p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categorySkills.map(skill => (
                      <div key={skill.id} className="bg-dark-800/50 p-4 rounded-xl flex justify-between items-center group">
                        <div>
                          {(() => {
                            const { language } = useLanguage();
                            const translation = skill.translations?.find((t: any) => t.language === language);
                            return (
                              <p className="font-semibold text-white">
                                {translation?.name || <span className="italic text-gray-400">No translation</span>}
                              </p>
                            );
                          })()}
                          <div className="w-24 h-1.5 bg-gray-700 rounded-full mt-2 overflow-hidden">
                            <div 
                              className="h-full bg-primary-500 rounded-full"
                              style={{ width: `${skill.proficiency}%` }}
                            ></div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(skill.id)}
                          className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            
            {skills.length === 0 && !loading && (
              <div className="text-center text-gray-500 py-12">
                {t('admin.skills.empty')}
              </div>
            )}
          </div>
        </div>
      </div>
    </ManageGuard>
  );
}