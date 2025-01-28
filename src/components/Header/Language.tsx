import LoginIndex from '@/Store';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

export const Language: React.FC = () => {
  const [active, setActive] = useState<string>('uz')
  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem('i18nextLng');
  

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // Tilni o‘zgartirish
  };
  
  const { setLoginLang } = LoginIndex();
  useEffect(() => {
    setLoginLang(active)
  }, [active])
  interface Option {
    id: number;
    value: string;
    label: string;
    img?: string;
  }
  const language: Option[] = [{
    id: 1,
    value: 'uz',
    label: t('uzbek'),
    img: 'https://img.icons8.com/color/48/uzbekistan.png',
  },
  {
    id: 2,
    value: 'ru',
    label: t('rus'),
    img: 'https://img.icons8.com/officel/80/russian-federation.png',
  },
  {
    id: 3,
    value: 'en',
    label: t('english'),
    img: 'https://img.icons8.com/color/48/great-britain.png',
  }
  ]

  return (
    <div className=''>
      <div className="relative hidden lg:flex">
        <select
          name="language"
          id="language"
          value={lang || 'uz'}
          aria-label="Language"
          className="appearance-none outline-none bg-[#21212E] text-white p-3 pl-5 pr-10 border border-white rounded-[10px] cursor-pointer"
          onChange={(e) => {
            changeLanguage(e.target.value)
            setActive(e.target.value)
          }}
        >
          {language.map((item, index) => (
            <option
              key={index}
              className="bg-[#21212E] text-[#9C0B35] p-5"
              value={item.value}
            >
              {item.label}
              
            </option>
          ))}
        </select>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-1/2 right-3 w-4 h-4 text-white transform -translate-y-1/2 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div className='block lg:hidden'>
        <div className='flex flex-row gap-2 items-center p-4'>
          {
            language.map((item, index) => (
              <button key={index} onClick={() => {
                setActive(item.value)
                 changeLanguage(item.value)
                }} aria-label="language" className={`p-2 flex flex-row items-center border border-gray-300 text-sm font-medium text-gray-700 hover:bg-[#7f7f95] focus:outline-none"
              ${lang === item.value ? 'bg-[#9C0B35]' : ''}`}>
                <span className="text-md text-white">{item.label}</span>
                <span className="ml-1"> <img src={item.img} alt='icon' className="w-5 h-5" /></span>
              </button>
            ))
          }
        </div>
      </div>
    </div>
  )
}
