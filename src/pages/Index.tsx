import React, { useState } from 'react';
import TravelForm from '@/components/TravelForm';
import BenefitsSection from '@/components/BenefitsSection';
import VacationLifesaverSection from '@/components/VacationLifesaverSection';
import ReadyToTravelSection from '@/components/ReadyToTravelSection';

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const webhookUrl = "https://script.google.com/macros/s/AKfycbwn-uEohSTftq6lBsx8woI2b2Fc0wWeO6TiEWK8Cootxf7s7ad3btV37UwSReI8dlpbFg/exec";

  const logButtonClick = async (ctaType: string) => {
    try {
      console.log('Logging button click:', ctaType); // Debug log
      const currentTime = new Date().toISOString();
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          Timestamp: currentTime,
          "Travel Date": "",
          Destination: "",
          "Submitted At": currentTime,
          "CTA Clicked": ctaType
        }),
      });
      console.log('Button click logged:', response); // Debug log
    } catch (error) {
      console.error("Error logging button click:", error);
    }
  };

  const handleBookGearClick = () => {
    // Scroll to form
    const form = document.getElementById('travel-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlanTripClick = () => {
    // Scroll to form
    const form = document.getElementById('travel-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section with Form */}
      <section className="py-16 px-4 bg-gradient-to-br from-white to-tots-peach/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                Where are you heading with your little one?
              </h1>
              <p className="text-xl text-gray-600">
                Travel light and stress-free with our baby gear rental service.
              </p>
            </div>
            <div id="travel-form" className="w-full md:w-1/2">
              <TravelForm />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <BenefitsSection 
        onBookClick={handleBookGearClick}
        onButtonClick={logButtonClick}
        isLoading={isLoading}
      />

      {/* Vacation Lifesaver Section */}
      <VacationLifesaverSection />

      {/* Ready to Travel Section */}
      <ReadyToTravelSection 
        onPlanClick={handlePlanTripClick}
        onButtonClick={logButtonClick}
        isLoading={isLoading}
      />
    </main>
  );
};

export default LandingPage;
