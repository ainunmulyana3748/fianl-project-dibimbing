import { Edit, Search, ChevronLeft, ChevronRight, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useGetDataCategories from "@/hooks/Categories/useGetDataCategories";
import useDeletCategories from "@/hooks/Categories/useDeletCategories";
import UpdateCategoryModal from "@/components/UpdateCategoryModal";
import AddCategoryModal from "@/components/AddCategoryModal";

const Categories = () => {
  const { dataCategories, refetch } = useGetDataCategories();
  const { deletCategory } = useDeletCategories(refetch);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fallbackImage =
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_829/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/d4mucgi6ur1vcx57u0jb/TiketOceanParkHongKong.jpg";

  useEffect(() => {
    if (!dataCategories) return setSearchResult([]);
    const filtered = dataCategories.filter((category) =>
      (category.name || "").toLowerCase().includes(search.toLowerCase().trim())
    );
    setSearchResult(filtered);
    setCurrentPage(1);
  }, [search, dataCategories]);

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
          Categories
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
            placeholder="Search Category by name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
          />
        </div>

        <Button
          className="ml-4 whitespace-nowrap bg-orange-500 hover:bg-orange-400"
          onClick={() => {
            setOpenAddModal(true);
          }}
        >
          + Add Category
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
              paginatedData.map((category) => (
                <tr
                  key={category?.id}
                  className="hover:bg-orange-50 transition-all"
                >
                  <td className="px-4 py-3">
                    <img
                      src={category?.imageUrl || fallbackImage}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImage;
                      }}
                      alt={category?.name || "Category"}
                      className="w-10 h-10 rounded object-cover border shadow-sm"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {category?.name ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {category?.createdAt?.split("T")[0] ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {category?.updatedAt?.split("T")[0] ?? "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
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
                        onClick={() => deletCategory(category.id, refetch)}
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
                  No Categories found.
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

      <UpdateCategoryModal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedCategory(null);
        }}
        category={selectedCategory}
        onUpdated={refetch}
      />

      <AddCategoryModal
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
        }}
        onUpdated={refetch}
      />
    </div>
  );
};

export default Categories;
