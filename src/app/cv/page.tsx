

export default async function CVPage() {
  // Use absolute URL for fetch in server component
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nathandevprogrammer.info';
  const res = await fetch(`${baseUrl}/api/cv`, { cache: 'no-store' });
  let cvUrl = '';
  if (res.ok) {
    const data = await res.json();
    cvUrl = data.url;
  }

  // If a CV is available, generate a Cloudinary image preview URL (first page of PDF)
  let previewUrl = '';
  if (cvUrl && cvUrl.includes('cloudinary.com')) {
    // Convert the raw PDF URL to an image transformation URL (first page as PNG)
    // Example: .../raw/upload/v.../portfolio-cv/cv.pdf => .../image/upload/pg_1,w_900/portfolio-cv/cv.png
    previewUrl = cvUrl
      .replace('/raw/upload/', '/image/upload/pg_1,w_900/')
      .replace(/\.pdf($|\?)/, '.png$1');
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
        <div className="flex flex-col items-center gap-8">
          {cvUrl ? (
            <>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 mb-4 bg-primary-600 text-white font-semibold rounded-lg shadow hover:bg-primary-500 transition text-lg"
              >
                View / Download CV
              </a>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="CV Preview"
                  className="rounded-xl shadow-lg border border-primary-700 bg-white max-w-full"
                  style={{ maxHeight: '900px', width: 'auto' }}
                />
              )}
            </>
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
