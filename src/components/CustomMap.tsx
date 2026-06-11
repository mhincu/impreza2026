import { MapPin, Navigation, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function CustomMap() {
  const [copied, setCopied] = useState(false);
  const address = "Jabłoniowa 12, Falenty Nowe";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe Google Maps public embed URL for Jabłoniowa 12, Falenty Nowe
  const mapEmbedUrl = "https://maps.google.com/maps?q=Jab%C5%82oniowa%2012,%20Falenty%20Nowe&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="bg-zinc-900 border-4 border-white p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden" id="localisation-card">
      {/* Decorative gradient light */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Address Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-405 border-2 border-zinc-950 text-zinc-950 text-xs font-mono font-bold mb-4 rotate-[-1deg] shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <MapPin className="w-3.5 h-3.5 animate-bounce" />
              Lokalizacja Imprezy
            </div>
            
            <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-2 underline decoration-blue-500 decoration-4">
              Sekretna Kwatera Jabłoniowa
            </h3>
            
            <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-medium">
              Garden party odbędzie się na malowniczej działce w podwarszawskich Falentach. 
              Gwarantujemy drzewa jabłoniowe, świeże powietrze, idealnie skoszoną trawiastą nawierzchnię 
              oraz sąsiadów, którzy (mamy nadzieję) rano nas nie ujawnią policji!
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-zinc-950 p-4 border-2 border-white flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <div>
                <span className="text-[10px] text-zinc-500 font-mono font-bold block uppercase tracking-wider">ADRES DOCELOWY</span>
                <span className="text-lime-300 font-black font-sans tracking-tight text-lg">{address}</span>
              </div>
              <button 
                onClick={handleCopy}
                className="p-2.5 bg-zinc-800 hover:bg-lime-400 hover:text-zinc-950 text-white border-2 border-white transition duration-200 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                title="Skopiuj adres"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="no-referrer noreferrer"
                className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black px-5 py-3 border-2 border-zinc-950 uppercase tracking-widest text-xs shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 transition duration-150"
              >
                <Navigation className="w-4 h-4" />
                Nawiguj w Google Maps
              </a>
              <a 
                href="https://yanosik.pl"
                target="_blank"
                rel="no-referrer noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-850 hover:bg-zinc-700 text-white font-bold px-5 py-3 border-2 border-white uppercase tracking-widest text-xs shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 transition duration-150"
              >
                Odpalić Yanosika
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Map Embed */}
        <div className="flex-1 min-h-[280px] rounded-none overflow-hidden border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.7)] relative group bg-zinc-950">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '280px' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="opacity-95 group-hover:opacity-100 transition duration-300 filter invert contrast-110 saturate-100 brightness-95"
            title="Google Maps Location - Falenty Nowe"
          />
        </div>
      </div>
    </div>
  );
}
