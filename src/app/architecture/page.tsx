import ArchitectureDiagram from '../../components/ArchitectureDiagram';

export default function Architecture() {
  return (
    <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-black gradient-text mb-6">Infrastructure Architecture</h1>
            <div className="h-1 w-40 bg-gradient-to-r from-primary-500 to-neon-orange mx-auto mb-6 animate-bar-reveal"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Live visualization of the k3s cluster topology hosting this application.
            <span className="text-white font-semibold"> Production Ready • Scalable • Modern Stack</span>
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 mb-12">
          <ArchitectureDiagram />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 gradient-text">Cluster Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-dark-800/30 border border-primary-500/20">
                <span className="font-semibold text-primary-400">Orchestrator:</span>
                <span className="text-white">k3s (Lightweight Kubernetes)</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-dark-800/30 border border-primary-500/20">
                <span className="font-semibold text-primary-400">Total Nodes:</span>
                <span className="text-white">3 (1 Control Plane + 2 Workers)</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-dark-800/30 border border-primary-500/20">
                <span className="font-semibold text-primary-400">Container Runtime:</span>
                <span className="text-white">Docker</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-dark-800/30 border border-primary-500/20">
                <span className="font-semibold text-primary-400">Ingress Controller:</span>
                <span className="text-white">Traefik</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-dark-800/30 border border-primary-500/20">
                <span className="font-semibold text-primary-400">Database:</span>
                <span className="text-white">PostgreSQL</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 gradient-text">Technology Stack</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-primary-400 mb-4 text-lg">Application Layer</h3>
                <div className="flex flex-wrap gap-3">
                  {['Next.js', 'TypeScript', 'React', 'Tailwind CSS'].map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-gradient-to-r from-primary-500/20 to-neon-orange/20 text-white rounded-full border border-primary-500/30 font-medium hover:scale-105 transition-transform duration-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-primary-400 mb-4 text-lg">Infrastructure Layer</h3>
                <div className="flex flex-wrap gap-3">
                  {['Kubernetes', 'Docker', 'PostgreSQL', 'Traefik'].map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-gradient-to-r from-primary-500/20 to-neon-orange/20 text-white rounded-full border border-primary-500/30 font-medium hover:scale-105 transition-transform duration-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-primary-400 mb-4 text-lg">DevOps & Monitoring</h3>
                <div className="flex flex-wrap gap-3">
                  {['Prometheus', 'Grafana', 'GitOps', 'CI/CD'].map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-gradient-to-r from-primary-500/20 to-neon-orange/20 text-white rounded-full border border-primary-500/30 font-medium hover:scale-105 transition-transform duration-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}