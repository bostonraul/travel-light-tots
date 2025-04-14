
import React from 'react';
import { Check, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PackLightSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-tots-yellow/20 to-tots-peach/20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-8 border-white relative">
              <img 
                src="/lovable-uploads/b6b29315-f086-4288-8ac0-be44099ad36a.png" 
                alt="Happy family traveling light" 
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-tots-peach/30 px-4 py-2 rounded-full">
              <Baby className="h-5 w-5 text-tots-peach" />
              <span className="font-medium text-gray-700">Family Travel Made Easy</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-semibold">
              Pack Light, Travel Happy
            </h2>
            
            <p className="text-lg text-gray-600">
              Leave the bulky baby gear at home. We've got everything you need waiting at your destination.
            </p>
            
            <ul className="space-y-2">
              {[
                "No extra baggage fees",
                "Save space in your car",
                "Clean, quality equipment",
                "Convenience that makes travel stress-free",
                "Support local family businesses"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-2 mt-1 bg-tots-green/30 p-1 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              className="bg-gradient-to-r from-tots-peach to-tots-yellow text-primary-foreground font-medium rounded-full py-6 text-lg transition-all hover:shadow-lg hover:-translate-y-1 w-full md:w-auto px-8"
            >
              Book Your Baby Gear Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackLightSection;
