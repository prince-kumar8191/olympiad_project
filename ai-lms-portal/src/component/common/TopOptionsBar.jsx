export default function TopOptionsBar({ onSelect }) {
  const options = ["Books", "PYQs", "Subjects", "Exams", "Classes"];

  return (
    <div className="flex justify-center gap-8 mt-6 flex-wrap">

      {options.map((item) => (
        <div
          key={item}
          onClick={() => onSelect(item)}
          className="cursor-pointer px-6 py-4 bg-white
                     rounded-2xl shadow-md
                     hover:shadow-xl hover:-translate-y-1
                     transition duration-300"
        >
          {item}
        </div>
      ))}

    </div>
  );
}