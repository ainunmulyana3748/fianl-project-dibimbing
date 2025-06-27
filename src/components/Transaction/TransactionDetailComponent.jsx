import React from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  Clock,
  Download,
  FileText,
  ReceiptText,
  XCircle,
} from "lucide-react";
import useGetTransactionById from "@/hooks/Transaction/useGetTransactionById";
import { useNavigate } from "react-router-dom";

const TransactionDetailComponent = () => {
  const { dataTransactionById } = useGetTransactionById();
  const navigate = useNavigate();

  const fallbackImage =
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_829/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/d4mucgi6ur1vcx57u0jb/TiketOceanParkHongKong.jpg";

  const resolvedStatus =
    dataTransactionById?.status === "pending" &&
    dataTransactionById?.proofPaymentUrl
      ? "waitingConfirmation"
      : dataTransactionById?.status || "cancelled";

  const statusColor = {
    cancelled: "bg-red-100 text-red-600 border-red-200",
    success: "bg-green-100 text-green-600 border-green-200",
    pending: "bg-yellow-100 text-yellow-600 border-yellow-200",
    waitingConfirmation: "bg-blue-100 text-blue-600 border-blue-200",
  };

  const statusIcon = {
    cancelled: <XCircle className="w-5 h-5 mr-2 text-red-400" />,
    success: <CheckCircle className="w-5 h-5 mr-2 text-green-400" />,
    pending: <Clock className="w-5 h-5 mr-2 text-yellow-400" />,
    waitingConfirmation: <Clock className="w-5 h-5 mr-2 text-blue-400" />,
  };

  const statusDesc = {
    cancelled: (
      <span className="flex items-center text-red-500">
        <XCircle className="w-5 h-5 mr-2" />
        Your transaction is cancelled
      </span>
    ),
    success: (
      <span className="flex items-center text-green-600">
        <CheckCircle className="w-5 h-5 mr-2" />
        Transaction completed successfully
      </span>
    ),
    pending: (
      <span className="flex items-center text-yellow-500">
        <Clock className="w-5 h-5 mr-2" />
        Waiting for payment
      </span>
    ),
    waitingConfirmation: (
      <span className="flex items-center text-blue-500">
        <Clock className="w-5 h-5 mr-2" />
        Waiting for admin confirmation
      </span>
    ),
  };

  return (
    <div className="py-32">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-8 space-y-6">
        <button
          className="text-orange-600 font-medium flex items-center hover:underline mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to My Transaction
        </button>

        <h1 className="font-bold text-3xl">Transaction Details</h1>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-500 mb-1">
              Transaction ID
            </h2>
            <p className="text-base font-mono text-orange-600 break-all">
              {dataTransactionById?.id}
            </p>
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-full font-medium border ${statusColor[resolvedStatus]}`}
          >
            {statusIcon[resolvedStatus]}
            {resolvedStatus.charAt(0).toUpperCase() + resolvedStatus.slice(1)}
          </div>
        </div>

        {/* Status Notice */}
        <div
          className={`border rounded-lg p-4 text-sm flex items-center gap-2 ${statusColor[resolvedStatus]}`}
        >
          {statusDesc[resolvedStatus]}
        </div>

        {/* Transaction + Customer Info */}
        <div className="grid md:grid-cols-2">
          {/* Transaction Info */}
          <div className="flex flex-col gap-5">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-3">
              <ReceiptText className="w-5 h-5 text-orange-600" /> Transaction
              Information
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <span className="text-gray-500">Amount:</span>{" "}
                <span className="text-orange-600 font-semibold">
                  Rp{" "}
                  {dataTransactionById?.totalAmount
                    ? dataTransactionById.totalAmount.toLocaleString("id-ID")
                    : "0"}
                </span>
              </li>
              <li className="flex items-center gap-5">
                <span className="text-gray-500">Payment Method:</span>{" "}
                <img
                  src={dataTransactionById?.payment_method?.imageUrl}
                  alt="payment-method"
                  width={56}
                />
              </li>
              <li className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                Transaction Date:{" "}
                {new Date(dataTransactionById.orderDate).toLocaleString(
                  "id-ID"
                )}
              </li>
              <li className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                Last Updated:{" "}
                {new Date(dataTransactionById.updatedAt).toLocaleString(
                  "id-ID"
                )}
              </li>
            </ul>

            {/* Items */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-600" /> Items (
                {dataTransactionById?.transaction_items?.length})
              </h3>
              <div className="flex flex-col gap-4">
                {dataTransactionById?.transaction_items?.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <img
                      src={item?.imageUrls?.[0]}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImage;
                      }}
                      alt={item?.title}
                      className="w-28 h-28 object-cover rounded-lg border"
                    />
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-800">
                        {item?.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item?.quantity}
                      </p>
                      <p className="text-sm text-orange-600 font-bold">
                        Rp {item?.price_discount?.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <div className="flex flex-col gap-5 mt-4">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Payment Proof
              </p>
              <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                <a
                  href={dataTransactionById.proofPaymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-orange-600 text-sm"
                >
                  {dataTransactionById.proofPaymentUrl}
                </a>
                <a
                  href={dataTransactionById.proofPaymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-sm text-orange-600 hover:underline flex items-center gap-1"
                >
                  <Download className="w-4 h-4" /> View
                </a>
              </div>
              {dataTransactionById.proofPaymentUrl === null ? (
                <div>
                  <p>Need Upload Payment Proof</p>
                </div>
              ) : (
                <img
                  src={dataTransactionById.proofPaymentUrl}
                  alt="proofImage"
                  className="rounded-lg"
                />
              )}
            </div>
          </div>
        </div>

        {/* Footer Notice */}
        <div
          className={`rounded-lg p-4 text-sm flex items-center gap-2 border ${statusColor[resolvedStatus]}`}
        >
          {statusIcon[resolvedStatus]}{" "}
          {resolvedStatus.charAt(0).toUpperCase() + resolvedStatus.slice(1)}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailComponent;
