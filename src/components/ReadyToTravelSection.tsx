import React from 'react';
import { Button } from '@/components/ui/button';

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
  const handleClick = async () => {
    if (onButtonClick) {
      await onButtonClick("Plan your trip");
    }
    onPlanClick();
  };

  return (
    <section className="py-20 px-4 text-center">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-semibold mb-6">Ready to Travel Light?</h2>
        <p className="text-xl text-gray-600 mb-10">
          Start planning your stress-free family vacation today. We'll take care of the baby gear!
        </p>
        <Button
          onClick={handleClick}
          disabled={isLoading}
          className="bg-white border border-black text-black font-medium rounded-full py-6 px-8 text-lg transition-all hover:shadow-md"
        >
          Plan Your Trip Now
        </Button>
      </div>
    </section>
  );
};

export default ReadyToTravelSection; 