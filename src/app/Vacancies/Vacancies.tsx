import Footer from '@/components/footer/Footer'


import img from "@/assets/cards/Mask group (12).png"

import React, { useEffect, useState } from 'react'

//hero img


import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import Button from '@/components/button/Button'
import { UniversalModal } from '@/components/Modal/UniversalModal'
import LoginIndex from '@/Store'
export const Vacancies: React.FC = () => {
  const { setVacanciesHolat } = LoginIndex();
  const { t } = useTranslation()
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
          <div className='flex justify-between items-center gap-10 pb-20'>
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

          <div
            id="vacancies"
            className="bg-[#B9B9C9] p-10 rounded-3xl w-full lg:w-[50%] "
          >
            <h3 className="text-center text-[#9C0B35] font-manrope font-extrabold text-[26px]">
              {t('VacanciesHeaderTitles')}
            </h3>
            <p className="py-10 font-manrope font-medium text-[26px] text-center">
              {t('VacanciesDescription')}
            </p>
            <div className="text-center">
              <Button
                className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
                onClick={openModal}
              >
                {t('VacanciesSecondButtonTitle')}
              </Button>
            </div>
          </div>


        </div>
        <Footer />
      </div>
      <UniversalModal isOpen={isModalOpen} onClose={closeModal} style="max-h-[90vh] w-[90%]">
        <div className="w-full p-10">
          <div>
            <h1 className='font-manrope text-center font-bold text-[36px]'>{t('madal')}</h1>
            <p className="mt-4 font-bold text-[32px] font-manrope ">{t('opisanie')}:</p>
            <p className="mt-2 font-semibold text-[26px] font-manrope">
              {t('madal1')}
            </p>
            <p className="mt-2">

            </p>

            <div className="mt-4">
              <p className="font-bold text-[32px] font-manrope">{t('madal2')}:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2 font-semibold text-[26px] font-manrope ">
                <li>{t('madal3')}</li>
                <li>{t('madal4')}</li>
                <li>{t('madal5')}</li>
                <li>{t('madal6')}</li>
                <li>{t('madal7')}</li>
                <li>{t('madal8')}</li>
                <li>{t('madal9')}</li>
                <li>{t('madal10')}</li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="font-bold text-[32px] font-manrope">{t('madal11')}:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2 font-semibold text-[26px] font-manrope">
                <li>{t('madal12')}</li>
                <li>{t('madal13')}</li>
                <li>{t('madal14')}</li>
                <li>{t('madal15')}</li>
                <li>{t('madal16')}</li>
                <li>{t('madal17')}</li>
                <li>{t('madal18')}</li>
                <li>{t('madal19')}</li>
                <li>{t('madal20')}</li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="font-bold text-[32px] font-manrope">{t('madal21')}: </p>
              <ul className="list-disc pl-5 mt-2 space-y-2 font-semibold text-[26px] font-manrope">
                <li>{t('madal22')}</li>
                <li>{t('madal23')}</li>
                <li>{t('madal24')}</li>
                <li>{t('madal25')}</li>
                <li>{t('madal26')}</li>
              </ul>
            </div>

            <p className="mt-4 font-semibold text-[26px] font-manrope">
              {t('madal27')}
            </p>

            <div className='text-center mt-10'>
            <Button
              className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
              onClick={() => {
                setVacanciesHolat(true);
                setModalOpen(false);
              }}
            >
              {t('madal28')}
            </Button>
            </div>
          </div>
        </div>
      </UniversalModal>
    </div>
  )
}




