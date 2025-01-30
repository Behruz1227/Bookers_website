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
          <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-12 ">
            {/* Matn qismi */}
            <div className="relative">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] font-manrope font-extrabold text-[50px] leading-[50px] tracking-[-0.04em]">
                {t('Стандартизация и Безопасность')}
              </h1>
              <p className="text-[#B9B9C9] hidden lg:flex lg:text-lg font-medium text-[26px] py-10 font-manrope leading-[26px]">
                {t('Вы готовы нести  ответственность за свою работу и результаты, способствовать эффективному выполнению задач и достижению результатов? Компания Well Tech открыта для реализации новых возможностей и расширять состав команды.')}
              </p>
              <p className="text-[#B9B9C9] hidden lg:flex lg:text-lg font-medium text-[26px]  font-manrope leading-[26px]">
                {t('В команде мы поощряем активное взаимодействие и обмен идеями, совместно работать, находить наилучшие решения и быстро адаптироваться к изменениям.')}
              </p>
            </div>

            {/* Dumaloq rasm */}
            <div className="relative flex justify-center">
              <img className="w-full max-w-[450px] sm:max-w-[550px] lg:max-w-none rounded-full aspect-square object-cover" src={imgSplide} alt="img" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}






