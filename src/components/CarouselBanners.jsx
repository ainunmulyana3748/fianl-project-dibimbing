import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ArrowRight, ArrowLeft, Star } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import useGetDataBanners from "../hooks/useGetDataBanners";

const CarouselBanners = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const { getDataBanners, dataBanners } = useGetDataBanners();

  useEffect(() => {
    AOS.init({ duration: 700 });
    getDataBanners();
  }, []);

  return (
    <div className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl relative group">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {dataBanners.map((banner, index) => (
          <SwiperSlide
            key={banner.id}
            className="relative w-full h-full overflow-hidden rounded-2xl"
          >
            {/* Background blur effect */}
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-lg scale-110 opacity-80"
              style={{ backgroundImage: `url(${banner.imageUrl})` }}
            ></div>

            {/* Main image */}
            <img
              src={banner.imageUrl}
              alt={banner.name}
              className="relative w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-in-out"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl"></div>

            {/* Content with dynamic animation */}
            <div
              key={
                activeIndex === index ? `active-${index}` : `inactive-${index}`
              }
              className="absolute bottom-10 left-10 max-w-lg text-white"
              data-aos="fade-up"
            >
              <span className="bg-orange-500 text-sm px-3 py-1 rounded-full font-semibold mb-2 inline-block shadow">
                Featured
              </span>

              <h2 className="text-4xl font-bold mb-3">{banner.name}</h2>
              <p className="mb-4 text-lg">
                {banner.description || "Discover an amazing experience!"}
              </p>

              <p className="text-2xl font-bold flex items-center gap-2">
                Rp {banner.price?.toLocaleString("id-ID") || "999.000"}
                {banner.price && (
                  <span className="text-sm line-through text-gray-300 font-normal ml-2">
                    Rp {(banner.price * 1.3).toLocaleString("id-ID")}
                  </span>
                )}
              </p>

              <button className="mt-5 px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-full text-white font-semibold transition-all transform hover:scale-105 shadow flex items-center gap-2">
                Explore Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows - Orange Theme */}
      <div
        ref={navigationPrevRef}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-orange-500/80 hover:bg-orange-600 flex items-center justify-center shadow-lg">
          <ArrowLeft className="text-white" />
        </div>
      </div>

      <div
        ref={navigationNextRef}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-orange-500/80 hover:bg-orange-600 flex items-center justify-center shadow-lg">
          <ArrowRight className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default CarouselBanners;
