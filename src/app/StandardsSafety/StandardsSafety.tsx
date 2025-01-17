import Footer from '@/components/footer/Footer'
import Hero from '@/components/Hero/Hero'
import React from 'react'

//hero img 
import imgSplide from "@/assets/img/Mask group (8).png"
import { useTranslation } from 'react-i18next'
export const StandardsSafety: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div>
      <div className='bg-[#111827]'>

        <div className='mx-auto '>
          <Hero slides={[{
            title: t('StandardsSafetyHeroTitle1'),
            description: t('StandardsSafetyHeroDescription1Text1'),
            description2: t('StandardsSafetyHeroDescription2Text1'),
            image: imgSplide, // Replace with your image path
          },
          {
            title: t('StandardsSafetyHeroTitle2'),
            description: t('StandardsSafetyHeroDescription1Text2'),
            description2: t('StandardsSafetyHeroDescription2Text2'),
            image: imgSplide, // Replace with your image path
          },
          {
            title: t('StandardsSafetyHeroTitle3'),
            description: t('StandardsSafetyHeroDescription1Text3'),
            description2: t('StandardsSafetyHeroDescription2Text3'),
            image: imgSplide, // Replace with your image path
          },]} />
        </div>
        <Footer />
      </div>
    </div>
  )
}






