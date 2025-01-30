import Footer from '@/components/footer/Footer'


import img from "@/assets/cards/Mask group (12).png"

import React, { useEffect, useState } from 'react'

//hero img


import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import Button from '@/components/button/Button'
import { UniversalModal } from '@/components/Modal/UniversalModal'
import LoginIndex from '@/Store'
import HeaderTitles from '@/components/HeadTitle'
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
              <h1 className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] text-4xl'>{t("Компания Well Tech:  Вакансии")}</h1>
              <p className='font-manrope text-[16px] md:text-[18px] font-medium text-[#B9B9C9] leading-[24px] md:leading-[30px] my-5 md:my-10 text-left'>{t("Вы готовы нести  ответственность за свою работу и результаты, способствовать эффективному выполнению задач и достижению результатов? Компания Well Tech открыта для реализации новых возможностей и расширять состав команды.")}</p>
              <p className='font-manrope text-[16px] md:text-[18px] font-medium text-[#B9B9C9] leading-[24px] md:leading-[30px] my-5 md:my-10 text-left'>{t('В команде мы поощряем активное взаимодействие и обмен идеями, совместно работать, находить наилучшие решения и быстро адаптироваться к изменениям.')}
              </p>
            </div>
            <div className='w-[50%]'>
              <img src={img} alt="" />
            </div>
          </div>
          <HeaderTitles text={t('Вакансии')}/>
          <div
            id="vacancies"
            className="bg-[#B9B9C9] p-10 rounded-3xl w-full mt-10 lg:w-[50%] "
          >
            <h3 className="text-center text-[#9C0B35] font-manrope font-extrabold text-[26px]">
              {t('Комьюнити-менеджер')}
            </h3>
            <p className="py-10 font-manrope font-medium text-[26px] text-center">
              {t('Коммьюнити-менеджеры отвечают за создание, развитие, управление и общение с участниками сообщества')}
            </p>
            <div className="text-center">
              <Button
                className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
                onClick={openModal}
              >
                {t('Подробнее')}
              </Button>
            </div>
          </div>


        </div>
        <Footer />
      </div>
      <UniversalModal isOpen={isModalOpen} onClose={closeModal} style="max-h-[90vh] w-[90%]">
        <div className="w-full p-10">
          <div>
            <h1 className='font-manrope text-center font-bold text-[36px]'>{t('Менеджер по работе с агентами')}</h1>
            <p className="mt-4 font-bold text-[32px] font-manrope ">{t('Описание')}</p>
            <p className="mt-2 font-semibold text-[26px] font-manrope">
              {t('Менеджер по работе с агентами будет отвечать за взаимодействие с мастерами и салонами красоты, которые интегрируются в систему бронирования bookers. Основная задача – обеспечение успешной интеграции агентов, поддержка и развитие взаимоотношений с ними.')}
            </p>
            <p className="mt-2">

            </p>

            <div className="mt-4">
              <p className="font-bold text-[32px] font-manrope">{t('Обязанности')}</p>
              <ul className="list-disc pl-5 mt-2 space-y-2 font-semibold text-[26px] font-manrope ">
                <li>{t('Поиск и привлечение новых мастеров и салонов красоты для интеграции в систему bookers.')}</li>
                <li>{t('Обеспечение качественной поддержки агентов на всех этапах интеграции.')}</li>
                <li>{t('Проведение обучающих сессий и тренингов по использованию платформы.')}</li>
                <li>{t('Консультирование агентов по вопросам работы с системой бронирования и решению возникающих проблем.')}</li>
                <li>{t('Анализ потребностей агентов и внесение предложений по улучшению платформы.')}</li>
                <li>{t('Постоянное взаимодействие с действующими агентами для поддержания долгосрочных отношений.')}</li>
                <li>{t('Мониторинг и анализ эффективности работы агентов в системе.')}</li>
                <li>{t('Подготовка отчетности по результатам работы с агентами.')}</li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="font-bold text-[32px] font-manrope">{t('Требования')}</p>
              <ul className="list-disc pl-5 mt-2 space-y-2 font-semibold text-[26px] font-manrope">
                <li>{t('Опыт работы в сфере продаж, клиентского сервиса или управления аккаунтами.')}</li>
                <li>{t('Понимание специфики работы в индустрии красоты.')}</li>
                <li>{t('Отличные коммуникативные навыки и способность устанавливать контакты.')}</li>
                <li>{t('Умение работать в команде и самостоятельно.')}</li>
                <li>{t('Стремление к достижению поставленных целей и ориентированность на результат.')}</li>
                <li>{t('Опыт проведения презентаций и обучения клиентов.')}</li>
                <li>{t('Высшее образование (предпочтительно в области маркетинга, менеджмента или смежных дисциплин).')}</li>
                <li>{t('Владение русским и узбекским языками (знание английского будет преимуществом).')}</li>
                <li>{t('Навыки работы с CRM-системами и базовое понимание IT-инструментов.')}</li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="font-bold text-[32px] font-manrope">{t('Условия')}</p>
              <ul className="list-disc pl-5 mt-2 space-y-2 font-semibold text-[26px] font-manrope">
                <li>{t('Работа в динамично развивающейся компании.')}</li>
                <li>{t('Возможность профессионального и карьерного роста.')}</li>
                <li>{t('Конкурентоспособная заработная плата.')}</li>
                <li>{t('Социальный пакет (медицинское страхование, оплачиваемый отпуск и т.д.).')}</li>
                <li>{t('Комфортный офис и дружный коллектив.')}</li>
              </ul>
            </div>

            <p className="mt-4 font-semibold text-[26px] font-manrope">
              {t('Если вы готовы стать частью нашей команды и помочь мастерам и салонам красоты эффективно интегрироваться в систему бронирования bookers, отправьте свое резюме и сопроводительное письмо кликнув на кнопку “Отправить резюме”')}
            </p>

            <div className='text-center mt-10'>
            <Button
              className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
              onClick={() => {
                setVacanciesHolat(true);
                setModalOpen(false);
              }}
            >
              {t('Отправить резюме')}
            </Button>
            </div>
          </div>
        </div>
      </UniversalModal>
    </div>
  )
}




