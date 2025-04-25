import React from 'react';
import { ArrowRight, Shield, Clock, HandHeart, Moon } from 'lucide-react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// Import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

interface GearItemProps {
  image: string;
  title: string;
}

const GearItem = ({ image, title }: GearItemProps) => (
  <div className="flex flex-col items-center">
    <div className="bg-white rounded-xl shadow-md p-4 mb-3 w-full aspect-square flex items-center justify-center">
      <img src={image} alt={title} className="max-w-full max-h-full object-contain" />
    </div>
    <p className="text-center text-sm font-medium mt-4">{title}</p>
  </div>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
    <div className="mb-4 text-tots-peach">
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const VacationLifesaverSection = () => {
  const babyGear = [
    { image: "/lovable-uploads/Crib.JPG", title: "Cribs & Sleep" },
    { image: "/lovable-uploads/Carseat.JPG", title: "Car Seats" },
    { image: "/lovable-uploads/stroller.JPG", title: "Strollers & Wagons" },
    { image: "/lovable-uploads/Highchairs.JPG", title: "High Chairs" },
    { image: "/lovable-uploads/babymonitor.JPG", title: "Baby Monitors" },
    { image: "/lovable-uploads/bassinet.png", title: "Bassinets" },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-white to-tots-blue/10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-medium text-black mb-2">Your vacation lifesaver.</h2>
          <div className="bg-[#FFF6E5] text-black py-2 px-6 rounded-md inline-block mb-6">
            <h3 className="text-2xl font-bold">Baby Gear Delivered, Anywhere You Go.</h3>
          </div>
        </div>
        
        <div className="mb-16">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full py-12"
          >
            {babyGear.map((item, index) => (
              <SwiperSlide key={index} className="w-64 sm:w-72">
                <GearItem image={item.image} title={item.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <FeatureCard
            icon={<Shield className="w-10 h-10" />}
            title="Clean, Safe & Insured"
            description="Cleanliness and safety are top priorities. Our providers are thoroughly trained on product safety and cleaning protocols. Insurance is included with every rental."
          />
          <FeatureCard
            icon={<ArrowRight className="w-10 h-10" />}
            title="Enjoy the Journey"
            description="Renting baby gear allows you to enjoy the adventure of getting to your vacation destination. Eliminate the need to pack and haul bulky baby equipment through airports or valuable trunk space."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard
            icon={<Moon className="w-10 h-10" />}
            title="More Rest = More Adventure"
            description="There's a reason full-size cribs are our #1 most rented item. When a baby doesn't sleep well on vacation, no one does! Recreating the comforts of home is the key to having a fun and restful getaway."
          />
          <FeatureCard
            icon={<HandHeart className="w-10 h-10" />}
            title="Support Local Families"
            description="By choosing to rent baby gear instead of dealing with the hassle of transporting your own, you are supporting local providers who are building their own independent businesses to make family vacations easy and stress-free."
          />
        </div>
      </div>
    </section>
  );
};

export default VacationLifesaverSection;
