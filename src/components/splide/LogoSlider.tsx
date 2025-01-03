import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

interface LogoSliderProps {
  logos: {
    src: string;
    alt: string;
  }[];
}

export const LogoSlider: React.FC<LogoSliderProps> = ({ logos }) => {
  const splideOptions = {
    type: 'loop',
    perPage: 5,
    perMove: 1,
    gap: '2rem',
    pagination: true,
    arrows: false,
    autoplay: true,
    interval: 3000,
    breakpoints: {
      1024: {
        perPage: 4,
      },
      768: {
        perPage: 3,
      },
      640: {
        perPage: 2,
      }
    }
  };

  return (
    <div className="w-full py-20">
      <div className="max-w-7xl mx-auto ">
        <Splide options={splideOptions}>
          {logos.map((logo, index) => (
            <SplideSlide key={index}>
              <div className="flex items-center justify-between ">
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className=""
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};