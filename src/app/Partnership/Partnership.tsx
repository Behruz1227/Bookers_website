import Footer from '@/components/footer/Footer'
import HeaderTitles from '@/components/HeadTitle'
import Hero from '@/components/Hero/Hero'
import Subtitle from '@/components/Subtitle'


//hero img
import imgSplide from "@/assets/img/telegram-cloud-photo-size-2-5422467465163692948-y 1 (1).png"
import { RefreshCcw } from 'lucide-react'

import { useTranslation } from 'react-i18next'
import React from 'react'
import { FaRegCircleCheck } from 'react-icons/fa6'
import Button from '@/components/button/Button'

//card

export const Partnership: React.FC = () => {
    const { t } = useTranslation()
 
    return (
        <div>
            <div className='bg-[#111827]'>

                <div className='mx-auto '>

                    <Hero slides={[{
                        title: t('PartnershipHeroTitle'),
                        image: imgSplide, // Replace with your image path
                    },
                    {
                        title: t('PartnershipHeroTitle'),
                        image: imgSplide, // Replace with your image path
                    },
                    {
                        title: t('PartnershipHeroTitle'),
                        image: imgSplide, // Replace with your image path
                    },]} />
                    <div className='py-10'>
                        <div className='w-[65%]'>
                            <HeaderTitles text={t('PartnershipHeaderTitles')} size='' />
                        </div>
                        <div>
                            <Subtitle text={t('PartnershipSubtitle1')}
                                size='max-w-[759px]  lg:text-left' />
                        </div>
                        <div className='mt-[20px]'>
                            <Subtitle text={t('PartnershipSubtitle2')}
                                size='max-w-[759px]  lg:text-left' />
                        </div>
                        {/* <OfferCards
                            icon={RefreshCcw}
                            data={ThreeCard}
                            title={t('PartnershipOfferCardsTitle')}
                            firstButtonTitle={t('PartnershipOfferCardsFirstButtonTitle')}
                            secondButtonTitle={t('PartnershipOfferCardsSecondButtonTitle')}
                        /> */}
                        <div className='h-max w-full flex flex-col justify-center p-10 rounded-3xl bg-[#B9B9C9] mb-6 lg:mb-0'>
                            <div className='  flex items-center gap-10 w-[65%]'>
                                {<RefreshCcw className=' text-[#9C0B35] w-[82px] h-[82px]' />}
                                <p className='text-[#9C0B35] font-manrope font-extrabold pt-5 text-[26px] '>{t('PartnershipOfferCardsTitle')}</p>
                            </div>
                            <div className='flex  gap-3 justify-between py-10 w-[70%]'  >
                                <div className='flex flex-col gap-3'>
                                    <div className='flex items-start gap-3'>
                                        <FaRegCircleCheck size={24} className='text-[#9C0B35] mt-1 ' />
                                        <p className='flex-1 font-manrope font-medium text-[20px]'>{t('PartnershipOfferCardstext1')}</p>
                                    </div>
                                    <div className='flex items-start gap-3'>
                                        <FaRegCircleCheck size={24} className='text-[#9C0B35] mt-1 ' />
                                        <p className='flex-1 font-manrope font-medium text-[20px]'>{t('PartnershipOfferCardstext2')}</p>
                                    </div>
                                    <div className='flex items-start gap-3'>
                                        <FaRegCircleCheck size={24} className='text-[#9C0B35] mt-1 ' />
                                        <p className='flex-1 font-manrope font-medium text-[20px]'>{t('PartnershipOfferCardstext3')}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3' >
                                    <div className='flex items-start gap-3'>
                                        <FaRegCircleCheck size={24} className='text-[#9C0B35] mt-1 ' />
                                        <p className='flex-1 font-manrope font-medium text-[20px]'>{t('PartnershipOfferCardstext4')}</p>
                                    </div>
                                    <div className='flex items-start gap-3'>
                                        <FaRegCircleCheck size={24} className='text-[#9C0B35] mt-1 ' />
                                        <p className='flex-1 font-manrope font-medium text-[20px]'>{t('PartnershipOfferCardstext5')}</p>
                                    </div>
                                    <div className='flex items-start gap-3'>
                                        <FaRegCircleCheck size={24} className='text-[#9C0B35] mt-1 ' />
                                        <p className='flex-1 font-manrope font-medium text-[20px]'>{t('PartnershipOfferCardstext6')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[60%]'>
                                <h2 className='font-manrope font-extrabold text-[24px] text-[#9C0B35] leading-[40px]'>{t('nimadir')}</h2>
                            </div>
                            <div className='flex gap-5 py-10 items-center'>
                                <Button
                                    className="w-[340px] h-[66px] rounded-[40px] border-2 border-[#9C0B35] text-[#9C0B35] font-bold text-[18px] leading-[30px] "
                                    onClick={() => alert("Войти / Регистрация")}
                                >
                                    {t('PartnershipTerms')}
                                </Button>
                                <Button
                                    className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] "
                                    onClick={() => alert("Скачать приложение")}
                                >
                                   {t("auth")}
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
