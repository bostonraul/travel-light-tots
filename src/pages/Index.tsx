
import React from 'react';
import VerticalSlider from '@/components/VerticalSlider';
import '../styles/swiper.css';

const LandingPage = () => {
  const handleBookClick = () => {
    console.log('Book button clicked');
  };

  const handlePlanClick = () => {
    console.log('Plan button clicked');
  };

  const handleButtonClick = async (cta: string) => {
    console.log(`Button clicked with CTA: ${cta}`);
    return Promise.resolve();
  };

  return (
    <main className="min-h-screen">
      <VerticalSlider 
        onBookClick={handleBookClick} 
        onPlanClick={handlePlanClick} 
        onButtonClick={handleButtonClick} 
      />
    </main>
  );
};

export default LandingPage;
