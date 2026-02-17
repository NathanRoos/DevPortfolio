"use client";
import { useLanguage } from '../context/LanguageContext';

export default function AdminExperienceForm({ formData, setFormData, handleSubmit }) {
  const { t } = useLanguage();
  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 rounded-2xl h-fit">
      <h3 className="text-2xl font-bold text-white mb-6">{t('admin.experience.addTitle')}</h3>
      <div className="mb-4">
        <input
          type="text"
          className="input"
          placeholder={t('admin.experience.positionPlaceholder')}
          value={formData.position}
          onChange={e => setFormData({ ...formData, position: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="input"
          placeholder={t('admin.experience.companyPlaceholder')}
          value={formData.company}
          onChange={e => setFormData({ ...formData, company: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="input"
          placeholder={t('admin.experience.locationPlaceholder')}
          value={formData.location}
          onChange={e => setFormData({ ...formData, location: e.target.value })}
          required
        />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <input
          type="date"
          className="input"
          placeholder={t('admin.experience.startDate')}
          value={formData.startDate}
          onChange={e => setFormData({ ...formData, startDate: e.target.value })}
          required
        />
        <input
          type="date"
          className="input"
          placeholder={t('admin.experience.endDate')}
          value={formData.endDate}
          onChange={e => setFormData({ ...formData, endDate: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <textarea
          className="input"
          placeholder={t('admin.experience.descriptionPlaceholder')}
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">{t('admin.experience.addButton')}</button>
    </form>
  );
}
