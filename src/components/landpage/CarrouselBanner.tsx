import React, { useState, useEffect } from 'react';

interface CarouselProps {
  slides: string[];
}

const CarrouselBanner: React.FC<CarouselProps> = ({ slides }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const delta = Math.sign((event as WheelEvent).deltaY);
      setActiveSlide((prevSlide) => {
        const nextSlide = prevSlide + delta;
        return Math.max(0, Math.min(nextSlide, slides.length - 1));
      });
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [slides]);

  return (
    <div className="carrousel-banner">
      {slides.map((image, index) => (
        <div key={index} style={{ display: index === activeSlide ? 'block' : 'none' }}>
          <img key={index} src={image} alt="carousel item" />
        </div>        
      ))}
    </div>
  );
};

export default CarrouselBanner;