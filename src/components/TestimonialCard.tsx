interface TestimonialCardProps {
  testimonial: {
    id: string;
    author: string;
    text: string;
    rating: number;
    createdAt: string;
    user: {
      name: string;
    };
  };
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="group glass-card p-8 hover:scale-105 transition-all duration-500 relative overflow-hidden">
      {/* Quote decoration */}
      <div className="absolute top-4 left-4 text-6xl text-primary-500/20 font-serif transition-all duration-300 group-hover:text-primary-500/30 group-hover:scale-110">
        "
      </div>
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-neon-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* Star decoration */}
        <div className="flex justify-end mb-4">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < testimonial.rating ? 'text-primary-400' : 'text-gray-600'} opacity-80`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        
        {/* Testimonial text */}
        <blockquote className="text-gray-300 text-lg leading-relaxed mb-8 font-light italic group-hover:text-gray-200 transition-colors duration-300 pl-8">
          {testimonial.text}
        </blockquote>
        
        {/* Author info */}
        <div className="flex items-center justify-between pt-6 border-t border-primary-500/20">
          <div className="flex items-center space-x-4">
            {/* Avatar placeholder */}
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-neon-orange rounded-full flex items-center justify-center font-bold text-dark-900 text-lg group-hover:rotate-12 transition-transform duration-300">
              {testimonial.author.charAt(0).toUpperCase()}
            </div>
            
            <div>
              <h4 className="font-semibold text-white group-hover:text-primary-300 transition-colors duration-300">
                {testimonial.author}
              </h4>
              <p className="text-sm text-gray-500 font-mono group-hover:text-gray-400 transition-colors duration-300">
                Verified client
              </p>
            </div>
          </div>
          
          {/* Date */}
          <div className="text-xs text-gray-500 font-mono">
            {new Date(testimonial.createdAt).toLocaleDateString()}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <svg className="w-8 h-8 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}