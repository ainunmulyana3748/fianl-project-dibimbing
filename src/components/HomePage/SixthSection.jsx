import React from "react";
import { CarouselTestimoni } from "../CarouselTestimoni";

const SixthSection = () => {
  return (
    <div className="w-full py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
                Clients Say
              </span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Testimonials from professionals who have experienced business
              transformation
            </p>
          </div>
          <CarouselTestimoni />
        </div>
      </div>
    </div>
  );
};

export default SixthSection;
