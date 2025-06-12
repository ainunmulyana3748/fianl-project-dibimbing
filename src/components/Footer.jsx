import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-cyan-600 via-orange-700 to-cyan-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Social Media */}
        <div>
          <h2 className="font-bold text-3xl text-black">
            Dolan<span className="text-orange-400">dolan.com</span>
          </h2>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-yellow-300">
              <Facebook />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <Twitter />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <Instagram />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <Youtube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-orange-100">
            <li>
              <a href="#" className="hover:text-yellow-200">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-200">
                Banners
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-200">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-200">
                Activities
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-200">
                Promos
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
          <ul className="space-y-2 text-orange-100">
            <li>
              <a href="#" className="hover:text-yellow-200">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-200">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-200">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-200">
                Cancellation Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-200">
                Help Center
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
          <ul className="space-y-4 text-orange-100">
            <li className="flex items-start gap-3">
              <MapPin className="text-yellow-300 mt-1" />
              <span>Jl. Sultan Adam, Banjarmasin, Indonesia</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-yellow-300" />
              <span>+62 812 3456 7890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-yellow-300" />
              <span>Dolandolan@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-orange-500 mt-12 pt-6 px-6 text-sm flex flex-col md:flex-row justify-between items-center text-orange-100">
        <span>© 2025 Dolandolan.com All rights reserved.</span>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-yellow-200">
            Terms
          </a>
          <a href="#" className="hover:text-yellow-200">
            Privacy
          </a>
          <a href="#" className="hover:text-yellow-200">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}
