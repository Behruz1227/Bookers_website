'use client'

import { X } from 'lucide-react'

import  Button  from "@/components/button/Button"
import { useState } from 'react'

interface OtpVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  phoneNumber: string
  onSubmit: (code: string) => void
}

export function OtpVerificationModal({ isOpen, onClose, phoneNumber, onSubmit }: OtpVerificationModalProps) {
  const [otpCode, setOtpCode] = useState(['', '', '', ''])

  if (!isOpen) return null

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtpCode = [...otpCode]
    newOtpCode[index] = value
    setOtpCode(newOtpCode)

    // Auto-focus next input
    if (value !== '' && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otpCode[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleSubmit = () => {
    const code = otpCode.join('')
    if (code.length === 4) {
      onSubmit(code)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-xl p-6 max-w-md w-full relative">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">ОТП код</h2>
          <p className="text-xl font-medium">{phoneNumber}</p>
          <p className="text-gray-600">Мы отправили вам SMS с кодом подтверждения.</p>

          <div className="flex justify-center gap-4 my-8">
            {otpCode.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-16 h-16 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-[#9C0B35] focus:outline-none"
              />
            ))}
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-[#9C0B35] text-white hover:bg-[#9C0B35]/90 py-6 rounded-full text-lg"
          >
            Отправить отзыв
          </Button>
        </div>
      </div>
    </div>
  )
}

