export default function SlidePanel({ type, onClose }) {

  if (!type) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white
                    rounded-t-3xl shadow-2xl p-8
                    animate-slideUp">

      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">{type}</h2>
        <button onClick={onClose}>✕</button>
      </div>

      <p>Yaha {type} ka content ayega</p>

    </div>
  );
}