import { useState } from 'react';

export default function AdminCVPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [cvUrl, setCvUrl] = useState('');

  // Fetch current CV on mount
  // (You may want to use useEffect to fetch the current CV URL)

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
    <div className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Manage CV</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold disabled:opacity-50 mr-4"
      >
        Upload CV
      </button>
      <button
        onClick={handleDelete}
        disabled={uploading || !cvUrl}
        className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold disabled:opacity-50"
      >
        Delete CV
      </button>
      {message && <p className="mt-4 text-lg font-medium">{message}</p>}
      {cvUrl && (
        <div className="mt-6">
          <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="underline text-primary-500">View Current CV</a>
        </div>
      )}
    </div>
  );
}
