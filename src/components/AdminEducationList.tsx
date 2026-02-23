"use client";
import { useLanguage } from '../context/LanguageContext';

export default function AdminEducationList({educationList, handleDelete, handleEdit}) {
  const { t } = useLanguage();
  return (
    <div className="lg:col-span-2 space-y-4">
      {educationList.map((edu) => {
        const { language } = useLanguage();
        const translation = edu.translations?.find((t: any) => t.language === language);
        return (
          <div key={edu.id} className="glass-card p-6 rounded-2xl relative group">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(edu)}
                className="text-gray-500 hover:text-primary-400 bg-dark-700 rounded-full p-2 shadow-md"
                style={{ zIndex: 2 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(edu.id)}
                className="text-gray-500 hover:text-red-500 bg-dark-700 rounded-full p-2 shadow-md"
                style={{ zIndex: 2 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <h3 className="text-xl font-bold text-white">{translation?.degree || <span className="italic text-gray-400">No translation</span>}</h3>
            <p className="text-primary-400 text-lg mb-2">{translation?.institution || <span className="italic text-gray-400">No translation</span>}</p>
            <p className="text-sm text-gray-400">
              {new Date(edu.startDate).toLocaleDateString()} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : t('admin.education.present')}
            </p>
            {translation?.description && (
              <p className="text-gray-300 mt-2 whitespace-pre-line">{translation.description}</p>
            )}
          </div>
        );
      })}
      {educationList.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          {t('admin.education.empty')}
        </div>
      )}
    </div>
  );
}
