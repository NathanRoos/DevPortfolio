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
import ManageGuard from '../../../components/AdminGuard';
import AdminExperienceHeader from '../../../components/AdminExperienceHeader';
import AdminExperienceForm from '../../../components/AdminExperienceForm';
import AdminExperienceList from '../../../components/AdminExperienceList';
export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [formData, setFormData] = useState({
    en: { position: '', company: '', description: '' },
    fr: { position: '', company: '', description: '' },
    startDate: '',
    endDate: '',
    location: ''
  });
  const [editId, setEditId] = useState<string | null>(null);

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
      let response;
      if (editId) {
        response = await fetch(`/api/experience/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        });
      } else {
        response = await fetch('/api/experience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        });
      }
      if (response.ok) {
        setFormData({
          en: { position: '', company: '', description: '' },
          fr: { position: '', company: '', description: '' },
          startDate: '',
          endDate: '',
          location: ''
        });
        setEditId(null);
        fetchExperiences();
      }
    } catch (error) {
      console.error('Error saving experience:', error);
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

  const handleEdit = (exp: any) => {
    setEditId(exp.id);
    const en = exp.translations?.find((t: any) => t.language === 'en') || {};
    const fr = exp.translations?.find((t: any) => t.language === 'fr') || {};
    setFormData({
      en: {
        position: en.position || '',
        company: en.company || '',
        description: en.description || ''
      },
      fr: {
        position: fr.position || '',
        company: fr.company || '',
        description: fr.description || ''
      },
      startDate: exp.startDate ? exp.startDate.slice(0, 10) : '',
      endDate: exp.endDate ? exp.endDate.slice(0, 10) : '',
      location: exp.location || ''
    });
  };

  return (
    <ManageGuard>
      <div>
        <AdminExperienceHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AdminExperienceForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} editId={editId} setEditId={setEditId} />
          <AdminExperienceList experiences={experiences} handleDelete={handleDelete} handleEdit={handleEdit} />
        </div>
      </div>
    </AdminGuard>
  );
}

