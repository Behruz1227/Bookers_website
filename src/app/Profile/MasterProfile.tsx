import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@/components/button/Button";
import Header from "@/components/Header/Header";
import { MdArrowBackIos } from "react-icons/md";
import { Galereya } from "@/components/Galereya/Galereya";
import Footer from "@/components/footer/Footer";
import { attachment, BASE_URL } from "@/helpers/Url";
import { TestimonialSlider } from "@/components/splide/TestimonialSlider";
import MasterCard from "@/components/cards/Master";

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

interface MasterDetails {
  id: string;
  fullName: string;
  mainPhoto: string;
  salonName: string;
  masterSpecialization: string[];
  district: string;
  street: string;
  house: string;
  masterServicePrice: number;
  rating: number;
  orderCount: number;
  clientCount: number;
}

function MasterProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [masterDetails, setMasterDetails] = useState<MasterDetails | null>(null);
  console.log(masterDetails);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMasterDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/service/website-master/${id}`);
        const data = await response.json();
        if (data && data.body) {
          setMasterDetails(data.body);
        }
      } catch (error) {
        console.error('Error fetching master details:', error);
      }
    };

    const fetchGallery = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/gallery/user/${id}`);
        const data = await response.json();
        if (data && data.body) {
          setGallery(data.body);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
      setLoading(false);
    };

    if (id) {
      fetchMasterDetails();
      fetchGallery();
    }
  }, [id]);

  return (
    <div>
      <div className="bg-[#111827] w-full container mx-auto">
      <Header />
      <main className="px-4">
        <section className="w-full flex flex-col gap-5">
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

          {masterDetails && (
            <div className="w-full max-w-3xl mx-auto my-8">
              <MasterCard
                id={masterDetails.id}
                attachmentId={masterDetails.mainPhoto}
                avatar={masterDetails.mainPhoto}
                name={masterDetails.fullName}
                salon={masterDetails.salonName || ""}
                role={masterDetails.masterSpecialization?.[0] || "Мастер"}
                address={`${masterDetails.district || ''}, ${masterDetails.street || ''} ${masterDetails.house || ''}`}
                masterServicePrice={masterDetails.masterServicePrice?.toString() || "0"}
                feedbackCount={masterDetails.rating || 0}
                orderCount={masterDetails.orderCount || 0}
                clientCount={masterDetails.clientCount || 0}
                firstButtonTitle="Профиль"
                secondButtonTitle="Записаться"
              />
            </div>
          )}

          <h2 className="text-white text-center font-medium text-[30px]">
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
          <h1 className="text-white text-center font-medium text-[30px]">
            Отзывы
          </h1>
          <TestimonialSlider />
        </section>
      </main>
      
    </div>
    <Footer />
    </div>
  );
}

export default MasterProfile;