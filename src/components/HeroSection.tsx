
import React from 'react';
import { Baby } from 'lucide-react';
import TravelForm from './TravelForm';

const HeroSection = () => {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center space-x-2">
              <Baby className="h-8 w-8 text-tots-peach" />
              <h2 className="text-lg font-heading text-gray-600">ToyBuddy</h2>
            </div>
            
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl">
              <span className="text-gray-900">Baby on board?</span>
              <br />
              <span classNa                                                                           me="bg-gradient-to-r from-tots-peach to-tots-blue bg-clip-text text-transparent">
                Travel light!
              </span>
            </h1>
            <p className="font-heading">
               This should look different (Baloo 2 test)
            </p>

            <p className="font-body text-lg md:text-xl text-gray-600 max-w-lg">
              Just tell us your gear needs, and we'll handle the rest. Enjoy your family vacation 
              without lugging around bulky baby equipment.
            </p>

            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">
              <h3 className="text-xl font-heading mb-4">Where are you heading with your little one?</h3>
              <TravelForm />
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="absolute -top-16 -left-16 w-40 h-40 bg-tots-yellow rounded-full opacity-50 animate-float"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-tots-blue rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
              
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-8 border-white relative z-10">
                <div className="w-72 h-80 md:w-96 md:h-[28rem] bg-gradient-to-br from-tots-peach/30 to-tots-blue/30 rounded-2xl flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/b6b29315-f086-4288-8ac0-be44099ad36a.png" 
                    alt="Happy family with baby on vacation" 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
