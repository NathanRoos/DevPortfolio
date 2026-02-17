import Link from 'next/link';

export default async function CVPage() {
  // Fetch the latest CV metadata from the API
  const res = await fetch('/api/cv', { cache: 'no-store' });
  let cvUrl = '';
  if (res.ok) {
    const data = await res.json();
    cvUrl = data.url;
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">Curriculum Vitae</h1>
        <p className="mb-8 text-lg text-gray-300">Download or view my latest CV below.</p>
      {cvUrl ? (
        <a
          href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow hover:bg-primary-500 transition"
        >
            View / Download CV
        </a>
      ) : (
        <div className="py-8 text-center text-gray-400 text-lg font-semibold">
          No CV available yet.
        </div>
      )}
    </div>
  );
}
