import Footer from '@/components/footer/Footer'
import React from 'react'

//hero img 
import imgSplide from "@/assets/img/Mask group (8).png"
import { useTranslation } from 'react-i18next'
export const StandardsSafety: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className=''>
      <div className='bg-[#111827] '>
        <div className='pb-60'>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 pb-20">
            {/* Matn qismi */}
            <div className="w-full lg:w-[50%] order-2 lg:order-1 text-center lg:text-left">
              <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] text-3xl lg:text-4xl">
                {t('Стандартизация и Безопасность')}
              </h1>
              <p className="text-[#B9B9C9]  lg:flex lg:text-lg font-medium text-[26px] py-10 font-manrope leading-[26px]">
                {t('Вы готовы нести  ответственность за свою работу и результаты, способствовать эффективному выполнению задач и достижению результатов? Компания Well Tech открыта для реализации новых возможностей и расширять состав команды.')}
              </p>
              <p className="text-[#B9B9C9]  lg:flex lg:text-lg font-medium text-[26px] font-manrope leading-[26px]">
                {t('В команде мы поощряем активное взаимодействие и обмен идеями, совместно работать, находить наилучшие решения и быстро адаптироваться к изменениям.')}
              </p>
            </div>

            {/* Dumaloq rasm */}
            <div className="w-full lg:w-[50%] order-1 lg:order-2 flex justify-center">
              <img className="w-full max-w-[450px] sm:max-w-[550px] lg:max-w-none rounded-full aspect-square object-cover" src={imgSplide} alt="img" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}






