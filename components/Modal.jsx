import React from 'react'
import { CgClose } from "react-icons/cg";

export default function Modal({ close, opened, children }) {
  return (
    <div className={`duration-200 ${!opened ? "opacity-0 pointer-events-none" : ""}`}>
      <div className={`fixed z-[11] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-gray-300 rounded-lg px-8 py-5 min-w-[400px] duration-200 ${!opened && "scale-[.95]"}`}>
        <button
          onClick={close}
          className='absolute top-2 right-3 text-[20px]'
        >
          <CgClose />
        </button>
        {children}
      </div>
      <div
        onClick={close}
        className='fixed z-10 top-0 left-0 w-full h-full bg-[#ffffffab]'
      />
    </div>
  )
}
