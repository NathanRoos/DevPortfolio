"use client";
import { useLanguage } from '../context/LanguageContext';

export default function AdminExperienceForm({ formData, setFormData, handleSubmit, editId, setEditId }) {
  const { t } = useLanguage();
  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 rounded-2xl h-fit">
      <h3 className="text-2xl font-bold text-white mb-6">{editId ? t('admin.experience.editTitle') : t('admin.experience.addTitle')}</h3>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            className="input"
            placeholder={t('admin.experience.positionPlaceholder') + ' (EN)'}
            value={formData.en.position}
            onChange={e => setFormData({ ...formData, en: { ...formData.en, position: e.target.value } })}
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="input"
            placeholder={t('admin.experience.positionPlaceholder') + ' (FR)'}
            value={formData.fr.position}
            onChange={e => setFormData({ ...formData, fr: { ...formData.fr, position: e.target.value } })}
            required
          />
        </div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            className="input"
            placeholder={t('admin.experience.companyPlaceholder') + ' (EN)'}
            value={formData.en.company}
            onChange={e => setFormData({ ...formData, en: { ...formData.en, company: e.target.value } })}
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="input"
            placeholder={t('admin.experience.companyPlaceholder') + ' (FR)'}
            value={formData.fr.company}
            onChange={e => setFormData({ ...formData, fr: { ...formData.fr, company: e.target.value } })}
            required
          />
        </div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <textarea
            className="input"
            placeholder={t('admin.experience.descriptionPlaceholder') + ' (EN)'}
            value={formData.en.description}
            onChange={e => setFormData({ ...formData, en: { ...formData.en, description: e.target.value } })}
            required
          />
        </div>
        <div>
          <textarea
            className="input"
            placeholder={t('admin.experience.descriptionPlaceholder') + ' (FR)'}
            value={formData.fr.description}
            onChange={e => setFormData({ ...formData, fr: { ...formData.fr, description: e.target.value } })}
            required
          />
        </div>
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
      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary w-full">{editId ? t('admin.experience.editSaveButton') : t('admin.experience.addButton')}</button>
        {editId && (
          <button type="button" className="btn btn-secondary w-full" onClick={() => { setEditId(null); setFormData({ en: { position: '', company: '', description: '' }, fr: { position: '', company: '', description: '' }, startDate: '', endDate: '', location: '' }); }}>
            {t('admin.experience.editCancelButton')}
          </button>
        )}
      </div>
    </form>
  );
}
