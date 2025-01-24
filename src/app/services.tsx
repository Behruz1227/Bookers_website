'use client'

import { BASE_URL } from "@/helpers/Url"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import HeroImg from "@/assets/img/Mask group (9).png"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Button from "@/components/button/Button"
import Footer from "@/components/footer/Footer"
import MasterCard from "@/components/cards/Master"
import { useGlobalRequest } from "@/helpers/Quary/quary"
import { Input } from "@/components/ui/input"
import useCategoryStore from "@/Store/Category"
import Loading from "@/components/Loading/Loading"

function Services() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [masters, setMasters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [search, setSearch] = useState<string>("")

  const { globalDataFunc: fetchCategories } = useGlobalRequest(
    `${BASE_URL}/api/category`,
    "GET"
  )

  const { globalDataFunc: fetchMastersByCategory } = useGlobalRequest(
    `${BASE_URL}/api/service/website-master?categoryId=${selectedCategory}&page=${page}&size=${size}&info=${search}`,
    "GET"
  )

  useEffect(() => {
    fetchCategories()
    if (id) {
      setSelectedCategory(id)
    }
  }, [id])

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true)
      fetchMastersByCategory()
        .then((data: any) => {
          if (data && data.body && Array.isArray(data.body.object)) {
            setMasters(data.body.object)
          } else {
            setMasters([])
          }
        })
        .catch((error) => {
          console.error('error', error)
          setMasters([])
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [selectedCategory, page, size, search])

  const handleCategoryChange = (value: string) => {
    console.log('Selected category:', value)
    setSelectedCategory(value)
    setPage(0)
    navigate(`/Services/${value}`)
  }

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  const handleMasterProfileClick = (masterId: string) => {
    navigate(`/Master/${masterId}`)
  }

  const { category } = useCategoryStore();

  return (
    <div>
      <div className="bg-[#111827] w-full mx-auto ">
        <main className="">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] font-manrope font-extrabold text-[30px] sm:text-[40px] lg:text-[50px] leading-[35px] sm:leading-[45px] lg:leading-[50px] tracking-[-0.04em] pt-6 lg:pt-10 text-center lg:text-left">
              Услуги мастеров и салонов красоты: {category?.body.find((item: any) => item.id === selectedCategory)?.name || ""}
            </h1>
            <img
              src={HeroImg}
              alt="img"
              className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] mt-6 lg:mt-0"
            />
          </div>
          <section className="w-full py-10 flex flex-col md:flex-row justify-start gap-5 items-center">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="placeholder:text-white border border-white w-full md:w-1/2 h-14 text-white rounded-[7px] font-medium font-manrope text-[22px]">
                <SelectValue placeholder="Выберите категорию" className="text-white font-manrope text-[22px]" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-2xl ">
                <SelectGroup>
                  {category?.body.map((category: any) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className={`font-manrope text-[22px] cursor-pointer transition-colors hover:text-[#9C0A35] hover:bg-[#9c9ba8] ${selectedCategory === category.id ? 'text-[#9C0A35] bg-gray-50' : 'text-black'}`}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="w-full md:w-1/2">
              <Input
                placeholder="Поиск мастеров/салонов/услуг"
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                className="border-white text-white w-full md:w-full placeholder:text-white  md:mt-0"
              />
            </div>
          </section>

          <section className="flex justify-center items-center flex-col py-10 w-full">
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-10">
                  {Array.isArray(masters) &&
                    masters.map((master: any, index) => (
                      <div key={master.id || index}>
                        <MasterCard
                          id={master.id}
                          attachmentId={master.attachmentId}
                          avatar={master.mainPhoto}
                          serviceId={master.serviceId}
                          name={master.fullName}
                          salon={master.salonName || ""}
                          role={master.masterSpecialization?.[0] || "Мастер"}
                          address={`${master.district || ""} ${master.street || ""} ${master.house || ""}`}
                          masterServicePrice={master.masterServicePrice?.toString() || "0"}
                          feedbackCount={master.feedbackCount || 0}
                          orderCount={master.orderCount || 0}
                          clientCount={master.clientCount || 0}
                          firstButtonTitle="Профиль"
                          secondButtonTitle="Записаться"
                          onProfileClick={() => handleMasterProfileClick(master.id)}
                        />
                      </div>
                    ))}
                </div>
                <div className="mt-10">
                  {masters.length > 0 && (
                    <Button
                      className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] "
                      onClick={handleLoadMore}
                    >
                      Показать больше
                    </Button>
                  )}
                </div>
              </>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Services