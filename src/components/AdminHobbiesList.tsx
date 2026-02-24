"use client";
import { useLanguage } from '../context/LanguageContext';

export default function AdminHobbiesList({ hobbies, handleDelete }) {
  const { t } = useLanguage();
  return (
    <div className="glass-card p-6 rounded-2xl col-span-2">
      <h3 className="text-2xl font-bold text-white mb-6">{t('admin.hobbies.listTitle')}</h3>
      {hobbies.length === 0 ? (
        <div className="text-gray-400 text-center py-8">{t('admin.hobbies.empty')}</div>
      ) : (
        <ul className="divide-y divide-dark-700">
          {hobbies.map(hobby => (
            <li key={hobby.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                {hobby.icon && (
                  <img
                    src={hobby.icon}
                    alt={hobby.name}
                    className="w-32 h-32 object-cover rounded"
                    style={{ background: '#222' }}
                  />
                )}
                <span className="font-bold text-lg text-primary-400">{hobby.name}</span>
              </div>
              <button
                className="btn btn-danger mt-2 md:mt-0"
                onClick={() => handleDelete(hobby.id)}
              >
                {t('admin.hobbies.deleteButton')}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
