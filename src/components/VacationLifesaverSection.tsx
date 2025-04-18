import React, { useRef, useEffect } from 'react';
import { ArrowRight, Shield, Clock, HandHeart, Moon } from 'lucide-react';

interface GearItemProps {
  image: string;
  title: string;
  index: number;
}

const GearItem = ({ image, title, index }: GearItemProps) => (
  <div 
    className="flex flex-col items-center transform transition-all duration-500 hover:scale-105"
    style={{ 
      animationDelay: `${index * 100}ms`,
      animation: 'fade-in 0.5s ease-out forwards',
      opacity: 0 
    }}
  >
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-tots-chocolate via-tots-caramel to-tots-cream rounded-xl transform rotate-6 scale-105 opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
      <div className="bg-white rounded-xl shadow-lg p-4 mb-3 w-36 h-36 flex items-center justify-center transform transition-transform duration-300 hover:translate-y-[-5px]">
        <img src={image} alt={title} className="max-w-full max-h-full object-contain" />
      </div>
    </div>
    <p className="text-center text-sm font-medium text-tots-chocolate mt-3">{title}</p>
  </div>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className="bg-gradient-to-br from-white via-tots-sand to-tots-cream rounded-xl p-8 shadow-lg h-full transform transition-all duration-500"
      style={{ 
        opacity: 0, 
        transform: 'translateY(20px)',
        transitionDelay: `${index * 200}ms`
      }}
    >
      <div className="mb-6 text-tots-chocolate bg-tots-cream p-3 rounded-full w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4 text-tots-chocolate">{title}</h3>
      <p className="text-tots-mocha leading-relaxed">{description}</p>
    </div>
  );
};

const VacationLifesaverSection = () => {
  const babyGear = [
    { image: "/lovable-uploads/Crib.JPG", title: "Cribs & Sleep" },
    { image: "/lovable-uploads/Carseat.JPG", title: "Car Seats" },
    { image: "/lovable-uploads/stroller.JPG", title: "Strollers & Wagons" },
    { image: "/lovable-uploads/High Chair.JPG", title: "High Chairs" },
    { image: "/lovable-uploads/babymonitor.JPG", title: "Baby Monitors" },
    { image: "/lovable-uploads/bassinet.png", title: "Bassinets" },
  ];

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      
      if (scrollProgress > 0 && scrollProgress < 1) {
        section.style.backgroundPosition = `50% ${scrollProgress * 20}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 bg-gradient-to-br from-tots-sand via-tots-cream to-tots-sand overflow-hidden"
      style={{ backgroundSize: '200% 200%', transition: 'background-position 0.3s ease-out' }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 transform transition-all duration-500 hover:scale-105">
          <h2 className="text-3xl font-semibold text-tots-chocolate mb-4">Your vacation lifesaver.</h2>
          <div className="bg-gradient-to-r from-tots-chocolate to-tots-caramel text-white py-4 px-8 rounded-2xl inline-block shadow-lg">
            <h3 className="text-2xl font-bold">Baby Gear Delivered, Anywhere You Go.</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {babyGear.map((item, index) => (
            <GearItem key={index} image={item.image} title={item.title} index={index} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <FeatureCard
            icon={<Shield className="w-12 h-12" />}
            title="Clean, Safe & Insured"
            description="Cleanliness and safety are top priorities. Our providers are thoroughly trained on product safety and cleaning protocols. Insurance is included with every rental."
            index={0}
          />
          <FeatureCard
            icon={<ArrowRight className="w-12 h-12" />}
            title="Enjoy the Journey"
            description="Renting baby gear allows you to enjoy the adventure of getting to your vacation destination. Eliminate the need to pack and haul bulky baby equipment through airports or valuable trunk space."
            index={1}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard
            icon={<Moon className="w-12 h-12" />}
            title="More Rest = More Adventure"
            description="There's a reason full-size cribs are our #1 most rented item. When a baby doesn't sleep well on vacation, no one does! Recreating the comforts of home is the key to having a fun and restful getaway."
            index={2}
          />
          <FeatureCard
            icon={<HandHeart className="w-12 h-12" />}
            title="Support Local Families"
            description="By choosing to rent baby gear instead of dealing with the hassle of transporting your own, you are supporting local providers who are building their own independent businesses to make family vacations easy and stress-free."
            index={3}
          />
        </div>
      </div>
    </section>
  );
};

export default VacationLifesaverSection;
