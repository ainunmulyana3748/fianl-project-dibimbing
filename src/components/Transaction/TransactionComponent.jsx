import { useState, useEffect } from "react";
import useGetDataTransaction from "@/hooks/Transaction/useGetDataTransaction";
import TransactionCard from "./TransactionCard";
import { Clock, Search } from "lucide-react";
import TransactionNotFound from "./TransactionNotFound";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransactionComponent = () => {
  const { dataTransaction, loading, refetchData } = useGetDataTransaction();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!dataTransaction) {
      setSearchResult([]);
      return;
    }

    let filtered = dataTransaction;

    // Filter by search
    if (search !== "") {
      filtered = filtered.filter((transaction) =>
        (transaction?.id || "")
          .toLowerCase()
          .includes(search.toLowerCase().trim())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((transaction) => {
        const status = transaction?.status?.toLowerCase();
        const hasNotProof = transaction?.proofPaymentUrl !== null;

        if (statusFilter === "pending") {
          return status === "pending" && !hasNotProof;
        }

        if (statusFilter === "waitingconfirmation") {
          return status === "pending" && hasNotProof;
        }

        return status === statusFilter.toLowerCase();
      });
    }

    setSearchResult(filtered);
    setCurrentPage(1);
  }, [search, statusFilter, dataTransaction]);

  const totalPages = Math.ceil((searchResult.length || 0) / itemsPerPage);

  const paginatedData = searchResult.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-32">
        <div className="text-lg text-gray-500 flex items-center gap-2">
          <Clock className="animate-spin w-6 h-6 text-indigo-400" />
          Memuat data transaksi...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-2">
      <h1 className="text-center text-3xl font-bold mb-6">My Transaction</h1>

      {/* Filter & Search */}
      <div className="w-full max-w-3xl mx-auto mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full max-w-3xl mx-auto mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-60 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="cancelled">Cancelled</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
            <option value="waitingconfirmation">Waiting Confirmation</option>
          </select>

          {/* Search bar tetap */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transaction by ID Transaction"
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Transaction Cards */}
      {paginatedData.length > 0 ? (
        paginatedData.map((data) => (
          <TransactionCard
            key={data.id}
            data={data}
            refetchData={refetchData}
          />
        ))
      ) : (
        <div className="mt-10 flex justify-center">
          <TransactionNotFound onClear={() => setSearch("")} />
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg border text-sm font-semibold ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-700 text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg border text-sm font-semibold ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionComponent;
