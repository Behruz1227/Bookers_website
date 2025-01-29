

'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import img  from'../../assets/img/imgInput.svg'
import { useTranslation } from 'react-i18next'

interface FileState {
  file: File
  name: string
  url: string
}

interface FileInputProps {
  onFileSelect?: (fileState: FileState | null) => void
}

export default function FileInput({ onFileSelect }: FileInputProps) {
  const [fileState, setFileState] = useState<FileState | null>(null)
const { t } = useTranslation()
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newFileState = {
        file: file,
        name: file.name,
        url: URL.createObjectURL(file)
      }
      
      setFileState(newFileState)
      // Yuqoriga fayl ma'lumotlarini yuborish
      onFileSelect?.(newFileState)
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (fileState) {
      URL.revokeObjectURL(fileState.url)
      setFileState(null)
      // Fayl o'chirilganda null yuborish
      onFileSelect?.(null)
    }
    const input = document.getElementById('fileInput') as HTMLInputElement
    if (input) {
      input.value = ''
    }
  }

  return (
    <div className="w-full max-w-md flex   mx-auto ">
      <div 
        onClick={() => document.getElementById('fileInput')?.click()}
        className={`
          flex items-center  
          border-2 border-[#9C0B35] rounded-full
          px-8 py-3 pt-4 cursor-pointer
          ${fileState ? 'bg-none' : 'border hover:bg-rose-50'}
        `}
      >
        <div className="flex items-center  gap-2 flex-1 min-w-0">
          <img src={img} alt="" />
          <span className="truncate text-[#9C0B35] pb-3">
            {fileState ? fileState.name : t('Выбрать фото')}
          </span>
        </div>
        
        {fileState && (
          <button
            type="button"
            aria-label='Remove file'
            onClick={handleRemove}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4 text-[#9C0B35]" />
          </button>
        )}
      </div>
      
      <input
        id="fileInput"
        placeholder={t('Выбрать фото')}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}


