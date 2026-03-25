import { useLanguage } from "../../context/LanguageContext";

export default function LanguagesSlider() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    "Hindi","English","Bengali","Tamil","Telugu",
    "Marathi","Gujarati","Kannada","Malayalam",
    "Punjabi","Odia","Assamese","Sanskrit"
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Language</h2>

      <div className="flex overflow-x-auto gap-4 pb-3 scroll-smooth snap-x">
        {languages.map((lang) => (
          <div
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`min-w-[140px] snap-start px-4 py-3 rounded-xl cursor-pointer text-center border transition
              ${
                language === lang
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300 hover:bg-blue-100"
              }`}
          >
            {lang}
          </div>
        ))}
      </div>
    </div>
  );
}