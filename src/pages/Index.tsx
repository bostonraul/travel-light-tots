
import React from 'react';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-tots-blue/20">
      <main>
        <HeroSection />
        <BenefitsSection />
        
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-3xl font-medium mb-6">Ready to Travel Light?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Start planning your stress-free family vacation today. We'll take care of the baby gear!
            </p>
            <a href="#travel-form" className="btn-primary inline-block">
              Plan Your Trip Now
            </a>
          </div>
        </section>
        
        <footer className="py-8 px-4 border-t border-gray-100">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © 2025 ToyBuddy. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-gray-700">Terms</a>
                <a href="#" className="text-gray-500 hover:text-gray-700">Privacy</a>
                <a href="#" className="text-gray-500 hover:text-gray-700">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
