import Footer from '@/components/footer/Footer'
import Header from '@/components/Header/Header'
import HeaderTitles from '@/components/HeadTitle'
import Hero from '@/components/Hero/Hero'
import Subtitle from '@/components/Subtitle'
import React from 'react'

//hero img
import imgSplide from "@/assets/img/telegram-cloud-photo-size-2-5422467465163692948-y 1 (1).png"
import { RefreshCcw } from 'lucide-react'
import OfferCards from '@/components/cards/OfferCards'
import { useTranslation } from 'react-i18next'

//card

export const Partnership: React.FC = () => {
    const { t } = useTranslation()
    const ThreeCard = [
        { text: t('PartnershipOfferCardstext1') },
        { text: t('PartnershipOfferCardstext2') },
        { text: t('PartnershipOfferCardstext3')},
        { text: t('PartnershipOfferCardstext4')},
        { text: t('PartnershipOfferCardstext5')},
        { text: t('PartnershipOfferCardstext6')},
    ];
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
                        <HeaderTitles text={t('PartnershipHeaderTitles')} size='' />
                        <div>
                            <Subtitle text={t('PartnershipSubtitle1')}
                            size='max-w-[759px]  lg:text-left' />
                        </div>
                        <div className='mt-[20px]'>
                            <Subtitle text={t('PartnershipSubtitle2')}
                             size='max-w-[759px]  lg:text-left' />
                        </div>
                        <OfferCards
                        icon={RefreshCcw}
                        data={ThreeCard}
                        title={t('PartnershipOfferCardsTitle')}
                        firstButtonTitle={t('PartnershipOfferCardsFirstButtonTitle')}
                        secondButtonTitle={t('PartnershipOfferCardsSecondButtonTitle')}
                    />
                    </div>
                    
                </div>
                <Footer />
            </div>
        </div>
    )
}
