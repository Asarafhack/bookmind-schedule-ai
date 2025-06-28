
import React from 'react';
import HeroSection from '@/components/Home/HeroSection';
import FeaturesSection from '@/components/Home/FeaturesSection';
import TechStackSection from '@/components/Home/TechStackSection';
import TeamSection from '@/components/Home/TeamSection';
import CTASection from '@/components/Home/CTASection';
import HomeFooter from '@/components/Home/HomeFooter';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />
      <FeaturesSection />
      <TechStackSection />
      <TeamSection />
      <CTASection />
      <HomeFooter />
    </div>
  );
};

export default LandingPage;
