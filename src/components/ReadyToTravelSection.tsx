import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ReadyToTravelSectionProps {
  onPlanClick: () => void;
  isLoading?: boolean;
  onButtonClick?: (ctaType: string) => Promise<void>;
}

const ReadyToTravelSection: React.FC<ReadyToTravelSectionProps> = ({ 
  onPlanClick, 
  isLoading,
  onButtonClick 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      
      if (scrollProgress > 0 && scrollProgress < 1) {
        content.style.transform = `translateY(${scrollProgress * -30}px)`;
        content.style.opacity = Math.min(1, scrollProgress * 2).toString();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = async () => {
    try {
      console.log('Ready to Travel button clicked'); // Debug log
      if (onButtonClick) {
        await onButtonClick("Plan your trip");
      }
      onPlanClick();
    } catch (error) {
      console.error('Error in handleClick:', error);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-4 text-center overflow-hidden bg-gradient-to-br from-tots-sand via-tots-cream to-tots-sand"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-8 left-1/4 w-64 h-64 bg-tots-caramel/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-8 right-1/4 w-64 h-64 bg-tots-chocolate/10 rounded-full blur-3xl"></div>
      
      <div 
        ref={contentRef}
        className="container mx-auto max-w-4xl relative"
        style={{ 
          transform: 'translateY(30px)',
          opacity: 0,
          transition: 'transform 0.6s ease-out, opacity 0.6s ease-out'
        }}
      >
        <div className="space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold text-tots-chocolate">
            Ready to Travel Light?
          </h2>
          <p className="text-xl text-tots-mocha max-w-2xl mx-auto leading-relaxed">
            Start planning your stress-free family vacation today. We'll take care of the baby gear!
          </p>
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-tots-chocolate to-tots-caramel rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <Button
              onClick={handleClick}
              disabled={isLoading}
              className="relative bg-gradient-to-r from-tots-chocolate to-tots-caramel text-white font-medium rounded-full py-8 px-12 text-xl transition-all hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
            >
              Plan Your Trip Now
              <ArrowRight className="ml-2 w-6 h-6 inline-block transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default ReadyToTravelSection; 