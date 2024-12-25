import Footer from '@/components/footer/Footer'
import Header from '@/components/Header/Header'
import HeaderTitles from '@/components/HeadTitle'
import React from 'react'

export const Vacancies: React.FC = () => {
  return (
    <div>
        <div className='bg-[#111827]'>
            <Header />
            <div className='container mx-auto '>
                <div>
                    home
                </div>
                <div>
                <HeaderTitles text='Вакансии' size='' />
                </div>
            </div>
            <Footer />
        </div>
    </div>
  )
}
