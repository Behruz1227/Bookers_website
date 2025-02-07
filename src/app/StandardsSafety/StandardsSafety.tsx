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
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 lg:gap-10 pb-10 sm:pb-16 md:pb-20">
            {/* Matn qismi */}
            <div className="w-full lg:w-[50%] order-2 lg:order-1 text-center lg:text-left">
              <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[44px] leading-tight pb-5">
                {t('Стандартизация и Безопасность')}
              </h1>

              <p className="text-[#B9B9C9] font-manrope font-medium text-[14px] sm:text-[16px] md:text-[18px] lg:text-[18px] leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] py-4 sm:py-6 lg:py-8">
                {t('Вы готовы нести  ответственность за свою работу и результаты, способствовать эффективному выполнению задач и достижению результатов? Компания Well Tech открыта для реализации новых возможностей и расширять состав команды.')}
              </p>

              <p className="text-[#B9B9C9] font-manrope font-medium text-[14px] sm:text-[16px] md:text-[18px] lg:text-[18px] leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px]">
                {t('В команде мы поощряем активное взаимодействие и обмен идеями, совместно работать, находить наилучшие решения и быстро адаптироваться к изменениям.')}
              </p>
            </div>

            {/* Dumaloq rasm */}
            <div className="w-full lg:w-[50%] order-1 lg:order-2 flex justify-center">
              <img
                className="w-full max-w-[250px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-none rounded-full aspect-square object-cover"
                src={imgSplide}
                alt="img"
              />
            </div>
          </div>


        </div>
        <Footer />
      </div>
    </div>
  )
}






