export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#04060a] py-12 px-6 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-white font-bold text-xl tracking-wide mb-4 md:mb-0">
          DIETETYKA <span className="italic text-[#9d4edd] font-light">Jagoda</span>
        </div>
        
        <div className="flex space-x-6 text-sm text-gray-500 font-light">
          <a href="#" className="hover:text-white transition-colors">Regulamin</a>
          <a href="#" className="hover:text-white transition-colors">Polityka Prywatności</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 text-center md:text-left text-xs text-gray-600 font-light">
        © {currentYear} Dietetyka Jagoda. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  );
}


