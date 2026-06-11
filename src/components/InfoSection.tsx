import { Calendar, Clock, Sparkles, AlertTriangle, Flame, GlassWater, Landmark } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function InfoSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown to June 20, 2026 starting at 18:00 (since the current local date is June 10, 2026)
  // We use Date.UTC to guarantee 100% cross-browser parsing compatibility (particularly on iOS/macOS Safari)
  // June 20, 2026 at 18:00 in Poland summer time (UTC+2) is exactly 16:00:00 UTC
  useEffect(() => {
    const targetDate = Date.UTC(2026, 5, 20, 16, 0, 0);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (isNaN(difference) || difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24)) || 0;
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) || 0;
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)) || 0;
      const seconds = Math.floor((difference % (1000 * 60)) / 1000) || 0;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8" id="info-board">
      {/* Countdown Clock - Neobrutalist punk style */}
      <div className="bg-fuchsia-600 border-4 border-white text-center p-6 relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] rotate-[-0.5deg]">
        <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400" />
        <span className="text-xs font-mono tracking-widest text-yellow-300 font-extrabold uppercase block mb-3">
          ⚡️ STATUS OPERACJI: ODLICZANIE DO STARTU ⚡️
        </span>
        
        <div className="flex justify-center items-center gap-1.5 sm:gap-4">
          <div className="bg-zinc-950 py-2 px-1 sm:p-4 min-w-[60px] sm:min-w-[90px] border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <span className="text-2xl sm:text-5xl font-black font-sans text-lime-400 block tracking-tighter">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-zinc-300 font-mono font-bold uppercase">dni</span>
          </div>
          <div className="bg-zinc-950 py-2 px-1 sm:p-4 min-w-[60px] sm:min-w-[90px] border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <span className="text-2xl sm:text-5xl font-black font-sans text-lime-400 block tracking-tighter">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-zinc-300 font-mono font-bold uppercase">godzin</span>
          </div>
          <div className="bg-zinc-950 py-2 px-1 sm:p-4 min-w-[60px] sm:min-w-[90px] border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <span className="text-2xl sm:text-5xl font-black font-sans text-lime-400 block tracking-tighter">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-zinc-300 font-mono font-bold uppercase">minut</span>
          </div>
          <div className="bg-zinc-950 py-2 px-1 sm:p-4 min-w-[60px] sm:min-w-[90px] border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <span className="text-2xl sm:text-5xl font-black font-sans text-yellow-300 block tracking-tighter">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] text-zinc-300 font-mono font-bold uppercase">sekund</span>
          </div>
        </div>
      </div>

      {/* Main Details Grid - Artistic Flair colors and offsets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date & Time */}
        <div className="bg-fuchsia-600 text-white p-6 border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex gap-4 hover:scale-[1.01] transform transition duration-250 rotate-[-1deg]">
          <div className="w-12 h-12 rounded-none bg-black/30 border-2 border-white flex items-center justify-center text-yellow-300 shrink-0 shadow-[2px_2px_0px_0px_rgba(255,255,225,1)]">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight mb-1">Data & Godzina</h4>
            <div className="flex items-center gap-1.5 text-yellow-300 text-sm font-black font-mono mb-2">
              <span>SOBOTA, 20 CZERWCA</span>
              <span className="text-white/50">•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> OD 18:00</span>
            </div>
            <p className="text-zinc-100 text-sm font-medium leading-relaxed">
              Zaczynamy punktualnie od godziny osiemnastej. Koniec? Dopiero gdy ostatni gość opuści legowisko albo słońce zacznie palić nam plecy!
            </p>
          </div>
        </div>

        {/* Convention Criteria */}
        <div className="bg-yellow-400 text-zinc-950 p-6 border-4 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex gap-4 hover:scale-[1.01] transform transition duration-250 rotate-[0.5deg]">
          <div className="w-12 h-12 rounded-none bg-zinc-950 text-yellow-300 border-2 border-zinc-950 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight mb-1">Forma & Zasady</h4>
            <div className="inline-flex items-center gap-1 bg-zinc-950 text-white font-mono text-[9px] font-black px-2 py-0.5 rounded-none mb-2 select-none">
              GARDEN PARTY • SAMI DOROŚLI (18+)
            </div>
            <p className="text-zinc-900 text-sm font-bold leading-relaxed">
              Zabawa wyłącznie na świeżym powietrzu wśród zieleni. Ze względu na wieczorny, nieco szalony klimat i ogólną beztroskę, zapraszamy <strong className="underline decoration-2">wyłącznie osoby pełnoletnie</strong>. Dzieci zostawiamy pod czujną opieką babć!
            </p>
          </div>
        </div>

        {/* Culinary Menu */}
        <div className="bg-orange-500 text-white p-6 border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex gap-4 hover:scale-[1.01] transform transition duration-250 rotate-[-0.5deg]">
          <div className="w-12 h-12 rounded-none bg-black/30 border-2 border-white flex items-center justify-center text-yellow-300 shrink-0 shadow-[2px_2px_0px_0px_rgba(255,255,225,1)]">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight mb-1">Kultowe Smash Burgery</h4>
            <div className="inline-flex items-center gap-1 bg-black/30 text-lime-300 font-mono text-[9px] font-black px-2 py-0.5 rounded-none mb-2 select-none border border-white/20">
              SMASH BURGER REWOLUCJA
            </div>
            <p className="text-zinc-100 text-sm font-medium leading-relaxed">
              Głównym punktem programu gastronomicznego będą kradnące serca <strong className="text-yellow-300 underline">smash burgery</strong> usmażone na chrupko na gorącej płycie. Ponadto czekają na Was inne wędzone i grillowane kulinarne niespodzianki!
            </p>
          </div>
        </div>

        {/* Beverage setup */}
        <div className="bg-indigo-600 text-white p-6 border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex gap-4 hover:scale-[1.01] transform transition duration-250 rotate-[1deg]">
          <div className="w-12 h-12 rounded-none bg-black/30 border-2 border-white flex items-center justify-center text-yellow-300 shrink-0 shadow-[2px_2px_0px_0px_rgba(255,255,225,1)]">
            <GlassWater className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight mb-1">Ciekłe Paliwo</h4>
            <div className="inline-flex items-center gap-1 bg-black/30 text-lime-300 font-mono text-[9px] font-black px-2 py-0.5 rounded-none mb-2 select-none border border-white/20">
              OPEN BAR FULL SERVICE
            </div>
            <p className="text-zinc-100 text-sm font-medium leading-relaxed">
              Oprócz klasycznych wyskokowych trunków (wyszukana zimna wódka, wspaniałe kraftowe piwo, drinki) zapewniamy równie bogaty asortyment bezprocentowy – pyszne domowe lemoniady, soki i ożywcze bąbelki. Każdy znajdzie swój napój mocy!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
