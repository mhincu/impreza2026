import { useEffect, useState } from 'react';
import { Images, ExternalLink, Camera, Loader2, Sparkles } from 'lucide-react';

interface DriveFile {
  id: string;
  name: string;
}

interface PhotoItem {
  id: string;
  image: string;
  caption: string;
  vibe: string;
}

function beautifyFileName(name: string): string {
  // Strip extension
  let base = name.replace(/\.[a-zA-Z0-9]+$/, '');
  // Replace symbols/markers with spaces
  base = base.replace(/[-_.]/g, ' ').trim();
  // Capitalize first letter
  if (base.length > 0) {
    base = base.charAt(0).toUpperCase() + base.slice(1);
  }
  return base || "Zdjęcie z Dysku Google";
}

const vibesList = [
  "Uchwycone w obiektywie! 🔥",
  "Klasyczne ujęcie solenizanta! 👑",
  "Ekipa w pełnej gotowości! ⚡",
  "Co stało się na Jabłoniowej...",
  "Oficjalny dowód w sprawie! 😉",
  "Kamera nie kłamie! 📸",
  "Wspomnienie, które zostanie na zawsze ✨",
  "Faza garden party w pełnym rozkwicie 🌸"
];

export default function GallerySection() {
  const albumUrl = "https://photos.app.goo.gl/BPKBxoHtYoLPRiZU6";
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch('/api/drive-photos')
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data) => {
        if (!active) return;
        if (data.files && data.files.length > 0) {
          const mapped = data.files.map((file: DriveFile, idx: number) => ({
            id: file.id,
            image: `https://drive.google.com/thumbnail?id=${file.id}&sz=w800`,
            caption: beautifyFileName(file.name),
            vibe: vibesList[idx % vibesList.length]
          }));
          setPhotos(mapped);
        } else {
          // Fallback to high-quality user photos using our fast thumbnail service
          setPhotos([
            {
              id: "1uCtcoX3eGC1ugX3hBit_gjvV3e-U76qG",
              image: "https://drive.google.com/thumbnail?id=1uCtcoX3eGC1ugX3hBit_gjvV3e-U76qG&sz=w800",
              caption: "Solenizant w pełnej okazałości",
              vibe: "Uchwycone w obiektywie! 🔥"
            },
            {
              id: "1c3libJMVKfRZrlV8AawVWsBAk62U_7uA",
              image: "https://drive.google.com/thumbnail?id=1c3libJMVKfRZrlV8AawVWsBAk62U_7uA&sz=w800",
              caption: "Ekipa ogrodowa na starcie",
              vibe: "Ekipa w pełnej gotowości! ⚡"
            },
            {
              id: "1l2e0kqla7cU_yuiU0YJlGiBHFy6Ag2zN",
              image: "https://drive.google.com/thumbnail?id=1l2e0kqla7cU_yuiU0YJlGiBHFy6Ag2zN&sz=w800",
              caption: "Smash burgery na gorąco",
              vibe: "Co stało się na Jabłoniowej..."
            },
            {
              id: "1yEM4qk1kJI2Wtv_Xmn7yKonjAEfyEW0F",
              image: "https://drive.google.com/thumbnail?id=1yEM4qk1kJI2Wtv_Xmn7yKonjAEfyEW0F&sz=w800",
              caption: "Wznosimy urodzinowy toast",
              vibe: "Faza garden party w pełnym rozkwicie 🌸"
            }
          ]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Error fetching photos inside component, using user fallbacks:', err);
        if (!active) return;
        setPhotos([
          {
            id: "1uCtcoX3eGC1ugX3hBit_gjvV3e-U76qG",
            image: "https://drive.google.com/thumbnail?id=1uCtcoX3eGC1ugX3hBit_gjvV3e-U76qG&sz=w800",
            caption: "Solenizant w pełnej okazałości",
            vibe: "Uchwycone w obiektywie! 🔥"
          },
          {
            id: "1c3libJMVKfRZrlV8AawVWsBAk62U_7uA",
            image: "https://drive.google.com/thumbnail?id=1c3libJMVKfRZrlV8AawVWsBAk62U_7uA&sz=w800",
            caption: "Ekipa ogrodowa na starcie",
            vibe: "Ekipa w pełnej gotowości! ⚡"
          },
          {
            id: "1l2e0kqla7cU_yuiU0YJlGiBHFy6Ag2zN",
            image: "https://drive.google.com/thumbnail?id=1l2e0kqla7cU_yuiU0YJlGiBHFy6Ag2zN&sz=w800",
            caption: "Smash burgery na gorąco",
            vibe: "Co stało się na Jabłoniowej..."
          },
          {
            id: "1yEM4qk1kJI2Wtv_Xmn7yKonjAEfyEW0F",
            image: "https://drive.google.com/thumbnail?id=1yEM4qk1kJI2Wtv_Xmn7yKonjAEfyEW0F&sz=w800",
            caption: "Wznosimy urodzinowy toast",
            vibe: "Faza garden party w pełnym rozkwicie 🌸"
          }
        ]);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="bg-zinc-100 text-zinc-900 border-4 border-lime-400 p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden" id="gallery-card">
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-lime-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-400 border-2 border-zinc-950 text-zinc-950 text-xs font-mono font-bold mb-3 rotate-[-1deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none">
            <Images className="w-3.5 h-3.5" />
            Wspomnienia z ubiegłych imprez
          </div>
          <h3 className="text-3xl font-black uppercase text-zinc-950 tracking-tight">
            Kroniki Szaleństwa Michała
          </h3>
          <p className="text-zinc-600 text-sm font-bold">
            Wyciągnęliśmy prosto z Twojego folderu Dysku Google najświeższe ujęcia! Zobacz pełen album w Google Photos.
          </p>
        </div>

        <a 
          href={albumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black px-5 py-4.5 border-4 border-zinc-950 text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition duration-150 select-none cursor-pointer uppercase tracking-wider text-center shrink-0"
        >
          <Camera className="w-5 h-5 shrink-0" />
          Otwórz Album Google Photos
          <ExternalLink className="w-4 h-4 shrink-0" />
        </a>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3" id="loading-photos">
          <Loader2 className="w-10 h-10 text-lime-500 animate-spin" />
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
            Wyszukiwanie zdjęć na Dysku...
          </p>
        </div>
      ) : (
        /* Grid structure of Polaroids */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((item, idx) => (
            <div 
              key={item.id + '-' + idx} 
              className="bg-white p-4 border-2 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:rotate-[1.5deg] hover:scale-[1.02] transition duration-200 flex flex-col justify-between"
            >
              {/* Foto area */}
              <div className="aspect-square w-full border-2 border-zinc-950 overflow-hidden bg-zinc-200 mb-3 relative">
                <img 
                  src={item.image} 
                  alt={item.caption}
                  onError={(e) => {
                    if (item.id && !item.id.startsWith('fallback')) {
                      (e.currentTarget as HTMLImageElement).src = `https://docs.google.com/uc?export=view&id=${item.id}`;
                    }
                  }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-95 hover:opacity-100 transition duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-zinc-950 text-white text-[9px] font-mono font-bold px-2.5 py-1 border border-white flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-2.5 h-2.5 text-yellow-400 shrink-0" />
                  LIVE
                </div>
              </div>

              {/* Label in Polish */}
              <div className="space-y-1">
                <p className="text-zinc-950 font-black text-xs uppercase tracking-wider leading-tight min-h-[32px] line-clamp-2">
                  {item.caption}
                </p>
                <p className="text-[10px] text-zinc-500 font-mono font-semibold block leading-snug">
                  {item.vibe}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
