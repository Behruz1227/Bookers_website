import Master from "@/components/cards/Master";
import OfferCards from "@/components/cards/OfferCards";
import React from "react";
import { BsGift } from "react-icons/bs";

const Home: React.FC = () => {
  const FirstCard = [
    { text: 'Быстрое и удобное бронирование' },
    { text: 'Гарантированные онлайн-записи' },
    { text: 'Большой выбор мастеров' },
    { text: 'Детальная информация о профилях мастеров и отзывы клиентов' },
    { text: 'Интеграция с календарем и напоминания' },
    { text: 'Программы лояльности и бонусы' },
    { text: 'Дополнительная информация 1' },
    { text: 'Дополнительная информация 2' },
    { text: 'Дополнительная информация 3' }, // 9th item
  ];
  const handleFirstButtonClick = () => {
    alert("First button clicked!");
  };
  const handleSecondButtonClick = () => {
    alert("Second button clicked!");
  };
  return (
    <div className="container">
      <Master
        image="https://picsum.photos/500"
        avatar="https://picsum.photos/500"
        name="John Doe"
        salon="Salon XYZ"
        role="Hair Stylist"
        rating={4}
        orders={25}
        clients={30}
        address="123 Salon St, City"
        price="1000 UZS"
        firstButtonTitle="Book Homeointment"
        secondButtonTitle="View Profile"
        onclickFirstButton={handleFirstButtonClick}
        onclickSecondButton={handleSecondButtonClick}
      />
      <OfferCards
        icon={BsGift}
        data={FirstCard}
        title="Что предлагает BOOKERS клиентам услуг красоты?"
        firstButtonTitle="Скачать приложение"
        secondButtonTitle="Войти / Регистрация"
        onclickFirstButton={handleFirstButtonClick}
        onclickSecondButton={handleSecondButtonClick}
      />
    </div>
  );
};

export default Home;
