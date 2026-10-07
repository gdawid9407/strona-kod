export default function ContactForm() {
  return (
    <section id="kontakt" className="py-24 px-6 bg-[#06090e] relative z-20 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Zrób pierwszy <span className="italic text-[#9d4edd] font-light">krok</span>
          </h2>
          <p className="text-gray-400 font-light text-lg">
            Wypełnij formularz wstępny. Odezwiemy się do 24 godzin z propozycją terminu.
          </p>
        </div>

        <form className="bg-[rgba(14,22,35,0.5)] p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Imię i nazwisko</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors"
                placeholder="Jan Kowalski"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Email</label>
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors"
                placeholder="jan@example.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Główny cel zdrowotny</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors appearance-none">
              <option value="" className="bg-[#0b1019]">Wybierz obszar...</option>
              <option value="insulinoopornosc" className="bg-[#0b1019]">Insulinooporność / Cukrzyca</option>
              <option value="jelita" className="bg-[#0b1019]">Problemy jelitowe (SIBO, IBS)</option>
              <option value="zapalenie" className="bg-[#0b1019]">Choroby autoimmunologiczne</option>
              <option value="hormony" className="bg-[#0b1019]">Zaburzenia hormonalne</option>
              <option value="inne" className="bg-[#0b1019]">Inne</option>
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Wiadomość (opcjonalnie)</label>
            <textarea 
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors resize-none"
              placeholder="Napisz krótko z czym się zmagasz..."
            />
          </div>

          <button 
            type="button"
            className="w-full py-4 bg-[#00e5ff]/10 border border-[#00e5ff]/50 text-[#00e5ff] rounded-xl font-medium uppercase tracking-widest hover:bg-[#00e5ff] hover:text-black hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300"
          >
            Wyślij zapytanie
          </button>
        </form>
      </div>
    </section>
  );
}
