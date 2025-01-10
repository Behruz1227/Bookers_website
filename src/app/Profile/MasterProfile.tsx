'use client'

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from "@/components/button/Button"
import Header from "@/components/Header/Header"
import { MdArrowBackIos } from "react-icons/md"
import { Galereya } from "@/components/Galereya/Galereya"
import Footer from "@/components/footer/Footer"
import { attachment, BASE_URL } from "@/helpers/Url"
import { TestimonialSlider } from "@/components/splide/TestimonialSlider"

interface AttachmentItem {
  attachmentId: string;
  attachmentStatus: string;
  message: string | null;
  newStatus: boolean;
  main: boolean;
}

interface GalleryItem {
  id: number;
  albumName: string;
  date: string;
  photos: string[] | null;
  mainPhotos: string[] | null;
  resGalleryAttachments: AttachmentItem[];
}

function MasterProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/gallery/user/${id}`);
        const data = await response.json();

        if (data && data.body) {
          setGallery(data.body);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchGallery();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-[#111827]">
      <Header />
      <main className="w-full px-[7%] pb-10">
        <section className="w-full  flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row items-center justify-start gap-10">
  <Button
    onClick={() => navigate(-1)}
    className="border-white text-white border-[1px] rounded-xl flex items-center py-6 px-12 gap-2"
  >
    <MdArrowBackIos className="text-white" />
    Назад
  </Button>
  <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] font-manrope font-extrabold text-[30px] sm:text-[40px] lg:text-[50px] leading-[35px] sm:leading-[45px] lg:leading-[50px] tracking-[-0.04em] pt-6 lg:pt-10 text-center">
    Подробности о мастере
  </h2>
</div>

          <h2 className="text-white text-center font-medium  text-[30px]">
            Галерея
          </h2>
        </section>
        <section>
          {loading ? (
            <div className="text-white text-center">Загрузка...</div>
          ) : (
            gallery.map((album) => (
              <Galereya
                key={album.id}
                name={album.albumName}
                imgData={album.resGalleryAttachments.map((item, index) => ({
                  id: index + 1,
                  url: `${attachment}${item.attachmentId}`,
                  title: `${index + 1}`,
                }))}
              />
            ))
          )}
        </section>
        <section className="w-full mt-10">
          <h1 className="text-white text-center font-medium  text-[30px]">
            Отзывы
          </h1>
          <TestimonialSlider />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default MasterProfile
