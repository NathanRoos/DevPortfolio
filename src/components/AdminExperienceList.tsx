"use client";
import { useLanguage } from '../context/LanguageContext';

export default function AdminExperienceList({ experiences, handleDelete, handleEdit }) {
  const { t } = useLanguage();
  return (
    <div className="glass-card p-6 rounded-2xl col-span-2">
      <h3 className="text-2xl font-bold text-white mb-6">{t('admin.experience.listTitle')}</h3>
      {experiences.length === 0 ? (
        <div className="text-gray-400 text-center py-8">{t('admin.experience.empty')}</div>
      ) : (
        <ul className="divide-y divide-dark-700">
          {experiences.map(exp => {
            const { language } = useLanguage();
            const translation = exp.translations?.find((t: any) => t.language === language);
            return (
              <li key={exp.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-bold text-lg text-primary-400">
                    {translation?.position || <span className="italic text-gray-400">No translation</span>} @ {translation?.company || <span className="italic text-gray-400">No translation</span>}
                  </div>
                  <div className="text-gray-300 text-sm mb-1">{exp.location} | {exp.startDate} - {exp.endDate || t('admin.experience.present')}</div>
                  <div className="text-gray-400 text-sm">{translation?.description || <span className="italic text-gray-400">No translation</span>}</div>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleEdit(exp)}
                  >
                    {t('admin.experience.editButton')}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(exp.id)}
                  >
                    {t('admin.experience.deleteButton')}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
