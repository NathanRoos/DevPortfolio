"use client";

import { useState, useEffect } from 'react';
import AdminGuard from '../../../components/AdminGuard';

interface EditState {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  liveUrl: string;
  tags: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  liveUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminProjects() {


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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    repoUrl: '',
    liveUrl: '',
    tags: '' // Will be converted to array
  });
  const [submitting, setSubmitting] = useState(false);

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
      
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray
        }),
      });

      if (!response.ok) throw new Error('Failed to create project');
      
      // Reset form and refresh projects
      setFormData({ title: '', description: '', repoUrl: '', liveUrl: '', tags: '' });
      setShowForm(false);
      await fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <AdminGuard>
      <div>
        <div className="w-full bg-red-600 text-white text-center py-4 text-2xl font-extrabold mb-8 rounded-xl shadow-lg animate-pulse">
          TEST BANNER: DEPLOYMENT UPDATED
        </div>
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-5xl font-black gradient-text mb-4 flex items-center gap-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Manage Projects
          </h2>
          <p className="text-xl text-gray-300">Add, edit, and organize your portfolio projects
            <span className="gradient-text-alt font-semibold"> • Showcase Your Work • Professional Portfolio</span>
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
                Projects 
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
                    Cancel
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Project
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
                  Add New Project
                </h4>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="lg:col-span-2">
                      <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-primary-400 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        Project Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="Enter project title"
                        required
                      />
                    </div>

                    <div className="lg:col-span-2">
                      <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-primary-400 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                        Description *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 resize-none"
                        placeholder="Describe your project and its key features"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="repoUrl" className="flex items-center gap-2 text-sm font-semibold text-primary-400 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Repository URL
                      </label>
                      <input
                        type="url"
                        id="repoUrl"
                        name="repoUrl"
                        value={formData.repoUrl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="https://github.com/username/repo"
                      />
                    </div>

                    <div>
                      <label htmlFor="liveUrl" className="flex items-center gap-2 text-sm font-semibold text-primary-400 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        Live Demo URL
                      </label>
                      <input
                        type="url"
                        id="liveUrl"
                        name="liveUrl"
                        value={formData.liveUrl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="https://yourproject.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="tags" className="flex items-center gap-2 text-sm font-semibold text-primary-400 mb-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Tags *
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-800/30 border border-primary-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                      placeholder="React, TypeScript, Next.js (comma-separated)"
                      required
                    />
                    <p className="text-sm text-gray-400 mt-2 flex items-center">
                      <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Separate tags with commas for better organization
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
                          Creating...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                          Create Project
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
                      Cancel
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
                <h3 className="text-2xl font-bold text-white mb-4">No Projects Yet</h3>
                <p className="text-gray-300 mb-6">
                  Get started by adding your first project to showcase your work and impress potential clients.
                </p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-400 hover:to-primary-500 transition-all duration-300 font-semibold hover:-translate-y-1 shadow-lg flex items-center mx-auto"
                >
                  <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Add Your First Project
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="glass-card rounded-2xl p-8 border border-primary-500/30 hover:border-primary-400/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {project.title}
                        </h4>
                        <p className="text-gray-200 mb-4 leading-relaxed">{project.description}</p>
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
                        <div className="flex space-x-4 text-sm">
                          {project.repoUrl && (
                            <a 
                              href={project.repoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center px-3 py-2 bg-gray-600/20 text-gray-300 rounded-lg hover:bg-gray-600/30 transition-all duration-300 border border-gray-600/30"
                            >
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              Repository
                            </a>
                          )}
                          {project.liveUrl && (
                            <a 
                              href={project.liveUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center px-3 py-2 bg-primary-500/20 text-primary-300 rounded-lg hover:bg-primary-500/30 transition-all duration-300 border border-primary-500/30"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Live Demo →
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-6">
                        <button className="px-4 py-2 bg-primary-500/20 text-primary-300 rounded-xl hover:bg-primary-500/30 transition-all duration-300 font-semibold hover:scale-105 border border-primary-500/30 text-sm flex items-center gap-2" onClick={() => setEditState({
                          id: project.id,
                          title: project.title,
                          description: project.description,
                          repoUrl: project.repoUrl,
                          liveUrl: project.liveUrl,
                          tags: project.tags.join(', ')
                        })}>
                                          {/* Edit Project Modal */}
                                          {editState && (
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
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button className="px-4 py-2 bg-dark-800/50 text-gray-400 rounded-xl hover:bg-dark-700/50 transition-all duration-300 font-semibold hover:scale-105 border border-gray-600/30 text-sm flex items-center gap-2" onClick={async () => {
                          if (!confirm('Are you sure you want to delete this project?')) return;
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
                        }}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
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