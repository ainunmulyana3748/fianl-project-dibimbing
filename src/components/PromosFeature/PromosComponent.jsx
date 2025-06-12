import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PromosNotFound from "./PromosNotFound";
import useGetDataPromos from "@/hooks/Promos/useGetDataPromos";

const PromosComponent = () => {
  const { dataPromos } = useGetDataPromos();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter data berdasarkan search
  useEffect(() => {
    if (search !== "") {
      const result = dataPromos.filter((promo) =>
        promo.title.toLowerCase().includes(search.toLowerCase().trim())
      );
      setSearchResult(result);
      setCurrentPage(1);
    } else {
      setSearchResult(dataPromos);
    }
  }, [search, dataPromos]);

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
          placeholder="Search promos by name..."
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md"
        />
      </div>

      {/* Banner Grid */}
      <div className="w-full min-h-screen flex items-start justify-center">
        {paginatedData.length === 0 ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center py-12 px-4 text-center">
            <PromosNotFound onClear={() => setSearch("")} />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedData.map((promo) => (
                <CardPromos key={promo.id} promo={promo} />
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

export default PromosComponent;

export const CardPromos = ({ promo }) => {
  const fallbackImage =
    "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit621414gsm/events/2021/07/06/e4dee25d-6624-43ac-ad99-525ee401099d-1625587933856-9221b004c60999a6a8e7820dc36c25e3.jpg";

  return (
    <Link to={`/promo/${promo.id}`}>
      <div className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white cursor-pointer transform hover:-translate-y-1">
        <div className="overflow-hidden aspect-video">
          <img
            src={promo.imageUrl || fallbackImage}
            alt={promo.title || "Promo Image"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
            {promo.title || "Banner"}
          </h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">
            {promo.description ||
              "Explore our Banner Detail and special offers"}
          </p>
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-1 font-medium text-sm transition-all duration-300 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-md hover:shadow-lg">
              View Details <ChevronRight size={16} />
            </button>
            <p className="text-orange-400 bg-orange-200 text-sm py-1 px-2 font-bold rounded-xl">
              {promo.promo_code}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
