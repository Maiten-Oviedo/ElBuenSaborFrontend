'use client'
import { useRouter } from 'next/navigation'
import { IoClose } from 'react-icons/io5'

export default function ParallelModal({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleCloseModal = () => {
    router.back()
  }

  return (
    <article className="w-full fixed inset-0 bg-gray-400/10 backdrop-blur-xs flex items-center justify-center z-50 ">
      <div
        className="relative bg-black p-10 rounded-2xl shadow-lg w-[90%] max-w-2xl max-h-[95vh] overflow-y-auto px-14 scrollbar-red-no-background"
        onClick={e => e.stopPropagation()}
      >
        {children}
        <button
          onClick={handleCloseModal}
          className="border-1 rounded-full items-center absolute top-4 right-4 cursor-pointer bg-red-500 text-white transition-all"
        >
          <IoClose className="size-6" />
        </button>
      </div>
    </article>
  )
}
