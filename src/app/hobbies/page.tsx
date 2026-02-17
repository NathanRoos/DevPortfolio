import { prisma } from '../../lib/prisma';

export const dynamic = 'force-dynamic';

export default async function HobbiesPage() {
  const hobbies = await prisma.hobby.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-black gradient-text mb-6">Hobbies & Interests</h1>
            <div className="h-1 w-32 bg-gradient-to-r from-primary-500 to-neon-orange mx-auto mb-6 animate-bar-reveal"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            What I enjoy doing when I'm not coding.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {hobbies.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12 glass-card rounded-2xl">
              No hobbies added yet.
            </div>
          ) : (
            hobbies.map((hobby, index) => (
              <div key={hobby.id} className="glass-card p-6 rounded-2xl animate-scale-in text-center group hover:bg-primary-500/10 transition-colors duration-300 transform hover:scale-105" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="text-6xl mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300">
                  {hobby.icon || '✨'}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-primary-300 transition-colors">
                  {hobby.name}
                </h3>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
