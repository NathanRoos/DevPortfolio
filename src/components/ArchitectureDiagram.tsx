'use client';

export default function ArchitectureDiagram() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4 gradient-text">k3s Cluster Topology</h3>
        <p className="text-gray-300 mb-6">Interactive diagram showing the live cluster architecture</p>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex items-center group">
            <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded mr-3 group-hover:scale-110 transition-transform"></div>
            <span className="text-gray-300 font-medium">Application Pods</span>
          </div>
          <div className="flex items-center group">
            <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded mr-3 group-hover:scale-110 transition-transform"></div>
            <span className="text-gray-300 font-medium">Database</span>
          </div>
          <div className="flex items-center group">
            <div className="w-5 h-5 bg-gradient-to-r from-gray-500 to-gray-600 rounded mr-3 group-hover:scale-110 transition-transform"></div>
            <span className="text-gray-300 font-medium">Infrastructure</span>
          </div>
          <div className="flex items-center group">
            <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-neon-orange rounded mr-3 group-hover:scale-110 transition-transform"></div>
            <span className="text-gray-300 font-medium">Ingress</span>
          </div>
        </div>
      </div>

      {/* SVG Diagram */}
      <div className="w-full overflow-x-auto">
        <svg 
          viewBox="0 0 800 600" 
          className="w-full h-auto max-h-96 border border-primary-500/30 rounded-xl bg-gradient-to-br from-dark-900 to-dark-800 shadow-2xl"
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(240, 160, 75, 0.1)" strokeWidth="1"/>
            </pattern>
            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0a04b" />
              <stop offset="100%" stopColor="#eb8f2f" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Internet/Client */}
          <g>
            <rect x="350" y="20" width="100" height="40" rx="8" fill="url(#orangeGradient)" stroke="#f0a04b" strokeWidth="2" filter="url(#glow)"/>
            <text x="400" y="45" textAnchor="middle" className="fill-white text-sm font-bold">Internet</text>
          </g>
          
          {/* Ingress Controller */}
          <g>
            <rect x="325" y="100" width="150" height="40" rx="8" fill="url(#orangeGradient)" stroke="#f0a04b" strokeWidth="2" filter="url(#glow)"/>
            <text x="400" y="125" textAnchor="middle" className="fill-white text-sm font-bold">Traefik Ingress</text>
          </g>
          
          {/* Control Plane Node */}
          <g>
            <rect x="50" y="180" width="200" height="180" rx="12" fill="rgba(26, 26, 26, 0.9)" stroke="#f0a04b" strokeWidth="2" strokeDasharray="8,4"/>
            <text x="150" y="200" textAnchor="middle" className="fill-primary-400 text-sm font-bold">node-0 (Control Plane)</text>
            
            {/* Control plane components */}
            <rect x="70" y="220" width="160" height="30" rx="6" fill="rgba(107, 114, 128, 0.8)" stroke="#374151" strokeWidth="1.5"/>
            <text x="150" y="240" textAnchor="middle" className="fill-white text-xs font-semibold">k3s-server</text>
            
            <rect x="70" y="260" width="75" height="25" rx="4" fill="rgba(107, 114, 128, 0.8)" stroke="#374151" strokeWidth="1.5"/>
            <text x="107" y="277" textAnchor="middle" className="fill-white text-xs font-medium">CoreDNS</text>
            
            <rect x="155" y="260" width="75" height="25" rx="4" fill="rgba(107, 114, 128, 0.8)" stroke="#374151" strokeWidth="1.5"/>
            <text x="192" y="277" textAnchor="middle" className="fill-white text-xs font-medium">Metrics</text>
          </g>
          
          {/* Worker Node 1 */}
          <g>
            <rect x="300" y="180" width="200" height="180" rx="12" fill="rgba(26, 26, 26, 0.9)" stroke="#f0a04b" strokeWidth="2" strokeDasharray="8,4"/>
            <text x="400" y="200" textAnchor="middle" className="fill-primary-400 text-sm font-bold">node-1 (Worker)</text>
            
            {/* App pods */}
            <rect x="320" y="220" width="80" height="50" rx="6" fill="rgba(59, 130, 246, 0.8)" stroke="#1d4ed8" strokeWidth="1.5"/>
            <text x="360" y="240" textAnchor="middle" className="fill-white text-xs font-bold">Portfolio</text>
            <text x="360" y="255" textAnchor="middle" className="fill-white text-xs">App Pod</text>
            
            {/* Database */}
            <rect x="410" y="220" width="80" height="50" rx="6" fill="rgba(16, 185, 129, 0.8)" stroke="#059669" strokeWidth="1.5"/>
            <text x="450" y="240" textAnchor="middle" className="fill-white text-xs font-bold">PostgreSQL</text>
            <text x="450" y="255" textAnchor="middle" className="fill-white text-xs">Database</text>
            
            {/* Service */}
            <rect x="320" y="290" width="170" height="30" rx="6" fill="rgba(139, 92, 246, 0.8)" stroke="#7c3aed" strokeWidth="1.5"/>
            <text x="405" y="310" textAnchor="middle" className="fill-white text-xs font-medium">App Service (ClusterIP)</text>
          </g>
          
          {/* Worker Node 2 */}
          <g>
            <rect x="550" y="180" width="200" height="180" rx="12" fill="rgba(26, 26, 26, 0.9)" stroke="#f0a04b" strokeWidth="2" strokeDasharray="8,4"/>
            <text x="650" y="200" textAnchor="middle" className="fill-primary-400 text-sm font-bold">node-2 (Worker)</text>
            
            {/* App pod replica */}
            <rect x="570" y="220" width="80" height="50" rx="6" fill="rgba(59, 130, 246, 0.8)" stroke="#1d4ed8" strokeWidth="1.5"/>
            <text x="610" y="240" textAnchor="middle" className="fill-white text-xs font-bold">Portfolio</text>
            <text x="610" y="255" textAnchor="middle" className="fill-white text-xs">App Pod</text>
            
            {/* ConfigMap reload sidecar */}
            <rect x="660" y="220" width="80" height="50" rx="6" fill="rgba(107, 114, 128, 0.8)" stroke="#374151" strokeWidth="1.5"/>
            <text x="700" y="240" textAnchor="middle" className="fill-white text-xs font-bold">ConfigMap</text>
            <text x="700" y="255" textAnchor="middle" className="fill-white text-xs">Reload</text>
          </g>
          
          {/* Arrows showing request flow */}
          {/* Internet to Ingress */}
          <line x1="400" y1="60" x2="400" y2="100" stroke="#f0a04b" strokeWidth="3" markerEnd="url(#arrowhead)" filter="url(#glow)"/>
          
          {/* Ingress to Service */}
          <line x1="400" y1="140" x2="400" y2="180" stroke="#f0a04b" strokeWidth="3" markerEnd="url(#arrowhead)" filter="url(#glow)"/>
          
          {/* Service to App Pods */}
          <line x1="360" y1="290" x2="360" y2="270" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
          <line x1="450" y1="290" x2="610" y2="270" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
          
          {/* App to Database connection */}
          <line x1="400" y1="245" x2="430" y2="245" stroke="#10b981" strokeWidth="3" strokeDasharray="6,3" filter="url(#glow)"/>
          
          {/* Arrow marker definitions */}
          <defs>
            <marker id="arrowhead" markerWidth="12" markerHeight="8" 
                    refX="11" refY="4" orient="auto">
              <polygon points="0 0, 12 4, 0 8" fill="#f0a04b" />
            </marker>
            <marker id="arrowhead2" markerWidth="10" markerHeight="7" 
                    refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
          </defs>
          
          {/* Labels */}
          <text x="420" y="80" className="fill-gray-600 text-xs">HTTP Requests</text>
          <text x="420" y="160" className="fill-gray-600 text-xs">Load Balancing</text>
          <text x="480" y="240" className="fill-gray-600 text-xs">Internal DNS</text>
        </svg>
      </div>
      
      {/* Mobile-friendly stacked view */}
      <div className="block sm:hidden mt-6">
        <div className="space-y-4">
          <div className="glass-card p-4 rounded-lg border border-primary-500/30">
            <h4 className="font-bold text-primary-400 mb-2">External Traffic</h4>
            <p className="text-sm text-gray-300">Internet → Traefik Ingress Controller</p>
          </div>
          <div className="glass-card p-4 rounded-lg border border-gray-500/30">
            <h4 className="font-bold text-gray-300 mb-2">Control Plane (node-0)</h4>
            <p className="text-sm text-gray-400">k3s-server, CoreDNS, Metrics Server</p>
          </div>
          <div className="glass-card p-4 rounded-lg border border-blue-500/30">
            <h4 className="font-bold text-blue-400 mb-2">Worker Node 1 (node-1)</h4>
            <p className="text-sm text-gray-300">Portfolio App, PostgreSQL Database</p>
          </div>
          <div className="glass-card p-4 rounded-lg border border-blue-500/30">
            <h4 className="font-bold text-blue-400 mb-2">Worker Node 2 (node-2)</h4>
            <p className="text-sm text-gray-300">Portfolio App Replica, ConfigMap Reload</p>
          </div>
        </div>
      </div>
    </div>
  );
}