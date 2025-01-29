"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import Blogcard from "@/components/cards/blog-card"
import { attachment, BASE_URL } from "@/helpers/Url"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

//img
import cardImg from "@/assets/cards/card.png"

interface BlogPost {
  id: number
  image?: string
  date: string
  title: string
  description: string
}

interface BlogSliderProps {
  page?: number
  size?: number
}

export const BlogSlider: React.FC<BlogSliderProps> = ({ page = 0, size = 10 }) => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/newsletters/web-site?page=${page}&size=${size}`)
        const result = await response.json()
        const apiData = result.body?.object || []
        const formattedPosts = apiData.map((item: any) => ({
          id: item.id,
          image: item.attachmentId ? `${attachment}${item.attachmentId}` : cardImg,
          date: item.date,
          title: item.subject,
          description: item.content,
        }))
        setPosts(formattedPosts)

        setLoading(false)
      } catch (err) {
        setError("Failed to fetch data")
        setLoading(false)
      }
    }

    fetchPosts()
  }, [page, size])

  const buttonStyles = {
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    borderRadius: "50%",
    position: "absolute" as const,
    zIndex: 2,
    opacity: 0.7,
    transition: "opacity 0.3s ease",
    cursor: "pointer",
    top: "-10px",
  }

  const prevButtonStyles = { ...buttonStyles, left: "50%", transform: "translateX(-50%)" };
  const nextButtonStyles = { ...buttonStyles, left: "50%", transform: "translateX(50%)" };


  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="py-10 relative">
      <style>
        {`
          .swiper-pagination {
             position: absolute;
            bottom: -30px !important;  
            left: 0 !important;
            right: 0 !important;
            transform: none !important;
            display: flex;
            gap: 8px;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
          }

          .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: white;
            opacity: 1;
            border-radius: 50%;
            transition: all 0.3s ease;
          }

          .swiper-pagination-bullet-active {
            background: #FF0066;
            transform: scale(1.2);
          }

          
        `}
      </style>

      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={24}
        slidesPerView={3}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            if (index >= 5) return ""
            return `<span class="${className}"></span>`
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          1280: { slidesPerView: 3 },
          1024: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 1, spaceBetween: 12 },
          0: { slidesPerView: 1, spaceBetween: 8 },
        }}
        loop={true}
        className="py-8 mb-10"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id} className="pb-20">
            <Blogcard
              id={post.id}
              image={post.image ? post.image : cardImg}
              date={post.date}
              title={post.title}
              description={post.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="swiper-button-prev"
        style={prevButtonStyles}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
      />
      <div
        className="swiper-button-next"
        style={nextButtonStyles}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
      />
    </div>
  )
}

