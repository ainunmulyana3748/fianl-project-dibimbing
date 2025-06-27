import { useState } from "react";
import useGetActivityDetail from "@/hooks/Activities/useGetActivityDetail";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Star,
  StarHalf,
  BadgeDollarSign,
  Landmark,
  Heart,
  Share2,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAddCart from "@/hooks/Cart/useAddCart";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const fallbackImage =
  "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_829/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/d4mucgi6ur1vcx57u0jb/TiketOceanParkHongKong.jpg";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const handleImageError = (e) => {
  e.currentTarget.src = fallbackImage;
};

// Dummy reviews data
const dummyReviews = [
  {
    id: 1,
    name: "Alex Johnson",
    rating: 5,
    comment:
      "Absolutely fantastic experience! The guides were knowledgeable and the scenery was breathtaking. Will definitely come back again.",
    date: "2025-05-15",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Sophia Martinez",
    rating: 4,
    comment:
      "Great activity for families. Kids had a blast. The facilities were clean and well-maintained. Only wish the food options were better.",
    date: "2025-05-10",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Michael Chen",
    rating: 4.5,
    comment:
      "Well organized and worth the price. The instructors were professional and made everyone feel safe. Highly recommend for adventure seekers!",
    date: "2025-04-28",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    id: 4,
    name: "Emma Williams",
    rating: 3.5,
    comment:
      "Good experience overall, but felt a bit rushed. The activity itself was fun but I wish we had more time at each location.",
    date: "2025-04-22",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      ))}
      {halfStar && (
        <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />
      ))}
    </div>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-gray-800">{review.name}</h4>
              <div className="flex items-center gap-1 mt-1">
                <StarRating rating={review.rating} />
                <span className="text-sm text-gray-500 ml-1">
                  {review.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {formatDate(review.date)}
            </span>
          </div>
          <p className="mt-3 text-gray-600">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

const ActivityDetailComponent = () => {
  const { addCart } = useAddCart();
  const { refetchCart } = useCart();
  const navigate = useNavigate();
  const { dataActivities, loading } = useGetActivityDetail();
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews] = useState(dummyReviews);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const handleAddToCart = async (id) => {
    try {
      await addCart(id);
      await refetchCart();
      toast.success("Berhasil ditambahkan ke keranjang!");
      navigate("/carts");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Gagal menambahkan ke keranjang");
    }
  };

  if (loading) {
    return (
      <div className="w-full py-24 px-4 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!dataActivities) {
    return (
      <div className="w-full py-24 px-4 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">No activity data found</div>
      </div>
    );
  }

  return (
    <div className="w-full py-32 px-4 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen">
      <div className="container max-w-5xl mx-auto">
        <button
          className="text-orange-600 font-medium flex items-center hover:underline mb-6"
          onClick={() => navigate("/activities")}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Activities
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            <img
              src={dataActivities?.imageUrls || fallbackImage}
              alt={dataActivities?.title || "Activities Image"}
              onError={handleImageError}
              className="w-full h-72 sm:h-80 object-cover rounded-xl"
            />

            {/* Favorite button */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {dataActivities?.title || "Untitled Activity"}
                </h1>

                <div className="flex items-center mt-2">
                  <MapPin className="w-5 h-5 text-orange-500 mr-1" />
                  <span className="text-gray-600">
                    {dataActivities?.city || ""}{" "}
                    {dataActivities?.province
                      ? `, ${dataActivities.province}`
                      : ""}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-orange-100 px-3 py-1.5 rounded-full flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-bold text-gray-800">
                    {dataActivities?.rating || 0}
                    <span className="text-gray-500 font-normal">/5</span>
                  </span>
                </div>
                <div className="text-gray-500">
                  ({dataActivities?.total_reviews || 0} reviews)
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              {dataActivities?.category?.createdAt && (
                <span className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  <CalendarDays className="w-4 h-4" />
                  Created at {formatDate(dataActivities.category?.createdAt)}
                </span>
              )}

              {dataActivities?.category?.name && (
                <span className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  <Landmark className="w-4 h-4" />
                  {dataActivities.category?.name}
                </span>
              )}
            </div>

            {/* Price section */}
            <div className="mt-8 p-5 bg-orange-50 rounded-xl">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <div className="text-gray-500 text-sm">Starting from</div>
                  <div className="flex items-center gap-3 mt-1">
                    <BadgeDollarSign className="w-6 h-6 text-green-600" />
                    <div>
                      <span className="text-2xl font-bold text-orange-600">
                        Rp{" "}
                        {dataActivities?.price?.toLocaleString("id-ID") || "0"}
                      </span>
                      {typeof dataActivities?.price_discount === "number" &&
                        dataActivities.price_discount >
                          dataActivities.price && (
                          <span className="line-through text-gray-400 ml-3 text-base">
                            Rp{" "}
                            {dataActivities.price_discount.toLocaleString(
                              "id-ID"
                            )}
                          </span>
                        )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleAddToCart(dataActivities.id)}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full transition text-sm font-medium shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>

                  <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-full transition text-sm font-medium">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            {dataActivities?.description && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {dataActivities.description}
                </p>
              </div>
            )}

            {/* Facilities */}
            {dataActivities?.facilities && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  Facilities
                </h3>
                <div
                  className="text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: dataActivities.facilities,
                  }}
                />
              </div>
            )}

            {/* Address */}
            {dataActivities?.address && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  Address
                </h3>
                <p className="text-gray-600">{dataActivities.address}</p>
              </div>
            )}

            {/* Google Maps */}
            {dataActivities?.location_maps?.includes("<iframe") && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  Location
                </h3>
                <div
                  className="w-full h-72 sm:h-96 md:h-[500px] rounded-xl overflow-hidden border border-gray-200"
                  dangerouslySetInnerHTML={{
                    __html: dataActivities.location_maps.replace(
                      /<iframe([^>]*)>/,
                      `<iframe$1 class="w-full h-full"/>`
                    ),
                  }}
                />
              </div>
            )}

            {/* Reviews Section */}
            <div className="mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
                <div className="flex items-center">
                  <span className="text-orange-600 font-bold mr-1">
                    {reviews.length}
                  </span>
                  <span className="text-gray-600">reviews</span>
                </div>
              </div>

              {/* Review Stats */}
              <div className="bg-gray-50 rounded-xl p-5 mb-8">
                <div className="flex items-center mb-4">
                  <div className="text-4xl font-bold text-gray-800 mr-4">
                    {dataActivities?.rating?.toFixed(1) || "4.5"}
                  </div>
                  <div>
                    <StarRating rating={dataActivities?.rating || 4.5} />
                    <div className="text-gray-600 mt-1">
                      Based on {reviews.length} reviews
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter(
                      (r) => Math.floor(r.rating) === star
                    ).length;
                    const percentage = (count / reviews.length) * 100;

                    return (
                      <div key={star} className="flex items-center">
                        <div className="w-10 text-gray-600">{star} star</div>
                        <div className="flex-1 mx-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="w-10 text-right text-gray-600">
                          {count}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-5">
                {reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>

              {/* Add Review Form */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-800 mb-5">
                  Add Your Review
                </h3>
                <form className="bg-gray-50 rounded-xl p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-700 mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={newReview.name}
                        onChange={(e) =>
                          setNewReview({ ...newReview, name: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Your Rating
                      </label>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              setNewReview({ ...newReview, rating: star })
                            }
                            className="mr-1 focus:outline-none"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= newReview.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-gray-600">
                          {newReview.rating} / 5
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="comment"
                      className="block text-gray-700 mb-2"
                    >
                      Your Review
                    </label>
                    <textarea
                      id="comment"
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview({ ...newReview, comment: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows="4"
                      placeholder="Share your experience..."
                      required
                    ></textarea>
                  </div>

                  <div className="mt-5 text-right">
                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-full transition"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailComponent;
