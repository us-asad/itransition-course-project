import { SplideSlide } from '@splidejs/react-splide'
import Image from 'next/image'
import React from 'react'
import { AiFillLike, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import SplideSlider from './SplideSlider'

export default function Review({ review, className }) {
  return (
    <div className={`flex bg-white rounded-lg overflow-hidden group cursor-pointer duration-200 hover:shadow-[0px_0px_20px_0px_#dccce8] ${className}`}>
      <div className='relative h-[200px] w-1/2 bg-[#cfcfcf]'>
        <SplideSlider items={review.images} hoverable>
          {review.images?.map(image => (
            <SplideSlide key={image}>
              <Image
                src={image}
                alt={review.title}
                layout="fill"
                objectFit='cover'
                className='!h-[200px]'
              />
            </SplideSlide>
          ))}
        </SplideSlider>
      </div>
      <div className="w-1/2 px-5 py-2">
        <h3 className='text-[20px] font-semibold line-clamp-1 group-hover:text-violet-700'>{review.title} asasd sdasd</h3>
        <p className='text-[14px]'>by <b>{review.author.name}</b></p>
        <p className='line-clamp-3 text-[14px] mt-3'>{review.content}</p>
        <div className='flex justify-between mt-2'>
          <div className='flex text-yellow-400'>
            {[...new Array(5)].map((_, i) => (
              <React.Fragment key={i}>
                {review.rating > i + 1 ? <AiFillStar /> : <AiOutlineStar />}
              </React.Fragment>
            ))}
          </div>
          <span className='flex text-black items-center gap-1'>
            <AiFillLike />
            <span className='text-[12px] font-bold'>{review.likes}</span>
          </span>
        </div>
        <div className='flex justify-between mt-[8px]'>
          <p className='text-[12px] flex gap-1 items-center'>
            about
            <b className='text-[16px]'>{review.category}</b>
          </p>
          <p>
            <b>{review.grade}</b>
            <span className='text-[12px]'>/10</span>
          </p>
        </div>
      </div>
    </div>
  )
}
