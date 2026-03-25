import { useState } from "react";

export default function ClassSlider({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const classes = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Class</h2>

      <div className="flex overflow-x-auto gap-4 pb-3 snap-x">
        {classes.map((cls) => (
          <div
            key={cls}
            onClick={() => {
              setSelected(cls);
              onSelect(cls);
            }}
            className={`min-w-[120px] snap-start px-4 py-3 rounded-xl text-center cursor-pointer border transition
              ${
                selected === cls
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white border-gray-300 hover:bg-green-100"
              }`}
          >
            {cls}
          </div>
        ))}
      </div>
    </div>
  );
}