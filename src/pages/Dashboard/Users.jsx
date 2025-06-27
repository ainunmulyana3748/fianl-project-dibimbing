import useGetAllUsers from "@/hooks/User/useGetAllUsers";
import { Edit, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import UpdateUserRoleModal from "@/components/UpdateUserRoleModal";

const Users = () => {
  const { dataUsers, refetch } = useGetAllUsers();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fallbackImage =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d";

  // Filter berdasarkan pencarian
  useEffect(() => {
    if (!dataUsers) return setSearchResult([]);
    const filtered = dataUsers.filter((user) =>
      (user.name || "").toLowerCase().includes(search.toLowerCase().trim())
    );
    setSearchResult(filtered);
    setCurrentPage(1);
  }, [search, dataUsers]);

  // Pagination
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
          Users
        </h1>
      </div>
      {/* Search */}
      <div className="relative max-w-md mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="text-gray-400" size={18} />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Photo</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Actions</th>
              <th className="px-4 py-3 text-left">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((user) => (
                <tr
                  key={user?.id}
                  className="hover:bg-orange-50 transition-all"
                >
                  <td className="px-4 py-3">
                    <img
                      src={user?.profilePictureUrl || fallbackImage}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImage;
                      }}
                      alt={user?.name || "User"}
                      className="w-10 h-10 rounded-full object-cover border shadow-sm"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {user?.name ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {user?.phoneNumber ?? "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full transition ${
                        user?.role === "admin"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user?.role ?? "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setOpenModal(true);
                      }}
                    >
                      <Edit className="text-orange-500" width={20} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {user?.email ?? "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

      {/* Modal */}
      {selectedUser && (
        <UpdateUserRoleModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onSubmit={async (updatedUser) => {
            console.log("Updated:", updatedUser);
            setOpenModal(false);
            setSelectedUser(null);
            await refetch();
          }}
        />
      )}
    </div>
  );
};

export default Users;
