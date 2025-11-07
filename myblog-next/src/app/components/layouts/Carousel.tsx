"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Image from "next/image";
import Link from "next/link";
import { useNotionStore } from "@/store/notionStore";
import { useTranslation } from "react-i18next";

export default function CarouselSection() {
  const { t, i18n } = useTranslation();
  const notionStore = useNotionStore();
  const { carousel, resetTags } = notionStore;
  const currentLocale = i18n.language; // 기본값 설정

  return (
    <div className="bg-amber-50 border-2 border-solid border-amber-200 rounded-xl px-3 m-4">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 4 }, // md 이상에서 4개씩
        }}
        className="w-full"
      >
        {carousel.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Link
              href={`/${currentLocale}${item.to}`} // Nuxt의 localePath(item.to) → Next는 next-i18next or 직접 처리
              onClick={resetTags}
              className="flex flex-col items-center justify-center bg-amber-50 hover:bg-amber-100 rounded-xl transition"
            >
              <Image
                src={item.img}
                alt={t(`${item.text}`)}
                width={320}
                height={200}
                className="object-contain mt-5"
              />
              <span className="text-xl font-bold text-center">
                {t(`${item.text}`)}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
