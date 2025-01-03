'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

type Slide = {
    title: string;
    description?: string;
    description2?: string;
    image: string;
};

type HeroProps = {
    slides: Slide[];
};

const Hero: React.FC<HeroProps> = ({ slides }) => {
    return (
        <div className="relative py-5 select-none w-full  md:mt-0">
            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                spaceBetween={50}
                slidesPerView={1}
                className="h-full text-white"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="h-auto flex items-center  ">
                        <div className="flex flex-col-reverse lg:flex-row justify-center items-center h-full p-4 lg:p-8">
                            <div className="w-full lg:w-1/2 text-white lg:text-left text-center lg:mb-0 mb-4">
                            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] font-manrope font-extrabold text-[50px] leading-[50px] tracking-[-0.04em]">
                              {slide.title}
                            </h1>

                                <p className="text-gray-300 hidden lg:flex lg:text-lg text-base py-10 font-manrope leading-[26px] ">
                                    {slide.description}
                                </p>
                                {slide.description2 && (
                                    <p className="text-gray-300 hidden lg:flex lg:text-lg text-base mt-4">
                                        {slide.description2}
                                    </p>
                                )}
                            </div>
                            <div className="w-full lg:w-1/2 flex justify-center mt-4 lg:mt-0">
                                <img
                                    className="rounded-lg"
                                    src={slide.image}
                                    alt="Hero image"
                                    width={400}
                                    height={400}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* <style jsx>{`
              :global(.swiper-button-next),
                :global(.swiper-button-prev) {
                    color: #9c0b35;
                    width: 30px;
                    height: 30px;
                    margin-top: -20px;
                }

                :global(.swiper-button-next:after),
                :global(.swiper-button-prev:after) {
                    font-size: 20px;
                }

                :global(.swiper-pagination-bullet) {
                    background-color: white;
                    opacity: 1;
                }

                :global(.swiper-pagination-bullet-active) {
                    background-color: #9c0b35;
                    opacity: 1;
                }
            `}</style> */}
        </div>
    );
};

export default Hero;
