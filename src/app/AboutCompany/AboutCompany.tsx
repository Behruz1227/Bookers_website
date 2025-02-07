
import Footer from '@/components/footer/Footer'
import HeaderTitles from '@/components/HeadTitle'

import Subtitle from '@/components/Subtitle'
import { useEffect, useState } from 'react'

//imgs
import imgSplide from '../../assets/cards/heroo.png'
import guvohnoma from "@/assets/img/guvohnoma.png"

import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { FaRegCircleCheck } from 'react-icons/fa6'
import Button from '@/components/button/Button'
import { UniversalModal } from '@/components/Modal/UniversalModal'


//card 

export const AboutCompany: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

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
        <div className='bg-[#111827]'>
            <div className='mx-auto '>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-10 pb-20 px-4">
                    {/* Matn qismi */}
                    <div className="w-full lg:w-[50%] order-2 lg:order-1 text-center lg:text-left max-w-md mx-auto lg:max-w-none">
                        <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
                            {t(
                                'Компания Well Tech предлагает продукты программных обеспечений для создания автоматизации процессов и улучшения эффективности бизнес процессов'
                            )}
                        </h1>
                        <p className="text-[#B9B9C9] text-sm sm:text-base md:text-lg font-medium py-6 md:py-8 lg:py-10 font-manrope leading-snug md:leading-[26px]">
                            {t(
                                'Компания Well Tech ведет свою деятельность в сфере информационных технологий и активно участвует в развитии IT-инфраструктуры нашей страны. За короткий срок своего существования наша компания реализовала ряд успешных проектов, включая bookers'
                            )}
                        </p>
                    </div>

                    {/* Dumaloq rasm */}
                    <div className="w-full lg:w-[50%] order-1 lg:order-2 flex justify-center">
                        <img className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-auto" src={imgSplide} alt="img" />
                    </div>
                </div>



                <div id='about'>
                    <HeaderTitles text={t('Свидетельства и сертификатdbookers')} size='' />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 py-8 sm:py-12 md:py-16 lg:py-20">
                        {[
                            "Свидетельство о регистрации базы персональных данных в Государственном реестре баз персональных данных",
                            "Свидетельство о регистрации базы персональных данных в Государственном реестре баз персональных данных"
                        ].map((desc, index) => (
                            <div key={index} className="bg-[#B9B9C9] rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 w-full">
                                <p className="font-manrope font-normal text-[16px] sm:text-[22px] md:text-[24px] lg:text-[26px] text-center px-2 sm:px-6 md:px-8">
                                    {t(desc)}
                                </p>

                                <div className="text-center pt-4 sm:pt-6 md:pt-8 lg:pt-10">
                                    <Button
                                        className="w-full max-w-[300px] sm:max-w-[320px] md:max-w-[340px] h-[50px] sm:h-[55px] md:h-[60px] lg:h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[14px] sm:text-[16px] md:text-[18px] leading-[26px] sm:leading-[28px] md:leading-[30px]"
                                        onClick={openModal}
                                    >
                                        {t('Подробнее')}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div id='company1'>
                    <HeaderTitles text={t('Компания Well Tech:  Наша миссия и ценности')} size='' />
                    <div className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-2 py-12 sm:py-16 md:py-20">
                        {[
                            {
                                title: "Наша миссия",
                                items: [
                                    "Разработка передовых IT-решений и программного обеспечения",
                                    "Создание инновационных платформ для обеспечения комфорта и эффективности",
                                    "Повышение качества услуг в разных сферах деятельности",
                                    "Улучшение пользовательского опыта",
                                    "Создание выгодных условий для всех участников экосистемы",
                                ],
                            },
                            {
                                title: "Наши ценности",
                                items: [
                                    "Инновации",
                                    "Качество",
                                    "Безопасность",
                                    "Партнерство",
                                    "Командная работа",
                                    "Гибкость",
                                    "Устойчивое развитие",
                                ],
                            },
                        ].map((section, index) => (
                            <div
                                key={index}
                                className="w-full flex flex-col justify-start p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-[#B9B9C9]"
                            >
                                {/* Title */}
                                <h2 className="text-[#9C0B35] font-manrope font-extrabold text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] text-center pb-4 sm:pb-6 md:pb-8">
                                    {t(section.title)}
                                </h2>

                                {/* List */}
                                <div className="text-left text-[#000000] space-y-3 sm:space-y-4">
                                    {section.items.map((item, i) => (
                                        <div key={i} className="flex items-start gap-2 sm:gap-3">
                                            <FaRegCircleCheck size={18} className="text-[#9C0B35] mt-1 sm:mt-1.5" />
                                            <p className="flex-1 font-manrope font-medium text-[16px] sm:text-[18px] md:text-[20px]">
                                                {t(item)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div id='company2'>
                    <HeaderTitles text={t('Компания Well Tech:  Наша команда')} size='' />
                    <Subtitle
                        text={t('Well Tech объединяет талантливых разработчиков, дизайнеров, проектных менеджеров, маркетологов и аналитиков и квалифицированных специалистов своего направления. Каждый из нас вносит уникальный вклад в создание  IT-решений и ведение успешных проектов.')}
                        size="w-full max-w-[759px]  lg:text-left"
                    />
                    <div className="bg-[#B9B9C9] rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10">
                        {/* Sarlavha */}
                        <h1 className="text-[#9C0B35] font-manrope font-extrabold text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] text-center pb-4 sm:pb-6 md:pb-8">
                            {t("Мы ценим")}
                        </h1>

                        {/* Ro‘yxat */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 md:gap-8">
                            {[
                                "Сотрудничество",
                                "Доверие и уважение",
                                "Прозрачность и открытость",
                                "Обучение и развитие",
                                "Гибкость и адаптивность",
                                "Ответственность и самоорганизация",
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-2 sm:gap-3">
                                    <FaRegCircleCheck size={18} className="text-[#9C0B35] mt-1 sm:mt-1.5" />
                                    <p className="flex-1 font-manrope font-medium text-[16px] sm:text-[18px] md:text-[20px]">
                                        {t(item)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>


                    <Subtitle
                        text={t('Благодаря слаженной работе нашей команды, мы успешно реализовали множество проектов, которые получили высокую оценку от наших клиентов и пользователей. Мы гордимся нашими достижениями и продолжаем стремиться к новым высотам, улучшая качество наших продуктов и услуг.')}
                        size='max-w-[759px]  lg:text-left' />
                </div>
            </div>
            <Footer />
            <UniversalModal isOpen={isModalOpen} onClose={closeModal} style="max-h-[90vh] w-[90%]">
                <div >
                    <div className='flex justify-center items-center'>
                        <img src={guvohnoma} alt="guvohnoma" className='text-center border-none w-full py-20 pl-20 pr-10' />
                    </div>
                </div>
            </UniversalModal>
        </div>
    )
}
