/**
 * Data Proyek Portofolio Kafi Nur Hikmah
 * Anda dapat dengan mudah mengedit atau menambahkan proyek baru di sini.
 */
const projectsData = [
  {
    id: 1,
    title: "OmniMarket — Enterprise E-Commerce Platform",
    category: "web",
    categoryLabel: "Web Application",
    badge: "Featured Full-Stack",
    badgeColor: "cyan",
    summary: "Platform e-commerce modern dengan kemampuan multi-vendor, checkout cepat, dan manajemen inventaris real-time.",
    problem: "Sistem lama mengalami latensi checkout tinggi dan inkonsistensi stok barang saat terjadi lonjakan traffic flash sale.",
    solution: "Membangun arsitektur SSR menggunakan Next.js & Node.js REST API dengan PostgreSQL ACID compliance, optimasi query, dan Redis cache.",
    imageBg: "from-blue-600/30 via-indigo-900/40 to-slate-900",
    icon: "shopping-bag",
    techStack: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS", "Redis", "Docker"],
    liveUrl: "https://github.com/kafinurhikmah",
    githubUrl: "https://github.com/kafinurhikmah"
  },
  {
    id: 2,
    title: "TrackLogix — Fleet & Dispatch Mobile App",
    category: "mobile",
    categoryLabel: "Mobile Application",
    badge: "Cross-Platform",
    badgeColor: "purple",
    summary: "Aplikasi mobile pelacakan armada logistik dan manajemen pengiriman paket secara real-time untuk driver dan kurir.",
    problem: "Aplikasi sering kehilangan data perjalanan saat sinyal lemah dan konsumsi daya GPS di smartphone kurir sangat boros.",
    solution: "Mengembangkan aplikasi Flutter dengan arsitektur BLoC, caching offline SQLite, smart GPS throttling, dan telemetry WebSocket.",
    imageBg: "from-purple-600/30 via-indigo-900/40 to-slate-900",
    icon: "navigation",
    techStack: ["Flutter", "Dart", "Node.js", "WebSocket", "MongoDB", "Google Maps API"],
    liveUrl: "https://github.com/kafinurhikmah",
    githubUrl: "https://github.com/kafinurhikmah"
  },
  {
    id: 3,
    title: "DocuPulse — AI Document & Contract Portal",
    category: "web",
    categoryLabel: "Web Application",
    badge: "Enterprise Web",
    badgeColor: "cyan",
    summary: "Sistem pengelolaan dokumen perusahaan berbasis web dengan fitur ekstraksi otomatis dan audit trail kepatuhan.",
    problem: "Ribuan berkas kontrak hukum tersimpan berantakan dan pencarian klausa kontrak manual membutuhkan waktu hingga berjam-jam.",
    solution: "Merancang portal web modern dengan React & TypeScript, backend Python/FastAPI, autentikasi RBAC ketat, dan PostgreSQL database.",
    imageBg: "from-teal-600/30 via-slate-900 to-blue-950",
    icon: "file-text",
    techStack: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Tailwind CSS", "Docker"],
    liveUrl: "https://github.com/kafinurhikmah",
    githubUrl: "https://github.com/kafinurhikmah"
  },
  {
    id: 4,
    title: "CareSync — Telehealth & Appointment App",
    category: "mobile",
    categoryLabel: "Mobile Application",
    badge: "Healthcare",
    badgeColor: "purple",
    summary: "Aplikasi mobile konsultasi medis online, reservasi dokter spesialis, dan riwayat rekam medis digital terenkripsi.",
    problem: "Pasien kesulitan memesan jadwal konsultasi dokter yang akurat dan data rekam medis sering kali terpisah antar faskes.",
    solution: "Membangun mobile app React Native dengan sinkronisasi kalender real-time, Express.js backend, dan database MySQL terstruktur.",
    imageBg: "from-cyan-600/30 via-blue-950 to-slate-900",
    icon: "activity",
    techStack: ["React Native", "TypeScript", "Express.js", "MySQL", "Redux Toolkit", "Socket.io"],
    liveUrl: "https://github.com/kafinurhikmah",
    githubUrl: "https://github.com/kafinurhikmah"
  },
  {
    id: 5,
    title: "PayPoint POS — Cloud Cashier & Inventory",
    category: "web",
    categoryLabel: "Web Application",
    badge: "Full-Stack Web",
    badgeColor: "cyan",
    summary: "Sistem point-of-sale berbasis web multi-outlet dengan laporan keuangan terotomatisasi dan manajemen inventaris stok.",
    problem: "Owner bisnis ritel kesulitan memantau laba harian antar cabang dan kasir terhambat saat jaringan internet terganggu.",
    solution: "Mengembangkan aplikasi dengan PHP & Laravel, database MySQL dengan indexing optimal, UI responsif Tailwind, dan fitur offline-sync.",
    imageBg: "from-indigo-600/30 via-slate-900 to-sky-950",
    icon: "credit-card",
    techStack: ["PHP", "Laravel", "JavaScript", "MySQL", "Tailwind CSS", "RESTful API"],
    liveUrl: "https://github.com/kafinurhikmah",
    githubUrl: "https://github.com/kafinurhikmah"
  },
  {
    id: 6,
    title: "FinTrack — Wealth & Budget Manager",
    category: "mobile",
    categoryLabel: "Mobile Application",
    badge: "Personal Finance",
    badgeColor: "purple",
    summary: "Aplikasi mobile manajemen pengeluaran pintar, target tabungan, dan visualisasi arus kas bulanan interaktif.",
    problem: "Pengguna kesulitan melacak pengeluaran harian dan tidak memiliki insight yang jelas mengenai pos pengeluaran terbesar.",
    solution: "Membangun mobile app dengan Flutter menerapkan Clean Architecture, local storage SQLite untuk performa cepat, dan grafik interaktif.",
    imageBg: "from-violet-600/30 via-purple-950 to-slate-900",
    icon: "pie-chart",
    techStack: ["Flutter", "Dart", "Firebase", "SQLite", "Clean Architecture", "REST API"],
    liveUrl: "https://github.com/kafinurhikmah",
    githubUrl: "https://github.com/kafinurhikmah"
  }
];

// Attach to window object for global availability
if (typeof window !== 'undefined') {
  window.projectsData = projectsData;
}
