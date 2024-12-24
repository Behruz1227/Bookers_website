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
import { avatar } from "../assets/img/Rectangle 4171.png";

function Services() {
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
          <div>
            <Master avatar={avatar} name="John Doe" salon="Salon XYZ"></Master>
          </div>
          <Button className="text-white px-12 py-3 bg-[#9C0B35] rounded-full">
            Показать больше
          </Button>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Services;
