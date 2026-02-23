"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import AdminGuard from '../../../components/AdminGuard';

interface EditState {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  liveUrl: string;
  tags: string;
}

interface ProjectTranslation {
  id: string;
  projectId: string;
  title: string;
  description: string;
  repoUrl: string;
  liveUrl: string;
  language: string;
}

interface Project {
  id: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  translations: ProjectTranslation[];
}

export default function AdminProjects() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tags: '', // Will be converted to array
    en: {
      title: '',
      description: '',
      repoUrl: '',
      liveUrl: '',
    },
    fr: {
      title: '',
      description: '',
      repoUrl: '',
      liveUrl: '',
    }
  });
  const [submitting, setSubmitting] = useState(false);
  const [editState, setEditState] = useState<EditState | null>(null);
  const [editSubmitting, setEditSubmitting] = useState(false);

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      tags: e.target.value
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editState) return;
    setEditSubmitting(true);
    try {
      const tagsArray = editState.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const response = await fetch('/api/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editState.id,
          title: editState.title,
          description: editState.description,
          repoUrl: editState.repoUrl,
          liveUrl: editState.liveUrl,
          tags: tagsArray
        }),
      });
      if (!response.ok) throw new Error('Failed to update project');
      setEditState(null);
      await fetchProjects();
    } catch (error) {
      alert('Failed to update project');
    } finally {
      setEditSubmitting(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const payload = {
        tags: tagsArray,
        translations: [
          {
            title: formData.en.title,
            description: formData.en.description,
            repoUrl: formData.en.repoUrl,
            liveUrl: formData.en.liveUrl,
            language: 'en'
          },
          {
            title: formData.fr.title,
            description: formData.fr.description,
            repoUrl: formData.fr.repoUrl,
            liveUrl: formData.fr.liveUrl,
            language: 'fr'
          }
        ]
      };
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to create project');
      
      // Reset form and refresh projects
      setFormData({
        tags: '',
        en: { title: '', description: '', repoUrl: '', liveUrl: '' },
        fr: { title: '', description: '', repoUrl: '', liveUrl: '' }
      });
      setShowForm(false);
      await fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, lang: 'en' | 'fr') => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [name]: value
      }
    }));
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <AdminGuard>
      <div>
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-5xl font-black gradient-text mb-4 flex items-center gap-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {t('admin.projects.title')}
          </h2>
          <p className="text-xl text-gray-300">{t('admin.projects.subtitle')}
            <span className="gradient-text-alt font-semibold"> • {t('admin.projects.cta')}</span>
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 shadow-neon"></div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-primary-400 flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                {t('admin.projects.sectionTitle')}
                <span className="ml-3 px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium border border-primary-500/30">
                  {projects.length}
                </span>
              </h3>
              <button 
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-400 hover:to-primary-500 transition-all duration-300 font-semibold hover:-translate-y-1 shadow-lg flex items-center gap-2"
              >
                {showForm ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {t('admin.projects.cancelButton')}
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {t('admin.projects.addButton')}
                  </>
                )}
              </button>
            </div>

            {/* Add Project Form */}
            {showForm && (
              <div className="glass-card rounded-2xl p-8 border border-primary-500/30 animate-fade-in">
                <h4 className="text-2xl font-bold gradient-text mb-6 flex items-center">
                  <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  {t('admin.projects.addTitle')}
                </h4>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* English Fields */}
                    <div className="glass-card p-4 rounded-xl border border-primary-500/20">
                      <h5 className="text-lg font-bold mb-2">English</h5>
                      <label htmlFor="en-title" className="text-sm font-semibold text-primary-400 mb-2 block">{t('admin.projects.form.title')}</label>
                      <input
                        type="text"
                        id="en-title"
                        name="title"
                        value={formData.en.title}
                        onChange={e => handleInputChange(e, 'en')}
                        className="w-full mb-3 px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400"
                        placeholder={t('admin.projects.form.titlePlaceholder')}
                        required
                      />
                      <label htmlFor="en-description" className="text-sm font-semibold text-primary-400 mb-2 block">{t('admin.projects.form.description')}</label>
                      <textarea
                        id="en-description"
                        name="description"
                        value={formData.en.description}
                        onChange={e => handleInputChange(e, 'en')}
                        rows={4}
                        className="w-full mb-3 px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400"
                        placeholder={t('admin.projects.form.descriptionPlaceholder')}
                        required
                      />
                      <label htmlFor="en-repoUrl" className="text-sm font-semibold text-primary-400 mb-2 block">{t('admin.projects.form.repoUrl')}</label>
                      <input
                        type="url"
                        id="en-repoUrl"
                        name="repoUrl"
                        value={formData.en.repoUrl}
                        onChange={e => handleInputChange(e, 'en')}
                        className="w-full mb-3 px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400"
                        placeholder={t('admin.projects.form.repoUrlPlaceholder')}
                      />
                      <label htmlFor="en-liveUrl" className="text-sm font-semibold text-primary-400 mb-2 block">{t('admin.projects.form.liveUrl')}</label>
                      <input
                        type="url"
                        id="en-liveUrl"
                        name="liveUrl"
                        value={formData.en.liveUrl}
                        onChange={e => handleInputChange(e, 'en')}
                        className="w-full px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400"
                        placeholder={t('admin.projects.form.liveUrlPlaceholder')}
                      />
                    </div>

                    {/* French Fields */}
                    <div className="glass-card p-4 rounded-xl border border-primary-500/20">
                      <h5 className="text-lg font-bold mb-2">Français</h5>
                      <label htmlFor="fr-title" className="text-sm font-semibold text-primary-400 mb-2 block">{t('admin.projects.form.title')}</label>
                      <input
                        type="text"
                        id="fr-title"
                        name="title"
                        value={formData.fr.title}
                        onChange={e => handleInputChange(e, 'fr')}
                        className="w-full mb-3 px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400"
                        placeholder={t('admin.projects.form.titlePlaceholder')}
                        required
                      />
                      <label htmlFor="fr-description" className="text-sm font-semibold text-primary-400 mb-2 block">{t('admin.projects.form.description')}</label>
                      <textarea
                        id="fr-description"
                        name="description"
                        value={formData.fr.description}
                        onChange={e => handleInputChange(e, 'fr')}
                        rows={4}
                        className="w-full mb-3 px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400"
                        placeholder={t('admin.projects.form.descriptionPlaceholder')}
                        required
                      />
                      <label htmlFor="fr-repoUrl" className="text-sm font-semibold text-primary-400 mb-2 block">{t('admin.projects.form.repoUrl')}</label>
                      <input
                        type="url"
                        id="fr-repoUrl"
                        name="repoUrl"
                        value={formData.fr.repoUrl}
                        onChange={e => handleInputChange(e, 'fr')}
                        className="w-full mb-3 px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400"
                        placeholder={t('admin.projects.form.repoUrlPlaceholder')}
                      />
                      <label htmlFor="fr-liveUrl" className="text-sm font-semibold text-primary-400 mb-2 block">{t('admin.projects.form.liveUrl')}</label>
                      <input
                        type="url"
                        id="fr-liveUrl"
                        name="liveUrl"
                        value={formData.fr.liveUrl}
                        onChange={e => handleInputChange(e, 'fr')}
                        className="w-full px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400"
                        placeholder={t('admin.projects.form.liveUrlPlaceholder')}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="tags" className="flex items-center gap-2 text-sm font-semibold text-primary-400 mb-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {t('admin.projects.form.tags')}
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleTagsChange}
                      className="w-full px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                      placeholder={t('admin.projects.form.tagsPlaceholder')}
                      required
                    />
                    <p className="text-sm text-gray-400 mt-2 flex items-center">
                      <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      {t('admin.projects.form.tagsHelp')}
                    </p>
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-300 font-semibold hover:scale-105 shadow-lg disabled:opacity-50 disabled:hover:scale-100 flex items-center"
                    >
                      {submitting ? (
                        <>
                          <svg className="w-5 h-5 animate-spin mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          {t('admin.projects.form.creating')}
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                          {t('admin.projects.form.createButton')}
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 font-semibold hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {t('admin.projects.cancelButton')}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {projects.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center border border-primary-500/20">
                <svg className="w-16 h-16 text-primary-400 mb-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-2xl font-bold text-white mb-4">{t('admin.projects.empty')}</h3>
                <p className="text-gray-300 mb-6">
                  {t('admin.projects.emptyDesc')}
                </p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-400 hover:to-primary-500 transition-all duration-300 font-semibold hover:-translate-y-1 shadow-lg flex items-center mx-auto"
                >
                  <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  {t('admin.projects.addFirstButton')}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="glass-card rounded-2xl p-8 border border-primary-500/30 hover:border-primary-400/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        {/* English Translation */}
                        <h4 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          EN: {project.translations?.find(t => t.language === 'en')?.title || <span className="italic text-gray-400">No English title</span>}
                        </h4>
                        <p className="text-gray-300 mb-2">{project.translations?.find(t => t.language === 'en')?.description || <span className="italic text-gray-500">No English description</span>}</p>
                        {/* French Translation */}
                        <h4 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          FR: {project.translations?.find(t => t.language === 'fr')?.title || <span className="italic text-gray-400">No French title</span>}
                        </h4>
                        <p className="text-gray-300 mb-2">{project.translations?.find(t => t.language === 'fr')?.description || <span className="italic text-gray-500">No French description</span>}</p>
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-lg text-sm font-medium border border-primary-500/30 hover:bg-primary-500/30 transition-all duration-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        {/* Optionally, show repoUrl/liveUrl for each language if needed */}
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2 z-10">
                        <button
                          onClick={() => {
                            const en = project.translations.find(t => t.language === 'en');
                            const fr = project.translations.find(t => t.language === 'fr');
                            setEditState({
                              id: project.id,
                              title: en?.title || '',
                              description: en?.description || '',
                              repoUrl: en?.repoUrl || '',
                              liveUrl: en?.liveUrl || '',
                              tags: project.tags.join(', ')
                            });
                          }}
                          className="text-gray-500 hover:text-primary-400 bg-dark-700 rounded-full p-2 shadow-md"
                          title={t('admin.projects.editButton')}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          className="text-gray-500 hover:text-red-500 bg-dark-700 rounded-full p-2 shadow-md"
                          title={t('admin.projects.deleteButton')}
                          onClick={async () => {
                            if (!confirm(t('admin.projects.confirmDelete'))) return;
                            try {
                              const response = await fetch('/api/projects', {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: project.id }),
                              });
                              if (response.ok) {
                                await fetchProjects();
                              } else {
                                alert('Failed to delete project');
                              }
                            } catch (err) {
                              alert('Failed to delete project');
                            }
                          }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      {/* Edit Project Modal */}
                      {editState && editState.id === project.id && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                          <div className="glass-card p-8 rounded-2xl w-full max-w-2xl relative animate-fade-in">
                            <button className="absolute top-4 right-4 text-gray-400 hover:text-red-400" onClick={() => setEditState(null)}>
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                            <h3 className="text-2xl font-bold gradient-text mb-6">Edit Project</h3>
                            <form onSubmit={handleEditSubmit} className="space-y-6">
                              <input
                                type="text"
                                placeholder="Project Title"
                                value={editState.title}
                                onChange={e => setEditState({ ...editState, title: e.target.value })}
                                className="w-full px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400"
                                required
                              />
                              <textarea
                                placeholder="Description"
                                value={editState.description}
                                onChange={e => setEditState({ ...editState, description: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400"
                                required
                              />
                              <input
                                type="url"
                                placeholder="Repository URL"
                                value={editState.repoUrl}
                                onChange={e => setEditState({ ...editState, repoUrl: e.target.value })}
                                className="w-full px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400"
                              />
                              <input
                                type="url"
                                placeholder="Live Demo URL"
                                value={editState.liveUrl}
                                onChange={e => setEditState({ ...editState, liveUrl: e.target.value })}
                                className="w-full px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400"
                              />
                              <input
                                type="text"
                                placeholder="Tags (comma-separated)"
                                value={editState.tags}
                                onChange={e => setEditState({ ...editState, tags: e.target.value })}
                                className="w-full px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400"
                                required
                              />
                              <div className="flex space-x-4 pt-4">
                                <button
                                  type="submit"
                                  disabled={editSubmitting}
                                  className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50"
                                >
                                  {editSubmitting ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditState(null)}
                                  className="px-8 py-3 bg-gray-700 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AdminGuard>
  );
}