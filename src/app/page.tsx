import HeroSection from '../components/HeroSection';
import FeatureCards from '../components/FeatureCards';
import TechArsenal from '../components/TechArsenal';

export default function Home() {
  return (
    <div className="min-h-screen bg-mesh-gradient relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <HeroSection />
        <FeatureCards />
        <TechArsenal />
      </div>
    </div>
  );
}
}
