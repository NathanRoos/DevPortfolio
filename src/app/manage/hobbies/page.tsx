'use client';

import { useState, useEffect } from 'react';
import ManageGuard from '../../../components/AdminGuard';
import AdminHobbiesHeader from '../../../components/AdminHobbiesHeader';
import AdminHobbiesForm from '../../../components/AdminHobbiesForm';
import AdminHobbiesList from '../../../components/AdminHobbiesList';

interface Hobby {
  id: string;
  name: string;
  nameFr: string;
  icon: string | null;
}

export default function AdminHobbies() {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    nameFr: '',
    icon: ''
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
      form.append('nameFr', formData.nameFr);
      if (iconFile) {
        form.append('icon', iconFile);
      } else if (formData.icon) {
        form.append('icon', formData.icon);
      }

      const response = await fetch('/api/hobbies', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        setFormData({ name: '', nameFr: '', icon: '' });
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
    <ManageGuard>
      <div>
        <AdminHobbiesHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AdminHobbiesForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} iconFile={iconFile} setIconFile={setIconFile} />
          <AdminHobbiesList hobbies={hobbies} handleDelete={handleDelete} />
        </div>
      </div>
    </ManageGuard>
  );
}

