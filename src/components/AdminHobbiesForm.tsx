"use client";
import { useLanguage } from '../context/LanguageContext';

export default function AdminHobbiesForm({ formData, setFormData, handleSubmit, iconFile, setIconFile }) {
  const { t } = useLanguage();
  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 rounded-2xl h-fit">
      <h3 className="text-2xl font-bold text-white mb-6">{t('admin.hobbies.addTitle')}</h3>
      <div className="mb-4">
        <input
          type="text"
          className="input"
          placeholder={t('admin.hobbies.namePlaceholder')}
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="input"
          placeholder={t('admin.hobbies.iconPlaceholder')}
          value={formData.icon}
          onChange={e => setFormData({ ...formData, icon: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={e => setIconFile(e.target.files?.[0] || null)}
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">{t('admin.hobbies.addButton')}</button>
    </form>
  );
}
