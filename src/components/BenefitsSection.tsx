
import React from 'react';
import { Luggage, CheckCircle2, PiggyBank, Clock3 } from 'lucide-react';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

const BenefitCard = ({ icon, title, description, bgColor }: BenefitCardProps) => (
  <div className={`${bgColor} rounded-3xl p-6 h-full transition-transform hover:-translate-y-1 duration-300`}>
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 h-full">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Luggage className="w-10 h-10 text-tots-peach" />,
      title: "Travel Light",
      description: "No more lugging around strollers, cribs, or car seats. Travel with just the essentials.",
      bgColor: "bg-tots-peach/20",
    },
    {
      icon: <CheckCircle2 className="w-10 h-10 text-green-500" />,
      title: "Quality Gear",
      description: "We provide clean, safe, high-quality baby equipment for your peace of mind.",
      bgColor: "bg-tots-green/20",
    },
    {
      icon: <PiggyBank className="w-10 h-10 text-blue-500" />,
      title: "Save Money",
      description: "Rent what you need instead of buying expensive equipment for short trips.",
      bgColor: "bg-tots-blue/20",
    },
    {
      icon: <Clock3 className="w-10 h-10 text-amber-500" />,
      title: "Delivered On Time",
      description: "Your baby equipment will be waiting for you when you arrive at your destination.",
      bgColor: "bg-tots-yellow/20",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-white to-tots-blue/10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Why Travel Light with Us?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We make traveling with babies stress-free by providing everything you need at your destination.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              bgColor={benefit.bgColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
