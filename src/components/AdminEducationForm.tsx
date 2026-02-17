"use client";
import { useLanguage } from '../../../context/LanguageContext';

export default function AdminEducationForm({formData, setFormData, handleSubmit}) {
  const { t } = useLanguage();
  return (
    <div className="glass-card p-6 rounded-2xl h-fit">
      <h3 className="text-2xl font-bold text-white mb-6">{t('admin.education.addTitle')}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder={t('admin.education.degreePlaceholder')}
          value={formData.degree}
          onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
          className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white"
          required
        />
        <input
          type="text"
          placeholder={t('admin.education.institutionPlaceholder')}
          value={formData.institution}
          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
          className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-400">{t('admin.education.startDate')}</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="text-xs text-gray-400">{t('admin.education.endDate')}</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white"
            />
          </div>
        </div>
        <textarea
          placeholder={t('admin.education.descriptionPlaceholder')}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white h-24"
        />
        <button
          type="submit"
          className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg transition-colors"
        >
          {t('admin.education.addButton')}
        </button>
      </form>
    </div>
  );
}
