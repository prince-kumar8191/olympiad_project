import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import image from "../../image/Bhayat.png";

export default function Footer() {
  return (
    <div className="relative mt-10 md:mt-28">

      {/* =========================
          ORANGE CONTACT BAR (Desktop Only)
      ========================= */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-16 w-[90%] lg:w-[85%] bg-orange-500 text-white rounded-3xl shadow-xl px-8 lg:px-10 py-8 z-20">
        <div className="grid md:grid-cols-3 gap-0 items-stretch text-left">

          {/* Address */}
          <div className="flex items-center gap-4 justify-start border-r border-orange-300 pr-6">
            <div className="bg-white text-orange-500 p-4 rounded-full text-lg shrink-0">
              <FaMapMarkerAlt />
            </div>

            <div className="w-full">
              <p className="text-sm opacity-80">Address</p>
              <p className="font-semibold text-base leading-relaxed">
                D-322/8, Phase IV, Aya Nagar Ext., <br />
                New Delhi - 110047
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 justify-start border-r border-orange-300 px-6">
            <div className="bg-white text-orange-500 p-4 rounded-full text-lg shrink-0">
              <FaEnvelope />
            </div>

            <div className="w-full">
              <p className="text-sm opacity-80">Send Email</p>
              <p className="font-semibold text-base break-all">
                support@bhayat.org
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 justify-end pl-6">
            <div className="bg-white text-orange-500 p-4 rounded-full text-lg shrink-0">
              <FaPhoneAlt />
            </div>

            <div className="w-full">
              <p className="text-sm opacity-80">Call Emergency</p>
              <p className="font-semibold text-base leading-relaxed">
                9711301699 - 9250697640
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MAIN FOOTER
      ========================= */}
      <footer className="bg-[#0f1b2b] text-white pt-12 md:pt-32 pb-10 px-5 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">

          {/* LOGO + ABOUT */}
          <div className="text-center md:text-left">
            <img
              src={image}
              alt="bhayat"
              className="w-32 sm:w-36 md:w-40 mb-4 mx-auto md:mx-0"
            />

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              BHAYAT is a non-profit organization established in 2010 by
              passionate individuals aiming for a healthy and self-reliant India.
            </p>

            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              <a
                href="https://www.facebook.com/share/1Azj7ZW8dz/"
                target="_blank"
                rel="noreferrer"
                className="bg-gray-700 p-3 rounded hover:bg-blue-600 transition duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://youtube.com/@bhayatorg?si=rL_1FKTRgiSPJP7F"
                target="_blank"
                rel="noreferrer"
                className="bg-gray-700 p-3 rounded hover:bg-red-600 transition duration-300"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4 border-b border-orange-500 inline-block">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400 mt-4 text-sm sm:text-base">
              <li>
                <Link to="/about" className="hover:text-orange-400 transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/Ourblog"
                  className="hover:text-orange-400 transition"
                >
                  Our Blog
                </Link>
              </li>

              <li>
                <Link to="/Contactus" className="hover:text-orange-400 transition">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link to="/program" className="hover:text-orange-400 transition">
                  Programs
                </Link>
              </li>

              <li>
                <Link to="/Gallery" className="hover:text-orange-400 transition">
                  Gallery
                </Link>
              </li>
               <li>
                <Link to="/Decleration" className="hover:text-orange-400 transition">
                 Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4 border-b border-orange-500 inline-block">
              Contact Us
            </h3>

            <p className="flex items-center justify-center md:justify-start gap-3 text-gray-400 mt-4 text-sm sm:text-base break-all">
              <FaEnvelope className="shrink-0" />
              support@bhayat.org
            </p>

            <p className="flex items-center justify-center md:justify-start gap-3 text-gray-400 mt-3 text-sm sm:text-base">
              <FaPhoneAlt className="shrink-0" />
              9711301699, 9250697640
            </p>
          </div>
        </div>

        {/* =========================
            MOBILE CONTACT SECTION
        ========================= */}
        <div className="md:hidden mt-10 border-t border-gray-700 pt-8">
          <h3 className="text-xl font-semibold text-center mb-6 border-b border-orange-500 inline-block mx-auto pb-2 block w-fit">
            Reach Us
          </h3>

          <div className="grid grid-cols-1 gap-4">

            {/* Address */}
            <div className="bg-[#162336] rounded-2xl p-4 text-center shadow-md">
              <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-lg">
                <FaMapMarkerAlt />
              </div>
              <p className="text-sm text-orange-400 mb-1">Address</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                D-322/8, Phase IV, Aya Nagar Ext., <br />
                New Delhi - 110047
              </p>
            </div>

            {/* Email */}
            <div className="bg-[#162336] rounded-2xl p-4 text-center shadow-md">
              <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-lg">
                <FaEnvelope />
              </div>
              <p className="text-sm text-orange-400 mb-1">Send Email</p>
              <p className="text-gray-300 text-sm break-all">
                support@bhayat.org
              </p>
            </div>

            {/* Phone */}
            <div className="bg-[#162336] rounded-2xl p-4 text-center shadow-md">
              <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-lg">
                <FaPhoneAlt />
              </div>
              <p className="text-sm text-orange-400 mb-1">Call Emergency</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                9711301699 <br />
                9250697640
              </p>
            </div>
          </div>
        </div>

        {/* POLICY LINKS */}
        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-x-10 gap-y-3 sm:gap-x-12 md:gap-x-14 text-sm sm:text-base text-gray-400 text-center">
            <Link
              to="/Term_Condition"
              className="hover:text-orange-400 transition"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/privacy_policy"
              className="hover:text-orange-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/refund_return"
              className="hover:text-orange-400 transition"
            >
              Refund & Return Policy
            </Link>
          </div>
        </div>

        {/* BOTTOM */}
        <div >
        <h2 className="text-xl font-semibold mt-6 pt-4 text-center text-white-400 text-sm sm:text-base">© 2026 BHAYAT. All Copyrights Reserved</h2>
        </div>
      </footer>
    </div>
  );
}