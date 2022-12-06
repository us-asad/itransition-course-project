import React from 'react'

export default function CustomSelect({ options, label, registers = {} }) {
  return (
    <label className='w-full'>
      {label && <span className='font-semibold'>{label}:</span>}
      <select {...registers} className="w-full border-2 border-violet-700 px-4 py-2 rounded-md font-bold">
        {options?.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </label>
  )
}
