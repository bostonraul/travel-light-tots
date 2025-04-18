import React, { useState } from 'react';
import TravelForm from '@/components/TravelForm';
import BenefitsSection from '@/components/BenefitsSection';
import VacationLifesaverSection from '@/components/VacationLifesaverSection';
import ReadyToTravelSection from '@/components/ReadyToTravelSection';
import WhyTravelLightSection from '@/components/WhyTravelLightSection';

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const webhookUrl = "https://script.google.com/macros/s/AKfycbwn-uEohSTftq6lBsx8woI2b2Fc0wWeO6TiEWK8Cootxf7s7ad3btV37UwSReI8dlpbFg/exec";

  const logButtonClick = async (ctaType: string) => {
    try {
      const currentTime = new Date().toISOString();
      const params = new URLSearchParams({
        travel_date: "",
        destination: "",
        submitted_at: currentTime,
        cta: ctaType
      });

      // Log the exact data being sent
      console.log('Sending button click data:', Object.fromEntries(params.entries()));

      // Append parameters to URL
      const urlWithParams = `${webhookUrl}?${params.toString()}`;
      console.log('Request URL:', urlWithParams);

      const response = await fetch(urlWithParams, {
        method: "GET",
        mode: "no-cors",
      });

      console.log('Request sent successfully');

    } catch (error) {
      console.error("Error in logButtonClick:", error);
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
          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Left Column - Text Content */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900">
                  Baby on board?
                </h1>
                <h2 className="text-4xl md:text-5xl font-medium text-tots-peach">
                  Travel light!
                </h2>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Just tell us your gear needs, and we'll handle the rest. 
                Enjoy your family vacation without lugging around bulky baby equipment.
              </p>
              <div id="travel-form" className="pt-6">
                <TravelForm />
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="w-full md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/car-seat-installation.jpeg"
                  alt="Parent installing a car seat"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Travel Light Section */}
      <WhyTravelLightSection />

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
