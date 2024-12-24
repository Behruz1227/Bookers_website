import React, { useState } from 'react'

export const Language: React.FC = () => {
  const [active, setActive] = useState<string>('uz')
  console.log(active);
  
  interface Option {
    id: number;
    value: string;
    label: string;
    img?: string;
  }
  const language: Option[] = [{
    id: 1,
    value: 'uz',
    label: 'O‘zbekcha',
    img: 'https://img.icons8.com/?size=512&id=t3NE3BsOAQwq&format=png',
  },
  {
    id: 2,
    value: 'ru',
    label: 'Русский',
    img: 'https://img.icons8.com/?size=512&id=t3NE3BsOAQwq&format=png',
  },
  {
    id: 3,
    value: 'eng',
    label: 'English',
    img: 'https://img.icons8.com/?size=512&id=t3NE3BsOAQwq&format=png',
  }
  ]

  return (
    <div className=''>
      <div className="relative hidden lg:flex">
        <select
          name="language"
          aria-label="Language"
          className="appearance-none outline-none bg-[#21212E] text-white p-3 pl-5 pr-10 border border-white rounded-[10px] cursor-pointer"
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
              <button key={index} onClick={() => setActive(item.value)} aria-label="language" className={`p-2 flex flex-row items-center border border-gray-300 text-sm font-medium text-gray-700 hover:bg-[#7f7f95] focus:outline-none"
              ${active === item.value ? 'bg-[#9C0B35]' : ''}`}>
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
