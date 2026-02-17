'use client';

import { useState, useEffect } from 'react';
import AdminGuard from '../../../components/AdminGuard';
import AdminExperienceHeader from '../../../components/AdminExperienceHeader';
import AdminExperienceForm from '../../../components/AdminExperienceForm';
import AdminExperienceList from '../../../components/AdminExperienceList';
export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    location: ''
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experience');
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experience:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        endDate: formData.endDate || null
      };

      const response = await fetch('/api/experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setFormData({
            position: '',
            company: '',
            startDate: '',
            endDate: '',
            description: '',
            location: ''
        });
        fetchExperiences();
      }
    } catch (error) {
      console.error('Error creating experience:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    try {
      const response = await fetch(`/api/experience/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchExperiences();
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  return (
    <AdminGuard>
      <div>
        <AdminExperienceHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AdminExperienceForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
          <AdminExperienceList experiences={experiences} handleDelete={handleDelete} />
        </div>
      </div>
    </AdminGuard>
  );
}
                <div>
                  <label className="text-xs text-gray-400">End Date (Leave empty if current)</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white"
                  />
                </div>
              </div>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white h-32"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg transition-colors"
              >
                Add Experience
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="glass-card p-6 rounded-2xl relative group">
                <button
                    onClick={() => handleDelete(exp.id)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
                <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                <p className="text-primary-400 text-lg mb-2">{exp.company} • {exp.location}</p>
                <p className="text-sm text-gray-400 mb-4">
                  {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                </p>
                <p className="text-gray-300 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
             {experiences.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                No work experience added yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
