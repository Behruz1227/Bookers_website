"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Pagination, Navigation } from "swiper/modules"
import { TestimonialCard } from "@/components/cards/otviz"
import { useGlobalRequest } from "@/helpers/Quary/quary"
import { BASE_URL } from "@/helpers/Url"

interface MasterReviewsProps {
  masterId: string
  reviews?: any[]
}

export const MasterReviews: React.FC<MasterReviewsProps> = ({ masterId, reviews }) => {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)

  const { loading, error, response, globalDataFunc } = useGlobalRequest(
    `${BASE_URL}/api/leave/feedback/one/master?page=${page}&size=${size}&masterId=${masterId}`,
    "GET",
  )
  console.log("masterone", response)

  useEffect(() => {
    globalDataFunc()
  }, [globalDataFunc, page, size, masterId])

  if (loading) {
    return <div className="text-center py-10 text-white">Loading reviews...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading reviews: {error}</div>
  }

  const reviewsToDisplay = reviews || response?.content || []

  const buttonStyles = {
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    borderRadius: "50%",
    position: "absolute" as const,
    zIndex: 10,
    opacity: 0.7,
    transition: "opacity 0.3s ease",
    cursor: "pointer",
    top: "-10px",
  }

  const prevButtonStyles = { ...buttonStyles, left: "47%" }
  const nextButtonStyles = { ...buttonStyles, right: "47%" }

  return (
    <div className="py-20 relative">
      <style>
        {`
          .swiper-pagination {
            position: absolute;
            bottom: 0 !important;
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

          .swiper-pagination-bullet:nth-child(n+6) {
            display: none;
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
          480: { slidesPerView: 1, spaceBetween: 8 },
        }}
      >
        {reviewsToDisplay.length > 0 &&
          reviewsToDisplay.map((testimonial: any, index: number) => (
            <SwiperSlide key={index} className="pb-20">
              <TestimonialCard {...testimonial} />
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