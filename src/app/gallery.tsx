import Button from "@/components/button/Button";
import Master from "@/components/cards/Master";
import Header from "@/components/Header/Header";
import { MdArrowBackIos } from "react-icons/md";
import Footer from "@/components/footer/Footer";
import { Galereya } from "@/components/Galereya/Galereya";
import { TestimonialCard } from "@/components/cards/TestimonialCard";

const masters = [
  {
    id: 1,
    image: "https://example.com/image1.jpg",
    avatar: "https://example.com/avatar1.jpg",
    name: "Иван Иванов",
    salon: "Салон красоты",
    role: "Мастер",
    address: "Москва, улица Пушкина, дом 123",
    price: "1000",
    rating: 4,
  },
  {
    id: 2,
    image: "https://example.com/image2.jpg",
    avatar: "https://example.com/avatar2.jpg",
    name: "Анна Смирнова",
    salon: "Барбершоп",
    role: "Стилист",
    address: "Санкт-Петербург, улица Ленина, дом 45",
    price: "1500",
    rating: 5,
  },
];

const galleries = [
  {
    id: 1,
    name: "Капсульное наращивание волос",
    images: [
      { id: 1, url: "https://example.com/gallery1.jpg", title: "1" },
      { id: 2, url: "https://example.com/gallery2.jpg", title: "2" },
    ],
  },
  {
    id: 2,
    name: "Окрашивание волос",
    images: [
      { id: 1, url: "https://example.com/gallery3.jpg", title: "3" },
      { id: 2, url: "https://example.com/gallery4.jpg", title: "4" },
    ],
  },
];

const testimonials = [
  {
    id: 1,
    avatarUrl: "https://example.com/testimonial-avatar1.jpg",
    content: "Отличная работа, очень доволен результатом!",
    author: "Пётр Петров",
    company: "Компания А",
  },
  {
    id: 2,
    avatarUrl: "https://example.com/testimonial-avatar2.jpg",
    content: "Все сделали быстро и качественно, рекомендую!",
    author: "Мария Иванова",
    company: "Компания Б",
  },
];

function Gallery() {
  return (
    <>
      <Header />
      <main className="w-full px-[7%] bg-[#21212E] pb-10">
        <section className="w-full py-20 flex flex-col gap-5">
          <div className="flex items-center w-full gap-20">
            <Button className="border-white text-white border-[1px] rounded-xl flex items-center py-6 px-12 gap-2">
              <MdArrowBackIos className="text-white" /> Назад
            </Button>
            <h1 className="font-bold text-[#FF6B9B] text-5xl bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] bg-clip-text text-transparent">
              Подробности о мастере
            </h1>
          </div>
          <div className="w-full h-max">
            {masters.slice(0, 6).map((master) => (
              <Master
                key={master.id}
                image={master.image}
                avatar={master.avatar}
                name={master.name}
                salon={master.salon}
                role={master.role}
                address={master.address}
                price={master.price}
                rating={master.rating}
                firstButtonTitle="Записаться"
                secondButtonTitle="Подробнее"
              />
            ))}
          </div>
          <h2 className="text-white text-center font-medium text-xl">Галерея</h2>
        </section>
        <section>
          {galleries.map((gallery) => (
            <Galereya
              key={gallery.id}
              name={gallery.name}
              imgData={gallery.images}
            />
          ))}
        </section>
        <section className="w-full">
          <h1 className="text-white text-center font-medium text-3xl">Отзывы</h1>
          <div className="w-full flex justify-around mt-10">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                avatarUrl={testimonial.avatarUrl}
                content={testimonial.content}
                author={testimonial.author}
                company={testimonial.company}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Gallery;
