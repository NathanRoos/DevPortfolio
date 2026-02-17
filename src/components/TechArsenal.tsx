"use client";
import { useLanguage } from '../context/LanguageContext';

export default function TechArsenal() {
  const { t } = useLanguage();
  const techs = [
    'Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 
    'Prisma', 'Auth0', 'Kubernetes', 'Docker', 'Tailwind CSS'
  ];
  return (
    <div className="text-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
      <h3 className="text-4xl font-bold gradient-text mb-4 drop-shadow-lg pb-2">{t('home.techArsenal')}</h3>
      <div className="mb-12"></div>
      <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
        {techs.map((tech, index) => (
          <div 
            key={tech} 
            className={`glass-card px-6 py-4 text-sm font-mono text-primary-300 hover:text-primary-200 hover:bg-primary-500/10 transition-all duration-300 animate-scale-in whitespace-nowrap flex items-center justify-center min-h-[48px]`}
            style={{ animationDelay: `${1.4 + index * 0.1}s` }}
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
