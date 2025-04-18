import React, { useRef, useEffect } from 'react';
import { Baby } from 'lucide-react';
import TravelForm from './TravelForm';

const HeroSection = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const image = imageRef.current;
    if (!content || !image) return;

    // Initial animations
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
    image.style.opacity = '1';
    image.style.transform = 'translateX(0)';

    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        const progress = scrolled / window.innerHeight;
        image.style.transform = `translateY(${progress * 50}px) rotate(${progress * 2}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen py-16 md:py-24 px-4 overflow-hidden bg-gradient-to-br from-tots-sand via-tots-cream to-tots-sand">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-tots-caramel/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-tots-chocolate/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div 
            ref={contentRef}
            className="space-y-8"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
            }}
          >
            <div className="flex items-center space-x-3 transform hover:scale-105 transition-transform">
              <div className="bg-gradient-to-br from-tots-chocolate to-tots-caramel p-3 rounded-xl shadow-lg">
                <Baby className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-tots-chocolate">ToyBuddy</h2>
            </div>
            
            <div className="space-y-4">
              <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl leading-tight">
                <span className="text-tots-chocolate block">Baby on board?</span>
                <span className="bg-gradient-to-r from-tots-chocolate to-tots-caramel bg-clip-text text-transparent">
                  Travel light!
                </span>
              </h1>
              
              <p className="text-xl text-tots-mocha max-w-lg leading-relaxed">
                Just tell us your gear needs, and we'll handle the rest. Enjoy your family vacation 
                without lugging around bulky baby equipment.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-tots-chocolate/5 to-tots-caramel/5 rounded-3xl transform rotate-1"></div>
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-10 border border-tots-cream relative">
                <h3 className="text-2xl font-semibold text-tots-chocolate mb-6">Where are you heading with your little one?</h3>
                <TravelForm />
              </div>
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className="hidden lg:block"
            style={{
              opacity: 0,
              transform: 'translateX(20px)',
              transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
            }}
          >
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute -top-20 -left-20 w-48 h-48 bg-tots-caramel/20 rounded-full animate-float"></div>
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-tots-chocolate/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
              
              {/* Main image container */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-tots-chocolate via-tots-caramel to-tots-cream rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-white">
                  <div className="w-full h-[32rem] bg-gradient-to-br from-tots-sand to-tots-cream rounded-2xl overflow-hidden">
                    <img 
                      src="/lovable-uploads/b6b29315-f086-4288-8ac0-be44099ad36a.png" 
                      alt="Happy family with baby on vacation" 
                      className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
