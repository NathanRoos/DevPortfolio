'use client';

import { useState, useEffect } from 'react';
import AdminGuard from '../../../components/AdminGuard';

interface Hobby {
  id: string;
  name: string;
  icon: string | null;
}

export default function AdminHobbies() {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    icon: '' // Will be used for emoji/SVG fallback
  });
  const [iconFile, setIconFile] = useState<File | null>(null);

  useEffect(() => {
    fetchHobbies();
  }, []);

  const fetchHobbies = async () => {
    try {
      const response = await fetch('/api/hobbies');
      const data = await response.json();
      setHobbies(data);
    } catch (error) {
      console.error('Error fetching hobbies:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('name', formData.name);
      if (iconFile) {
        form.append('icon', iconFile);
      } else if (formData.icon) {
        form.append('icon', formData.icon); // fallback for emoji/SVG
      }

      const response = await fetch('/api/hobbies', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        setFormData({ name: '', icon: '' });
        setIconFile(null);
        fetchHobbies();
      }
    } catch (error) {
      console.error('Error creating hobby:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const response = await fetch(`/api/hobbies/${id}`, { method: 'DELETE' });
      if (response.ok) fetchHobbies();
    } catch (error) {
      console.error('Error deleting hobby:', error);
    }
  };

  return (
    <AdminGuard>
      <div>
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-5xl font-black gradient-text mb-4">🎭 Hobbies & Interests</h2>
          <p className="text-xl text-gray-300">Share your personality outside of work</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-2xl h-fit">
            <h3 className="text-2xl font-bold text-white mb-6">Add Hobby</h3>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
              <input
                type="text"
                placeholder="Hobby Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white"
                required
              />
              <label className="block text-gray-300 font-medium mb-1">Choose Image (PNG)</label>
              <input
                type="file"
                accept="image/png"
                onChange={e => setIconFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white cursor-pointer"
              />
              {!iconFile && (
                <>
                  <div className="text-gray-400 text-xs">Or enter emoji/SVG below (will be ignored if PNG is uploaded):</div>
                  <input
                    type="text"
                    placeholder="Icon (Optional emoji or SVG)"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white"
                  />
                </>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg transition-colors"
              >
                Add Hobby
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hobbies.map((hobby) => (
                <div key={hobby.id} className="glass-card p-4 rounded-2xl flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                        {hobby.icon && hobby.icon.startsWith('http') ? (
                          <img src={hobby.icon} alt={hobby.name} className="w-8 h-8 object-contain inline-block align-middle" />
                        ) : (
                          <span className="text-2xl">{hobby.icon || '✨'}</span>
                        )}
                        <span className="font-semibold text-white">{hobby.name}</span>
                    </div>
                    <button
                        onClick={() => handleDelete(hobby.id)}
                        className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
                ))}
            </div>
             {hobbies.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                No hobbies added yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
