import React from 'react';
import { Splide, SplideTrack } from '@splidejs/react-splide';
import { BsChevronRight } from 'react-icons/bs';

const defaultOptions = {
  rewind: true,
  loop: true,
  pagination: true,
  perPage: 1,
};

export default function SplideSlider({ items, options, children, className, hoverable }) {
  return (
    <div className={`splide-slider ${className}`}>
      <Splide
        hasTrack={false}
        options={options || defaultOptions}
      >
        <div className={`splide__arrows splide__arrows--ltr duration-200 ${hoverable && "opacity-0 group-hover:opacity-100"}`}>
          <button
            className={`splide__arrow splide__arrow--prev left-0 ${arrowBtnClassName}`}
            type="button"
            aria-label="Previous slide"
            aria-controls="splide01-track"
          >
            <BsChevronRight className='!fill-white hover:!fill-purple-700' />
          </button>
          <button
            className={`splide__arrow splide__arrow--next right-0 ${arrowBtnClassName}`}
            type="button"
            aria-label="Next slide"
            aria-controls="splide1-track"
          >
            <BsChevronRight className='!fill-white hover:!fill-purple-700' />
          </button>
        </div>
        <SplideTrack>
          {children}
        </SplideTrack>
        {items?.length > 1 && (
          <ul className={`splide__pagination main-slider-splide-pagination duration-300 ${hoverable && "opacity-0 group-hover:opacity-100"}`}>
            {items?.map((_,i) => (
              <li key={i}>
                <button className="splide__pagination__page" type="button" aria-controls={`splide0${i}-slide0${i}`} aria-label={`Go to slide ${i}`}></button>
              </li>  
            ))}
          </ul>
        )}
      </Splide>
    </div>
  )
}

const arrowBtnClassName = "!opacity-100 hover:!opacity-80 duration-200 !border-2 border-solid !border-purple-700 hover:bg-white group bg-purple-700 fill-white"
