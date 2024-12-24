import img from "../assets/img/Mask group.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "@/components/button/Button";
import Footer from "@/components/footer/Footer";
import { Input } from "@/components/ui/input";
import Master from "@/components/cards/Master";
import avatar from "../assets/img/Rectangle 4171.png";
import Header from "@/components/Header/Header";

function Services() {
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
    {
      image: avatar,
      avatar: avatar,
      name: "Анна Смирнова",
      salon: "Барбершоп",
      role: "Стилист",
      address: "Санкт-Петербург, улица Ленина, дом 45",
      price: "1500",
      rating: 5,
    },
    {
      // image: avatar,
      avatar: avatar,
      name: "Пётр Петров",
      salon: "Парикмахерская",
      role: "Барбер",
      address: "Казань, улица Горького, дом 67",
      price: "1200",
      rating: 3,
    },
    {
      image: avatar,
      avatar: avatar,
      name: "Мария Иванова",
      salon: "Салон красоты",
      role: "Визажист",
      address: "Новосибирск, проспект Мира, дом 98",
      price: "1800",
      rating: 5,
    },
    {
      image: avatar,
      avatar: avatar,
      name: "Алексей Сидоров",
      salon: "Барбершоп",
      role: "Мастер",
      address: "Екатеринбург, улица Советская, дом 21",
      price: "1300",
      rating: 4,
    },
    {
      image: avatar,
      avatar: avatar,
      name: "Елена Смирнова",
      salon: "Парикмахерская",
      role: "Стилист",
      address: "Владивосток, улица Победы, дом 3",
      price: "1100",
      rating: 5,
    },
  ];

  return (
    <>
      <Header></Header>
      <main className="w-[100%] h-full bg-[#21212E] px-[7%]">
        <section className="w-full bg-[#21212E] flex flex-col lg:flex-row lg:flex-wrap h-max py-10 lg:justify-between items-center">
          <div className="pt-10 lg:pt-0 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent [background-image:linear-gradient(to_right,#FB7CA1,#9C0B35)]">
              Услуги мастеров и <br /> салонов красоты: <br /> Барбершоп
            </h1>
          </div>
          <img
            className="w-full lg:w-1/2 mt-10 lg:mt-0"
            src={img}
            alt="Барбершоп"
          />
        </section>
        <section className="w-full py-10 flex flex-col md:flex-row justify-start md:gap-5 items-center">
          <Select>
            <SelectTrigger className="placeholder:text-white border border-white w-full md:w-1/2 h-14 text-white rounded-[7px] ">
              <SelectValue placeholder="Парикмахерские услуги" />
            </SelectTrigger>
            <SelectContent className="text-white bg-gray-800 rounded-md">
              <SelectGroup>
                <SelectItem value="option0">Парикмахерские услуги</SelectItem>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectGroup>
              <SelectSeparator />
            </SelectContent>
          </Select>
          <Input
            placeholder="Поиск мастеров/салонов/услуг"
            type="search"
            className="border-white text-white w-96 placeholder:text-white"
          ></Input>
        </section>
        <section className="flex justify-center items-center flex-col py-10 w-full ">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10">
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
          <Button className="text-white px-12 py-3 my-10 bg-[#9C0B35] rounded-full">
            Показать больше
          </Button>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Services;
