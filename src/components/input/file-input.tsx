

'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

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
          px-8 py-5 cursor-pointer
          ${fileState ? 'bg-none' : 'border hover:bg-rose-50'}
        `}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <svg 
            className="w-5 h-5 text-[#9C0B35] flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="truncate text-[#9C0B35]">
            {fileState ? fileState.name : 'Rasm yuklash'}
          </span>
        </div>
        
        {fileState && (
          <button
            onClick={handleRemove}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4 text-[#9C0B35]" />
          </button>
        )}
      </div>
      
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}


