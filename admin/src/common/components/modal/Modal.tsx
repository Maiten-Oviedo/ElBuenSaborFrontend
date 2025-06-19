'use client'
import { useRouter } from 'next/navigation'
import { IoClose } from 'react-icons/io5'

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleCloseModal = () => {
    router.back()
  }

  return (
    <article
      className="w-full fixed inset-0 bg-black/10 backdrop-blur-xs flex items-center justify-center z-50 "
      onClick={handleCloseModal}
    >
      <div
        className="relative bg-black p-4 rounded-2xl shadow-lg w-[90%] max-w-2xl max-h-[95vh] overflow-y-auto px-10 scrollbar-red-no-background"
        onClick={e => e.stopPropagation()}
      >
        {children}
        <button
          onClick={handleCloseModal}
          className="border-1 rounded-full items-center absolute top-2 right-2 cursor-pointer hover:bg-red-500 hover:text-white transition-all"
        >
          <IoClose className="size-6" />
        </button>
      </div>
    </article>
  )
}
