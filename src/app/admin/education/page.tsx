'use client';

import { useState, useEffect } from 'react';
import AdminGuard from '../../../components/AdminGuard';

interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
}

export default function AdminEducation() {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await fetch('/api/education');
      const data = await response.json();
      setEducationList(data);
    } catch (error) {
      console.error('Error fetching education:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        endDate: formData.endDate || null
      };

      const response = await fetch('/api/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setFormData({
            degree: '',
            institution: '',
            startDate: '',
            endDate: '',
            description: ''
        });
        fetchEducation();
      }
    } catch (error) {
      console.error('Error creating education:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const response = await fetch(`/api/education/${id}`, { method: 'DELETE' });
      if (response.ok) fetchEducation();
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };

  return (
    <AdminGuard>
      <div>
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-5xl font-black gradient-text mb-4">🎓 Education</h2>
          <p className="text-xl text-gray-300">Academic background and certifications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-2xl h-fit">
            <h3 className="text-2xl font-bold text-white mb-6">Add Education</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Degree / Certificate"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white"
                required
              />
              <input
                type="text"
                placeholder="Institution"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white"
                  />
                </div>
              </div>
              <textarea
                placeholder="Description (Optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white h-24"
              />
              <button
                type="submit"
                className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg transition-colors"
              >
                Add Education
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {educationList.map((edu) => (
              <div key={edu.id} className="glass-card p-6 rounded-2xl relative group">
                 <button
                    onClick={() => handleDelete(edu.id)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
                <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                <p className="text-primary-400 text-lg mb-2">{edu.institution}</p>
                <p className="text-sm text-gray-400">
                  {new Date(edu.startDate).toLocaleDateString()} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}
                </p>
                {edu.description && (
                    <p className="text-gray-300 mt-2 whitespace-pre-line">{edu.description}</p>
                )}
              </div>
            ))}
             {educationList.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                No education added yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
