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
              <li key={exp.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between relative group">
                <div>
                  <div className="font-bold text-lg text-primary-400">
                    {translation?.position || <span className="italic text-gray-400">No translation</span>} @ {translation?.company || <span className="italic text-gray-400">No translation</span>}
                  </div>
                  <div className="text-gray-300 text-sm mb-1">{exp.location} | {exp.startDate} - {exp.endDate || t('admin.experience.present')}</div>
                  <div className="text-gray-400 text-sm">{translation?.description || <span className="italic text-gray-400">No translation</span>}</div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="text-gray-500 hover:text-primary-400 bg-dark-700 rounded-full p-2 shadow-md"
                    style={{ zIndex: 2 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="text-gray-500 hover:text-red-500 bg-dark-700 rounded-full p-2 shadow-md"
                    style={{ zIndex: 2 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
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
