// import { useState, useEffect } from "react";

// export default function SettingsMenu() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [language, setLanguage] = useState("English");

//   const languages = ["English", "Hindi", "Spanish", "French", "German"]; // add all supported

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg w-80">
//       <h2 className="text-xl font-bold mb-4 dark:text-white">Settings</h2>

//       {/* Dark Mode Toggle */}
//       <div className="flex justify-between items-center mb-4">
//         <span className="dark:text-white">Dark Mode</span>
//         <input
//           type="checkbox"
//           checked={darkMode}
//           onChange={() => setDarkMode(!darkMode)}
//           className="toggle-checkbox"
//         />
//       </div>

//       {/* Language Selector */}
//       <div className="mb-4">
//         <label className="block mb-1 dark:text-white">Language</label>
//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
//         >
//           {languages.map((lang) => (
//             <option key={lang} value={lang}>{lang}</option>
//           ))}
//         </select>
//       </div>

//       {/* Menu Options */}
//       <ul className="space-y-2">
//         <li className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Edit Profile</li>
//         <li className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Help & Support</li>
//         <li className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Subscription</li>
//         <li className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Privacy & Policy</li>
//         <li className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Guidelines</li>
//       </ul>
//     </div>
//   );
// }




import { useState, useEffect } from "react";

export default function SettingsMenu() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("Hindi");

  const languages = [
    "Assamese",
    "Bengali",
    "Bodo",
    "Dogri",
    "Gujarati",
    "Hindi",
    "Kannada",
    "Kashmiri",
    "Konkani",
    "Maithili",
    "Malayalam",
    "Manipuri",
    "Marathi",
    "Nepali",
    "Odia",
    "Punjabi",
    "Sanskrit",
    "Santhali",
    "Sindhi",
    "Tamil",
    "Telugu",
    "Urdu"
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg w-80">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Settings</h2>

      {/* Dark Mode Toggle */}
      <div className="flex justify-between items-center mb-4">
        <span className="dark:text-white">Dark Mode</span>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="cursor-pointer"
        />
      </div>

      {/* Language Selector */}
      <div className="mb-4">
        <label className="block mb-1 dark:text-white">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {/* Other Options */}
      <ul className="space-y-2">
        <li className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Edit Profile</li>
        <li className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Help & Support</li>
        <li className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Subscription</li>
        <li className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Privacy & Policy</li>
        <li className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Guidelines</li>
      </ul>
    </div>
  );
}