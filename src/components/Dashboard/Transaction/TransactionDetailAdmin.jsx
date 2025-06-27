import { useParams, useNavigate } from "react-router-dom";
import {
  XCircle,
  CheckCircle,
  Clock,
  ArrowLeft,
  CreditCard,
  Calendar,
  FileText,
  Package,
  DollarSign,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useGetTransactionById from "@/hooks/Transaction/useGetTransactionById";
import useUpdateTransactionStatus from "@/hooks/Transaction/useUpdateTransactionStatus";

const TransactionDetailAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { dataTransactionById, loading, refetchData } =
    useGetTransactionById(id);
  const { updateTransactionStatus } = useUpdateTransactionStatus(refetchData);

  const statusMap = {
    cancelled: {
      icon: <XCircle className="w-5 h-5" />,
      className: "bg-red-100 text-red-800 border-red-200",
      label: "Cancelled",
      badgeClass: "bg-red-500",
    },
    failed: {
      icon: <XCircle className="w-5 h-5" />,
      className: "bg-red-100 text-red-800 border-red-200",
      label: "Failed",
      badgeClass: "bg-red-500",
    },
    success: {
      icon: <CheckCircle className="w-5 h-5" />,
      className: "bg-green-100 text-green-800 border-green-200",
      label: "Success",
      badgeClass: "bg-green-500",
    },
    pending: {
      icon: <Clock className="w-5 h-5" />,
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      label: "Pending",
      badgeClass: "bg-yellow-500",
    },
    waitingConfirmation: {
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      className: "bg-blue-100 text-blue-800 border-blue-200",
      label: "Waiting Confirmation",
      badgeClass: "bg-blue-500",
    },
  };

  const getStatus = (t) =>
    t?.status === "pending" && t?.proofPaymentUrl
      ? "waitingConfirmation"
      : t?.status;

  const fallbackImagePayment =
    "https://www.freshbooks.com/wp-content/uploads/2022/01/proof-of-payment.jpg";

  const fallbackImageOrder =
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_829/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/d4mucgi6ur1vcx57u0jb/TiketOceanParkHongKong.jpg";

  if (loading || !dataTransactionById) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const status = getStatus(dataTransactionById);
  const s = statusMap[status] || statusMap.pending;

  return (
    <div className="container w-full mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Transaction Table
        </Button>
        <h1 className="text-2xl font-bold ml-4">Transaction Details</h1>
      </div>

      {/* Status Banner */}
      <div
        className={`flex items-center justify-between p-4 mb-6 rounded-lg border ${s.className}`}
      >
        <div className="flex items-center gap-3">
          {s.icon}
          <div>
            <h2 className="font-semibold">Transaction Status</h2>
            <p className="text-lg font-bold">{s.label}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Invoice ID:</span>
          <span className="font-mono font-semibold bg-gray-100 px-3 py-1 rounded">
            {dataTransactionById.invoiceId}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transaction Information Card */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 pb-2 border-b">
              <CreditCard className="w-5 h-5 text-blue-500" />
              Transaction Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <DollarSign className="w-4 h-4" />
                  <span>Total Amount</span>
                </div>
                <p className="text-xl font-bold">
                  Rp {dataTransactionById.totalAmount?.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Order Date</span>
                </div>
                <p className="font-medium">
                  {new Date(dataTransactionById.orderDate).toLocaleString(
                    "id-ID",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <ClipboardList className="w-4 h-4" />
                  <span>Payment Method</span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={
                      dataTransactionById.payment_method?.imageUrl ||
                      "https://cdn-icons-png.flaticon.com/512/603/603025.png"
                    }
                    alt="Payment method"
                    className="h-8 w-8 object-contain"
                  />
                  <span className="font-medium">
                    {dataTransactionById.payment_method?.name ||
                      "Bank Transfer"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Items Card */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 pb-2 border-b">
              <Package className="w-5 h-5 text-orange-500" />
              Ordered Items
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataTransactionById.transaction_items?.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={item.imageUrls[0] || fallbackImageOrder}
                            onError={(e) => {
                              e.currentTarget.src = fallbackImageOrder;
                            }}
                            alt="image order"
                            className="w-16 h-16"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rp {item.price?.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity || 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        Rp{" "}
                        {(item.price * (item.quantity || 1)).toLocaleString(
                          "id-ID"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 font-semibold">
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-right text-sm">
                      Total
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      Rp{" "}
                      {dataTransactionById.totalAmount?.toLocaleString("id-ID")}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Proof of Payment Card */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 pb-2 border-b">
              <FileText className="w-5 h-5 text-purple-500" />
              Proof of Payment
            </h3>

            <div className="flex flex-col items-center">
              {dataTransactionById.proofPaymentUrl !== null && (
                <div className="relative group">
                  <img
                    src={
                      dataTransactionById?.proofPaymentUrl ||
                      fallbackImagePayment
                    }
                    onError={(e) => {
                      e.currentTarget.src = fallbackImagePayment;
                    }}
                    alt="Proof of payment"
                    className="w-full h-64 object-contain rounded-lg border-2 border-dashed border-gray-300"
                  />
                </div>
              )}

              <div className="mt-4 w-full">
                {status === "waitingConfirmation" && (
                  <div className="space-y-3">
                    <Button
                      variant="default"
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() =>
                        updateTransactionStatus(
                          dataTransactionById.id,
                          "success"
                        )
                      }
                    >
                      Confirm Payment
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() =>
                        updateTransactionStatus(
                          dataTransactionById.id,
                          "failed"
                        )
                      }
                    >
                      Reject Payment
                    </Button>
                  </div>
                )}

                {status !== "waitingConfirmation" && (
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        window.open(`${dataTransactionById?.proofPaymentUrl}`)
                      }
                    >
                      Download Proof
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailAdmin;
