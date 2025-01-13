import React, { useState } from 'react';
import { BASE_URL } from '@/helpers/Url';
import { UniversalModal } from './UniversalModal';

interface MasterClassFormData {
  nameSalonOrMaster: string;
  eventType: string;
  eventName: string;
  eventDate: string;
  hour: number;
  minute: number;
  eventDescription: string;
  contactInformation: string;
  eventLocation: string;
  additionalInformation: string;
  participationFee: number;
  active: boolean;
}

interface MasterClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MasterClassModal: React.FC<MasterClassModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<MasterClassFormData>({
    nameSalonOrMaster: '',
    eventType: '',
    eventName: '',
    eventDate: '',
    hour: 0,
    minute: 0,
    eventDescription: '',
    contactInformation: '',
    eventLocation: '',
    additionalInformation: '',
    participationFee: 0,
    active: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('Token'); 
      if (!token) {
        console.error('No token found in local storage');
        return;
      }

      const response = await fetch('http://207.154.246.120:8080/api/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('User Data:', userData); 
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/masterClass/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log(response);
        alert('post boldi');
        await fetchUserData(); 
        onClose();
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <UniversalModal isOpen={isOpen} onClose={onClose} style="max-h-[90vh] w-[90%]">
      <div className="p-8">
        <h2 className="font-bold text-xl lg:text-3xl px-[14%] text-center pb-6">Форма заявки</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2" htmlFor="nameSalonOrMaster">
              Имя мастера или название салона*
              </label>
              <input
                id="nameSalonOrMaster"
                name="nameSalonOrMaster"
                type="text"
                required
                className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                value={formData.nameSalonOrMaster}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm mb-2" htmlFor="eventType">
                Тип мероприятия*
              </label>
              <select
                id="eventType"
                name="eventType"
                required
                className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                value={formData.eventType}
                onChange={handleInputChange}
              >
                <option value="">Выберите тип</option>
                <option value="masterclass">Мастер-класс</option>
                <option value="seminar">Семинар</option>
                <option value="training">Тренинг</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2" htmlFor="eventName">
              Название мероприятия*
            </label>
            <input
              id="eventName"
              name="eventName"
              type="text"
              required
              className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
              value={formData.eventName}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2" htmlFor="eventDate">
                Дата проведения*
              </label>
              <input
                id="eventDate"
                name="eventDate"
                type="date"
                required
                className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                value={formData.eventDate}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Время проведения*
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  name="hour"
                  min="0"
                  max="23"
                  placeholder="Час"
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-100 focus:outline-none focus:border-gray-200"
                  value={formData.hour}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="minute"
                  min="0"
                  max="59"
                  placeholder="Минута"
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-gray-100 focus:outline-none focus:border-gray-200"
                  value={formData.minute}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2" htmlFor="eventDescription">
              Описание мероприятия*
            </label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              required
              className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0"
              value={formData.eventDescription}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2" htmlFor="contactInformation">
                Контактная информация*
              </label>
              <input
                id="contactInformation"
                name="contactInformation"
                type="text"
                required
                className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                value={formData.contactInformation}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm mb-2" htmlFor="eventLocation">
                Место проведения*
              </label>
              <input
                id="eventLocation"
                name="eventLocation"
                type="text"
                required
                className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                value={formData.eventLocation}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2" htmlFor="additionalInformation">
                Дополнительная информация
              </label>
              <input
                id="additionalInformation"
                name="additionalInformation"
                type="text"
                className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                value={formData.additionalInformation}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm mb-2" htmlFor="participationFee">
                Стоимость участия
              </label>
              <input
                id="participationFee"
                name="participationFee"
                type="number"
                className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                value={formData.participationFee}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='text-center'>
          <button 
            type="submit"
            className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
          >
            Отправить заявку
          </button>
          </div>
        </form>
      </div>
    </UniversalModal>
  );
};

export default MasterClassModal;

