"use client";
import { useState, useEffect } from 'react';
import ManageGuard from '../../../components/AdminGuard';
import { useLanguage } from '../../../context/LanguageContext';
import { toast } from '../../../components/Toast';

export default function ManageCVPage() {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [cvUrl, setCvUrl] = useState('');

  useEffect(() => {
    const fetchCV = async () => {
      const res = await fetch('/api/cv');
      if (res.ok) {
        const data = await res.json();
        setCvUrl(data.url);
      }
    };
    fetchCV();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/cv', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      toast('CV uploaded successfully!', 'success');
      const data = await res.json();
      setCvUrl(data.url);
    } else {
      toast('Failed to upload CV.', 'error');
    }
    setUploading(false);
  };

  const handleDelete = async () => {
    setUploading(true);
    const res = await fetch('/api/cv', { method: 'DELETE' });
    if (res.ok) {
      toast('CV deleted successfully!', 'success');
      setCvUrl('');
    } else {
      toast('Failed to delete CV.', 'error');
    }
    setUploading(false);
  };

  return (
    <ManageGuard>
      <div>
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-5xl font-black gradient-text mb-4">Manage CV</h2>
          <p className="text-xl text-gray-300">Upload and manage your CV document</p>
        </div>

        <div className="max-w-2xl mx-auto glass-card rounded-2xl p-8 border border-primary-500/20">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Upload PDF</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-primary-500/30 file:text-sm file:font-semibold file:bg-primary-500/10 file:text-primary-300 hover:file:bg-primary-500/20 transition"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="btn btn-primary"
              >
                Upload CV
              </button>
              <button
                onClick={handleDelete}
                disabled={uploading || !cvUrl}
                className="btn btn-danger"
              >
                Delete CV
              </button>
            </div>

            {cvUrl ? (
              <div className="bg-dark-800/30 rounded-xl p-6 border border-primary-500/20 text-center">
                <svg className="w-12 h-12 text-primary-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="text-primary-400 font-semibold hover:text-primary-300 transition underline">
                  View Current CV
                </a>
              </div>
            ) : (
              <div className="bg-dark-800/30 rounded-xl p-6 border border-primary-500/20 text-center">
                <svg className="w-12 h-12 text-gray-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400 font-semibold">No CV uploaded yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ManageGuard>
  );
}
