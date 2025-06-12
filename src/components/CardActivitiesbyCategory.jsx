import { Heart, MapPin, ShoppingCart, Star } from "lucide-react";
import useGetActivitybyCategory from "../hooks/useGetActivitybyCategory";
import BannerNotFound from "./NotFoundActivityByCategory";
import { Link } from "react-router-dom";

const CardActivitybyCategory = () => {
  const { dataActivitybyCategory } = useGetActivitybyCategory();

  const fallbackImage =
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_829/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/d4mucgi6ur1vcx57u0jb/TiketOceanParkHongKong.jpg";

  const handleImageError = (e) => {
    e.currentTarget.src = fallbackImage;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Activities by Category</h1>
      <div className="flex gap-6 w-full">
        {dataActivitybyCategory.length > 0 ? (
          dataActivitybyCategory.map((data) => (
            <Link
              to={`/activity/${data.id}`}
              key={data.id}
              className="bg-white rounded-[20px] shadow-md overflow-hidden w-[300px] flex-shrink-0 flex flex-col min-h-[350px]"
            >
              <div className="relative h-56">
                <img
                  src={data.imageUrls || fallbackImage}
                  alt={data.title || "Activities Image"}
                  className="w-full h-full object-cover"
                  onError={(e) => handleImageError(e)}
                />
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                  <Heart className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg text-gray-800">
                  {data.title}
                </h3>

                <div className="flex items-center text-sm text-gray-500 mt-1 mb-1">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>
                    {data.rating} ({data.total_reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>
                    {data.city}, {data.province}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {data.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-orange-600 font-bold text-base">
                    Rp {data.price?.toLocaleString("id-ID")}
                  </span>
                  <button className="flex items-center gap-1 bg-orange-50 hover:bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex justify-center items-center h-full w-full">
            <BannerNotFound />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardActivitybyCategory;
