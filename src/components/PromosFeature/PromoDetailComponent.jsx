import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ArrowLeft, Check, Compass } from "lucide-react";
import useGetPromoDetail from "@/hooks/Promos/useGetPromoDetail";
import { useNavigate } from "react-router-dom";

const PromoDetailComponent = () => {
  const { dataPromoDetail, loading } = useGetPromoDetail();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const fallbackImage =
    "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit621414gsm/events/2021/07/06/e4dee25d-6624-43ac-ad99-525ee401099d-1625587933856-9221b004c60999a6a8e7820dc36c25e3.jpg";

  const handleCopy = () => {
    navigator.clipboard.writeText(dataPromoDetail?.promo_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  if (!dataPromoDetail) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Promo tidak ditemukan</p>
      </div>
    );
  }

  const stripHtml = (htmlString) => {
    if (!htmlString) return "";
    return htmlString.replace(/<[^>]*>?/gm, "").trim();
  };

  return (
    <div className="w-full py-24 px-4 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen flex items-center justify-center">
      <div className="container max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="max-w-4xl mx-auto md:p-6 space-y-6 relative">
          {/* Floating back button */}
          <button
            className="text-orange-600 font-medium flex items-center hover:underline mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Promos
          </button>

          <div className="relative rounded-2xl overflow-hidden shadow-xl h-64 md:h-80">
            <img
              src={dataPromoDetail?.imageUrl || fallbackImage}
              alt={dataPromoDetail?.title || "Promo Image"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                {dataPromoDetail?.title}
              </h1>
              <p className="text-gray-200 mt-1 md:mt-2 text-sm md:text-base line-clamp-2">
                {dataPromoDetail?.description}
              </p>
            </div>
          </div>

          <Card className="rounded-2xl shadow-xl border-0">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between items-center gap-4 mb-6">
                <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 rounded-xl border border-blue-100 relative">
                  <span className="text-base md:text-lg font-mono font-bold text-blue-700 bg-white px-3 py-1 rounded-md shadow-sm">
                    {dataPromoDetail?.promo_code}
                  </span>
                  <Button
                    onClick={handleCopy}
                    className={`transition-all ${
                      copied
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-orange-600 hover:bg-orange-700"
                    } text-white`}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 mr-1" />
                    ) : (
                      <Copy className="w-4 h-4 mr-1" />
                    )}
                    {copied ? "Tersalin!" : "Salin Kode"}
                  </Button>

                  {copied && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                      ✓
                    </div>
                  )}
                </div>

                <div>
                  <button
                    className="inline-flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-full hover:bg-orange-600 transition text-sm font-medium shadow-md"
                    onClick={() => navigate("/activities")}
                  >
                    <Compass className="w-4 h-4" />
                    Browse Activities
                  </button>
                </div>
              </div>

              {/* Discount info cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">Diskon Promo</p>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-blue-700">
                    Rp{" "}
                    {dataPromoDetail?.promo_discount_price?.toLocaleString(
                      "id-ID"
                    )}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">Minimum Klaim</p>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-green-700">
                    Rp{" "}
                    {dataPromoDetail?.minimum_claim_price?.toLocaleString(
                      "id-ID"
                    )}
                  </p>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="mb-6">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-orange-500 p-3 md:p-4">
                    <h3 className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Syarat & Ketentuan
                    </h3>
                  </div>
                  <div className="p-3 md:p-4 bg-gray-50">
                    <div className="space-y-2 md:space-y-3">
                      {stripHtml(dataPromoDetail?.terms_condition)
                        .split("\n")
                        .filter((term) => term.trim() !== "")
                        .map((term, index) => (
                          <div key={index} className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                              </div>
                            </div>
                            <p className="text-gray-700 ml-3 text-sm md:text-base">
                              {term}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer with dates and CTA */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-gray-200">
                <div className="text-xs md:text-sm text-gray-500 flex w-full justify-between">
                  <p>Dibuat: {formatDate(dataPromoDetail?.createdAt)}</p>
                  <p>Update: {formatDate(dataPromoDetail?.updatedAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PromoDetailComponent;
