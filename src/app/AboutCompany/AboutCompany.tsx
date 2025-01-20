
import Footer from '@/components/footer/Footer'
import HeaderTitles from '@/components/HeadTitle'
import Hero from '@/components/Hero/Hero'
import Subtitle from '@/components/Subtitle'
import React, { useEffect } from 'react'

//imgs
import imgSplide from '../../assets/img/Mask group (7).png'
import OfferCards from '@/components/cards/OfferCards'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'


//card 

export const AboutCompany: React.FC = () => {

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
    const ThreeCard = [
        { text: t('AboutCompanyOfferCards4ThreeCardText1') },
        { text: t('AboutCompanyOfferCards4ThreeCardText2') },
        { text: t('AboutCompanyOfferCards4ThreeCardText3') },
        { text: t('AboutCompanyOfferCards4ThreeCardText4') },
        { text: t('AboutCompanyOfferCards4ThreeCardText5') },
        { text: t('AboutCompanyOfferCards4ThreeCardText6') },
    ];

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
                    <div className="flex flex-col lg:flex-row gap-10 justify-between py-20">
                        <OfferCards
                            description={t('AboutCompanyOfferCards2Description')}
                            secondButtonTitle={t('AboutCompanyOfferCards1SecondButtonTitle')}
                        />
                        <OfferCards
                            description={t('AboutCompanyOfferCards2Description')}
                            secondButtonTitle={t('AboutCompanyOfferCards1SecondButtonTitle')}
                        />
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

                    <div>
                        <OfferCards
                            data={ThreeCard}
                            title={t('AboutCompanyOfferCards4Title')}
                        />
                    </div>
                    <Subtitle
                        text={t('AboutCompanySubtitle2')}
                        size='max-w-[759px]  lg:text-left' />
                </div>
            </div>
            <Footer />
        </div>
    )
}
