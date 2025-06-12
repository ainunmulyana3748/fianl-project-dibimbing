import useGetCategoriesDetail from "@/hooks/Categories/useGetCategoriesDetail";
import { ArrowLeft, CalendarDays, MapPin, Star, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CardActivitybyCategory from "../CardActivitiesbyCategory";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const fallbackImage =
  " https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_829/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/d4mucgi6ur1vcx57u0jb/TiketOceanParkHongKong.jpg";

const CategoriesDetailComponent = () => {
  const navigate = useNavigate();
  const { dataCategories } = useGetCategoriesDetail();
  return (
    <div className="w-full">
      <div className="w-full py-24 px-4 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen flex flex-col gap-y-5 items-center justify-center">
        <div className="container max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <button
              className="text-orange-600 font-medium flex items-center hover:underline mb-6"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </button>

            <img
              src={dataCategories.imageUrl}
              onError={(e) => (e.currentTarget.src = fallbackImage)}
              alt={dataCategories.name || "Banner"}
              className="w-full h-72 sm:h-80 object-cover"
            />

            <div className="mt-6">
              <h2 className="text-3xl font-extrabold text-gray-900">
                {dataCategories.name}
              </h2>

              <div className="flex flex-wrap gap-3 mt-5">
                <span className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  <CalendarDays className="w-4 h-4" />
                  Valid until {formatDate(dataCategories.createdAt)}
                </span>

                <span className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4" />
                  Featured Offer
                </span>

                <span className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  Available in Many Cities
                </span>
              </div>

              <div className="mt-8 border-t pt-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Category Details
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  This Category highlights exciting travel experiences, seasonal
                  promotions, and curated offers across various destinations.
                  Whether you're planning a getaway, family trip, or adventure
                  holiday, make the most of these limited-time opportunities!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-x-auto">
          <CardActivitybyCategory />
        </div>
      </div>
    </div>
  );
};

export default CategoriesDetailComponent;
