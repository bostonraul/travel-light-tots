import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BenefitsSectionProps {
  onBookClick: () => void;
  isLoading?: boolean;
  onButtonClick?: (ctaType: string) => Promise<void>;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ 
  onBookClick, 
  isLoading,
  onButtonClick 
}) => {
  const benefits = [
    'Avoid Extra Baggage Fees When Flying',
    'Clean, quality equipment',
    'Convenience that makes travel stress-free',
    'Support local family businesses'
  ];

  const handleClick = async () => {
    try {
      console.log('Benefits button clicked'); // Debug log
  
      // 🔁 SCROLL FIRST
      onBookClick();
  
      // 🧾 THEN LOG IN BACKGROUND (non-blocking)
      if (onButtonClick) {
        onButtonClick("Book your baby gear"); // Don't await this
      }
    } catch (error) {
      console.error('Error in handleClick:', error);
    }
  };
  

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
              onClick={handleClick}
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
