import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function FormField(props) {
  const {
    label,
    placeholder,
    registers,
    error,
    type
  } = props
  const [showPwd, setShowPwd] = useState(false);

  const inputAttributes = {
    type,
    placeholder,
    className: `px-4 py-2 text-[18px] font-bold rounded-lg w-full border-2 ${error ? "border-red-600" : "border-violet-700"}`,
    autoComplete: "off",
    ...registers
  }

  return (
    <label className='w-full'>
      {label && <span className='font-semibold'>{label}:</span>}
      {{
        password: (
          <div className='relative'>
            <input
              {...inputAttributes}
              type={showPwd ? "text" : "password"}
            />
            <button
              onClick={() => setShowPwd(prev => !prev)}
              className='absolute top-[1.5px] right-[1px] text-[23px] h-[94%] px-3 bg-white rounded-tr-[6px] rounded-br-[6px]'
            >
              {showPwd ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
        )
      }[type] || (
          <input
            {...inputAttributes}
          />
        )}
      {error && <span className='text-red-600 text-[14px] mb-[-5px] block'>{error}</span>}
    </label>
  )
}
