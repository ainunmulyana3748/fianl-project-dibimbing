import {
  Search,
  ChevronLeft,
  ChevronRight,
  XCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useGetAllTrannsaction from "@/hooks/Transaction/useGetAllTrannsaction";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { dataTransaction } = useGetAllTrannsaction();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    if (!dataTransaction) return setSearchResult([]);

    let filtered = [...dataTransaction];

    // Filter by search
    if (search) {
      filtered = filtered.filter((t) =>
        (t.invoiceId || "").toLowerCase().includes(search.toLowerCase().trim())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((t) => {
        const actualStatus =
          t.status === "pending" && t.proofPaymentUrl
            ? "waitingConfirmation"
            : t.status;
        return actualStatus === statusFilter;
      });
    }

    setSearchResult(filtered);
    setCurrentPage(1);
  }, [search, statusFilter, dataTransaction]);

  const totalPages = Math.ceil(searchResult.length / itemsPerPage);
  const paginatedData = searchResult.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (date) =>
    new Date(date).toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getStatus = (t) =>
    t.status === "pending" && t.proofPaymentUrl
      ? "waitingConfirmation"
      : t.status;

  const statusMap = {
    cancelled: {
      icon: <XCircle className="w-4 h-4 text-red-500" />,
      className: "bg-red-100 text-red-700",
      label: "Cancelled",
    },
    failed: {
      icon: <XCircle className="w-4 h-4 text-red-500" />,
      className: "bg-red-100 text-red-700",
      label: "Failed",
    },
    success: {
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      className: "bg-green-100 text-green-700",
      label: "Success",
    },
    pending: {
      icon: <Clock className="w-4 h-4 text-yellow-500" />,
      className: "bg-yellow-100 text-yellow-700",
      label: "Pending",
    },
    waitingConfirmation: {
      icon: <Clock className="w-4 h-4 text-blue-500" />,
      className: "bg-blue-100 text-blue-700",
      label: "Waiting Confirmation",
    },
  };

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
          Transaction
        </h1>
      </div>
      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by invoice ID..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
          />
        </div>

        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full border-gray-300 focus:ring-orange-200 focus:border-orange-500">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="waitingConfirmation">
                Waiting Confirmation
              </SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Invoice ID</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Payment Method</th>
              <th className="px-4 py-3 text-left">Total Amount</th>
              <th className="px-4 py-3 text-left">Order Date</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((t) => {
                const status = getStatus(t);
                const s = statusMap[status] || statusMap.pending;

                return (
                  <tr
                    key={t.id}
                    onClick={() => navigate(`${t.id}`)}
                    className="hover:bg-orange-50 transition-all cursor-pointer"
                  >
                    <td className="px-4 py-3">{t.invoiceId}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {t.transaction_items?.[0]?.title ?? "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {t.payment_method?.name ?? "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      Rp {t.totalAmount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatDate(t.orderDate)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${s.className}`}
                      >
                        {s.icon}
                        {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No transactions found.
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
    </div>
  );
};

export default Orders;
