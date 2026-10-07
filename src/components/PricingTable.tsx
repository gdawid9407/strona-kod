import { Check } from "lucide-react";

export default function PricingTable() {
  const plans = [
    {
      name: "Konsultacja Wstępna",
      price: "250 zł",
      desc: "Analiza badań i wywiadu",
      features: [
        "60 minut konsultacji online",
        "Analiza dotychczasowych wyników",
        "Wstępne zalecenia kierunkowe",
        "Lista badań do wykonania"
      ],
      featured: false
    },
    {
      name: "Kompleksowy Protokół",
      price: "450 zł",
      desc: "Pełny plan działania",
      features: [
        "Wszystko co w konsultacji",
        "7-dniowy jadłospis celowany",
        "Precyzyjny plan suplementacji",
        "Zalecenia dotyczące stylu życia",
        "1 konsultacja kontrolna"
      ],
      featured: true
    },
    {
      name: "Stała Opieka 3-msc",
      price: "1200 zł",
      desc: "Pełne wsparcie i monitoring",
      features: [
        "Kompleksowy protokół na start",
        "Aktualizacje planu co miesiąc",
        "Nielimitowany kontakt mailowy",
        "3 konsultacje kontrolne",
        "Analiza nowych badań"
      ],
      featured: false
    }
  ];

  return (
    <section id="pakiety" className="py-24 px-6 bg-[#06090e] relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 tracking-tight text-center">
          Pakiety <span className="text-[#00e5ff]">Współpracy</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-3xl flex flex-col ${
                plan.featured 
                  ? "bg-gradient-to-b from-[#00e5ff]/10 to-[rgba(14,22,35,0.8)] border-2 border-[#00e5ff]/50 shadow-[0_0_40px_rgba(0,229,255,0.1)] -translate-y-2 md:-translate-y-4" 
                  : "bg-[rgba(14,22,35,0.75)] border border-white/10"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00e5ff] text-black text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                  Najczęściej wybierany
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 font-light mb-6 text-sm">{plan.desc}</p>
              <div className="text-4xl font-bold text-white mb-8">{plan.price}</div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start text-gray-300 font-light text-sm">
                    <Check className="w-5 h-5 text-[#00e5ff] mr-3 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 rounded-full font-medium tracking-wide uppercase text-sm transition-all duration-300 ${
                plan.featured
                  ? "bg-[#00e5ff] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
              }`}>
                Wybierz pakiet
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
