
export default async function CVPage() {
  // Fetch the latest CV metadata from the API
  const res = await fetch('/api/cv', { cache: 'no-store' });
  let cvUrl = '';
  if (res.ok) {
    const data = await res.json();
    cvUrl = data.url;
  }

  return (
    <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-black gradient-text mb-6">Curriculum Vitae</h1>
            <div className="h-1 w-32 bg-gradient-to-r from-primary-500 to-neon-orange mx-auto mb-6 animate-bar-reveal"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Download or view my latest CV below.
          </p>
        </div>
        <div className="flex justify-center">
          {cvUrl ? (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow hover:bg-primary-500 transition text-lg"
            >
              View / Download CV
            </a>
          ) : (
            <div className="py-12 text-center text-gray-400 text-xl font-semibold glass-card rounded-2xl">
              No CV available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
