'use client';

import { useState, useEffect } from 'react';
import AdminGuard from '../../../components/AdminGuard';
import AdminEducationHeader from '../../../components/AdminEducationHeader';
import AdminEducationForm from '../../../components/AdminEducationForm';
import AdminEducationList from '../../../components/AdminEducationList';

interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
}

  const [educationList, setEducationList] = useState<Education[]>([]);
  const [formData, setFormData] = useState({
    en: { degree: '', institution: '', description: '' },
    fr: { degree: '', institution: '', description: '' },
    startDate: '',
    endDate: '',
  });
  const [editId, setEditId] = useState<string | null>(null);

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
          en: { degree: '', institution: '', description: '' },
          fr: { degree: '', institution: '', description: '' },
          startDate: '',
          endDate: ''
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
        <AdminEducationHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AdminEducationForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
          <AdminEducationList educationList={educationList} handleDelete={handleDelete} />
        </div>
      </div>
    </AdminGuard>
  );
}
