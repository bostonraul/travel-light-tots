import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BenefitsSectionProps {
  onBookClick: () => void;
  isLoading?: boolean;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onBookClick, isLoading }) => {
  const benefits = [
    'Save space in your car',
    'Clean, quality equipment',
    'Convenience that makes travel stress-free',
    'Support local family businesses'
  ];

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
          
          <div className="w-full md:w-1/2 space-y-8">
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <Button
              onClick={onBookClick}
              disabled={isLoading}
              className="w-full bg-black text-white font-medium rounded-full py-6 text-lg transition-all hover:shadow-md"
            >
              Book Your Baby Gear Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
