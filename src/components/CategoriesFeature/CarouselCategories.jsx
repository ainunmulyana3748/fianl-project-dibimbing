import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useGetDataCategories from "@/hooks/Categories/useGetDataCategories";

// Komponen CarouselCategories yang diperbarui dengan penanganan error gambar
export const CarouselCategories = () => {
  const { dataCategories } = useGetDataCategories();
  const fallbackImage =
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_829/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/d4mucgi6ur1vcx57u0jb/TiketOceanParkHongKong.jpg";

  const handleImageError = (e) => {
    e.currentTarget.src = fallbackImage;
  };

  const isValidImageUrl = (url) => {
    if (!url) return false;
    return url.startsWith("http://") || url.startsWith("https://");
  };

  return (
    <div className="w-full py-8">
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
        // loop={true}
        className="relative"
      >
        {dataCategories.map((category, index) => (
          <SwiperSlide key={category.id}>
            <div className="relative group overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105">
              <div className="relative h-80">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 rounded-2xl"></div>
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-bl-lg z-20">
                  {index + 1}
                </div>
                <img
                  src={
                    isValidImageUrl(category.imageUrl)
                      ? category.imageUrl
                      : fallbackImage
                  }
                  alt={category.name}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => handleImageError(e)}
                  loading="lazy"
                />

                <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {category.name}
                  </h3>
                  <Link to={`/category/${category.id}`}>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-3">
                      Explore Category <ArrowRight />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev after:text-orange-400 after:hover:text-orange-500 after:transition-all after:duration-300"></div>
        <div className="swiper-button-next after:text-orange-400 after:hover:text-orange-500 after:transition-all after:duration-300"></div>
      </Swiper>
    </div>
  );
};
