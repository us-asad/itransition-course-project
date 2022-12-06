import { SplideSlide } from '@splidejs/react-splide'
import { Review, SplideSlider } from 'components'
import Image from 'next/image'
import React from 'react'
import { AiFillLike, AiFillStar, AiOutlineStar } from 'react-icons/ai'

export default function Reviews({ reviews }) {
  return (
    <div className='flex flex-wrap justify-between gap-y-4'>
      {reviews.map((review, i) => <Review key={i} review={review} className="w-[49%]" />)}
    </div>
  )
}
