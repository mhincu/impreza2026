import React, { useState } from 'react';
import { Music, Radio, Send, Headset } from 'lucide-react';
import { SongRequest } from '../types';

interface PlaylistSectionProps {
  songs: SongRequest[];
  onAddSong: (title: string, artist: string, suggestedBy: string) => Promise<void>;
}

export default function PlaylistSection({ songs, onAddSong }: PlaylistSectionProps) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [suggestedBy, setSuggestedBy] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const playlistUrl = "https://open.spotify.com/playlist/5fYE5eNjfX1thaHaGgw6hF";
  // Standard Spotify embed player URL
  const embedUrl = "https://open.spotify.com/embed/playlist/5fYE5eNjfX1thaHaGgw6hF?utm_source=generator&theme=0";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Tytuł piosenki jest wymagany.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await onAddSong(title, artist, suggestedBy);
      setSuccess(true);
      setTitle('');
      setArtist('');
      setSuggestedBy('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Ups! Nie udało się zapisać piosenki. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-100 text-zinc-900 border-4 border-lime-400 p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden" id="playlist-card">
      <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-lime-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* Left Side: Spotify Player Embed */}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-400 border-2 border-zinc-950 text-zinc-950 text-xs font-mono font-bold mb-4 rotate-[1deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none">
              <Radio className="w-3.5 h-3.5 animate-pulse text-zinc-950" />
              Oficjalna Playlista Spotify
            </div>
            
            <h3 className="text-3xl font-black uppercase text-zinc-950 mb-2 tracking-tight">
              Wkręć Się w Imprezowy Bit!
            </h3>
            <p className="text-zinc-700 text-sm leading-relaxed mb-4 font-bold">
              Od głośnych rockowych klasyków, przez taneczny funk i pop, aż po najlepszą elektronikę. Oto playlista, która utrzyma nas na nogach aż do wschodu słońca! Posłuchaj zajawki bezpośrednio poniżej.
            </p>
          </div>

          {/* Embedded Spotify Player */}
          <div className="border-4 border-zinc-950 overflow-hidden bg-zinc-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] h-[352px]">
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ border: 0 }}
              title="Michał's 45th Birthday Party Playlist"
            />
          </div>

          <div className="pt-2 text-center">
            <a 
              href={playlistUrl}
              target="_blank"
              rel="no-referrer noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black px-6 py-3 border-2 border-zinc-950 text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition duration-150 select-none cursor-pointer uppercase tracking-wider"
            >
              <Music className="w-4 h-4 shrink-0" />
              Otwórz playlistę bezpośrednio w Spotify
            </a>
          </div>
        </div>

        {/* Right Side: Propose a song form and suggestion box */}
        <div className="flex-1 flex flex-col justify-between bg-white p-5 sm:p-6 border-2 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Headset className="w-5 h-5 text-lime-600" />
              <h4 className="text-xl font-black uppercase text-zinc-950">Masz swój imprezowy hymn?</h4>
            </div>
            <p className="text-zinc-650 text-xs leading-relaxed mb-6 font-bold">
              Dodaj utwory, przy których Twoje nogi same rwą się do tańca. Pojawią się one w szafie sugestii poniżej, a Michał wrzuci je bezpośrednio do oficjalnej playlisty!
            </p>

            {/* Song Request Form */}
            <form onSubmit={handleSubmit} className="space-y-3 mb-6">
              <div>
                <input 
                  type="text" 
                  placeholder="Tytuł utworu (np. Get Lucky)*"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white border-2 border-zinc-950 text-zinc-900 placeholder-zinc-400 p-3 text-xs focus:bg-yellow-50 transition outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="text" 
                  placeholder="Wykonawca (np. Daft Punk)"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  className="w-full bg-white border-2 border-zinc-950 text-zinc-900 placeholder-zinc-400 p-3 text-xs focus:bg-yellow-50 transition outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
                <input 
                  type="text" 
                  placeholder="Twoje imię"
                  value={suggestedBy}
                  onChange={(e) => setSuggestedBy(e.target.value)}
                  className="w-full bg-white border-2 border-zinc-950 text-zinc-900 placeholder-zinc-400 p-3 text-xs focus:bg-yellow-50 transition outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>

              {error && <p className="text-red-650 text-xs mt-1 font-bold">{error}</p>}
              {success && <p className="text-emerald-650 text-xs mt-1 font-black">🎵 Piosenka zgłoszona! Michał szykuje głośniki!</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-lime-400 hover:text-zinc-950 text-white font-black py-3 px-4 uppercase tracking-widest text-xs border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition duration-150 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 animate-bounce" />
                {loading ? 'Zgłaszanie...' : 'Zaproponuj muzykę'}
              </button>
            </form>
          </div>

          {/* Real-time Song Requests Board */}
          <div>
            <h5 className="text-xs font-mono text-zinc-800 font-bold tracking-wider mb-3 uppercase">Szafa grająca gości ({songs.length}):</h5>
            <div className="bg-yellow-50 border-2 border-zinc-950 p-3 max-h-[160px] overflow-y-auto space-y-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-zinc-900">
              {songs.length === 0 ? (
                <p className="text-zinc-500 text-xs text-center py-4 italic font-bold">Brak zgłoszeń. Bądź pierwszym, który rozkręci imprezę!</p>
              ) : (
                [...songs].reverse().map((song) => (
                  <div key={song.id} className="flex justify-between items-center text-xs py-1.5 border-b border-zinc-250 last:border-0">
                    <div className="flex-1 pr-3 truncate">
                      <span className="text-zinc-950 font-bold block truncate">{song.title}</span>
                      <span className="text-zinc-650 text-[10px] block truncate font-mono">{song.artist || 'Nieznany wykonawca'}</span>
                    </div>
                    {song.suggestedBy && (
                      <span className="bg-lime-100 text-lime-950 font-mono text-[9px] px-2 py-0.5 border border-lime-400 font-black shrink-0 max-w-[80px] truncate" title={`Zaproponowane przez ${song.suggestedBy}`}>
                        👤 {song.suggestedBy}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
