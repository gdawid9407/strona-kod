export default function ProcessTimeline() {
  const steps = [
    {
      num: "01",
      title: "Wywiad & Badania",
      desc: "Szczegółowa ankieta medyczno-żywieniowa oraz analiza najnowszych wyników badań krwi w oparciu o normy funkcjonalne."
    },
    {
      num: "02",
      title: "Indywidualny Protokół",
      desc: "Otrzymujesz dopasowany plan żywieniowy, celowaną suplementację oraz zalecenia dotyczące stylu życia i rytmu dobowego."
    },
    {
      num: "03",
      title: "Monitoring & Korekta",
      desc: "Regularny kontakt, monitorowanie objawów i adaptacja protokołu w zależności od reakcji organizmu i zmian w wynikach badań."
    }
  ];

  return (
    <section id="proces" className="py-24 px-6 bg-[#06090e] relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 tracking-tight text-center">
          3 etapy do <span className="italic text-[#9d4edd] font-light">równowagi</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center group">
              {/* Connector line for desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-[1px] bg-gradient-to-r from-[#00e5ff]/20 to-transparent z-0" />
              )}
              
              <div className="w-24 h-24 rounded-full bg-[rgba(14,22,35,0.75)] border border-[rgba(0,229,255,0.2)] flex items-center justify-center text-3xl font-bold text-[#00e5ff] mb-8 z-10 group-hover:scale-110 group-hover:border-[#00e5ff] transition-all duration-500 shadow-[0_0_20px_rgba(0,229,255,0.05)] group-hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]">
                {step.num}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed max-w-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
