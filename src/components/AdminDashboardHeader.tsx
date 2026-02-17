"use client";
import { useLanguage } from '../context/LanguageContext';

export default function AdminDashboardHeader() {
  const { t } = useLanguage();
  return (
    <div className="mb-12 text-center animate-fade-in">
      <h2 className="text-5xl font-black gradient-text mb-4">{t('admin.dashboard.welcome')}</h2>
      <p className="text-xl text-gray-300">
        {t('admin.dashboard.manage')}
        <span className="gradient-text-alt font-semibold"> {t('admin.dashboard.features')}</span>
      </p>
    </div>
  );
}
