"use client";
import { useLanguage } from '../context/LanguageContext';

export default function AdminEducationForm({formData, setFormData, handleSubmit, editId}) {
  const { t } = useLanguage();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        endDate: formData.endDate || null
      };
      let response;
      if (editId) {
        response = await fetch(`/api/education/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        });
      } else {
        response = await fetch('/api/education', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        });
      }
      if (response.ok) {
        setFormData({
          en: { degree: '', institution: '', description: '' },
          fr: { degree: '', institution: '', description: '' },
          startDate: '',
          endDate: ''
        });
        // Optionally reset editId in parent
      }
    } catch (error) {
      console.error('Error submitting education:', error);
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl h-fit">
      <h3 className="text-2xl font-bold text-white mb-6">{editId ? 'Edit Education' : t('admin.education.addTitle')}</h3>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={t('admin.education.degreePlaceholder') + ' (EN)'}
            value={formData.en.degree}
            onChange={e => setFormData({ ...formData, en: { ...formData.en, degree: e.target.value } })}
            className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white"
            required
          />
          <input
            type="text"
            placeholder={t('admin.education.degreePlaceholder') + ' (FR)'}
            value={formData.fr.degree}
            onChange={e => setFormData({ ...formData, fr: { ...formData.fr, degree: e.target.value } })}
            className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={t('admin.education.institutionPlaceholder') + ' (EN)'}
            value={formData.en.institution}
            onChange={e => setFormData({ ...formData, en: { ...formData.en, institution: e.target.value } })}
            className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white"
            required
          />
          <input
            type="text"
            placeholder={t('admin.education.institutionPlaceholder') + ' (FR)'}
            value={formData.fr.institution}
            onChange={e => setFormData({ ...formData, fr: { ...formData.fr, institution: e.target.value } })}
            className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <textarea
            placeholder={t('admin.education.descriptionPlaceholder') + ' (EN)'}
            value={formData.en.description}
            onChange={e => setFormData({ ...formData, en: { ...formData.en, description: e.target.value } })}
            className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white h-24"
          />
          <textarea
            placeholder={t('admin.education.descriptionPlaceholder') + ' (FR)'}
            value={formData.fr.description}
            onChange={e => setFormData({ ...formData, fr: { ...formData.fr, description: e.target.value } })}
            className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white h-24"
          />
        </div>
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
        <button
          type="submit"
          className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg transition-colors"
        >
          {editId ? 'Save Changes' : t('admin.education.addButton')}
        </button>
      </form>
    </div>
  );
}
