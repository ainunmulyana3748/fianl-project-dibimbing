import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { CarouselPromos } from "../PromosFeature/CarouselPromos";

const FifthSection = () => {
  const [loading, getDataPromos] = useState(true);

  useEffect(() => {
    getDataPromos();
  });
  return (
    <section className="w-full py-16 mx-auto">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4 relative z-10">
              Explore{" "}
              <span className="text-orange-500">Promos & Discounts</span>
            </h1>
            <div className="absolute -bottom-2 left-0 w-full h-3 bg-orange-400/30 rounded-full z-0"></div>
          </div>

          <p className="max-w-2xl mx-auto mt-6 text-gray-600 text-lg leading-relaxed">
            Exclusive discounts and package deals to make your Indonesian
            adventure even more affordable
          </p>

          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-orange-400 rounded-full"></div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
          </div>
        ) : (
          <CarouselPromos />
        )}

        <div className="mt-8 text-center">
          <button className=" bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2">
            <span>View All Promos</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FifthSection;
