'use client';

import { useState, useEffect } from 'react';
import AdminGuard from '../../../components/AdminGuard';
import AdminHobbiesHeader from '../../../components/AdminHobbiesHeader';
import AdminHobbiesForm from '../../../components/AdminHobbiesForm';
import AdminHobbiesList from '../../../components/AdminHobbiesList';

interface Hobby {
  id: string;
  name: string;
  icon: string | null;
}

export default function AdminHobbies() {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  export default function AdminHobbies() {
    const [hobbies, setHobbies] = useState<Hobby[]>([]);
    const [formData, setFormData] = useState({
      name: '',
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
          <AdminHobbiesHeader />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <AdminHobbiesForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} iconFile={iconFile} setIconFile={setIconFile} />
            <AdminHobbiesList hobbies={hobbies} handleDelete={handleDelete} />
          </div>
        </div>
      </AdminGuard>
    );
  }
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
