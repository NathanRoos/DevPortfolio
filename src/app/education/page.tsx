import { prisma } from '../../lib/prisma';

export const dynamic = 'force-dynamic';

export default async function EducationPage() {
  const education = await prisma.education.findMany({
    orderBy: {
      startDate: 'desc',
    },
  });

  return (
    <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-black gradient-text mb-6">Education</h1>
            <div className="h-1 w-32 bg-gradient-to-r from-primary-500 to-neon-orange mx-auto mb-6 animate-bar-reveal"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Academic qualifications and certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12 glass-card rounded-2xl">
              No education listed yet. Check back soon!
            </div>
          ) : (
            education.map((edu, index) => (
              <div key={edu.id} className="glass-card p-8 rounded-2xl animate-slide-up group hover:-translate-y-2 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-primary-500/10 p-4 rounded-xl group-hover:bg-primary-500/20 transition-colors">
                    <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </div>
                  <span className="text-sm font-mono text-neon-orange bg-neon-orange/10 px-3 py-1 rounded-full border border-neon-orange/20">
                    {new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                <h4 className="text-xl text-primary-300 mb-4">{edu.institution}</h4>
                
                {edu.description && (
                  <p className="text-gray-400 leading-relaxed border-t border-gray-700/50 pt-4 mt-4">
                    {edu.description}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
