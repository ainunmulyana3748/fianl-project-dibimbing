import { Edit, Search, ChevronLeft, ChevronRight, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AddCategoryModal from "@/components/AddCategoryModal";
import useGetDataPromos from "@/hooks/Promos/useGetDataPromos";
import useDeletPromo from "@/hooks/Promos/useDeletPromo";
import UpdatePromoModal from "@/components/UpdatePromoModal";
import AddPromoModal from "@/components/AddPromoModal";

const Promos = () => {
  const { dataPromos, refetch } = useGetDataPromos();
  const { deletPromo } = useDeletPromo(refetch);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);

  const fallbackImage =
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_829/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/d4mucgi6ur1vcx57u0jb/TiketOceanParkHongKong.jpg";

  useEffect(() => {
    if (!dataPromos) return setSearchResult([]);
    const filtered = dataPromos.filter((promo) =>
      (promo.title || "").toLowerCase().includes(search.toLowerCase().trim())
    );
    setSearchResult(filtered);
    setCurrentPage(1);
  }, [search, dataPromos]);

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
          Promos
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
            placeholder="Search Promo by name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
          />
        </div>

        <Button
          className="ml-4 whitespace-nowrap bg-orange-500 hover:bg-orange-400"
          onClick={() => {
            setOpenAddModal(true);
          }}
        >
          + Add Promo
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Promo Code</th>
              <th className="px-4 py-3 text-left">Discount</th>
              <th className="px-4 py-3 text-left">Minumum Claim Price</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((promo) => (
                <tr
                  key={promo?.id}
                  className="hover:bg-orange-50 transition-all"
                >
                  <td className="px-4 py-3">
                    <img
                      src={promo?.imageUrl || fallbackImage}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImage;
                      }}
                      alt={promo?.title || "Promo"}
                      className="w-10 h-10 rounded object-cover border shadow-sm"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {promo?.title ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-500 ">
                    <p className="text-white font-bold bg-orange-400 rounded-full px-2 py-1 inline-block">
                      {promo?.promo_code ?? "-"}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {promo?.promo_discount_price ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {promo?.minimum_claim_price ?? "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedPromo(promo);
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
                        onClick={() => deletPromo(promo.id, refetch)}
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
                  No Promos found.
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

      <UpdatePromoModal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedPromo(null);
        }}
        promo={selectedPromo}
        onUpdated={refetch}
      />

      <AddPromoModal
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
        }}
        onUpdated={refetch}
      />
    </div>
  );
};

export default Promos;
