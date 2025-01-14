import Button from "@/components/button/Button";
import Master from "@/components/cards/Master";
import Header from "@/components/Header/Header";
import { MdArrowBackIos } from "react-icons/md";
import avatar from "../assets/img/Mask group.png";
import { Galereya } from "@/components/Galereya/Galereya";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import Footer from "@/components/footer/Footer";
import { useNavigate } from "react-router-dom";
import HeaderTitles from "@/components/HeadTitle";

function Gallery() {
  const masters = [
    {
      image: avatar,
      avatar: avatar,
      name: "Иван Иванов",
      salon: "Салон красоты",
      role: "Мастер",
      address: "Москва, улица Пушкина, дом 123",
      price: "1000",
      rating: 4,
    },
  ];

  const testimonials = [
    {
      avatarUrl: avatar,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      author: "John Doe",
      company: "Company Name",
    },
    {
      avatarUrl: avatar,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      author: "Jane Smith",
      company: "Another Company",
    },
    {
      avatarUrl: avatar,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      author: "Alice Brown",
      company: "Some Business",
    },
  ];
  const navigate = useNavigate();
  const galleries = [
    {
      name: "Капсульное наращивание волос",
      imgData: [
        {
          id: 1,
          url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          title: "1",
        },
        {
          id: 2,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk1LcwTW44kfdUu-JXmRbe_Xc4DU-1tt5p0Q&s",
          title: "2",
        },
        {
          id: 3,
          url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          title: "3",
        },
        {
          id: 4,
          url: "https://st3.depositphotos.com/7531416/33179/i/450/depositphotos_331791150-stock-photo-rose-isolated-white-background.jpg",
          title: "4",
        },
      ],
    },
    {
      name: "Маникюр и педикюр",
      imgData: [
        {
          id: 1,
          url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          title: "1",
        },
        {
          id: 2,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk1LcwTW44kfdUu-JXmRbe_Xc4DU-1tt5p0Q&s",
          title: "2",
        },
        {
          id: 3,
          url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          title: "3",
        },
        {
          id: 4,
          url: "https://st3.depositphotos.com/7531416/33179/i/450/depositphotos_331791150-stock-photo-rose-isolated-white-background.jpg",
          title: "4",
        },
      ],
    },
  ];

  return (
    <>
      
      <main className="w-full px-[7%] bg-[#21212E] pb-10">
        <section className="w-full py-20 flex flex-col gap-5">
          <div className="flex items-start flex-col w-full gap-20">
            <Button onClick={() => {
              navigate(-1);
            }}
              className="border-white text-white border-[1px] rounded-xl flex items-center py-6 px-12 gap-2">
              <MdArrowBackIos className="text-white" />
              Назад
            </Button>
            <HeaderTitles text="Подробности о мастере" />
          </div>
          <div className="w-full h-max">
            {masters.slice(0, 6).map((master, index) => (
              <div key={index}>
                <Master
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
              </div>
            ))}
          </div>
          <h2 className="text-white text-center font-medium text-xl">
            Галерея
          </h2>
        </section>
        <section>
          {galleries.map((gallery, index) => (
            <div key={index}>
              <Galereya name={gallery.name} imgData={gallery.imgData} />
            </div>
          ))}
        </section>
        <section className="w-full mt-10">
          <h1 className="text-white text-center font-medium text-3xl">
            Отзывы
          </h1>
          <div className="w-full grid lg:grid-cols-3 gap-5 mt-10">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
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
