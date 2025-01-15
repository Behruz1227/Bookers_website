import Footer from '@/components/footer/Footer'

import HeaderTitles from '@/components/HeadTitle'
import img from "@/assets/img/telegram-cloud-photo-size-2-5422467465163692948-y 1 (3).png"

import React from 'react'

//hero img

import OfferCards from '@/components/cards/OfferCards'
export const Vacancies: React.FC = () => {
  return (
    <div>
      <div className='bg-[#111827]'>

        <div className='mx-auto pb-20 '>
          <div className='flex justify-between items-center gap-10'>
            <div className='w-[50%]'>
              <h1 className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] text-4xl'>Компания Well Tech:  Вакансии</h1>
              <p className='font-manrope text-[16px] md:text-[18px] font-medium text-[#B9B9C9] leading-[24px] md:leading-[30px] my-5 md:my-10 text-left'>Вы готовы нести  ответственность за свою работу и результаты, способствовать эффективному выполнению задач и достижению результатов?
                Компания Well Tech открыта для реализации новых возможностей и расширять состав команды. </p>
              <p className='font-manrope text-[16px] md:text-[18px] font-medium text-[#B9B9C9] leading-[24px] md:leading-[30px] my-5 md:my-10 text-left'>В команде мы поощряем активное взаимодействие и обмен идеями, совместно работать, находить наилучшие решения и быстро адаптироваться к изменениям.
              </p>
            </div>
            <div className='w-[50%]'>
              <img src={img} alt="" />
            </div>
          </div>
          <div className="">
            <HeaderTitles text="Вакансии" size="" />
            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 py-20">
              <OfferCards
                title="Комьюнити-менеджер"
                description="Коммьюнити-менеджеры отвечают за создание, развитие, управление и общение с участниками сообщества"
                secondButtonTitle="Подробнее"
              />
            </div>
          </div>

        </div>
        <Footer />
      </div>
    </div>
  )
}




