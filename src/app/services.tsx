'use client'

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeroImg from "@/assets/img/Mask group (9).png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "@/components/button/Button";
import Footer from "@/components/footer/Footer";
import { Input } from "@/components/ui/input";
import Master from "@/components/cards/Master";
import Header from "@/components/Header/Header";
import { useGlobalRequest } from "@/helpers/Quary/quary";

function Services() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [masters, setMasters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const { response: categoryResponse, globalDataFunc: fetchCategories } = useGlobalRequest(
    "http://207.154.246.120:8080/api/category",
    "GET"
  );

  const fetchMastersByCategory = async (categoryId: string) => {
    try {
      const response = await fetch(
        `http://207.154.246.120:8080/api/service/website-master?categoryId=${categoryId}&page=${page}&size=${size}`
      );
      const data = await response.json();
      console.log('Serverdan kelgan data:', data);

      if (data && data.body && Array.isArray(data.body.object)) {
        setMasters(data.body.object);
      } else {
        console.error("Kutilgan formatdagi data.body.object kelmadi:", data);
        setMasters([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error kategoriyalarni yuklashda:', error);
      setLoading(false);
      setMasters([]);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (id) {
      setSelectedCategory(id);
      fetchMastersByCategory(id);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      console.log(' category:', selectedCategory);
      fetchMastersByCategory(selectedCategory);
    }
  }, [selectedCategory, page, size]);

  const categories = categoryResponse?.body || [];

  const handleCategoryChange = (value: string) => {
    console.log('Selected category:', value);
    setSelectedCategory(value);
    setPage(0);
    navigate(`/Services/${value}`);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleMasterProfileClick = (masterId: string) => {
    navigate(`/Master/${masterId}`);
  };

  return (
    <>
      <Header />
      <main className="bg-[#111827] w-full px-[7%]">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] font-manrope font-extrabold text-[30px] sm:text-[40px] lg:text-[50px] leading-[35px] sm:leading-[45px] lg:leading-[50px] tracking-[-0.04em] pt-6 lg:pt-10 text-center lg:text-left">
            Услуги мастеров и салонов красоты: {categories.find(c => c.id === selectedCategory)?.name || "Все услуги"}
          </h1>
          <img
            src={HeroImg}
            alt="img"
            className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] mt-6 lg:mt-0"
          />
        </div>

        <section className="w-full py-10 flex flex-col md:flex-row justify-start md:gap-5 items-center">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="placeholder:text-white border border-white w-full md:w-1/2 h-14 text-white rounded-[7px]">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent className="text-white bg-gray-800 rounded-md">
              <SelectGroup>
                {categories.map((category: any) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            placeholder="Поиск мастеров/салонов/услуг"
            type="search"
            className="border-white text-white w-96 placeholder:text-white"
          />
        </section>

        <section className="flex justify-center items-center flex-col py-10 w-full">
          {loading ? (
            <div className="text-white">Loading...</div>
          ) : (
            <>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10">
                {Array.isArray(masters) && masters.map((master: any, index) => (
                  <div key={master.id || index}>
                    <Master
                      id={master.id}
                      attachmentId={master.mainPhoto}
                      avatar={master.mainPhoto}
                      name={master.fullName}
                      salon={master.salonName || ""}
                      role={master.masterSpecialization?.[0] || "Мастер"}
                      address={`${master.district || ''}, ${master.street || ''} ${master.house || ''}`}
                      price={master.masterServicePrice || "0"}
                      feedbackCount={master.rating }
                      firstButtonTitle="Профиль"
                      secondButtonTitle="Записаться"
                      onProfileClick={() => handleMasterProfileClick(master.id)}
                    />
                  </div>
                ))}
              </div>
              {masters.length > 0 && (
                <Button
                  className="text-white px-12 py-3 my-10 bg-[#9C0B35] rounded-full"
                  onClick={handleLoadMore}
                >
                  Показать больше
                </Button>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Services;

