export default function DateBar() {
  return (
    <div className="flex justify-center gap-16 mt-4 text-sm">
      <div className="flex items-center gap-2">
        <span className="tracking-widest font-medium">MONTH</span>
        <div className="w-24 border-b-2 border-black text-center">
          <input
            type="text"
            className="w-full text-center bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="tracking-widest font-medium">DATE</span>
        <div className="w-24 border-b-2 border-black text-center">
          <input
            type="text"
            className="w-full text-center bg-transparent outline-none"
          />
        </div>
      </div>
    </div>
  );
}
