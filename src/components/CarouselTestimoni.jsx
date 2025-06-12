import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    nama: "Ahmad Fauzi",
    jabatan: "CEO Tech Innovate",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    rating: 5,
    komentar:
      "Sistemnya revolusioner! Penghematan waktu 40% untuk tim kami. UI/UX-nya sangat intuitif.",
  },
  {
    id: 2,
    nama: "Dewi Lestari",
    jabatan: "Digital Marketer",
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    rating: 4,
    komentar:
      "Reporting tool-nya luar biasa. Hanya perlu tambahan fitur export PDF custom.",
  },
  {
    id: 3,
    nama: "Budi Santoso",
    jabatan: "Startup Founder",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    rating: 5,
    komentar:
      "Onboarding-nya seamless! Tim support responsif banget. ROI terlihat dalam 2 minggu.",
  },
  {
    id: 4,
    nama: "Citra Anggraeni",
    jabatan: "Product Manager",
    foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    rating: 4,
    komentar:
      "Integrasi dengan tools lain sangat memudahkan workflow. Auto-sync datanya keren!",
  },
  {
    id: 5,
    nama: "Rudi Hermawan",
    jabatan: "CTO FintechX",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    rating: 5,
    komentar:
      "Security features-nya top notch! Audit trail dan enkripsi end-to-end membuat kami tenang.",
  },
];

export function CarouselTestimoni() {
  return (
    <div className="w-full py-16">
      <Carousel className="w-full">
        <CarouselContent className="-ml-2">
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="pl-2 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-2">
                <Card className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-2xl border-0 overflow-hidden group transition-all duration-500 hover:shadow-3xl hover:-translate-y-3">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex items-center mb-8">
                      <div className="relative mr-6">
                        <div className="absolute -inset-2.5 bg-gradient-to-tr from-orange-400 to-orange-300 rounded-full blur opacity-70"></div>
                        <img
                          src={
                            testimonial.foto ||
                            "https://randomuser.me/api/portraits/men/32.jpg"
                          }
                          alt={testimonial.nama}
                          className="relative w-20 h-20 rounded-full object-cover border-4 border-white z-10"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-2xl text-gray-900">
                          {testimonial.nama}
                        </h3>
                        <p className="text-lg text-orange-600">
                          {testimonial.jabatan}
                        </p>
                      </div>
                    </div>

                    <div className="flex mb-5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < testimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 text-lg italic mb-6 relative leading-relaxed">
                      <span className="absolute -top-6 -left-3 text-6xl text-orange-100 opacity-80">
                        "
                      </span>
                      {testimonial.komentar}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-12 flex justify-center space-x-6">
          <CarouselPrevious className="bg-white shadow-lg border-0 rounded-full w-14 h-14 hover:bg-orange-50 hover:text-orange-600" />
          <CarouselNext className="bg-white shadow-lg border-0 rounded-full w-14 h-14 hover:bg-orange-50 hover:text-orange-600" />
        </div>
      </Carousel>
    </div>
  );
}
