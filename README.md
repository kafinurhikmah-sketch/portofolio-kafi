# Portofolio Profesional Kafi Nur Hikmah 🚀
### *Full-Stack Web Developer & Full-Stack Mobile Developer*

Website portofolio profesional satu halaman (*single-page application*) yang dirancang modern, responsif, dan siap kerja (*job-ready*) untuk menarik perhatian recruiter dan hiring manager pada posisi **Full-Stack Web Developer** dan **Full-Stack Mobile Developer**.

---

## ✨ Fitur Utama

1. **Desain Modern & Tech-Focused**:
   - Skema warna Dark Mode elegan (`#050811`, Slate/Zinc) dengan aksen *Electric Blue*, *Cyan Neon*, dan *Purple Glow*.
   - Efek visual *Glassmorphism*, ambient blur, dan animasi interaktif halus.
   - 100% responsif pada Desktop, Tablet, hingga Layar Ponsel pintar.

2. **Section Lengkap Sesuai Spesifikasi**:
   - **Header & Navbar**: Brand logo `<K/ >`, status ketersediaan kerja, tautan navigasi, tombol CTA *Download CV* (modal viewer) & *Hire Me*, serta menu mobile responsif.
   - **Hero Section**: Headline kuat, subheadline penegasan keahlian web scalable & mobile performa tinggi, tombol aksi cepat (*Lihat Proyek*, *Hubungi Saya*), sosial media (GitHub, LinkedIn, Email, WhatsApp), dan kartu terminal interaktif.
   - **About Me**: Narasi keahlian pemecahan masalah, penulisan *clean code*, optimasi backend, dan arsitektur modular.
   - **Tech Stack & Skills**: Terbagi dalam 4 pilar lengkap:
     - *Web Frontend*: HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS.
     - *Mobile Development*: Flutter, Dart, React Native, Integrasi Android/iOS, State Management.
     - *Backend & Database*: Node.js, Express, PHP (Laravel), Python, RESTful API, PostgreSQL, MySQL, MongoDB.
     - *Tools & DevOps*: Git, GitHub, Docker, Postman, Linux.
   - **Featured Projects**: Filter kategori interaktif (*Semua Proyek*, *Web App*, *Mobile App*), kartu proyek dengan ringkasan *Problem* & *Solution*, badge teknologi, serta tautan langsung ke *Live Demo* dan *GitHub Repository*.
   - **Experience & Education**: Linimasa vertikal elegan (*timeline*) yang menampilkan rekayasa perangkat lunak, proyek profesional, dan fondasi akademik.
   - **Contact Section**: Formulir kontak interaktif dengan validasi dan notifikasi toast, serta kartu info kontak langsung (Email, Lokasi, GitHub, LinkedIn).
   - **Footer & Extras**: Hak cipta atas nama Kafi Nur Hikmah, tombol melayang *Back to Top*, dan modal *Curriculum Vitae (CV) Summary*.

---

## 📁 Struktur Direktori

```
portofolio/
├── index.html                  # Halaman utama single-page
├── assets/
│   ├── css/
│   │   └── style.css           # Efek visual khusus, glassmorphism, animasi & scrollbar
│   └── js/
│       ├── projects-data.js    # Data proyek terstruktur (mudah ditambah/diubah)
│       └── main.js             # Logika interaktif: filter, scroll spy, form toast, modal
└── README.md                   # Dokumentasi penggunaan & deployment
```

---

## 🚀 Cara Menjalankan Secara Lokal

### Cara 1: Langsung Buka di Browser (Paling Cepat)
Cukup klik dua kali file `index.html` pada File Explorer atau klik kanan lalu pilih **Open with Google Chrome / Microsoft Edge**.

### Cara 2: Melalui Laragon (Localhost)
Karena folder berada di `d:\laragon\www\VS_Code\portofolio`:
1. Buka aplikasi **Laragon**.
2. Klik tombol **Start All** (Apache/Nginx).
3. Buka browser dan kunjungi:
   ```
   http://localhost/VS_Code/portofolio/
   ```

### Cara 3: Menggunakan Ekstensi Live Server di VS Code
1. Buka folder `portofolio` di VS Code.
2. Klik kanan pada file `index.html`.
3. Pilih **Open with Live Server**.

---

## 🛠️ Panduan Kustomisasi Konten

### 1. Mengubah Link Sosial Media & Kontak
Buka file `index.html`, cari teks berikut dan ganti dengan akun asli Anda:
- **Email**: Ganti `kafinurhikmah@gmail.com`
- **GitHub**: Ganti `https://github.com/kafinurhikmah`
- **LinkedIn**: Ganti `https://linkedin.com/in/kafinurhikmah`
- **WhatsApp**: Ganti nomor pada `https://wa.me/6281234567890`

### 2. Menambah atau Mengubah Portofolio Karya
Buka file [assets/js/projects-data.js](file:///d:/laragon/www/VS_Code/portofolio/assets/js/projects-data.js). Anda cukup menambah objek baru atau mengubah data yang sudah ada, misalnya:
```javascript
{
  id: 7,
  title: "Nama Proyek Anda",
  category: "web", // atau "mobile"
  categoryLabel: "Web Application",
  badge: "Featured",
  badgeColor: "cyan", // atau "purple"
  summary: "Deskripsi singkat proyek...",
  problem: "Tantangan teknis yang dihadapi...",
  solution: "Solusi rekayasa yang diterapkan...",
  techStack: ["Next.js", "TypeScript", "PostgreSQL"],
  liveUrl: "https://demo-anda.com",
  githubUrl: "https://github.com/kafinurhikmah/repo-anda"
}
```

### 3. Mengganti File CV Fisik (PDF)
Jika Anda ingin menyematkan file PDF asli CV Anda:
1. Simpan berkas CV Anda di dalam folder proyek, misalnya: `assets/cv/CV_Kafi_Nur_Hikmah.pdf`.
2. Pada `index.html`, ubah link tombol download pada modal CV agar mengarah langsung ke berkas tersebut:
   ```html
   <a href="assets/cv/CV_Kafi_Nur_Hikmah.pdf" download class="...">Unduh PDF</a>
   ```

---

## 🌐 Rekomendasi Cara Hosting Gratis (Online)

Untuk mempublikasikan portofolio ini agar dapat langsung dilihat oleh recruiter di internet:

1. **GitHub Pages (Gratis & Populer untuk Developer)**:
   - Buat repositori baru di GitHub dengan nama `kafinurhikmah.github.io` atau `portfolio`.
   - Push seluruh isi folder ini ke repositori tersebut.
   - Buka **Settings** > **Pages** > pilih branch `main` > Save.
   - Website Anda langsung live di `https://username.github.io`!

2. **Vercel**:
   - Kunjungi [vercel.com](https://vercel.com) dan login via GitHub.
   - Import repositori portofolio Anda.
   - Klik **Deploy** (otomatis live dalam hitungan detik dengan domain gratis `.vercel.app`).

---

Dibuat dengan dedikasi tinggi untuk **Kafi Nur Hikmah** — *Full-Stack Web & Mobile Developer*.
