import { useEffect, useState } from "react";
import HeroImg from "@/assets/img/Mask group (9).png";
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
import { useGlobalRequest } from "@/helpers/Quary/quary";

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

  // State to store categories
  const [categories, setCategories] = useState<any[]>([]);

  // Fetch categories
  const { response, globalDataFunc } = useGlobalRequest(
    "http://207.154.246.120:8080/api/category",
    "GET"
  );

  useEffect(() => {
    globalDataFunc();
  }, []);

  useEffect(() => {
    if (response?.body) {
      setCategories(response.body); 
    }
  }, [response]);

  return (
    <>
      <Header />
      <main className="bg-[#111827] w-full px-[7%]">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] font-manrope font-extrabold text-[30px] sm:text-[40px] lg:text-[50px] leading-[35px] sm:leading-[45px] lg:leading-[50px] tracking-[-0.04em] pt-6 lg:pt-10 text-center lg:text-left">
            Услуги мастеров и салонов красоты: Барбершоп
          </h1>
          <img
            src={HeroImg}
            alt="img"
            className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] mt-6 lg:mt-0"
          />
        </div>

        <section className="w-full py-10 flex flex-col md:flex-row justify-start md:gap-5 items-center">
          
          <Select>
            <SelectTrigger className="placeholder:text-white border border-white w-full md:w-1/2 h-14 text-white rounded-[7px]">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent className="text-white bg-gray-800 rounded-md">
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.name} 
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectSeparator />
            </SelectContent>
          </Select>
          <Input
            placeholder="Поиск мастеров/салонов/услуг"
            type="search"
            className="border-white text-white w-96 placeholder:text-white"
          />
        </section>
        <section className="flex justify-center items-center flex-col py-10 w-full">
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
      <Footer />
    </>
  );
}

export default Services;
