import Link from 'next/link';
import { Project } from '@prisma/client';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group glass-card p-8 hover:scale-105 transition-all duration-500 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-neon-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Animated border */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-neon-orange to-primary-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
              {project.title}
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-neon-orange rounded-full mb-4 group-hover:w-20 transition-all duration-300"></div>
          </div>
          
          {/* Project icon */}
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-neon-orange rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <svg className="w-6 h-6 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        </div>
        
        <div className="flex-grow">
          <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
            {project.description}
          </p>
          
          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag, index) => (
                <span 
                  key={tag} 
                  className={`px-3 py-1 text-xs font-mono bg-primary-500/10 text-primary-300 border border-primary-500/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-primary-500/20 hover:text-primary-200`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Action buttons - always at bottom */}
        <div className="mt-auto">
          <div className="flex space-x-4">
          {project.repoUrl && (
            <Link 
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center space-x-2 px-6 py-3 bg-dark-800 hover:bg-dark-700 text-gray-300 hover:text-white border border-gray-600 hover:border-primary-500 rounded-xl font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <svg className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Code</span>
            </Link>
          )}
          {project.liveUrl && (
            <Link 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn neon-button px-6 py-3 font-medium hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Live Demo</span>
              <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          )}
          </div>
          
          {/* Project timestamp */}
          <div className="mt-6 pt-4 border-t border-primary-500/10">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-mono">Created: {new Date(project.createdAt).toLocaleDateString()}</span>
              <span className="font-mono">Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}