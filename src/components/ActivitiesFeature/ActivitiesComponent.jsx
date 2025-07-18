import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Search,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import ActivitiesNotFound from "./ActivitiesNotFound";
import { Link, useNavigate } from "react-router-dom";
import useGetDataActivities from "@/hooks/Activities/useGetDataActivities";
import useAddCart from "@/hooks/Cart/useAddCart";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ActivitiesComponent = () => {
  const { dataActivities, loading } = useGetDataActivities();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter data berdasarkan search
  useEffect(() => {
    if (!dataActivities) {
      setSearchResult([]);
      return;
    }

    if (search !== "") {
      const result = dataActivities.filter((activity) =>
        (activity?.title || "")
          .toLowerCase()
          .includes(search.toLowerCase().trim())
      );
      setSearchResult(result);
      setCurrentPage(1);
    } else {
      setSearchResult(dataActivities);
    }
  }, [search, dataActivities]);

  // Hitung paginasi
  const totalPages = Math.ceil(searchResult.length / itemsPerPage);
  const paginatedData = searchResult.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (loading) {
    return (
      <div className="container mx-auto min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col gap-8 py-8">
      {/* Search Input */}
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="text-gray-400" size={18} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search activities by title..."
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md"
        />
      </div>

      {/* Activities Grid */}
      <div className="w-full min-h-screen flex items-start justify-center">
        {paginatedData.length === 0 ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center py-12 px-4 text-center">
            <ActivitiesNotFound onClear={() => setSearch("")} />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedData.map((activities) => (
                <CardActivities key={activities.id} activities={activities} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesComponent;

export const CardActivities = ({ activities }) => {
  const fallbackImage =
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_829/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/d4mucgi6ur1vcx57u0jb/TiketOceanParkHongKong.jpg";
  const { addCart } = useAddCart();
  const { refetchCart } = useCart();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleImageError = (e) => {
    e.currentTarget.src = fallbackImage;
  };

  const handleAddtoCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      toast.info("Login terlebih dahulu");
      setTimeout(() => {
        navigate("/login");
      }, 100);
      return;
    }

    try {
      await addCart(activities.id);
      await refetchCart();
      toast.success("Berhasil ditambahkan ke keranjang!");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambahkan ke keranjang.");
    }
  };

  if (!activities) {
    return null;
  }

  return (
    <Link
      to={`/activity/${activities.id}`}
      key={activities.id}
      className="bg-white rounded-[20px] shadow-md overflow-hidden w-[300px] flex-shrink-0 flex flex-col min-h-[350px]"
    >
      <div className="relative h-56">
        <img
          src={activities.imageUrls || fallbackImage}
          alt={activities.title || "Activities Image"}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
          <Heart className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg text-gray-800">
          {activities.title || "Untitled Activity"}
        </h3>

        <div className="flex items-center text-sm text-gray-500 mt-1 mb-1">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          <span>
            {activities.rating || 0} ({activities.total_reviews || 0} reviews)
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-1">
          <MapPin className="w-4 h-4 mr-1" />
          <span>
            {activities.city || "Unknown City"}
            {activities.province ? `, ${activities.province}` : ""}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {activities.description || "No description available"}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-orange-600 font-bold text-base">
            Rp {activities.price?.toLocaleString("id-ID") || "0"}
          </span>
          <Button
            className="flex items-center gap-1 bg-orange-50 hover:bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm"
            onClick={handleAddtoCart}
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
};
