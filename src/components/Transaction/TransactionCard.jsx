import {
  XCircle,
  CheckCircle,
  Clock,
  ShoppingBag,
  CreditCard,
  ArrowRight,
  Calendar,
  Upload,
  X,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import useCancelTransaction from "@/hooks/Transaction/useCancelTransaction";
import { Link } from "react-router-dom";
import useUploadImage from "@/hooks/useUploadImage";
import paymentProof from "@/hooks/Transaction/useUploadPayment";
import { toast } from "sonner";

const TransactionCard = ({ data, refetchData }) => {
  const { uploadImage } = useUploadImage();
  const { cancelTransaction } = useCancelTransaction();

  const fallbackImage =
    "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_829/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/d4mucgi6ur1vcx57u0jb/TiketOceanParkHongKong.jpg";

  // Custom status resolver
  const resolvedStatus =
    data.status === "pending" && data.proofPaymentUrl !== null
      ? "waitingConfirmation"
      : data.status;

  const statusColor = {
    cancelled: "bg-red-100 text-red-600 border-red-200",
    failed: "bg-red-100 text-red-600 border-red-200",
    success: "bg-green-100 text-green-600 border-green-200",
    pending: "bg-yellow-100 text-yellow-600 border-yellow-200",
    waitingConfirmation: "bg-blue-100 text-blue-600 border-blue-200",
  };

  const statusIcon = {
    cancelled: <XCircle className="w-5 h-5 mr-2 text-red-400" />,
    failed: <XCircle className="w-5 h-5 mr-2 text-red-400" />,
    success: <CheckCircle className="w-5 h-5 mr-2 text-green-400" />,
    pending: <Clock className="w-5 h-5 mr-2 text-yellow-400" />,
    waitingConfirmation: <Clock className="w-5 h-5 mr-2 text-blue-400" />,
  };

  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "-";
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelTransaction(id);
      await refetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleProofPayment = async (id, file) => {
    try {
      const { urlImage } = await uploadImage(file);
      await paymentProof(id, urlImage);
      await refetchData();
      toast.success("Upload your proof payment is success");
    } catch (error) {
      toast.error("Fail Upload proof payment");
    }
  };

  let resultStatusPayment = null;

  if (resolvedStatus === "waitingConfirmation") {
    resultStatusPayment = (
      <div className="text-blue-500 font-medium bg-blue-50 border border-blue-300 px-4 py-3 rounded-lg shadow">
        Waiting confirmation...
      </div>
    );
  } else if (resolvedStatus === "pending") {
    resultStatusPayment = (
      <div className="flex flex-wrap md:flex-nowrap gap-3 items-center">
        <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow cursor-pointer">
          <Upload className="w-4 h-4" /> Upload Payment
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleProofPayment(data.id, file);
            }}
          />
        </label>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-3 rounded-xl shadow-md">
              <X className="w-5 h-5" /> Cancel
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg">
                Are you sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Do you really want to cancel this transaction? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-md">
                Close
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleCancel(data.id)}
                className="rounded-md bg-red-600 hover:bg-red-700"
              >
                Yes, Cancel it
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6 mb-8 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b pb-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-gray-900">
            Invoice Id : {data.invoiceId || "-"}
          </span>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ml-2 ${statusColor[resolvedStatus]}`}
          >
            {statusIcon[resolvedStatus]}
            {resolvedStatus.charAt(0).toUpperCase() + resolvedStatus.slice(1)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(data.orderDate)}
          </span>
          <span className="font-bold text-primary text-lg ml-2">
            {formatCurrency(data.totalAmount)}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        <div className="flex-1">
          <div className="mb-2 text-gray-700 font-semibold flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-indigo-400" /> Items
          </div>
          {data.transaction_items?.map((item, idx) => (
            <div key={item.id || idx} className="flex items-center gap-3 mb-2">
              <img
                src={item.imageUrls?.[0] || fallbackImage}
                onError={(e) => (e.target.src = fallbackImage)}
                alt={item.title}
                className="w-12 h-12 rounded-lg object-cover border"
              />
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500">
                  Qty: {item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Method */}
        <div className="flex-1 md:max-w-[200px]">
          <div className="mb-2 text-gray-700 font-semibold flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-indigo-400" /> Payment Method
          </div>
          <div className="flex items-center gap-2">
            {data.payment_method?.imageUrl && (
              <img
                src={data.payment_method.imageUrl}
                alt={data.payment_method.name}
                className="w-8 h-8 object-contain rounded bg-white border"
              />
            )}
            <span className="font-bold text-gray-800 text-base">
              {data.payment_method?.name || "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between mt-6">
        {resultStatusPayment}
        <Link
          to={`/transaction/${data.id}`}
          className="flex items-center gap-2 text-orange-500 font-semibold transition-all group"
        >
          View Details{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default TransactionCard;
