"use client";
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function FeatureCards() {
  const { t } = useLanguage();
  const cards = [
    {
      title: t('home.projects'),
      description: t('home.projectsDesc'),
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      href: "/projects",
      delay: "0s"
    },
    {
      title: t('home.cv'),
      description: t('home.cvDesc'),
      icon: "M12 4v16m8-8H4",
      href: "/cv",
      delay: "0.1s"
    },
    {
      title: t('home.testimonials'),
      description: t('home.testimonialsDesc'),
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
      href: "/testimonials",
      delay: "0.2s"
    },
    {
      title: t('home.contact'),
      description: t('home.contactDesc'),
      icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      href: "/contact",
      delay: "0.4s"
    },
    {
      title: t('home.architecture'),
      description: t('home.architectureDesc'),
      icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
      href: "/architecture",
      delay: "0.6s"
    }
  ];
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
      {cards.map((card) => (
        <Link key={card.title} href={card.href} className={`glass-card p-8 group hover:scale-[1.02] transition-all duration-300 animate-slide-up`} style={{ animationDelay: card.delay }}>
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-neon-orange rounded-2xl mb-6 transition-transform duration-300">
            <svg className="w-8 h-8 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors">{card.title}</h3>
          <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{card.description}</p>
        </Link>
      ))}
    </div>
  );
}
