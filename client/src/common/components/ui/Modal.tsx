"use client"

import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#00000088] flex items-center justify-center">
      <div className="bg-black text-white rounded-2xl p-10 w-[90%] max-w-lg relative shadow-md">
        <button onClick={onClose} className="absolute top-2 right-3 text-4xl cursor-pointer text-red-800">×</button>
        <div className="flex flex-col items-center justify-center gap-5">
            {children}
            </div>
      </div>
    </div>
  );
};
