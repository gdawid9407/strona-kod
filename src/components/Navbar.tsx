"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 bg-[#06090e]/60 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="text-white font-bold text-lg md:text-xl tracking-wide">
          DIETETYKA <span className="italic text-[#9d4edd] font-light">Jagoda</span>
        </div>

        {/* Links (Desktop) */}
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

        {/* CTA & Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <Link 
            href="#kontakt" 
            className="hidden md:inline-block px-6 py-2 bg-white/5 backdrop-blur-md border border-[#00e5ff]/20 text-white rounded-full text-sm uppercase tracking-wider hover:bg-[#00e5ff]/10 hover:border-[#00e5ff]/50 transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.05)]"
          >
            Umów wizytę
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#00e5ff]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#06090e]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col space-y-6 shadow-2xl transition-all">
          <Link 
            href="#filary" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-200 hover:text-[#00e5ff] text-base font-medium uppercase tracking-wider"
          >
            Filary
          </Link>
          <Link 
            href="#proces" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-200 hover:text-[#00e5ff] text-base font-medium uppercase tracking-wider"
          >
            Proces
          </Link>
          <Link 
            href="#pakiety" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-200 hover:text-[#00e5ff] text-base font-medium uppercase tracking-wider"
          >
            Pakiety
          </Link>
          <Link 
            href="#kontakt" 
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-3 bg-[#00e5ff]/10 border border-[#00e5ff]/40 text-[#00e5ff] rounded-xl font-medium uppercase tracking-wider"
          >
            Umów wizytę
          </Link>
        </div>
      )}
    </nav>
  );
}

