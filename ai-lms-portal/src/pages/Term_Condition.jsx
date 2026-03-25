import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function TermsConditions() {

  const [active, setActive] = useState(null);

  const toggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  const terms = [

    {
      title: "1. Acceptance of Terms",
      content: `By submitting the online registration form, the applicant (Volunteer, School, Student, or Coordinator) agrees to comply with and be bound by these Terms and Conditions. If the applicant is a minor (under 18 years), registration must be completed with the consent of a parent/guardian or school authority.`
    },

    {
      title: "2. Eligibility",
      content: `• Volunteers must meet the eligibility criteria specified for the program or event.
• Students must be currently enrolled in a recognized school or educational institution.
• Coordinators must be officially authorized by their respective school or organization.
• The organizing authority reserves the right to verify eligibility.`
    },

    {
      title: "3. Accuracy of Information",
      content: `• All information provided must be true and accurate.
• Submission of incorrect or misleading information may result in cancellation.`
    },

    {
      title: "4. Approval of Registration",
      content: `• Submission of the online form does not guarantee participation.
• Registration will be confirmed only after verification and approval.`
    },

    {
      title: "5. Payments – Fee and Pricing",
      content: `• All fees are listed in Indian Rupees (INR)
• Full payment is required before service begins
• Pricing may change without prior notice`
    },

    {
      title: "6. Refunds & Cancellations",
      content: `Please refer to our Refund & Returns Policy for detailed information regarding refunds and cancellations.`
    },

    {
      title: "7. Code of Conduct",
      content: `• Follow rules and guidelines issued by the organizers
• Maintain discipline and professionalism during activities
• Avoid behavior that may harm the reputation of the organization`
    },

    {
      title: "8. Participation and Responsibilities",
      content: `• Participants must actively participate in assigned tasks
• Coordinators supervise students from their schools
• The organizing authority may assign roles as required`
    },

    {
      title: "9. Use of Personal Information",
      content: `Personal details collected during registration will only be used for program communication and administration.`
    },

    {
      title: "10. Media and Publicity Consent",
      content: `Participants grant permission to use photographs or videos taken during events for promotional materials and official publications.`
    },

    {
      title: "11. Modification or Cancellation",
      content: `The organizing authority may modify schedules or cancel events due to unforeseen circumstances.`
    },

    {
      title: "12. Limitation of Liability",
      content: `The organization is not responsible for personal loss, injury, or technical errors during registration except where required by law.`
    },

    {
      title: "13. Termination of Participation",
      content: `Participation may be terminated if terms are violated or false information is provided.`
    },

    {
      title: "14. Contact Information",
      content: `Participants may contact the organizing authority through the official email or phone number listed on the website.`
    },

    {
      title: "15. Intellectual Property",
      content: `All website content, courses, software programs and materials belong to bhayat.org and are protected by copyright laws.`
    },

    {
      title: "16. Contact Us",
      content: (
        <>
          Email:{" "}
          <a
            href="mailto:support@bhayat.org"
            className="text-indigo-600 font-medium hover:underline"
          >
            support@bhayat.org
          </a>

          <br />

          Phone:{" "}
          <a
            href="tel:+919711301699"
            className="text-indigo-600 font-medium hover:underline"
          >
            +91 9711301699
          </a>

          <br />

          Website:{" "}
          <a
            href="https://www.bhayat.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-medium hover:underline"
          >
            www.bhayat.org
          </a>
        </>
      )
    }

  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-12 px-4">

      {/* HERO */}

      <div className="text-center text-white mb-10">

        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Terms & Conditions
        </h1>

        <p className="opacity-90">
          Online Registration – Volunteers, Schools, Teachers, Students & Coordinators
        </p>

      </div>

      {/* CONTENT */}

      <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/80 rounded-2xl shadow-2xl p-6 md:p-10">

        {terms.map((item, index) => (

          <div
            key={index}
            className="border-b last:border-none py-4"
          >

            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center text-left font-semibold text-lg text-gray-800 hover:text-indigo-600 transition"
            >

              {item.title}

              <FaChevronDown
                className={`transition-transform duration-300 ${active === index ? "rotate-180 text-indigo-600" : ""
                  }`}
              />

            </button>

            {active === index && (

              <div className="mt-3 text-gray-600 whitespace-pre-line leading-relaxed">
                {item.content}
              </div>

            )}

          </div>

        ))}

      </div>

      {/* FOOTER */}

      <div className="text-center text-white mt-10 opacity-80">
        © 2025 Bhayat Foundation. All rights reserved.
      </div>

    </div>
  );
}

export default TermsConditions;