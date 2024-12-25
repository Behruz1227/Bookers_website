import Footer from '@/components/footer/Footer'
import Header from '@/components/Header/Header'
import HeaderTitles from '@/components/HeadTitle'
import Subtitle from '@/components/Subtitle'
import React from 'react'

export const Partnership: React.FC = () => {
    return (
        <div>
            <div className='bg-[#111827]'>
                <Header />
                <div className='container mx-auto '>
                    <div>
                        home
                    </div>
                    <div>
                        <HeaderTitles text='Web-кабинет bookers: управляйте бизнес процессами своего салона красоты эффективно и выгодно' size='' />
                        <div>
                            <Subtitle text="Мы предлагаем взаимовыгодное партнерство владельцам салонов красоты с инструментами управления и мониторинга для обеспечения стабильного роста бизнеса. Вы можете интегрировать сразу несколько филиалов сети и в режиме онлайн управлять процессами с помощью адаптированного Web-кабинета bookers, разработанного под вашу бизнес-стратегию. bookers поможет создать эффективную воронку продаж и обрабатывать клиентов до сделки через модуль комьюнити." size='' />
                        </div>
                        <div className='mt-[20px]'>
                            <Subtitle text="Web-кабинет bookers интегрирует ваш бизнес с модулями для повышения лояльности клиентов, увеличения доходов и анализа деятельности" size='' />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
