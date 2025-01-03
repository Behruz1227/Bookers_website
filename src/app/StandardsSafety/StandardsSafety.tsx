import Footer from '@/components/footer/Footer'
import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import React from 'react'

//hero img 
import imgSplide from "@/assets/img/Mask group (8).png"
export const StandardsSafety: React.FC = () => {
  return (
    <div>
      <div className='bg-[#111827]'>
        <Header />
        <div className='container mx-auto '>
          <Hero slides={[{
            title: "Стандартизация и Безопасность",
            description: "Вы готовы нести  ответственность за свою работу и результаты, способствовать эффективному выполнению задач и достижению результатов? Компания Well Tech открыта для реализации новых возможностей и расширять состав команды",
            description2:"В команде мы поощряем активное взаимодействие и обмен идеями, совместно работать, находить наилучшие решения и быстро адаптироваться к изменениям.",
            image: imgSplide, // Replace with your image path
          },
          {
            title: "Стандартизация и Безопасность",
            description: "Вы готовы нести  ответственность за свою работу и результаты, способствовать эффективному выполнению задач и достижению результатов? Компания Well Tech открыта для реализации новых возможностей и расширять состав команды",
            description2:"В команде мы поощряем активное взаимодействие и обмен идеями, совместно работать, находить наилучшие решения и быстро адаптироваться к изменениям.",
            image: imgSplide, // Replace with your image path
          },
          {
            title: "Стандартизация и Безопасность",
            description: "Вы готовы нести  ответственность за свою работу и результаты, способствовать эффективному выполнению задач и достижению результатов? Компания Well Tech открыта для реализации новых возможностей и расширять состав команды",
            description2:"В команде мы поощряем активное взаимодействие и обмен идеями, совместно работать, находить наилучшие решения и быстро адаптироваться к изменениям.",
            image: imgSplide, // Replace with your image path
          },]} />
        </div>
        <Footer />
      </div>
    </div>
  )
}






