import useGetBannerDetail from "@/hooks/Banners/useGetBannerDetail";
import { ArrowLeft, CalendarDays, MapPin, Star, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fallbackImage =
  "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_829/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/d4mucgi6ur1vcx57u0jb/TiketOceanParkHongKong.jpg";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const BannerDetailComponent = () => {
  const navigate = useNavigate();
  const { dataBanner } = useGetBannerDetail();

  return (
    <div className="w-full py-24 px-4 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen flex items-center justify-center">
      <div className="container max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <button
            className="text-orange-600 font-medium flex items-center hover:underline mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Banners
          </button>

          <div className="rounded-xl overflow-hidden shadow-sm">
            <img
              src={dataBanner.imageUrl || fallbackImage}
              alt={dataBanner.name || "Banner"}
              className="w-full h-72 sm:h-80 object-cover"
            />
          </div>

          <div className="mt-6">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {dataBanner.name}
            </h2>
            <p className="text-gray-700 mt-3 leading-relaxed text-base sm:text-lg">
              {dataBanner.description}
            </p>

            <div className="flex flex-wrap gap-3 mt-5">
              <span className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-sm font-medium">
                <CalendarDays className="w-4 h-4" />
                Valid until {formatDate(dataBanner.createdAt)}
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
                Banner Details
              </h3>
              <p className="text-gray-600 leading-relaxed">
                This banner highlights exciting travel experiences, seasonal
                promotions, and curated offers across various destinations.
                Whether you're planning a getaway, family trip, or adventure
                holiday, make the most of these limited-time opportunities!
              </p>
            </div>

            {/* 🔘 Browse Activities Button */}
            <div className="mt-8 flex justify-end">
              <button
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-full hover:bg-orange-600 transition text-sm font-medium shadow-md"
                onClick={() => navigate("/activities")}
              >
                <Compass className="w-4 h-4" />
                Browse Activities
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerDetailComponent;
