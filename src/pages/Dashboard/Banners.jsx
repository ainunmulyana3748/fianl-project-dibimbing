import { Edit, Search, ChevronLeft, ChevronRight, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useGetDataBanners from "@/hooks/Banners/useGetDataBanners";
import UpdateBannerModal from "@/components/UpdateBannerModal";
import useDeletBanner from "@/hooks/Banners/useDeletBanner";
import AddBannerModal from "@/components/AddBannerModal";

const Banners = () => {
  const { dataBanners, refetch } = useGetDataBanners();
  const { deletBanner } = useDeletBanner(refetch);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const fallbackImage =
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_829/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/d4mucgi6ur1vcx57u0jb/TiketOceanParkHongKong.jpg";

  useEffect(() => {
    if (!dataBanners) return setSearchResult([]);
    const filtered = dataBanners.filter((banner) =>
      (banner.name || "").toLowerCase().includes(search.toLowerCase().trim())
    );
    setSearchResult(filtered);
    setCurrentPage(1);
  }, [search, dataBanners]);

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

  return (
    <div className="w-full">
      <div className="mt-6">
        <h1 className="text-3xl font-semibold text-gray-700 capitalize mb-5">
          Banners
        </h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search banners by name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
          />
        </div>

        <Button
          className="ml-4 whitespace-nowrap bg-orange-500 hover:bg-orange-400"
          onClick={() => {
            setOpenAddModal(true);
          }}
        >
          + Add Banner
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-left">Updated At</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((banner) => (
                <tr
                  key={banner?.id}
                  className="hover:bg-orange-50 transition-all"
                >
                  <td className="px-4 py-3">
                    <img
                      src={banner?.imageUrl || fallbackImage}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImage;
                      }}
                      alt={banner?.name || "Banner"}
                      className="w-10 h-10 rounded object-cover border shadow-sm"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {banner?.name ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {banner?.createdAt?.split("T")[0] ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {banner?.updatedAt?.split("T")[0] ?? "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedBanner(banner);
                          setOpenEditModal(true);
                        }}
                        title="Edit"
                      >
                        <Edit
                          className="text-blue-500 hover:text-blue-600"
                          size={18}
                        />
                      </button>
                      <button
                        onClick={() => deletBanner(banner.id, refetch)}
                        title="Delete"
                      >
                        <Trash
                          className="text-red-500 hover:text-red-600"
                          size={18}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No banners found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
          </Button>
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      )}

      <UpdateBannerModal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedBanner(null);
        }}
        banner={selectedBanner}
        onUpdated={refetch}
      />

      <AddBannerModal
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
        }}
        onUpdated={refetch}
      />
    </div>
  );
};

export default Banners;
