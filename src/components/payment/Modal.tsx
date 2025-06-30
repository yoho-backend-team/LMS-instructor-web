// components/Modal.tsx
import { COLORS } from '@/constants/uiConstants';
import type { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll" style={{background:'rgba(0,0,0,0.4)'}}>
      <div className=" rounded-xl p-6 m-10 mt-30  w-[700px] shadow-xl relative" style={{background:COLORS.bg_Colour}}>
        {/* Close Button */}
        {/* <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button> */}
        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
