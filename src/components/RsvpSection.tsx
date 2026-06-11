import React, { useState } from 'react';
import { Users, UserPlus, HeartHandshake, HelpCircle, Check, Loader2 } from 'lucide-react';
import { RSVP } from '../types';

interface RsvpSectionProps {
  rsvps: RSVP[];
  onAddRsvp: (name: string, guestsCount: number, comment: string) => Promise<void>;
}

export default function RsvpSection({ rsvps, onAddRsvp }: RsvpSectionProps) {
  const [name, setName] = useState('');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Calculates total number of confirmed heads
  const totalGuests = rsvps.reduce((sum, r) => sum + r.guestsCount, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Imię lub Nazwisko jest wymagane!');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await onAddRsvp(name, guestsCount, comment);
      setSuccess(true);
      setName('');
      setGuestsCount(2); // reset to default
      setComment('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Coś poszło nie tak. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-100 text-zinc-900 border-4 border-fuchsia-600 p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden" id="rsvp-card">
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side (Form + Quick Stats) - 7 cols */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-fuchsia-600 border-2 border-zinc-950 text-white text-xs font-mono font-bold mb-4 rotate-[-1deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none">
              <UserPlus className="w-3.5 h-3.5" />
              FORMULARZ RSVP
            </div>
            
            <h3 className="text-3xl font-black uppercase text-zinc-950 mb-2 tracking-tight">
              Będziesz na moich 45. urodzinach?
            </h3>
            <p className="text-zinc-700 text-sm leading-relaxed font-bold">
              Daj znać do <strong className="text-fuchsia-650 underline">15 czerwca</strong>, abyśmy mogli dopasować nakłady wołowiny na smash burgery i zagwarantować odpowiedni zapas zimnych płynów!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 border-2 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {/* Guest Name */}
            <div>
              <label className="block text-xs font-mono text-zinc-800 mb-1.5 font-bold uppercase tracking-wider">IMIĘ I NAZWISKO (LUB CZŁONKOWIE KLANU): *</label>
              <input 
                type="text" 
                placeholder="np. Karolina i Janusz Kowalscy"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border-2 border-zinc-950 text-zinc-900 placeholder-zinc-400 p-3 text-sm focus:bg-yellow-50 transition outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                required
              />
            </div>

            {/* Stepper for guests count */}
            <div>
              <label className="block text-xs font-mono text-zinc-800 mb-1.5 font-bold uppercase tracking-wider">LICZBA OSÓB (TYLKO DLA DOROSŁYCH!):</label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setGuestsCount(prev => Math.max(1, prev - 1))}
                  className="w-11 h-11 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-lg select-none cursor-pointer"
                >
                  -
                </button>
                <div className="bg-white px-6 py-2.5 border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-w-[60px] text-center">
                  <span className="text-zinc-950 font-black font-sans text-lg">{guestsCount}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setGuestsCount(prev => Math.min(10, prev + 1))}
                  className="w-11 h-11 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-lg select-none cursor-pointer"
                >
                  +
                </button>
                <span className="text-zinc-500 text-xs font-medium">Obejmuje Ciebie oraz Twoją osobę towarzyszącą.</span>
              </div>
            </div>

            {/* Comment */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-mono text-zinc-800 font-bold uppercase tracking-wider">DODAJ SŁOWO OD SIEBIE:</label>
              </div>
              <textarea 
                rows={3}
                placeholder="np. 'Będziemy na pewno! Szykujcie szklanki!' lub inne przesłanie dla solenizanta"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-white border-2 border-zinc-950 text-zinc-900 placeholder-zinc-400 p-3 text-xs focus:bg-yellow-50 transition outline-none resize-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            {error && <p className="text-red-650 text-xs font-bold">{error}</p>}
            {success && <p className="text-emerald-650 text-xs font-black">🎉 Potwierdzenie wysłane pomyślnie! Do zobaczenia na imprezie!</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-fuchsia-600 text-white font-extrabold py-4 px-4 uppercase tracking-widest text-xs border-2 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition duration-200 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" /> Wysyłanie...
                </>
              ) : (
                <>
                  <HeartHandshake className="w-4 h-4" /> POTWIERDZAM OBECNOŚĆ!
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side (Confirmed Guests Counter & List Scroll) - 5 cols */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Glowing Attendees Sum Card */}
          <div className="bg-fuchsia-600 text-white border-4 border-zinc-950 p-5 text-center relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-[1deg]">
            <span className="text-[10px] font-mono text-yellow-300 tracking-widest font-black uppercase block mb-1">
              LICZNIK ZGŁOSZONYCH GLADIATORÓW
            </span>
            <div className="flex items-center justify-center gap-3 mt-1.5">
              <span className="text-6xl font-black text-white font-sans tracking-tighter">
                {totalGuests}
              </span>
              <div className="text-left leading-none uppercase shrink-0">
                <span className="text-xs text-yellow-300 font-mono block font-black">potwierdzonych</span>
                <span className="text-lg text-white font-black font-sans">GOŚCI</span>
              </div>
            </div>
            {totalGuests > 0 && (
              <span className="text-[10px] text-zinc-100 font-bold block mt-3 uppercase tracking-wider italic">
                Szykuje się absolutnie szalona biesiada!
              </span>
            )}
          </div>

          {/* Confirmed Guests List Scroll */}
          <div className="flex-1 flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-fuchsia-600" />
                <h4 className="text-sm font-black text-zinc-950 font-sans uppercase tracking-tight">Kto już potwierdził:</h4>
              </div>
              <span className="bg-zinc-950 text-white text-[10px] font-mono font-bold px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                WPISÓW: {rsvps.length}
              </span>
            </div>

            <div className="bg-white border-2 border-zinc-950 p-4 flex-1 overflow-y-auto max-h-[320px] space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.85)]">
              {rsvps.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                  <HelpCircle className="w-8 h-8 text-zinc-400 animate-pulse mb-2" />
                  <p className="text-zinc-550 text-xs italic font-bold">Brak potwierdzonych zgłoszeń.</p>
                  <p className="text-zinc-600 text-[10px] mt-1 font-bold uppercase tracking-wider">Zgłoś swoją obecność jako pierwszy!</p>
                </div>
              ) : (
                [...rsvps].reverse().map((rsvp, idx) => (
                  <div 
                    key={rsvp.id} 
                    className="p-3.5 bg-yellow-50 border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:border-fuchsia-600 transition duration-150 flex items-start gap-3 relative overflow-hidden text-zinc-900"
                  >
                    {/* Decorative tick mark to verify presence */}
                    <div className="w-6 h-6 bg-fuchsia-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                      <Check className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2 mb-1">
                        <span className="text-zinc-950 font-black text-sm truncate font-sans">
                          {rsvp.name}
                        </span>
                        <span className="bg-fuchsia-100 text-fuchsia-800 font-mono text-[9px] px-2 py-0.5 border border-fuchsia-400 font-extrabold shrink-0">
                          +{rsvp.guestsCount} {rsvp.guestsCount === 1 ? 'osoba' : rsvp.guestsCount <= 4 ? 'osoby' : 'osób'}
                        </span>
                      </div>
                      
                      {rsvp.comment && (
                        <p className="text-zinc-805 text-xs whitespace-pre-wrap leading-relaxed bg-white p-2 border border-zinc-300 font-bold font-sans break-words mt-1.5 shadow-sm">
                          {rsvp.comment}
                        </p>
                      )}
                      
                      <span className="text-[9px] text-zinc-500 font-mono font-extrabold block mt-2">
                        Potwierdzono: {(() => {
                          try {
                            const d = new Date(rsvp.createdAt);
                            if (isNaN(d.getTime())) {
                              const safeStr = rsvp.createdAt.replace(/\s+/g, 'T');
                              const d2 = new Date(safeStr);
                              return isNaN(d2.getTime()) ? rsvp.createdAt : d2.toLocaleString('pl-PL');
                            }
                            return d.toLocaleString('pl-PL');
                          } catch (err) {
                            return rsvp.createdAt;
                          }
                        })()}
                      </span>
                    </div>
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
