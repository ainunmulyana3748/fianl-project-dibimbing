import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bookmark, Clock } from "lucide-react";
import useGetDataPromos from "@/hooks/Promos/useGetDataPromos";
import { Link } from "react-router-dom";

// Komponen CarouselPromos yang diperbarui dengan penanganan error gambar
export const CarouselPromos = () => {
  const { dataPromos } = useGetDataPromos();
  const fallbackImage =
    "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit621414gsm/events/2021/07/06/e4dee25d-6624-43ac-ad99-525ee401099d-1625587933856-9221b004c60999a6a8e7820dc36c25e3.jpg";

  return (
    <div className="w-full py-8 container mx-auto">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="relative"
      >
        {dataPromos.map((Promos) => (
          <SwiperSlide key={Promos.id}>
            <Card className="max-w-sm h-full min-h-[480px] flex flex-col rounded-2xl shadow-md overflow-hidden mx-auto">
              <img
                src={Promos.imageUrl || fallbackImage}
                alt={Promos.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <CardContent className="flex flex-col justify-between flex-grow p-4">
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start">
                    <h2 className="font-bold text-lg text-gray-900">
                      {Promos.title}
                    </h2>
                    <Bookmark className="text-gray-400 w-5 h-5" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-[4] min-h-[80px]">
                    {Promos.description}
                  </p>
                  <div className="flex items-center text-gray-500 text-xs mt-14">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Expires in 5 days</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="outline"
                    className="text-orange-600 border-orange-400 hover:bg-orange-100"
                  >
                    {Promos.promo_code}
                  </Button>
                  <Link
                    to={`/promo/${Promos.id}`}
                    className="text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded-full inline-flex items-center gap-2"
                  >
                    Get Deal <ArrowRight />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev after:text-orange-400 after:hover:text-orange-500 after:transition-all after:duration-300"></div>
        <div className="swiper-button-next after:text-orange-400 after:hover:text-orange-500 after:transition-all after:duration-300"></div>
      </Swiper>
    </div>
  );
};
