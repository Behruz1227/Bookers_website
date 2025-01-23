
import Footer from '@/components/footer/Footer'
import HeaderTitles from '@/components/HeadTitle'
import Hero from '@/components/Hero/Hero'
import Subtitle from '@/components/Subtitle'
import React, { useEffect, useState } from 'react'

//imgs
import imgSplide from '../../assets/img/Mask group (7).png'
import OfferCards from '@/components/cards/OfferCards'
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

    const FirstCard = [
        { text: t('AboutCompanyOfferCards3FirstCardText1') },
        { text: t('AboutCompanyOfferCards3FirstCardText2') },
        { text: t('AboutCompanyOfferCards3FirstCardText3') },
        { text: t('AboutCompanyOfferCards3FirstCardText4') },
        { text: t('AboutCompanyOfferCards3FirstCardText5') },]

    const TwoCard = [
        { text: t('AboutCompanyOfferCards3TwoCardCardText1') },
        { text: t('AboutCompanyOfferCards3TwoCardCardText2') },
        { text: t('AboutCompanyOfferCards3TwoCardCardText3') },
        { text: t('AboutCompanyOfferCards3TwoCardCardText4') },
        { text: t('AboutCompanyOfferCards3TwoCardCardText5') },
        { text: t('AboutCompanyOfferCards3TwoCardCardText6') },
        { text: t('AboutCompanyOfferCards3TwoCardCardText7') }
    ]


    return (
        <div className='bg-[#111827]'>
            <div className='mx-auto '>

                <Hero slides={[{
                    title: t('AboutCompanyHeroTitle1'),
                    description: t('AboutCompanyHeroDescription1'),
                    image: imgSplide, // Replace with your image path
                },
                {
                    title: t('AboutCompanyHeroTitle2'),
                    description: t('AboutCompanyHeroDescription2'),

                    image: imgSplide, // Replace with your image path
                },
                {
                    title: t('AboutCompanyHeroTitle3'),
                    description: t('AboutCompanyHeroDescription3'),
                    image: imgSplide, // Replace with your image path
                },]} />
                <div id='about'>
                    <HeaderTitles text={t('AboutCompanyHeaderTitles1')} size='' />
                    <div className="flex flex-col lg:flex-row gap-10 py-20">
                        <div className='bg-[#B9B9C9] rounded-3xl p-10 w-full'>
                            <p className='font-manrope font-medium text-[26px] text-center px-10'>{t("AboutCompanyOfferCards1Description")}</p>
                            <div className='text-center pt-10'>
                                <Button
                                    className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] "
                                    onClick={openModal}
                                >
                                    Подробнее
                                </Button>
                            </div>
                        </div>
                        <div className='bg-[#B9B9C9] rounded-3xl p-10 w-full'>
                            <p className='font-manrope font-medium text-[26px] text-center px-10'>{t("AboutCompanyOfferCards1Description")}</p>
                            <div className='text-center pt-10'>
                                <Button
                                    className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] "
                                    onClick={openModal}
                                >
                                    Подробнее
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='company1'>
                    <HeaderTitles text={t('AboutCompanyHeaderTitles2')} size='' />
                    <div className="flex flex-col lg:flex-row gap-10 justify-between py-20">
                        <OfferCards
                            data={FirstCard}
                            title={t('AboutCompanyOfferCards3Title1')}
                        />
                        <OfferCards
                            data={TwoCard}
                            title={t('AboutCompanyOfferCards3Title2')}
                        />
                    </div>

                </div>
                <div id='company2'>
                    <HeaderTitles text={t('AboutCompanyHeaderTitles3')} size='' />
                    <Subtitle
                        text={t('AboutCompanySubtitle1')}
                        size="w-full max-w-[759px]  lg:text-left"
                    />

                    {/* <div>
                        <OfferCards
                            data={ThreeCard}
                            title={t('AboutCompanyOfferCards4Title')}
                        />
                    </div> */}
                    <div className='bg-[#B9B9C9] rounded-3xl p-10'>
                        <h1 className='text-[#9C0B35] font-manrope font-extrabold text-[26px] text-center pb-10'>{t('AboutCompanyOfferCards4Title')}</h1>
                        <div className='flex items-center justify-between'>
                            <div className='text-left text-[#000000] space-y-4 mb-5'>
                                <div className='flex items-start gap-3'  >
                                    <FaRegCircleCheck size={24} className='text-[#9C0B35] mt-1 ' />
                                    <p className='flex-1 font-manrope font-medium text-[20px]'>{t('AboutCompanyOfferCards4ThreeCardText1')}</p>
                                </div>
                                <div className='flex items-start gap-3'  >
                                    <FaRegCircleCheck size={24} className='text-[#9C0B35] mt-1 ' />
                                    <p className='flex-1 font-manrope font-medium text-[20px]'>{t('AboutCompanyOfferCards4ThreeCardText2')}</p>
                                </div>
                                <div className='flex items-start gap-3'  >
                                    <FaRegCircleCheck size={24} className='text-[#9C0B35] mt-1 ' />
                                    <p className='flex-1 font-manrope font-medium text-[20px]'>{t('AboutCompanyOfferCards4ThreeCardText3')}</p>
                                </div>
                            </div>
                            <div className='text-left text-[#000000] space-y-4 mb-5'>
                                <div className='flex items-start gap-3'  >
                                    <FaRegCircleCheck size={24} className='text-[#9C0B35] mt-1 ' />
                                    <p className='flex-1 font-manrope font-medium text-[20px]'>{t('AboutCompanyOfferCards4ThreeCardText4')}</p>
                                </div>
                                <div className='flex items-start gap-3'  >
                                    <FaRegCircleCheck size={24} className='text-[#9C0B35] mt-1 ' />
                                    <p className='flex-1 font-manrope font-medium text-[20px]'>{t('AboutCompanyOfferCards4ThreeCardText5')}</p>
                                </div>
                                <div className='flex items-start gap-3'  >
                                    <FaRegCircleCheck size={24} className='text-[#9C0B35] mt-1 ' />
                                    <p className='flex-1 font-manrope font-medium text-[20px]'>{t('AboutCompanyOfferCards4ThreeCardText6')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Subtitle
                        text={t('AboutCompanySubtitle2')}
                        size='max-w-[759px]  lg:text-left' />
                </div>
            </div>
            <Footer />
            <button onClick={openModal} >modal on</button>
            <UniversalModal isOpen={isModalOpen} onClose={closeModal} style="max-h-[90vh] w-[90%]">
                <div className="w-full text-center">
                    <div>
                        <h1>shu madalda sertificat bolishi kere </h1>
                        <button type="button" className="mt-4 bg-[#9C0B35] text-white py-2 px-4 rounded" onClick={closeModal}>close</button>
                    </div>
                </div>
            </UniversalModal>
        </div>
    )
}
