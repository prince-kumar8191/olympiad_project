import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebookF, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import image from "../../image/Bhayat.png"

export default function Footer() {
  return (
    <div className="relative mt-20">

      {/* ORANGE CONTACT BAR */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-16 w-[85%] bg-orange-500 text-white rounded-3xl shadow-xl px-10 py-8">

        <div className="grid md:grid-cols-3 items-center text-center md:text-left">

          {/* Address */}
          <div className="flex items-center gap-4 justify-center md:justify-start border-r border-orange-300 pr-6">
            <div className="bg-white text-orange-500 p-4 rounded-full">
              <FaMapMarkerAlt />
            </div>

            <div>
              <p className="text-sm opacity-80">Address</p>
              <p className="font-semibold">
                D-322/8, Phase IV, Aya Nagar Ext., <br />
                New Delhi - 110047
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 justify-center border-r border-orange-300 px-6 mt-6 md:mt-0">
            <div className="bg-white text-orange-500 p-4 rounded-full">
              <FaEnvelope />
            </div>

            <div>
              <p className="text-sm opacity-80">Send Email</p>
              <p className="font-semibold">support@bhayat.org</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 justify-center md:justify-end pl-6 mt-6 md:mt-0">
            <div className="bg-white text-orange-500 p-4 rounded-full">
              <FaPhoneAlt />
            </div>

            <div>
              <p className="text-sm opacity-80">Call Emergency</p>
              <p className="font-semibold">9711301699 - 9250697640</p>
            </div>
          </div>

        </div>
      </div>


      {/* MAIN FOOTER */}
      <footer className="bg-[#0f1b2b] text-white pt-32 pb-12 px-10">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">

          {/* LOGO + ABOUT */}
          <div>

            <img
              src={image}
              alt="bhayat"
              className="w-40 mb-4"
            />

            <p className="text-gray-400">
              BHAYAT is a non-profit organization established in 2010 by
              passionate individuals aiming for a healthy and self-reliant India.
            </p>

            <div className="flex gap-4 mt-6">

              <a
                href="https://www.facebook.com/share/1Azj7ZW8dz/"
                target="_blank"
                rel="noreferrer"
                className="bg-gray-700 p-3 rounded hover:bg-blue-600"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://youtube.com/@bhayatorg?si=rL_1FKTRgiSPJP7F"
                target="_blank"
                rel="noreferrer"
                className="bg-gray-700 p-3 rounded hover:bg-red-600"
              >
                <FaYoutube />
              </a>

            </div>

          </div>


          {/* QUICK LINKS */}
          <div>

            <h3 className="text-xl font-semibold mb-4 border-b border-orange-500 inline-block">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400 mt-4">

              

              <li>
                <Link to="/about" className="hover:text-orange-400">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/Awardcriteria" className="hover:text-orange-400">
                  Our Blog
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-orange-400">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link to="/programs" className="hover:text-orange-400">
                  Programs
                </Link>
              </li>

            </ul>

          </div>


          {/* CONTACT */}
          <div>

            <h3 className="text-xl font-semibold mb-4 border-b border-orange-500 inline-block">
              Contact Us
            </h3>

            <p className="flex items-center gap-3 text-gray-400 mt-4">
              <FaEnvelope /> support@bhayat.org
            </p>

            <p className="flex items-center gap-3 text-gray-400 mt-3">
              <FaPhoneAlt /> 9711301699 , 9250697640
            </p>

          </div>

        </div>


        {/* BOTTOM */}
        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400">
          © 2026 BHAYAT. All  Copyrights reserved
        </div>

      </footer>

    </div>
  );
}