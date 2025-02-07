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
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 lg:gap-10 pb-10 sm:pb-16 md:pb-20">
            {/* Matn qismi */}
            <div className="w-full lg:w-[50%] order-2 lg:order-1 text-center lg:text-left">
              <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[44px] leading-tight">
                {t("Компания Well Tech: Вакансии")}
              </h1>

              <p className="font-manrope text-[14px] sm:text-[16px] md:text-[18px] lg:text-[18px] font-medium text-[#B9B9C9] leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] my-4 sm:my-6 lg:my-8">
                {t("Вы готовы нести ответственность за свою работу и результаты, способствовать эффективному выполнению задач и достижению результатов? Компания Well Tech открыта для реализации новых возможностей и расширять состав команды.")}
              </p>

              <p className="font-manrope text-[14px] sm:text-[16px] md:text-[18px] lg:text-[18px] font-medium text-[#B9B9C9] leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] my-4 sm:my-6 lg:my-8">
                {t("В команде мы поощряем активное взаимодействие и обмен идеями, совместно работать, находить наилучшие решения и быстро адаптироваться к изменениям.")}
              </p>
            </div>

            {/* Rasm qismi */}
            <div className="w-full lg:w-[50%] order-1 lg:order-2 flex justify-center">
              <img src={img} alt="" className="w-full max-w-[250px] sm:max-w-[350px] md:max-w-[450px] lg:w-auto" />
            </div>
          </div>



          <HeaderTitles text={t('Вакансии')} />
          {/* <div
            id="vacancies"
            className="bg-[#B9B9C9] p-6 sm:p-8 md:p-10 rounded-3xl w-full mt-10 lg:w-[50%] text-center"
          >
            <h3 className="text-[#9C0B35] font-manrope font-extrabold text-[20px] sm:text-[24px] md:text-[26px]">
              {t("Комьюнити-менеджер")}
            </h3>
            <p className="py-6 sm:py-8 md:py-10 font-manrope font-medium text-[16px] sm:text-[18px] md:text-[22px] leading-[24px] sm:leading-[26px] md:leading-[30px]">
              {t(
                "Коммьюнити-менеджеры отвечают за создание, развитие, управление и общение с участниками сообщества"
              )}
            </p>
            <div className="flex justify-center">
              <Button
                className="w-full sm:w-[300px] md:w-[340px] h-[50px] sm:h-[60px] md:h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[16px] sm:text-[18px] leading-[26px] sm:leading-[30px] hover:opacity-90"
                onClick={openModal}
              >
                {t("Подробнее")}
              </Button>
            </div>
          </div> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="bg-[#B9B9C9] rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 w-full md:w-full col-span-1 lg:col-span-1">
              <h3 className="text-[#9C0B35] font-manrope font-extrabold text-[20px] sm:text-[24px] md:text-[26px] text-center">
                {t("Комьюнити-менеджер")}
              </h3>
              <p className="font-manrope font-normal text-[16px] py-5 md:py-10 sm:text-[22px] md:text-[24px] lg:text-[26px] text-center px-2 sm:px-6 md:px-8">
                {t(
                  "Коммьюнити-менеджеры отвечают за создание, развитие, управление и общение с участниками сообщества"
                )}
              </p>

              <div className="text-center">
                <Button
                  className="w-full md:w-full h-[50px] sm:h-[55px] md:h-[60px] lg:h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[14px] sm:text-[16px] md:text-[18px] leading-[26px] sm:leading-[28px] md:leading-[30px]"
                  onClick={openModal}
                >
                  {t("Подробнее")}
                </Button>
              </div>
            </div>
          </div>



        </div>
        <Footer />
      </div>
      <UniversalModal isOpen={isModalOpen} onClose={closeModal} style="">
        <div className="w-full p-4 sm:p-6 md:p-8 lg:p-10">
          <div>
            <h1 className="font-manrope text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[36px]">
              {t("Менеджер по работе с агентами")}
            </h1>

            <p className="mt-4 font-bold text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-manrope">{t("Описание")}</p>

            <p className="mt-2 font-semibold text-lg sm:text-xl md:text-2xl lg:text-[26px] font-manrope">
              {t(
                "Менеджер по работе с агентами будет отвечать за взаимодействие с мастерами и салонами красоты, которые интегрируются в систему бронирования bookers. Основная задача – обеспечение успешной интеграции агентов, поддержка и развитие взаимоотношений с ними.",
              )}
            </p>

            <div className="mt-4">
              <p className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-manrope">{t("Обязанности")}</p>
              <ul className="list-disc pl-5 mt-2 space-y-2 font-semibold text-base sm:text-lg md:text-xl lg:text-[26px] font-manrope">
                <li>{t("Поиск и привлечение новых мастеров и салонов красоты для интеграции в систему bookers.")}</li>
                <li>{t("Обеспечение качественной поддержки агентов на всех этапах интеграции.")}</li>
                <li>{t("Проведение обучающих сессий и тренингов по использованию платформы.")}</li>
                <li>
                  {t("Консультирование агентов по вопросам работы с системой бронирования и решению возникающих проблем.")}
                </li>
                <li>{t("Анализ потребностей агентов и внесение предложений по улучшению платформы.")}</li>
                <li>{t("Постоянное взаимодействие с действующими агентами для поддержания долгосрочных отношений.")}</li>
                <li>{t("Мониторинг и анализ эффективности работы агентов в системе.")}</li>
                <li>{t("Подготовка отчетности по результатам работы с агентами.")}</li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-manrope">{t("Требования")}</p>
              <ul className="list-disc pl-5 mt-2 space-y-2 font-semibold text-base sm:text-lg md:text-xl lg:text-[26px] font-manrope">
                <li>{t("Опыт работы в сфере продаж, клиентского сервиса или управления аккаунтами.")}</li>
                <li>{t("Понимание специфики работы в индустрии красоты.")}</li>
                <li>{t("Отличные коммуникативные навыки и способность устанавливать контакты.")}</li>
                <li>{t("Умение работать в команде и самостоятельно.")}</li>
                <li>{t("Стремление к достижению поставленных целей и ориентированность на результат.")}</li>
                <li>{t("Опыт проведения презентаций и обучения клиентов.")}</li>
                <li>
                  {t("Высшее образование (предпочтительно в области маркетинга, менеджмента или смежных дисциплин).")}
                </li>
                <li>{t("Владение русским и узбекским языками (знание английского будет преимуществом).")}</li>
                <li>{t("Навыки работы с CRM-системами и базовое понимание IT-инструментов.")}</li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-manrope">{t("Условия")}</p>
              <ul className="list-disc pl-5 mt-2 space-y-2 font-semibold text-base sm:text-lg md:text-xl lg:text-[26px] font-manrope">
                <li>{t("Работа в динамично развивающейся компании.")}</li>
                <li>{t("Возможность профессионального и карьерного роста.")}</li>
                <li>{t("Конкурентоспособная заработная плата.")}</li>
                <li>{t("Социальный пакет (медицинское страхование, оплачиваемый отпуск и т.д.).")}</li>
                <li>{t("Комфортный офис и дружный коллектив.")}</li>
              </ul>
            </div>

            <p className="mt-4 font-semibold text-base sm:text-lg md:text-xl lg:text-[26px] font-manrope">
              {t(
                'Если вы готовы стать частью нашей команды и помочь мастерам и салонам красоты эффективно интегрироваться в систему бронирования bookers, отправьте свое резюме и сопроводительное письмо кликнув на кнопку "Отправить резюме"',
              )}
            </p>

            <div className="text-center mt-6 sm:mt-8 md:mt-10">
              <Button
                className="w-full sm:w-[280px] md:w-[320px] lg:w-[340px] h-[50px] sm:h-[58px] md:h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-base sm:text-lg md:text-[18px] leading-[30px] hover:opacity-90"
                onClick={() => {
                  setVacanciesHolat(true)
                  setModalOpen(false)
                }}
              >
                {t("Отправить резюме")}
              </Button>
            </div>
          </div>
        </div>
      </UniversalModal>
    </div>
  )
}



