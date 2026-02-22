'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '../../components/ProjectCard';
import { useLanguage } from '../../context/LanguageContext';

interface Project {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  liveUrl: string;
  tags: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  language: string;
}

export default function Projects() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async (lang: string) => {
    try {
      const response = await fetch(`/api/projects?lang=${lang}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      // Ensure each project has translation fields
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const { language } = useLanguage();
  useEffect(() => {
    fetchProjects(language);
  }, [language]);

  if (loading) {
    return (
      <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30"></div>
        <div className="relative z-10 flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-neon-orange/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-black gradient-text mb-6">{t('projects.title')}</h1>
            <div className="h-1 w-24 bg-gradient-to-r from-primary-500 to-neon-orange mx-auto mb-6 animate-bar-reveal"></div>
          </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('projects.intro')}
              <span className="text-white font-semibold"> {t('projects.tagline')}</span>
            </p>
        </div>

        {projects.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <svg className="w-16 h-16 text-primary-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-4">{t('projects.comingSoon')}</h3>
            <p className="text-gray-300">
              {t('projects.empty')}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}