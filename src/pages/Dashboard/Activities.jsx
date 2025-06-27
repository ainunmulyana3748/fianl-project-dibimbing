import { Edit, Search, ChevronLeft, ChevronRight, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import UpdatePromoModal from "@/components/UpdatePromoModal";
import useGetDataActivities from "@/hooks/Activities/useGetDataActivities";
import useDeleteActivity from "@/hooks/Activities/useDeleteActivity";
import useGetDataCategories from "@/hooks/Categories/useGetDataCategories";
import UpdateActivityModal from "@/components/UpdateActivityModal";
import AddActivityModal from "@/components/AddActivityModal";

const Activities = () => {
  const { dataActivities, refetch } = useGetDataActivities();
  const { deleteActivity } = useDeleteActivity(refetch);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const { dataCategories } = useGetDataCategories();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fallbackImage =
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_829/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/d4mucgi6ur1vcx57u0jb/TiketOceanParkHongKong.jpg";

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
    if (!dataActivities) return setSearchResult([]);

    let filtered = dataActivities;

    // Filter by search
    if (search !== "") {
      filtered = filtered.filter((activity) =>
        (activity.title || "")
          .toLowerCase()
          .includes(search.toLowerCase().trim())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (activity) => activity.categoryId === selectedCategory
      );
    }

    setSearchResult(filtered);
    setCurrentPage(1);
  }, [search, selectedCategory, dataActivities]);

  return (
    <div className="w-full">
      <div className="mt-6">
        <h1 className="text-3xl font-semibold text-gray-700 capitalize mb-5">
          Activities
        </h1>
      </div>

      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        {/* Search */}
        <div className="flex gap-5">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Activity by name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
            />
          </div>

          {/* Filter by Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
          >
            <option value="all">All Categories</option>
            {dataCategories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Add Button */}
        <Button
          className="whitespace-nowrap bg-orange-500 hover:bg-orange-400"
          onClick={() => setOpenAddModal(true)}
        >
          + Add Activities
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Rating</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((activity) => (
                <tr
                  key={activity?.id}
                  className="hover:bg-orange-50 transition-all"
                >
                  <td className="px-4 py-3">
                    <img
                      src={activity?.imageUrls?.[0] || fallbackImage}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImage;
                      }}
                      alt={activity?.title || "Activity"}
                      className="w-10 h-10 rounded object-cover border shadow-sm"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {activity?.title ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {activity?.category?.name ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    Rp{" "}
                    {activity?.price_discount?.toLocaleString("id-ID") ?? "-"}{" "}
                    <span className="line-through text-xs text-gray-400 ml-1">
                      Rp {activity?.price?.toLocaleString("id-ID") ?? "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {activity?.city && activity?.province
                      ? `${activity.city}, ${activity.province}`
                      : activity?.city || activity?.province || "-"}
                  </td>

                  <td className="px-4 py-3 text-gray-500">
                    {activity?.rating ?? 0} ⭐ ({activity?.total_reviews ?? 0}{" "}
                    reviews)
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedActivity(activity);
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
                        onClick={() => deleteActivity(activity.id, refetch)}
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
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No Activities found.
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

      <UpdateActivityModal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedActivity(null);
        }}
        activity={selectedActivity}
        onUpdated={refetch}
        categories={dataCategories}
      />

      <AddActivityModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onUpdated={refetch}
      />
    </div>
  );
};

export default Activities;
