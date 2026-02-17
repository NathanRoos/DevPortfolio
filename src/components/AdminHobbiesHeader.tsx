"use client";
import { useLanguage } from '../context/LanguageContext';

export default function AdminHobbiesHeader() {
  const { t } = useLanguage();
  return (
    <div className="mb-12 text-center animate-fade-in">
      <h2 className="text-5xl font-black gradient-text mb-4">🎭 {t('admin.hobbies.title')}</h2>
      <p className="text-xl text-gray-300">{t('admin.hobbies.subtitle')}</p>
    </div>
  );
}
