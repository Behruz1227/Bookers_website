import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Blogcard from '@/components/cards/blog-card';
//card img
import cardImg from "@/assets/cards/card.png"
//url
import {BASE_URL} from "@/helpers/Url"

interface BlogPost {
  id: number;
  image?: string;
  date: string;
  title: string;
  description: string;
}

export const BlogCardSlider: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  console.log("post",posts);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/masterClass/list?page=0&size=10`
        );
        const result = await response.json();
        const apiData = result.body?.object || [];
        const formattedPosts = apiData.map((item: any) => ({
          id: item.id,
          image: '', // Provide a default or dynamic image field here if available
          date: item.eventDate,
          title: item.eventName,
          description: item.eventDescription,
        }));
        setPosts(formattedPosts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full py-20">
      <div className="max-w-7xl mx-auto">
        <Splide options={splideOptions}>
          {posts.map((post) => (
            <SplideSlide key={post.id}>
              <Blogcard
                id={post.id}
                image={post.image || cardImg} 
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
