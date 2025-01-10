'use client'

import { Star } from 'lucide-react'
import { useState } from "react"

interface StarRatingProps {
  total?: number
  defaultValue?: number
  onChange?: (rating: number) => void
}

export default function StarRating({ 
  total = 5, 
  defaultValue = 0,
  onChange 
}: StarRatingProps) {
  const [rating, setRating] = useState(defaultValue)
  const [hover, setHover] = useState(0)

  const handleClick = (value: number) => {
    setRating(value)
    onChange?.(value)
  }

  return (
    <div className="flex gap-1">
      {[...Array(total)].map((_, index) => {
        const value = index + 1
        return (
          <button
            key={index}
            type="button"
            className="transition-colors"
            onClick={() => handleClick(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              className={`h-[37px] w-[35px] ${
                value <= (hover || rating)
                  ? 'fill-[#9C0A35] stroke-[#9C0A35]'
                  : 'stroke-[#9C0A35]'
              }`}
            />
            <span className="sr-only">Rate {value} out of {total}</span>
          </button>
        )
      })}
    </div>
  )
}

