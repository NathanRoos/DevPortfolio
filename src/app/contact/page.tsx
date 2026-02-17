import ContactForm from '../../components/ContactForm';

export default function Contact() {
  return (
    <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-neon-orange/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-black gradient-text mb-6">Get In Touch</h1>
            <div className="h-1 w-32 bg-gradient-to-r from-primary-500 to-neon-orange mx-auto mb-6 animate-bar-reveal"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
            <span className="text-white font-semibold"> Collaboration • Innovation • Results</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 gradient-text">Let's Connect</h2>
            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-neon-orange rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                  <p className="text-primary-400 hover:text-primary-300 transition-colors cursor-pointer">nathan.roos@example.com</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-neon-orange rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                  <p className="text-gray-300">Available for remote work worldwide</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-neon-orange rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-white mb-2">Response Time</h3>
                  <p className="text-gray-300">Usually within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-primary-500/20">
              <h3 className="text-xl font-bold text-white mb-6 gradient-text">What I Can Help With</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center group">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Full-stack web application development</span>
                </li>
                <li className="flex items-center group">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Cloud infrastructure setup and optimization</span>
                </li>
                <li className="flex items-center group">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Kubernetes deployment and DevOps consulting</span>
                </li>
                <li className="flex items-center group">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Technical architecture and system design</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}