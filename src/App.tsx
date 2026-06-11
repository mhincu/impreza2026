import { useState, useEffect } from 'react';
import { Cake, Sparkles, ChevronDown, RefreshCw, Flame, Music, MapPin, Gift, Users } from 'lucide-react';
import { RSVP, SongRequest, DBStructure } from './types';
import InfoSection from './components/InfoSection';
import RsvpSection from './components/RsvpSection';
import PlaylistSection from './components/PlaylistSection';
import GiftSection from './components/GiftSection';
import GallerySection from './components/GallerySection';
import CustomMap from './components/CustomMap';

export default function App() {
  const [data, setData] = useState<DBStructure>({ rsvps: [], songs: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  // Fetch initial data from APIs
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const json: DBStructure = await response.json();
      setData(json);
      setError('');
    } catch (err) {
      console.error('Error loading party data:', err);
      setError('Nie udało się załadować danych bazy. Uruchom serwer ponownie.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // Callback to add RSVP to Express server
  const handleAddRsvp = async (name: string, guestsCount: number, comment: string) => {
    const response = await fetch('/api/rsvps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, guestsCount, comment })
    });
    
    if (!response.ok) {
      const errJson = await response.json();
      throw new Error(errJson.error || 'Failed to submit RSVP');
    }
    
    const updatedRsvps: RSVP[] = await response.json();
    setData(prev => ({
      ...prev,
      rsvps: updatedRsvps
    }));
    
  };

  // Callback to add Song to Express server
  const handleAddSong = async (title: string, artist: string, suggestedBy: string) => {
    const response = await fetch('/api/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, artist, suggestedBy })
    });

    if (!response.ok) {
      const errJson = await response.json();
      throw new Error(errJson.error || 'Failed to submit song idea');
    }

    const updatedSongs: SongRequest[] = await response.json();
    setData(prev => ({
      ...prev,
      songs: updatedSongs
    }));
  };

  // Action to scroll to RSVP card
  const handleScrollToRsvp = () => {
    const rsvpCard = document.getElementById('rsvp-card');
    if (rsvpCard) {
      rsvpCard.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col font-mono selection:bg-lime-400 selection:text-zinc-950 antialiased relative">
      
      {/* Dynamic Background Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" 
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
        }}
      />
      
      {/* Top micro bar */}
      <header className="border-b-4 border-zinc-950 bg-fuchsia-600 sticky top-0 z-50 transition text-white shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 border-2 border-zinc-950 flex items-center justify-center text-zinc-950 font-black text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none rotate-[-4deg]">
              45
            </div>
            <span className="font-black text-sm tracking-widest font-sans uppercase text-white bg-zinc-950 px-2 py-1 border-2 border-zinc-950 rotate-[1deg]">
              HUB MICHAŁA
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-3 text-xs font-mono">
            <a href="#info-board" className="bg-zinc-950 hover:bg-lime-400 hover:text-zinc-950 text-white font-black px-3 py-1.5 border-2 border-zinc-950 transition uppercase tracking-wider">INFO</a>
            <a href="#localisation-card" className="bg-zinc-950 hover:bg-lime-400 hover:text-zinc-950 text-white font-black px-3 py-1.5 border-2 border-zinc-950 transition uppercase tracking-wider">LOKALIZACJA</a>
            <a href="#rsvp-card" className="bg-zinc-950 hover:bg-lime-400 hover:text-zinc-950 text-white font-black px-3 py-1.5 border-2 border-zinc-950 transition uppercase tracking-wider">ZAPISY RSVP</a>
            <a href="#playlist-card" className="bg-zinc-950 hover:bg-lime-400 hover:text-zinc-950 text-white font-black px-3 py-1.5 border-2 border-zinc-950 transition uppercase tracking-wider">PLAYLISTA</a>
            <a href="#gifts-card" className="bg-zinc-950 hover:bg-lime-400 hover:text-zinc-950 text-white font-black px-3 py-1.5 border-2 border-zinc-950 transition uppercase tracking-wider">PREZENTY</a>
            <a href="#gallery-card" className="bg-zinc-950 hover:bg-lime-400 hover:text-zinc-950 text-white font-black px-3 py-1.5 border-2 border-zinc-950 transition uppercase tracking-wider">GALERIA</a>
          </nav>

          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 text-xs font-mono bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black px-3.5 py-1.5 border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition cursor-pointer"
            title="Odśwież dane"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'ODŚWIEŻANIE' : 'ODŚWIEŻ'}
          </button>
        </div>
      </header>

      {/* Main Epic Hero Header */}
      <section className="relative pt-20 pb-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden min-h-[80vh] md:min-h-[85vh]">
        
        {/* Real Static Image Background from user's Google Drive */}
        <div className="absolute inset-0 z-0 opacity-90 pointer-events-none select-none overflow-hidden" id="hero-drive-background">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950/80 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/30 via-transparent to-zinc-950/30 z-10" />
          <img 
            src="https://lh3.googleusercontent.com/d/1JBggrJlToDT8TsciwuyG-Bu-oZnesalt"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "https://docs.google.com/uc?export=view&id=1JBggrJlToDT8TsciwuyG-Bu-oZnesalt";
            }}
            className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
            referrerPolicy="no-referrer"
            alt="Hero Background Card Backdrop"
          />
        </div>

        {/* Absolute glowing shapes */}
        <div className="absolute top-10 w-[280px] sm:w-[500px] h-20 bg-gradient-to-r from-fuchsia-600 to-lime-500 rounded-full blur-[100px] opacity-20 z-0" />
        
        <div className="relative z-10 flex flex-col items-center">
          {/* 45 Badge */}
          <div className="mb-8 relative select-none">
            <div className="w-32 h-32 bg-yellow-400 border-4 border-zinc-950 flex flex-col justify-center items-center shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] rotate-[-4deg]">
              <Cake className="w-8 h-8 text-zinc-950 mb-1 animate-bounce" />
              <span className="text-5xl font-black font-sans tracking-tighter text-zinc-950 leading-none">45</span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-950 uppercase font-black mt-1">lat minęło</span>
            </div>
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase text-white tracking-tighter max-w-5xl leading-[0.95] mb-6 select-none">
            Epickie 45. Urodziny <br />
            <span className="bg-lime-400 text-zinc-950 px-4 py-1.5 inline-block rotate-[1deg] border-4 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] mt-3">
              MICHAŁA!
            </span>
          </h1>

          <p className="max-w-2xl text-zinc-250 text-base sm:text-lg font-bold font-sans leading-relaxed mb-8 mt-4">
            Witaj na oficjalnym, trochę szalonym hubie informacyjnym najbardziej wyczekiwanego garden party roku! 
            Smash burgery, zimne drinki, potężne bity i niesamowite towarzystwo do samego rana. Potwierdź obecność już teraz!
          </p>

          {/* Action button cluster */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleScrollToRsvp}
              className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black px-8 py-4.5 border-4 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(163,230,53,1)] transition duration-150 uppercase tracking-widest text-xs cursor-pointer"
            >
              🔥 Zgłoś Obecność (RSVP)
            </button>
          </div>

          {/* Floating Scroll Notice with icon */}
          <div className="mt-14 animate-bounce">
            <ChevronDown className="w-6 h-6 text-fuchsia-500" />
          </div>
        </div>
      </section>

      {/* Main Page Layout Wrapper */}
      <div className="relative w-full flex-1 overflow-hidden">
        
        {/* Real Static Image Background from user's Google Drive acting as the back backdrop */}
        <div className="absolute inset-0 z-0 opacity-45 pointer-events-none select-none" id="party-drive-background">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-zinc-950/70 z-10" />
          <img 
            src="https://lh3.googleusercontent.com/d/1JBggrJlToDT8TsciwuyG-Bu-oZnesalt"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "https://docs.google.com/uc?export=view&id=1JBggrJlToDT8TsciwuyG-Bu-oZnesalt";
            }}
            className="w-full h-full object-cover filter brightness-[0.65] contrast-[1.1]"
            referrerPolicy="no-referrer"
            alt="Main Page Backdrop"
          />
        </div>

        {/* Floating Drive Watermark/Badge for architectural honesty */}
        <div className="absolute top-4 right-4 z-10 hidden md:flex items-center gap-2 bg-zinc-900/90 text-white border-2 border-zinc-700 px-3 py-1.5 text-[10px] font-mono tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] select-none">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          TŁO ZDJĘCIOWE: DYSK GOOGLE
        </div>

        <main className="max-w-6xl mx-auto px-4 py-8 space-y-16 relative z-10">
        
        {/* Section 1: Info Board */}
        <section id="info-board" className="scroll-mt-24">
          <InfoSection />
        </section>

        {/* Section 2: Localization */}
        <section id="localisation-card" className="scroll-mt-24">
          <CustomMap />
        </section>

        {/* Section 4: RSVP confirmation board */}
        <section id="rsvp-card" className="scroll-mt-24">
          {loading ? (
            <div className="bg-zinc-900 border-4 border-white p-12 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col justify-center items-center gap-4 text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-lime-400" />
              <p className="text-zinc-300 text-sm font-mono font-bold uppercase tracking-wider">Uruchamianie bazy zgłoszeń...</p>
            </div>
          ) : (
            <RsvpSection 
              rsvps={data.rsvps} 
              onAddRsvp={handleAddRsvp} 
            />
          )}
        </section>

        {/* Section 5: Spotify playlist and track suggestion board */}
        <section id="playlist-card" className="scroll-mt-24">
          <PlaylistSection songs={data.songs} onAddSong={handleAddSong} />
        </section>

        {/* Section 6: Decathlon present card info */}
        <section id="gifts-card" className="scroll-mt-24">
          <GiftSection />
        </section>

        {/* Section 7: Nostalgic polaroids gallery */}
        <section id="gallery-card" className="scroll-mt-24">
          <GallerySection />
        </section>

      </main>
      </div>

      {/* Footer copyright */}
      <footer className="border-t-4 border-zinc-950 bg-fuchsia-600 text-white mt-20 py-12 text-center text-xs font-mono space-y-3 px-4 shadow-[inset_0_4px_0_0_rgba(0,0,0,0.15)]">
        <p className="font-bold uppercase tracking-wider text-white">
          Zaprojektowane z ❤️ i szczyptą urodzinowego szaleństwa dla <span className="bg-yellow-400 text-zinc-950 px-2 py-0.5 border border-zinc-950 inline-block font-black select-none">MICHALA</span> z okazji jego 45-lecia!
        </p>
        <p className="font-bold text-fuchsia-100">
          © 2026 Falenty Nowe. Obowiązuje zakaz nudzenia się i smutku. Smash burgery chronione są międzynarodowym prawem smaku.
        </p>
      </footer>

    </div>
  );
}
