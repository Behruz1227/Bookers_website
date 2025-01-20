import Footer from '@/components/footer/Footer'

import HeaderTitles from '@/components/HeadTitle'
import img from "@/assets/img/telegram-cloud-photo-size-2-5422467465163692948-y 1 (3).png"

import React, { useEffect } from 'react'

//hero img

import OfferCards from '@/components/cards/OfferCards'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
export const Vacancies: React.FC = () => {
    const { t } = useTranslation()
    const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const section = document.getElementById(hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div>
      <div className='bg-[#111827]'>

        <div className='mx-auto pb-20 '>
          <div className='flex justify-between items-center gap-10'>
            <div className='w-[50%]'>
              <h1 className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] text-4xl'>{t("VacanciesText1")}</h1>
              <p className='font-manrope text-[16px] md:text-[18px] font-medium text-[#B9B9C9] leading-[24px] md:leading-[30px] my-5 md:my-10 text-left'>{t("VacanciesText2")}</p>
              <p className='font-manrope text-[16px] md:text-[18px] font-medium text-[#B9B9C9] leading-[24px] md:leading-[30px] my-5 md:my-10 text-left'>{t('VacanciesText3')}
              </p>
            </div>
            <div className='w-[50%]'>
              <img src={img} alt="" />
            </div>
          </div>
          <div id='vacancies' className="">
            <HeaderTitles text={t('VacanciesHeaderTitles')} size="" />
            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 py-20">
              <OfferCards
                title={t('VacanciesOfferCardsTitle')}
                description={t('VacanciesDescription')}
                secondButtonTitle={t('VacanciesSecondButtonTitle')}
              />
            </div>
          </div>

        </div>
        <Footer />
      </div>
    </div>
  )
}




