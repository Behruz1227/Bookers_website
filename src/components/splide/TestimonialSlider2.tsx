"use client"

import React, { useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Pagination, Navigation } from "swiper/modules"
import { TestimonialCard } from "@/components/cards/TestimonialCard2"
import { useGlobalRequest } from "@/helpers/Quary/quary"
import { BASE_URL } from "@/helpers/Url"
import { useTranslation } from "react-i18next"

interface TestimonialSliderProps {
  masterId: string
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ masterId }) => {
  const { t } = useTranslation()
  const { loading, error, response, globalDataFunc } = useGlobalRequest(
    `${BASE_URL}/api/leave/feedback/one/master?page=0&size=10&masterId=${masterId}`,
    "GET"
  )

  useEffect(() => {
    globalDataFunc()
  }, [globalDataFunc])

  if (loading || error || !response?.body?.object || response.body.object.length === 0) {
    return null
  }

  const testimonials = response.body.object

  return (
    <div className="py-10 relative">
      <h2 className="text-white text-center font-medium text-3xl mb-8">{t("Отзывы")}</h2>
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
        breakpoints={{
          1280: { slidesPerView: 3 },
          1024: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 1, spaceBetween: 12 },
          0: { slidesPerView: 1, spaceBetween: 8 },
        }}
      >
        {testimonials.map((testimonial: any, index: number) => (
          <SwiperSlide key={index} className="pb-20">
            <TestimonialCard {...testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
