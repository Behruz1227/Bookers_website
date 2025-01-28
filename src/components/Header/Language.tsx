import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LoginIndex from '@/Store';

export const Language: React.FC = () => {
  const [active, setActive] = useState<string>('uz');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference for dropdown
  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem('i18nextLng') || 'uz';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const { setLoginLang } = LoginIndex();
  useEffect(() => {
    setLoginLang(active);
  }, [active]);

  useEffect(() => {
    // Close dropdown if click is outside of the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false); // Close the dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // Listen for click events
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup the event listener
    };
  }, []);

  interface Option {
    id: number;
    value: string;
    label: string;
    img: string;
  }

  const language: Option[] = [
    {
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
    },
  ];

  return (
    <div>
      {/* Desktop View */}
      <div className="relative hidden lg:block" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="appearance-none outline-none bg-[#21212E] text-white p-3 pl-5 pr-10 border border-white rounded-[10px] cursor-pointer flex items-center justify-between"
        >
          <span>{language.find(item => item.value === lang)?.label || t('uzbek')}</span>
          <img
            src={language.find(item => item.value === lang)?.img || ''}
            alt="Selected Language"
            className="w-6 h-6 ml-2"
          />
        </button>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="absolute bg-[#ffffff] top-full left-0 w-full mt-2 rounded-[10px] shadow-lg">
            {language.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  changeLanguage(item.value);
                  setActive(item.value);
                  setDropdownOpen(false); // Close dropdown after selection
                }}
                className={`flex items-center p-2 w-full hover:text-gray-800 text-left  ${
                  lang === item.value ? 'text-[#9C0B35]' : 'text-black'
                }`}
              >
                <img src={item.img} alt={item.label} className="w-6 h-6 mr-3" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden">
        <div className="flex flex-wrap gap-2 p-4">
          {language.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                changeLanguage(item.value);
                setActive(item.value);
              }}
              className={`flex items-center gap-2 px-4 py-2 border rounded-md ${
                lang === item.value ? 'bg-[#9C0B35] text-white' : 'bg-[#21212E] text-gray-300'
              }`}
            >
              <img src={item.img} alt={`${item.label} icon`} className="w-6 h-6" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
