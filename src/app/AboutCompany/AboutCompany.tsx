
import Footer from '@/components/footer/Footer'
import Header from '@/components/Header/Header'
import HeaderTitles from '@/components/HeadTitle'
import Subtitle from '@/components/Subtitle'
import React from 'react'

export const AboutCompany: React.FC = () => {
    return (
        <div className='bg-[#111827]'>
            <Header />
            <div className='container mx-auto '>
                <div>
                    home
                </div>
                <div>
                    <HeaderTitles text='Свидетельства и сертификатdbookers' size='' />
                    <div>
                       
                    </div>
                </div>
                <div>
                    <HeaderTitles text='Компания Well Tech:  Наша миссия и ценности' size='' />
                </div>
                <div>
                    <HeaderTitles text='Компания Well Tech:  Наша команда' size='' />
                    <Subtitle text='Well Tech объединяет талантливых разработчиков, дизайнеров, проектных менеджеров, маркетологов и аналитиков и квалифицированных специалистов своего направления. Каждый из нас вносит уникальный вклад в создание  IT-решений и ведение успешных проектов.' size='' />
                </div>
            </div>
            <Footer />
        </div>
    )
}
