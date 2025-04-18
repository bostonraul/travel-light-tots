import React, { useEffect, useRef } from 'react';
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
    'Save space in your car',
    'Clean, quality equipment',
    'Convenience that makes travel stress-free',
    'Support local family businesses'
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      
      if (scrollProgress > 0 && scrollProgress < 1) {
        image.style.transform = `translateY(${scrollProgress * 20}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = async () => {
    try {
      console.log('Benefits button clicked'); // Debug log
      if (onButtonClick) {
        await onButtonClick("Book your baby gear");
      }
      onBookClick();
    } catch (error) {
      console.error('Error in handleClick:', error);
    }
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-tots-sand via-tots-cream to-tots-sand overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div ref={imageRef} className="w-full md:w-1/2 transform transition-transform duration-700 hover:scale-105">
            <div className="relative">
              {/* Main image with premium border treatment */}
              <div className="bg-gradient-to-br from-tots-chocolate via-tots-caramel to-tots-cream p-1 rounded-3xl shadow-xl">
                <div className="bg-white rounded-3xl overflow-hidden">
                  <img 
                    src="/lovable-uploads/b6b29315-f086-4288-8ac0-be44099ad36a.png" 
                    alt="Happy family traveling light" 
                    className="w-full h-auto object-cover rounded-2xl transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-tots-caramel/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-tots-chocolate/10 rounded-full blur-xl"></div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-10">
            <ul className="space-y-6">
              {benefits.map((benefit, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-4 transform transition-all duration-500 hover:translate-x-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-tots-cream rounded-full p-2 shadow-md">
                    <Check className="w-5 h-5 text-tots-chocolate" />
                  </div>
                  <span className="text-lg text-tots-chocolate font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <Button
              onClick={handleClick}
              disabled={isLoading}
              className="w-full bg-tots-chocolate text-white font-medium rounded-full py-7 text-lg transition-all hover:shadow-lg hover:bg-tots-mocha transform hover:-translate-y-1"
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
