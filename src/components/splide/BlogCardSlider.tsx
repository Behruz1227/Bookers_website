import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Blogcard from '@/components/cards/blog-card';

interface BlogPost {
  id: number;
  image: string;
  date: string;
  title: string;
  description: string;
}

interface BlogCardSliderProps {
  posts: BlogPost[];
}

export const BlogCardSlider: React.FC<BlogCardSliderProps> = ({ posts }) => {
  const splideOptions = {
    type: 'loop',
    perPage: 3,
    perMove: 1,
    gap: '2rem',
    pagination: true,
    arrows: true,
    autoplay: true,
    interval: 4000,
    breakpoints: {
      1024: {
        perPage: 2,
      },
      640: {
        perPage: 1,
      }
    }
  };

  return (
    <div className="w-full py-20">
      <div className="max-w-7xl mx-auto ">
        <Splide options={splideOptions}>
          {posts.map((post) => (
            <SplideSlide key={post.id}>
              <Blogcard
                id={post.id}
                image={post.image}
                date={post.date}
                title={post.title}
                description={post.description}
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};