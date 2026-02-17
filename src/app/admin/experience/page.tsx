interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
  location: string;
}
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

