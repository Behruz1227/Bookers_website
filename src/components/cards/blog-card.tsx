'use client'

import { CalendarIcon } from 'lucide-react'

interface CardProps {
  image?: string 
  date?: string
  title?: string
  description?: string
  id?: number
}

export default function Blogcard({ image, date, title, description, id }: CardProps) {
  return (
    <div className="w-full rounded-2xl bg-[#B9B9C9] overflow-hidden ">
      {/* Image */}
      <div className="relative h-[289px] w-full">
        <img
          src={image}
          alt={title}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-3 ">
        {/* Date */}
        <div className="flex items-center gap-2 ">
          <CalendarIcon size={16} className='text-[#9C0B35]' />
          <span className='text-[16px] text-[#000000] font-manrope font-medium'>{date}</span>
        </div>

        {/* Title */}
        <h3 className="font-manrope  font-extrabold text-[22px] leading-[30px]">
          {title}
        </h3>

        {/* Description */}
        <p className="font-manrope py-2 font-medium text-[18px] leading-[27px]">
          {description}
        </p>

        {/* Button */}
        <button
         
          className="text-[18px] text-[#9C0B35] font-manrope font-bold leading-[34px]">
          Подробнее
        </button>
      </div>
      <p className=' hidden'>{id}</p>
    </div>
  )
}


//// ishlatilishi 

// {cardsData.map((item) => 
//     (
//      <Blogcard
//        key={item.id}
//        image={item.image}
//        date={item.date}
//        title={item.title}
//        description={item.description}
//      />
//    )