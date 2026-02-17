import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="mb-8 animate-slide-up">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl transform -skew-y-1"></div>
              <h1 className="relative text-7xl md:text-8xl font-black mb-6 text-white drop-shadow-2xl px-8 py-4" style={{
                textShadow: '0 0 40px rgba(0,0,0,1), 0 6px 12px rgba(0,0,0,1), 0 0 80px rgba(255,255,255,0.3)',
                filter: 'contrast(1.2) brightness(1.1)'
              }}>
                Nathan Roos
              </h1>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-primary-500 to-neon-orange mx-auto mb-6 animate-bar-reveal"></div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-medium mb-8 animate-slide-up drop-shadow-2xl" style={{ 
            animationDelay: '0.3s',
            textShadow: '0 0 20px rgba(0,0,0,1), 0 4px 8px rgba(0,0,0,1)'
          }}>
            <span className="font-mono text-neon-orange font-bold drop-shadow-lg">&lt;</span>
            <span className="text-white font-bold">
              Full Stack Developer & DevOps Developer
            </span>
            <span className="font-mono text-neon-orange font-bold drop-shadow-lg">/&gt;</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.6s' }}>
            Crafting scalable applications with cutting-edge technologies.
            <span className="text-white font-semibold"> Next.js • Kubernetes • Modern Cloud Infrastructure</span>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.9s' }}>
            <Link 
              href="/projects" 
              className="group px-6 py-3 text-base font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-500 transition-all duration-300 shadow-lg shadow-primary-500/20 flex items-center justify-center"
            >
              <span className="flex items-center justify-center gap-2">
                <span>Explore Projects</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <Link 
              href="/contact" 
              className="group px-6 py-3 text-base font-medium text-primary-300 border border-primary-500/50 rounded-lg hover:bg-primary-500/10 hover:border-primary-400 hover:text-primary-200 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
            >
              <span className="flex items-center justify-center gap-2">
                <span>Get In Touch</span>
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              title: "Projects",
              description: "Explore cutting-edge applications and technical implementations",
              icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
              href: "/projects",
              delay: "0s"
            },
            {
              title: "CV",
              description: "Download my latest Curriculum Vitae (CV)",
              icon: "M12 4v16m8-8H4",
              href: "/cv",
              delay: "0.1s"
            },
            {
              title: "Testimonials",
              description: "Read authentic feedback from clients and collaborators",
              icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
              href: "/testimonials",
              delay: "0.2s"
            },
            {
              title: "Contact",
              description: "Let's collaborate on your next innovative project",
              icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
              href: "/contact",
              delay: "0.4s"
            },
            {
              title: "Architecture",
              description: "View live cluster topology and infrastructure",
              icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
              href: "/architecture",
              delay: "0.6s"
            }
          ].map((card, index) => (
            <Link key={card.title} href={card.href} className={`glass-card p-8 group hover:scale-[1.02] transition-all duration-300 animate-slide-up`} style={{ animationDelay: card.delay }}>
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-neon-orange rounded-2xl mb-6 transition-transform duration-300">
                <svg className="w-8 h-8 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors">{card.title}</h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{card.description}</p>
            </Link>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <h3 className="text-4xl font-bold gradient-text mb-4 drop-shadow-lg pb-2">Technology Arsenal</h3>
          <div className="mb-12"></div>
          <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
            {[
              'Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 
              'Prisma', 'Auth0', 'Kubernetes', 'Docker', 'Tailwind CSS'
            ].map((tech, index) => (
              <div 
                key={tech} 
                className={`glass-card px-6 py-4 text-sm font-mono text-primary-300 hover:text-primary-200 hover:bg-primary-500/10 transition-all duration-300 animate-scale-in whitespace-nowrap flex items-center justify-center min-h-[48px]`}
                style={{ animationDelay: `${1.4 + index * 0.1}s` }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
