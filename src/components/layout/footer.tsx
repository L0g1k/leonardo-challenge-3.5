export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 px-4 md:px-12 h-14 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-2 leading-none">
          <span className="text-[#e50914] font-semibold">Leonardo.Ai</span>
          <span>Web Team Challenge 3.5</span>
        </div>
        <div>
          Built by <span className="text-white">Jason Mitcheson</span>
        </div>
      </div>
    </footer>
  );
}
