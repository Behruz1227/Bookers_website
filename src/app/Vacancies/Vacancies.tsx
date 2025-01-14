import Footer from '@/components/footer/Footer'
import Header from '@/components/Header/Header'
import HeaderTitles from '@/components/HeadTitle'
import Hero from '@/components/Hero/Hero'
import React from 'react'

//hero img
import imgSplide from "@/assets/img/telegram-cloud-photo-size-2-5422467465163692948-y 1 (3).png"
import OfferCards from '@/components/cards/OfferCards'
export const Vacancies: React.FC = () => {
  return (
    <div>
      <div className='bg-[#111827]'>
        
        <div className='mx-auto pb-20 '>
          <Hero slides={[{
            title: "Компания Well Tech:  Вакансии",
            description: "Вы готовы нести  ответственность за свою работу и результаты, способствовать эффективному выполнению задач и достижению результатов? Компания Well Tech открыта для реализации новых возможностей и расширять состав команды.  ",
            description2: "В команде мы поощряем активное взаимодействие и обмен идеями, совместно работать, находить наилучшие решения и быстро адаптироваться к изменениям.",
            image: imgSplide, // Replace with your image path
          },
          {
            title: "Компания Well Tech:  Вакансии",
            description: "Вы готовы нести  ответственность за свою работу и результаты, способствовать эффективному выполнению задач и достижению результатов? Компания Well Tech открыта для реализации новых возможностей и расширять состав команды.  ",
            description2: "В команде мы поощряем активное взаимодействие и обмен идеями, совместно работать, находить наилучшие решения и быстро адаптироваться к изменениям.",
            image: imgSplide, // Replace with your image path
          },
          {
            title: "Компания Well Tech:  Вакансии",
            description: "Вы готовы нести  ответственность за свою работу и результаты, способствовать эффективному выполнению задач и достижению результатов? Компания Well Tech открыта для реализации новых возможностей и расширять состав команды.  ",
            description2: "В команде мы поощряем активное взаимодействие и обмен идеями, совместно работать, находить наилучшие решения и быстро адаптироваться к изменениям.",
            image: imgSplide, // Replace with your image path
          },]} />
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




