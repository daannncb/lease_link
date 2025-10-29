"use client";


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFlip } from 'swiper/modules';
import PropertyCard from './PropertyCard';

import 'swiper/css';
import 'swiper/css/effect-flip'
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function PropertiesCarousel({ properties }) {
  if (properties.length === 0) {
    return <div className="text-center text-gray-500">No properties found</div>;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, EffectFlip]}
      effect={'flip'}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {properties.map((property) => (
        <SwiperSlide key={property.id}>
          <PropertyCard property={property} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}