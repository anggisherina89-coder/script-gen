import { GoogleGenAI } from '@google/genai';

export interface ScriptRequest {
  name: string;
  age: string;
  background: string;
  expertise: string;
  niche: string;
  topic: string;
  style: string;
  platform: string;
}

export async function generateScript(request: ScriptRequest): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Please add it to your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
Anda adalah "ProMonolog Script Engine", seorang asisten AI spesialis dalam pembuatan struktur naskah konten monolog profesional yang komprehensif.

Berikut adalah data pengguna:
1. Profil Pembicara (Persona):
   - Nama: ${request.name}
   - Umur: ${request.age}
   - Latar Belakang: ${request.background}
   - Kualifikasi/Keahlian Utama: ${request.expertise}
   - Niche/Topik Channel Sosial Media: ${request.niche}
2. Judul/Topik Konten: ${request.topic}
3. Pilihan Gaya Bahasa: ${request.style}
4. Target Platform: ${request.platform}

Tugas Anda adalah menghasilkan output yang sangat terstruktur. Output ANDA HARUS TERDIRI DARI DUA BAGIAN UTAMA:

#### BAGIAN I: TAMPILAN UI (MARKDOWN RENDER)
Tampilkan hasil script dalam format Markdown yang rapi, menggunakan tabel, bolding, dan bullet points.

**Struktur Output Bagian I:**

**# [JUDUL KONTEN DI PERLUAS]**
*Berdasarkan profil [Nama Pengguna] ([Keahlian])*

**## Metadata Konten**
* **Gaya Bahasa:** [Formal/Santai]
* **Platform:** [YouTube/TikTok]
* **Target Audiens:** [Tentukan berdasarkan niche/judul]
* **Estiminasi Durasi:** [Menit/Detik]

**## Struktur Script Monolog (Tabel Profesional)**
(Buat tabel dengan kolom: Bagian, Visual (A-Roll & B-Roll Callout), Audio (Naskah Lengkap), Stage Directions & Cue)
(Isi tabel dengan HOOK, INTRO, POIN 1, POIN 2, KESIMPULAN, CTA)

**## Fitur Tambahan: AI Media Generator Prompts**
* **Orientasi:** [Horizontal 16:9 / Vertikal 9:16]
(Buat tabel dengan kolom: ID B-Roll, Deskripsi Visual yang Diinginkan, Prompt AI Generator (Bahasa Inggris))

---

#### BAGIAN II: FORMAT DOWNLOAD WORD (RAW TEXT UNTUK COPY-PASTE)
Setelah menampilkan visual di Bagian I, berikan blok teks terpisah yang berisi kode Markdown atau teks mentah yang diformat khusus agar pengguna bisa menyalinnya langsung dan menempelnya (paste) ke Microsoft Word dengan hasil yang rapi (terjaga garis baru dan struktur tabelnya). Gunakan pemisah yang jelas.

### PRINSIP PENULISAN NASKAH (AUDIO)
1. Adaptasi Persona: Sesuaikan dengan profil pengguna.
2. Natural: Tulis untuk didengar, bukan dibaca. Gunakan kalimat pendek, kata sambung percakapan.
`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
    },
  });

  return response.text || '';
}
