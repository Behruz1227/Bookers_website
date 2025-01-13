import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { useGlobalRequest } from '@/helpers/Quary/quary';
//url
import {BASE_URL} from "@/helpers/Url"

export const TestimonialSlider: React.FC = () => {
  const { loading, error, response, globalDataFunc } = useGlobalRequest(
    `${BASE_URL}/api/leave/feedback/list`,
    'GET',
  );

  useEffect(() => {
    globalDataFunc();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

 

  const buttonStyles = {
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'justify-between ',
    alignItems: 'center',
    color: '#ffffff',
    borderRadius: '50%',
    position: 'absolute' as const,
    zIndex: 10,
    opacity: 0.7,
    transition: 'opacity 0.3s ease',
    cursor: 'pointer',
  };

  const prevButtonStyles = { ...buttonStyles, left: '8px' }; // Chap tugma
  const nextButtonStyles = { ...buttonStyles, right: '8px' }; // O‘ng tugma

  return (
    <div className="max-w-7xl mx-auto  py-20 relative">
      <Swiper
  modules={[Pagination, Navigation]}
  spaceBetween={24}
  slidesPerView={3} // Default
  pagination={{ clickable: true }}
  navigation={{
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }}
  breakpoints={{
    1280: { slidesPerView: 3 }, // Desktop
    1024: { slidesPerView: 2, spaceBetween: 16 }, // Tablet landscape
    768: { slidesPerView: 1, spaceBetween: 12 }, // Tablet portrait
    480: { slidesPerView: 1, spaceBetween: 8 }, // Mobile
  }}
>
  {response?.body?.length > 0 &&
    response?.body?.map((testimonial: any, index: number) => (
      <SwiperSlide key={index}>
        <TestimonialCard {...testimonial} />
      </SwiperSlide>
    ))}
</Swiper>


      {/* Tugmalar */}
      <div
        className="swiper-button-prev"
        style={prevButtonStyles}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
      >
      
      </div>
      <div
        className="swiper-button-next"
        style={nextButtonStyles}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
      >

      </div>
    </div>
  );
};
