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
import { UniversalModal } from "@/components/Modal/UniversalModal";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function Services() {
  const [open, setOpen] = useState(false);
  return (
    <>
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
        <section className="w-full py-10 flex flex-col md:flex-row justify-start gap-6 md:gap-28 items-center">
          <Select>
            <SelectTrigger className="placeholder:text-white border border-white w-full md:w-1/3 h-14 text-white rounded-[7px] px-3">
              {/* SelectValue komponentida placeholder ni to'g'ri ishlatish */}
              <SelectValue placeholder="Парикмахерские услуги" />
            </SelectTrigger>
            <SelectContent className="text-white bg-gray-800 rounded-md">
              <SelectGroup>
                {/* SelectItem variantlari */}
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
        <section className="flex justify-center py-10 w-full ">
          {/* Cardlar kerak */}
          <Button
            onClick={() => setOpen(true)}
            className="text-white px-12 py-3 bg-[#9C0B35] rounded-full"
          >
            Показать больше
          </Button>
        </section>
        <UniversalModal
          style=" w-[90%] overflow-y-auto max-h-[95vh] rounded-xl"
          isOpen={open}
          onClose={() => setOpen(false)}
        >
          <div className="w-full h-max flex flex-col gap-5 px-16 pb-16">
            <div className=" flex justify-center">
              <h1 className=" font-bold text-4xl">Форма заявки</h1>
            </div>
            <div className=" flex justify-between ">
              <div className="w-[49%]">
                <p className="text-[#4F4F4F] mb-2">
                  Имя мастера или название салона*
                </p>
                <Input className="rounded-[8px] h-16 border-[#4F4F4F] px-3"></Input>
              </div>
              <div className="w-[49%]">
                <p className="text-[#4F4F4F] mb-2">
                  Имя мастера или название салона*
                </p>
                <Select>
                  <SelectTrigger className="placeholder:text-[#4F4F4F] border border-[#4F4F4F] w-full h-16 text-[#4F4F4F] rounded-[7px] px-3">
                    {/* SelectValue komponentida placeholder ni to'g'ri ishlatish */}
                    <SelectValue placeholder="Парикмахерские услуги" />
                  </SelectTrigger>
                  <SelectContent className="text-[#4F4F4F] bg-gray-500 rounded-md">
                    <SelectGroup>
                      {/* SelectItem variantlari */}
                      <SelectItem value="option0">
                        Парикмахерские услуги
                      </SelectItem>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                    </SelectGroup>
                    <SelectSeparator />
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <p className="text-[#4F4F4F] mb-2">Название мероприятия*</p>
              <Textarea
                rows={5}
                className="rounded-[8px] border-[#4F4F4F]"
              ></Textarea>
            </div>
            <div className="flex justify-between">
              <div className="w-[49%]">
                <p className="text-[#4F4F4F] mb-2">Дата проведения*</p>
                <Input
                  type="date"
                  className="rounded-[8px] border-[#4F4F4F] h-16"
                ></Input>
              </div>
              <div className="w-[49%]">
                <p className="text-[#4F4F4F] mb-2">Дата проведения*</p>
                <Input
                  type="time"
                  className="rounded-[8px] border-[#4F4F4F] h-16"
                ></Input>
              </div>
            </div>
            <div>
              <p className="text-[#4F4F4F] mb-2">Описание мероприятия*</p>
              <Textarea
                rows={5}
                className="rounded-[8px] border-[#4F4F4F]"
              ></Textarea>
            </div>
            <div className="flex justify-between">
              <div className="w-[49%]">
                <p className="text-[#4F4F4F] mb-2">Контактная информация*</p>
                <Input
                  type="phone"
                  className="rounded-[8px] border-[#4F4F4F] h-16"
                ></Input>
              </div>
              <div className="w-[49%]">
                <p className="text-[#4F4F4F] mb-2">Место проведения*</p>
                <Input
                  // type="time"
                  className="rounded-[8px] border-[#4F4F4F] h-16"
                ></Input>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-[49%]">
                <p className="text-[#4F4F4F] mb-2">Дополнительная информация</p>
                <Input className="rounded-[8px] border-[#4F4F4F] h-16"></Input>
              </div>
              <div className="w-[49%]">
                <p className="text-[#4F4F4F] mb-2">Стоимость участия</p>
                <Input className="rounded-[8px] border-[#4F4F4F] h-16"></Input>
              </div>
            </div>
            <Button className="w-52 h-12 mx-auto rounded-full bg-[#9C0B35] text-white">
              Подать заявку
            </Button>
          </div>
        </UniversalModal>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Services;
