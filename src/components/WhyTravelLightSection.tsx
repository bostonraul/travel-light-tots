import React from 'react';
import { Luggage, CheckCircle, PiggyBank, Clock } from 'lucide-react';

const WhyTravelLightSection = () => {
  const features = [
    {
      icon: <Luggage className="w-8 h-8 text-tots-peach" />,
      title: "Travel Light",
      description: "No more lugging around strollers, cribs, or car seats. Travel with just the essentials."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      title: "Quality Gear",
      description: "We provide clean, safe, high-quality baby equipment for your peace of mind."
    },
    {
      icon: <PiggyBank className="w-8 h-8 text-blue-500" />,
      title: "Save Money",
      description: "Rent what you need instead of buying expensive equipment for short trips."
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: "Delivered On Time",
      description: "Your baby equipment will be waiting for you when you arrive at your destination."
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold mb-4">Why Travel Light with Us?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make traveling with babies stress-free by providing everything you need at your destination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`p-6 rounded-2xl ${
                index === 0 ? 'bg-tots-peach/10' :
                index === 1 ? 'bg-green-50' :
                index === 2 ? 'bg-blue-50' :
                'bg-orange-50'
              }`}
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTravelLightSection; 