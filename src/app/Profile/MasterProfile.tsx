import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "@/components/footer/Footer";
import Header from "@/components/Header/Header";
import { attachment } from "@/helpers/Url";
import Button from "@/components/button/Button";
import { UniversalModal } from "@/components/Modal/UniversalModal";
import Calendar from "@/components/Calendar";
import Oclock from "@/components/Oclock";

interface MasterData {
  id: string;
  mainPhoto: string;
  fullName: string;
  salonName: string;
  masterSpecialization: string[];
  district: string;
  street: string;
  house: string;
  masterServicePrice: string;
  rating: number;
  description: string;
  portfolio: string[];
}

function MasterProfile() {
  const { id } = useParams();
  const [master, setMaster] = useState<MasterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const response = await fetch(`http://207.154.246.120:8080/api/service/website-master/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch master data');
        }
        const data = await response.json();
        if (data && data.body) {
          setMaster(data.body);
        }
        console.log("resssssss",data.body);
        
      } catch (error) {
        console.error('Error fetching master data:', error);
        setMaster(null); // Xato yuz berganida masterni null qilib qo'ying
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMasterData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#111827] text-white min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-2xl">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!master) {
    return (
      <div className="bg-[#111827] text-white min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-2xl">Master not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#111827] text-white min-h-screen">
      <Header />
      <main className="px-[7%] py-10">
        <div className="bg-[#1F2937] rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <img
                src={attachment + master.mainPhoto}
                alt={master.fullName}
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </div>
            <div className="lg:w-2/3">
              <h1 className="text-4xl font-bold mb-4">{master.fullName}</h1>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#9C0B35] text-2xl">
                  {[...Array(master.rating || 5)].map((_, index) => (
                    <span key={index}>★</span>
                  ))}
                </span>
                <span className="text-gray-400">({master.rating} / 5)</span>
              </div>
              <p className="text-xl text-gray-300 mb-2">{master.salonName}</p>
              <p className="text-lg text-gray-400 mb-4">
                {master.masterSpecialization?.join(", ")}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-icons text-[#9C0B35]">location_on</span>
                <span className="text-gray-300">
                  {master.district}, {master.street} {master.house}
                </span>
              </div>
              <p className="text-2xl text-[#9C0B35] font-semibold mb-6">
                от {master.masterServicePrice}
              </p>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#9C0B35] text-white px-8 py-3 rounded-full text-lg hover:bg-[#7c092a] transition-colors"
              >
                Записаться
              </Button>
            </div>
          </div>

          {master.description && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">О мастере</h2>
              <p className="text-gray-300">{master.description}</p>
            </div>
          )}

          {master.portfolio && master.portfolio.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Портфолио</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {master.portfolio.map((photo, index) => (
                  <img
                    key={index}
                    src={attachment + photo}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <UniversalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4 bg-[#B9B9C9]">
          <div className="text-center">
            <h2 className="font-manrope font-extrabold text-[44px]">Записаться</h2>
            <p className="font-manrope font-medium text-[30px]">
              {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <div className="flex items-start justify-center gap-20 p-10">
            <Calendar />
            <div>
              <h2 className="font-manrope text-[26px]">Свободное время</h2>
              <Oclock />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
              onClick={() => alert("Скачать приложение")}
            >
              Записаться
            </Button>
          </div>
        </div>
      </UniversalModal>

      <Footer />
    </div>
  );
}

export default MasterProfile;
