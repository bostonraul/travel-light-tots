import React from 'react';
import TravelForm from './TravelForm';
import BenefitsSection from './BenefitsSection';
import VacationLifesaverSection from './VacationLifesaverSection';
import ReadyToTravelSection from './ReadyToTravelSection';
import '../styles/vertical-scroll.css';

interface VerticalSliderProps {
  onPlanClick: () => void;
  onButtonClick: (cta: string) => void;
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({ onPlanClick, onButtonClick }) => {
  return (
    <div className="vertical-scroll-container">
      <section className="section">
        <div className="section-content">
          <TravelForm onPlanClick={onPlanClick} onButtonClick={onButtonClick} />
        </div>
      </section>
      
      <section className="section">
        <div className="section-content">
          <BenefitsSection onButtonClick={onButtonClick} />
        </div>
      </section>
      
      <section className="section">
        <div className="section-content">
          <VacationLifesaverSection onButtonClick={onButtonClick} />
        </div>
      </section>
      
      <section className="section">
        <div className="section-content">
          <ReadyToTravelSection onPlanClick={onPlanClick} onButtonClick={onButtonClick} />
        </div>
      </section>
    </div>
  );
};

export default VerticalSlider; 