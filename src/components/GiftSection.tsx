import { Gift, Sparkles, Smile, ShoppingBag } from 'lucide-react';

export default function GiftSection() {
  return (
    <div className="bg-zinc-100 text-zinc-900 border-4 border-fuchsia-600 p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden" id="gifts-card">
      <div className="absolute -top-16 -left-16 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center gap-6">
        
        {/* Left Side: Styled Gift Icon & Accent */}
        <div className="w-16 h-16 bg-fuchsia-600 border-2 border-zinc-950 flex items-center justify-center text-white shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Gift className="w-8 h-8" />
        </div>

        {/* Right Side: Message content */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-fuchsia-600 border-2 border-zinc-950 text-white text-xs font-mono font-bold select-none">
            <Sparkles className="w-3.5 h-3.5" />
            Vademecum Prezentowe Michała
          </div>
          
          <h3 className="text-2xl font-black uppercase text-zinc-950 tracking-tight">
            Co podarować Solenizantowi?
          </h3>
          
          {/* Exact quote requested by user */}
          <blockquote className="border-2 border-zinc-950 p-4 bg-yellow-350 text-zinc-950 font-bold font-sans text-sm md:text-base leading-relaxed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left">
            "W tym roku zdaję się na Waszą kreatywność, karta prezentowa do Decathlonu również zawsze jest super prezentem ;-) "
          </blockquote>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-1">
            <div className="flex items-center gap-2 text-xs text-zinc-800 font-bold">
              <Smile className="w-4 h-4 text-fuchsia-600 shrink-0" />
              <span>Najlepszy prezent to Wasza obecność!</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-800 font-bold">
              <ShoppingBag className="w-4 h-4 text-lime-600 shrink-0" />
              <span>Decathlon = więcej pretekstów do sportu!</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
