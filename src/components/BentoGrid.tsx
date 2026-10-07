import { Activity, Beaker, Dna, Droplets } from "lucide-react";

export default function BentoGrid() {
  return (
    <section id="filary" className="py-24 px-6 bg-[#06090e] relative z-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Obszary wsparcia <span className="text-[#00e5ff]">klinicznego</span>
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl text-lg font-light">
          Precyzyjna diagnostyka i celowane interwencje żywieniowe dla przywrócenia homeostazy organizmu.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Card 1 (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 group relative p-8 rounded-3xl bg-[rgba(14,22,35,0.75)] border border-[rgba(0,229,255,0.1)] overflow-hidden backdrop-blur-lg hover:border-[rgba(0,229,255,0.3)] transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00e5ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Activity className="w-12 h-12 text-[#00e5ff] mb-6" />
            <h3 className="text-2xl font-semibold text-white mb-4">Dietoterapia Przeciwzapalna & Antyoksydanty</h3>
            <p className="text-gray-400 font-light leading-relaxed max-w-xl">
              Redukcja ukrytego stanu zapalnego (low-grade inflammation) będącego podłożem chorób cywilizacyjnych. Optymalizacja proporcji kwasów tłuszczowych i wprowadzenie potężnych antyoksydantów celowanych.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="group relative p-8 rounded-3xl bg-[rgba(14,22,35,0.75)] border border-[rgba(0,229,255,0.1)] overflow-hidden backdrop-blur-lg hover:border-[#9d4edd]/30 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9d4edd]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Droplets className="w-12 h-12 text-[#9d4edd] mb-6" />
            <h3 className="text-xl font-semibold text-white mb-4">Gospodarka Cukrowa & Insulinooporność</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Stabilizacja glikemii, uwrażliwienie tkanek na insulinę oraz modulacja rytmu wydzielania hormonów odpowiedzialnych za głód i sytość.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="group relative p-8 rounded-3xl bg-[rgba(14,22,35,0.75)] border border-[rgba(0,229,255,0.1)] overflow-hidden backdrop-blur-lg hover:border-[#00e5ff]/30 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00e5ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Dna className="w-12 h-12 text-white mb-6" />
            <h3 className="text-xl font-semibold text-white mb-4">Odbudowa Bariery Jelitowej & Mikrobiom</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Celowane protokoły naprawy nabłonka jelitowego, leczenie SIBO/IMO oraz modulacja mikrobioty dla lepszego wchłaniania i odporności.
            </p>
          </div>

          {/* Feature Card 4 (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 group relative p-8 rounded-3xl bg-[rgba(14,22,35,0.75)] border border-[rgba(0,229,255,0.1)] overflow-hidden backdrop-blur-lg hover:border-[#9d4edd]/30 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9d4edd]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Beaker className="w-12 h-12 text-[#9d4edd] mb-6" />
            <h3 className="text-2xl font-semibold text-white mb-4">Diagnostyka Laboratoryjna i interpretacja badań krwi</h3>
            <p className="text-gray-400 font-light leading-relaxed max-w-xl">
              Czytanie wyników poza zakresem referencyjnym na rzecz zakresów funkcjonalnych. Dogłębna analiza markerów stanu zapalnego, tarczycy, gospodarki żelazowej i witaminowej.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
