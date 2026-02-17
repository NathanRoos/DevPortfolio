"use client";
import { useState, useEffect } from 'react';

//Fix
export default function AdminCVPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [cvUrl, setCvUrl] = useState('');


  // Fetch current CV on mount
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
    setMessage('');
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/cv', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      setMessage('CV uploaded successfully!');
      const data = await res.json();
      setCvUrl(data.url);
    } else {
      setMessage('Failed to upload CV.');
    }
    setUploading(false);
  };

  const handleDelete = async () => {
    setUploading(true);
    setMessage('');
    const res = await fetch('/api/cv', { method: 'DELETE' });
    if (res.ok) {
      setMessage('CV deleted successfully!');
      setCvUrl('');
    } else {
      setMessage('Failed to delete CV.');
    }
    setUploading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Manage CV</h1>
      <div className="bg-dark-800/60 rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-500 transition"
        />
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold disabled:opacity-50 shadow hover:bg-primary-500 transition"
          >
            Upload CV
          </button>
          <button
            onClick={handleDelete}
            disabled={uploading || !cvUrl}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold disabled:opacity-50 shadow hover:bg-red-700 transition"
          >
            Delete CV
          </button>
        </div>
        {message && <p className={`mt-2 text-lg font-medium ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
        {cvUrl ? (
          <div className="mt-8 text-center">
            <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="underline text-primary-400 text-lg font-semibold hover:text-primary-300 transition">View Current CV</a>
          </div>
        ) : (
          <div className="mt-8 text-center text-gray-400 text-lg font-semibold">No CV uploaded yet.</div>
        )}
      </div>
    </div>
  );
}
