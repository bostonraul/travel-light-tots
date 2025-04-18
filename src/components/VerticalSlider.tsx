import React, { useEffect, useRef } from 'react';
import TravelForm from './TravelForm';
import BenefitsSection from './BenefitsSection';
import VacationLifesaverSection from './VacationLifesaverSection';
import ReadyToTravelSection from './ReadyToTravelSection';
import '../styles/swiper.css';

interface VerticalSliderProps {
  onBookClick: () => void;
  onPlanClick: () => void;
  onButtonClick: (cta: string) => void;
}

declare global {
  interface Window {
    Swiper: any;
  }
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({
  onBookClick,
  onPlanClick,
  onButtonClick,
}) => {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperRef.current && window.Swiper) {
      new window.Swiper(swiperRef.current, {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        speed: 800,
      });
    }
  }, []);

  return (
    <div className="swiper-container" ref={swiperRef}>
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <TravelForm onBookClick={onBookClick} onButtonClick={onButtonClick} />
        </div>
        <div className="swiper-slide">
          <BenefitsSection onBookClick={onBookClick} onButtonClick={onButtonClick} />
        </div>
        <div className="swiper-slide">
          <VacationLifesaverSection />
        </div>
        <div className="swiper-slide">
          <ReadyToTravelSection onPlanClick={onPlanClick} onButtonClick={onButtonClick} />
        </div>
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default VerticalSlider; 