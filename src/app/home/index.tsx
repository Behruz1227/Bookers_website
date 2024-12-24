import React from 'react';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import OfferCards from '@/components/cards/OfferCards';
import { Gift } from 'lucide-react';


const FirstCard = [
    { text: 'Быстрое и удобное бронирование' },
    { text: 'Гарантированные онлайн-записи' },
    { text: 'Большой выбор мастеров' },
    { text: 'Детальная информация о профилях мастеров и отзывы клиентов' },
    { text: 'Интеграция с календарем и напоминания' },
    { text: 'Программы лояльности и бонусы' },
];
function Home() {
  return (
    <div>
      <Header />
      <Hero slides={[ {
        title: "Slide 1",
        description: "This is the first slide description.",
        description2: "Additional information for Slide 1.",
        image: "/images/slide1.jpg", // Replace with your image path
    },
    {
        title: "Slide 2",
        description: "This is the second slide description.",
        description2: "Additional information for Slide 2.",
        image: "/images/slide2.jpg", // Replace with your image path
    },
    {
        title: "Slide 3",
        description: "This is the third slide description.",
        image: "/images/slide3.jpg", // Replace with your image path
    },]} />
 <OfferCards  icon={Gift} data={FirstCard} title='Что предлагает BOOKERS клиентам услуг красоты?' />
    </div>
  );
}

export default Home;
