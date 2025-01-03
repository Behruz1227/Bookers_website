import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { TestimonialCard } from '@/components/cards/TestimonialCard';

const testimonials = [
  {
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
    author: "Анастасия Дан",
    company: "Beauty Wave"
  },
  {
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
    author: "Роман Левел",
    company: "Tamo Style"
  },
  {
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
    author: "Алекс Сажетт",
    company: "Lotus SPA"
  },
  {
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
    author: "Анастасия Дан",
    company: "Beauty Wave"
  },
  {
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
    author: "Роман Левел",
    company: "Tamo Style"
  },
];

export const TestimonialSlider: React.FC = () => {
  const splideOptions = {
    type: 'slide',
    perPage: 3,
    perMove: 1,
    gap: '1rem',
    pagination: true,
    arrows: true,
    breakpoints: {
      1024: {
        perPage: 2,
      },
      768: {
        perPage: 1,
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <Splide options={splideOptions}>
        {testimonials.map((testimonial, index) => (
          <SplideSlide key={index}>
            <TestimonialCard {...testimonial} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};