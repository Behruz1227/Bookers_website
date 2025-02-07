import Footer from '@/components/footer/Footer'
import HeaderTitles from '@/components/HeadTitle'
import Subtitle from '@/components/Subtitle'


//hero img
import imgSplide from "@/assets/cards/img.png"
import { RefreshCcw } from 'lucide-react'

import { useTranslation } from 'react-i18next'
import React from 'react'
import { FaRegCircleCheck } from 'react-icons/fa6'
import Button from '@/components/button/Button'
import LoginIndex from '@/Store'

//card

export const Partnership: React.FC = () => {
    const { t } = useTranslation()
    const { setLoginHolat } = LoginIndex();
    return (
        <div>
            <div className='bg-[#111827]'>

                <div className='mx-auto '>
                    <div className="relative grid grid-cols-1 lg:grid-cols-2 items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                        {/* Rasm qismi (mobil rejimida tepada chiqadi) */}
                        <div className="relative flex justify-center order-1 lg:order-2">
                            <img
                                className="w-full max-w-[250px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-none rounded-full aspect-square object-cover"
                                src={imgSplide}
                                alt="img"
                            />
                        </div>

                        {/* Matn qismi (mobil rejimida pastda, katta ekranda chapda) */}
                        <div className="relative text-center lg:text-left order-2 lg:order-1">
                            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] font-manrope font-extrabold text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] leading-[32px] sm:leading-[40px] md:leading-[48px] lg:leading-[50px] tracking-[-0.04em] pt-10 sm:pt-16 md:pt-20">
                                {t("Мы предлагаем взаимовыгодное сотрудничество")}
                            </h1>
                        </div>
                    </div>


                    <div className='py-10'>
                        <div className="w-full md:w-full lg:w-[65%] max-w-full">
                            <HeaderTitles
                                text={t(
                                    "Web-кабинет bookers: управляйте бизнес процессами своего салона красоты эффективно и выгодно"
                                )}
                                size=""
                            />
                        </div>

                        <div>
                            <Subtitle text={t('Мы предлагаем взаимовыгодное партнерство владельцам салонов красоты с инструментами управления и мониторинга для обеспечения стабильного роста бизнеса. Вы можете интегрировать сразу несколько филиалов сети и в режиме онлайн управлять процессами с помощью адаптированного Web-кабинета bookers, разработанного под вашу бизнес-стратегию. bookers поможет создать эффективную воронку продаж и обрабатывать клиентов до сделки через модуль комьюнити.')}
                                size='max-w-[759px]  lg:text-left' />
                        </div>
                        <div className="mt-[20px] ">
                            <Subtitle
                                text={t('Web-кабинет bookers интегрирует ваш бизнес с модулями для повышения лояльности клиентов, увеличения доходов и анализа деятельности.')}
                                size="max-w-full sm:max-w-[759px] lg:text-left"
                            />
                        </div>

                        <div className="h-max w-full flex flex-col justify-center p-6 sm:p-10 rounded-3xl bg-[#B9B9C9] mb-4 sm:mb-6 lg:mb-0">
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-[65%] text-center sm:text-left">
                                <RefreshCcw className="text-[#9C0B35] w-[48px] sm:w-[60px] h-[48px] sm:h-[60px]" />
                                <p className="text-[#9C0B35] font-manrope font-extrabold text-[16px] sm:text-[20px] leading-snug sm:leading-normal">
                                    {t('Какую интеграцию предлагает BOOKERS бизнес-партнерам:')}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between py-6 sm:py-10 w-full lg:w-[70%]">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <FaRegCircleCheck size={20} className="text-[#9C0B35] mt-1" />
                                        <p className="flex-1 font-manrope font-medium text-[16px] sm:text-[18px]">
                                            {t('Модуль управления клиентами')}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <FaRegCircleCheck size={20} className="text-[#9C0B35] mt-1" />
                                        <p className="flex-1 font-manrope font-medium text-[16px] sm:text-[18px]">
                                            {t('Модуль мониторинга и аналитики')}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <FaRegCircleCheck size={20} className="text-[#9C0B35] mt-1" />
                                        <p className="flex-1 font-manrope font-medium text-[16px] sm:text-[18px]">
                                            {t('Модуль планирования и расписания')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <FaRegCircleCheck size={20} className="text-[#9C0B35] mt-1" />
                                        <p className="flex-1 font-manrope font-medium text-[16px] sm:text-[18px]">
                                            {t('Модуль маркетинга и продвижения')}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <FaRegCircleCheck size={20} className="text-[#9C0B35] mt-1" />
                                        <p className="flex-1 font-manrope font-medium text-[16px] sm:text-[18px]">
                                            {t('Модуль управления персоналом')}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <FaRegCircleCheck size={20} className="text-[#9C0B35] mt-1" />
                                        <p className="flex-1 font-manrope font-medium text-[16px] sm:text-[18px]">
                                            {t('Модуль комьюнити')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full xl:w-[60%]">
                                <h2 className="font-manrope font-extrabold text-[16px] sm:text-[20px] text-[#9C0B35] leading-[24px] sm:leading-[30px]">
                                    {t('Станьте бизнес-партнером bookers и оцените преимущества системы управления и мониторинга.')}
                                </h2>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 py-6 sm:py-10 items-center">
                                <Button
                                    className="w-full sm:w-[280px] md:w-[320px] h-[48px] sm:h-[56px] rounded-[30px] border-2 border-[#9C0B35] text-[#9C0B35] font-bold text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px]"
                                    onClick={() => alert('Условия партнерства')}
                                >
                                    {t('Условия партнерства')}
                                </Button>
                                <Button
                                    className="w-full sm:w-[280px] md:w-[320px] h-[48px] sm:h-[56px] rounded-[30px] bg-[#9C0B35] text-white font-bold text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px]"
                                    onClick={() => setLoginHolat(true)}
                                >
                                    {t('Войти / Регистрация')}
                                </Button>
                            </div>
                        </div>

                    </div>

                </div>
                <Footer />
            </div>
        </div>
    )
}
