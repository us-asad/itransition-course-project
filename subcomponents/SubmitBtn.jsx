import React from 'react'
import Spinner from './Spinner'

export default function SubmitBtn({
    type = "submit",
    text,
    loadingText,
    disabled,
    loading,
    className,
    onClick = Function.prototype
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`styled-btn py-2 text-[18px] font-bold rounded-lg bg-violet-700 text-white ${className}`}
    >
      {loading ? (
        <>
          <span>{loadingText || text}</span>
          <Spinner />
        </>
      ) : text}
    </button>
  )
}
