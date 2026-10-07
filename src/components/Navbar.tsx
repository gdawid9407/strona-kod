import { Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="text-white font-bold text-xl tracking-wide">
          DIETETYKA <span className="italic text-[#9d4edd] font-light">Jagoda</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#filary" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider">
            Filary
          </Link>
          <Link href="#proces" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider">
            Proces
          </Link>
          <Link href="#pakiety" className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider">
            Pakiety
          </Link>
        </div>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Link 
            href="#kontakt" 
            className="hidden md:inline-block px-6 py-2 bg-white/5 backdrop-blur-md border border-[#00e5ff]/20 text-white rounded-full text-sm uppercase tracking-wider hover:bg-[#00e5ff]/10 hover:border-[#00e5ff]/50 transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.05)]"
          >
            Umów wizytę
          </Link>
          <button className="md:hidden text-white p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
