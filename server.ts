import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Setup a robust DB_FILE location with a writable fallback for restricted cloud hosting filesystems
let DB_FILE = path.join(process.cwd(), 'database.json');
try {
  const testFile = path.join(process.cwd(), '.write-test');
  fs.writeFileSync(testFile, 'test');
  fs.unlinkSync(testFile);
} catch (e) {
  console.warn('Wykryto zablokowany lub nieprzystosowany do zapisu system plików. Używam /tmp jako fallback dla bazy.');
  DB_FILE = path.join('/tmp', 'database.json');
}

app.use(express.json());

interface RSVP {
  id: string;
  name: string;
  guestsCount: number;
  comment: string;
  createdAt: string;
}

interface SongRequest {
  id: string;
  title: string;
  artist: string;
  suggestedBy: string;
  createdAt: string;
}

interface DBStructure {
  rsvps: RSVP[];
  songs: SongRequest[];
}

const DEFAULT_DB: DBStructure = {
  rsvps: [],
  songs: []
};

// Helper to read database
function readDB(): DBStructure {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), 'utf8');
      return DEFAULT_DB;
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB, returning defaults', err);
    return DEFAULT_DB;
  }
}

// Helper to write database
function writeDB(data: DBStructure) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to DB', err);
  }
}

// API Routes
app.get('/api/drive-photos', async (req, res) => {
  try {
    const folderId = '1oHCCWBlgiDmU7tWv7vGu1Q2VWyTHgfD5';
    const response = await fetch(
      `https://drive.google.com/embeddedfolderview?id=${folderId}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
      }
    );
    
    // If the server-side fetch failed or got blocked by Google's anti-scraping/unauthorized mechanisms,
    // we gracefully fall back to a high-quality pre-populated user image dataset so the UI is 100% functional and error-free.
    if (!response.ok) {
      console.warn(`Google Drive embed responded with ${response.status} (${response.statusText}). Returning user-provided photos.`);
      return res.json({
        files: [
          { id: "1uCtcoX3eGC1ugX3hBit_gjvV3e-U76qG", name: "Solenizant_w_pelnej_okrasie.jpg" },
          { id: "1c3libJMVKfRZrlV8AawVWsBAk62U_7uA", name: "Ekipa_ogrodowa_na_starcie.jpg" },
          { id: "1l2e0kqla7cU_yuiU0YJlGiBHFy6Ag2zN", name: "Smash_burgery_na_goraco.jpg" },
          { id: "1yEM4qk1kJI2Wtv_Xmn7yKonjAEfyEW0F", name: "Wznosimy_urodzinowy_toast.jpg" }
        ]
      });
    }
    
    const html = await response.text();
    
    // Pattern to look for Google Drive file IDs and names (which are placed side-by-side inside lists of assets)
    // Typically: ["ID", "FILENAME.EXT"]
    const regex = /"([a-zA-Z0-9_-]{28,35})"\s*,\s*"([^"]+\.(?:jpe?g|png|webp|gif|heic|HEIC))"/gi;
    const matches: { id: string; name: string }[] = [];
    let match;
    
    while ((match = regex.exec(html)) !== null) {
      const id = match[1];
      const name = match[2];
      
      // Ensure the id doesn't match false positives like URLs or common terms
      if (
        id.length >= 28 && 
        id.length <= 35 && 
        !id.includes('/') && 
        !id.includes('.') && 
        !matches.some(m => m.id === id)
      ) {
        matches.push({ id, name });
      }
    }

    // Try a second backup regex pattern if the first one yields nothing
    if (matches.length === 0) {
      const backupRegex = /["'](1[a-zA-Z0-9_-]{28,35})["'][\s\S]{1,150}?["']([^"'\r\n]+?\.(?:jpe?g|png|webp|gif|heic|HEIC))["']/gi;
      let backupMatch;
      while ((backupMatch = backupRegex.exec(html)) !== null) {
        const id = backupMatch[1];
        const name = backupMatch[2];
        if (
          !id.includes('/') && 
          !id.includes('.') && 
          !matches.some(m => m.id === id)
        ) {
          matches.push({ id, name });
        }
      }
    }

    // If still empty after parsing (e.g. format changed), send some fallbacks
    if (matches.length === 0) {
      matches.push(
        { id: "1uCtcoX3eGC1ugX3hBit_gjvV3e-U76qG", name: "Solenizant_w_pelnej_okrasie.jpg" },
        { id: "1c3libJMVKfRZrlV8AawVWsBAk62U_7uA", name: "Ekipa_ogrodowa_na_starcie.jpg" },
        { id: "1l2e0kqla7cU_yuiU0YJlGiBHFy6Ag2zN", name: "Smash_burgery_na_goraco.jpg" },
        { id: "1yEM4qk1kJI2Wtv_Xmn7yKonjAEfyEW0F", name: "Wznosimy_urodzinowy_toast.jpg" }
      );
    }

    res.json({ files: matches });
  } catch (err: any) {
    console.warn('Error fetching custom Drive photos, using safe fallbacks:', err.message);
    res.json({
      files: [
        { id: "1uCtcoX3eGC1ugX3hBit_gjvV3e-U76qG", name: "Solenizant_w_pelnej_okrasie.jpg" },
        { id: "1c3libJMVKfRZrlV8AawVWsBAk62U_7uA", name: "Ekipa_ogrodowa_na_starcie.jpg" },
        { id: "1l2e0kqla7cU_yuiU0YJlGiBHFy6Ag2zN", name: "Smash_burgery_na_goraco.jpg" },
        { id: "1yEM4qk1kJI2Wtv_Xmn7yKonjAEfyEW0F", name: "Wznosimy_urodzinowy_toast.jpg" }
      ]
    });
  }
});

app.get('/api/data', (req, res) => {
  res.json(readDB());
});

app.post('/api/rsvps', (req, res) => {
  const { name, guestsCount, comment } = req.body;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Imię/Nazwisko jest wymagane.' });
  }

  const count = parseInt(guestsCount, 10) || 1;
  const db = readDB();
  
  const newRsvp: RSVP = {
    id: Date.now().toString(),
    name: name.trim(),
    guestsCount: count < 1 ? 1 : count,
    comment: (comment || '').trim(),
    createdAt: new Date().toISOString()
  };

  db.rsvps.push(newRsvp);
  writeDB(db);
  res.status(201).json(db.rsvps);
});

app.post('/api/songs', (req, res) => {
  const { title, artist, suggestedBy } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Tytuł piosenki jest wymagany.' });
  }

  const db = readDB();
  const newSong: SongRequest = {
    id: Date.now().toString(),
    title: title.trim(),
    artist: (artist || 'Nieznany').trim(),
    suggestedBy: (suggestedBy || 'Gość').trim(),
    createdAt: new Date().toISOString()
  };

  db.songs.push(newSong);
  writeDB(db);
  res.status(201).json(db.songs);
});

// Reset route for easy debugging/resetting
app.post('/api/reset', (req, res) => {
  writeDB(DEFAULT_DB);
  res.json({ message: 'Baza zresetowana pomyślnie!', data: DEFAULT_DB });
});

// Debug environment and file resolution
app.get('/api/debug-env', (req, res) => {
  try {
    const cwd = process.cwd();
    const distPath = path.join(cwd, 'dist');
    const rootFiles = fs.existsSync(cwd) ? fs.readdirSync(cwd) : [];
    const distFiles = fs.existsSync(distPath) ? fs.readdirSync(distPath) : [];
    
    res.json({
      node_env: process.env.NODE_ENV || 'undefined',
      cwd,
      __dirname: typeof __dirname !== 'undefined' ? __dirname : 'undefined',
      rootFiles,
      distFiles,
      distPathExists: fs.existsSync(distPath),
      indexExists: fs.existsSync(path.join(distPath, 'index.html')),
      port: PORT,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

// Configure Vite or Static Assets
async function start() {
  let distPath = path.join(process.cwd(), 'dist');
  
  // A robust check for production mode (checking PORT, __filename, or NODE_ENV)
  const isProduction = 
    process.env.NODE_ENV === 'production' || 
    (typeof __filename !== 'undefined' && (__filename.endsWith('server.cjs') || __filename.includes('dist')));

  console.log(`[Startup] Diagnostyka:`, {
    NODE_ENV: process.env.NODE_ENV || 'undefined',
    PORT,
    isProduction,
    __filename: typeof __filename !== 'undefined' ? __filename : 'undefined',
    cwd: process.cwd()
  });

  if (isProduction) {
    // If we are bundled as CommonJS inside dist/server.cjs, the index.html is actually in __dirname
    if (!fs.existsSync(path.join(distPath, 'index.html')) && typeof __dirname !== 'undefined' && fs.existsSync(path.join(__dirname, 'index.html'))) {
      distPath = __dirname;
    }
  }

  if (!isProduction) {
    console.log('Booting in DEVELOPMENT mode - using Vite middleware');
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    console.log(`Booting in PRODUCTION mode - serving static files from: ${distPath}`);
    if (!fs.existsSync(path.join(distPath, 'index.html'))) {
      console.error(`[CRITICAL] index.html nie istnieje w ścieżce: ${distPath}`);
    }
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server launched on http://0.0.0.0:${PORT} in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);
  });
}

start();
