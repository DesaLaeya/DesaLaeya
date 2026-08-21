/**
 * ============================================================
 *  content.js — SATU-SATUNYA FILE YANG PERLU DIEDIT
 * ============================================================
 * Semua teks & gambar di website ini diambil dari sini.
 * Tidak perlu database — cukup edit object di bawah, simpan,
 * lalu refresh halaman.
 *
 * PANDUAN GAMBAR (Google Drive):
 * 1. Upload foto ke Google Drive, klik kanan → "Bagikan" →
 *    ubah akses jadi "Siapa saja yang memiliki link".
 * 2. Salin ID file dari link, contoh:
 *    https://drive.google.com/file/d/1AbCdeFGhIJkLmNoPQRstuVWxyz/view
 *                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^ ini ID-nya
 * 3. Tempel ID itu ke helper driveImg('ID_DISINI') di bawah.
 *
 * Lihat README.md untuk alternatif lain (folder /images lokal,
 * atau Google Sheets sebagai CMS berita/galeri).
 * ============================================================
 */

// Helper: ubah ID file Google Drive jadi URL gambar langsung.
// Ganti FALLBACK dengan foto asli begitu tersedia.
function driveImg(fileId, fallback) {
  if (!fileId) return fallback;
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
}

const CONTENT = {

  // ---------- IDENTITAS DESA ----------
  desa: {
    nama: "Desa Laeya",
    slogan: "Bersama Membangun Desa yang Maju, Mandiri, dan Sejahtera",
    kecamatan: "Kecamatan Laeya",
    kabupaten: "Kabupaten Konawe Selatan",
    provinsi: "Provinsi Sulawesi Tenggara",
    fotoUtama: "images/hero-image.png",
  },

  // ---------- BERANDA ----------
  beranda: {
    eyebrow: "Selamat Datang di Website Resmi",
    headline: "Portal Informasi & Layanan Desa Laeya",
    deskripsi:
      "Jelajahi profil, pemerintahan, data statistik, potensi, hingga kegiatan Desa Laeya dalam satu tempat. Website ini dikelola untuk memudahkan warga dan pengunjung mengakses informasi desa secara terbuka dan terkini.",
  },

  // ---------- PROFIL DESA ----------
  profil: {
    sejarah:
      "Sejarah singkat Desa Laeya belum dilengkapi. Bagian ini dapat diisi dengan asal-usul nama desa, tokoh pendiri, dan perkembangan wilayah dari masa ke masa. Edit teks ini pada file content.js.",
    visi:
      "Terwujudnya Desa Laeya yang maju, mandiri, dan sejahtera berlandaskan gotong royong. (Ganti dengan visi resmi desa)",
    misi: [
      "Meningkatkan tata kelola pemerintahan desa yang transparan dan akuntabel.",
      "Mendorong pertumbuhan ekonomi desa melalui potensi pertanian dan perkebunan.",
      "Meningkatkan kualitas infrastruktur dan pelayanan publik di setiap dusun.",
      "Memperkuat partisipasi dan gotong royong masyarakat dalam pembangunan desa.",
    ],
  },

  // ---------- WILAYAH: DUSUN & RT ----------
  wilayah: {
    jumlahDusun: 3,
    jumlahRT: 6,
    dusun: [
      { nama: "Dusun 1", kepala: "Taslim" },
      { nama: "Dusun 2", kepala: "Muh. Saleh" },
      { nama: "Dusun 3", kepala: "Darmin T" },
    ],
    // Catatan: pemetaan RT ke dusun tertentu belum dikonfirmasi,
    // jadi ditampilkan sebagai daftar umum. Sunting jika sudah pasti.
    rt: [
      { nama: "RT 1", ketua: "Caho" },
      { nama: "RT 2", ketua: "Awaluddin" },
      { nama: "RT 3", ketua: "Rusdin" },
      { nama: "RT 4", ketua: "Murat" },
      { nama: "RT 5", ketua: "Bulo" },
      { nama: "RT 6", ketua: "Lisna" },
    ],
  },

  // ---------- PEMERINTAHAN DESA ----------
  pemerintahan: {
    kepalaDesa: {
      nama: "Musahir",
      jabatan: "Kepala Desa",
      sambutan:
        "Selamat datang di website resmi Desa Laeya. Semoga kehadiran website ini dapat mempermudah masyarakat dan pengunjung dalam memperoleh informasi seputar pemerintahan, pembangunan, dan potensi desa kami. Mari bersama-sama membangun Desa Laeya yang lebih maju dan sejahtera.",
      foto: "images/kepala-desa.jpeg",
    },
    sekretaris: { nama: "Anton", jabatan: "Sekretaris Desa" },
    bendahara: { nama: "Emon Zamorano", jabatan: "Bendahara Desa" },
    kaur: [
      { nama: "Aco Saharuddin", jabatan: "Kepala Urusan Umum" },
      { nama: "Emon Zamorano", jabatan: "Kepala Urusan Keuangan" },
      { nama: "Repolita", jabatan: "Kepala Urusan Perencanaan" },
    ],
    kasi: [
      { nama: "Eka Widyanti", jabatan: "Kepala Seksi Pemerintahan" },
      { nama: "Harlian", jabatan: "Seksi Pelayanan" },
      { nama: "Duslan", jabatan: "Seksi Kesejahteraan" },
    ],
  },

  // ---------- DATA STATISTIK ----------
  statistik: {
    jumlahPenduduk: 1441,
    lakiLaki: 740,
    perempuan: 701,
    jumlahKK: 437,
    jumlahDusun: 3,
    jumlahRT: 6,
    luasWilayah: "Belum tersedia",
    letakGeografis: "Belum tersedia",
  },

  // ---------- POTENSI DESA ----------
  potensi: [
    {
      judul: "Pertanian & Perkebunan",
      deskripsi:
        "Sektor pertanian dan perkebunan menjadi salah satu mata pencaharian utama warga Desa Laeya, meliputi tanaman pangan dan komoditas perkebunan unggulan.",
      foto: "images/potensi-desa.png",
    },
  ],

  // ---------- GALERI DESA ----------
  // kategori: "kegiatan" | "fasilitas" | "wisata"
  // Foto kegiatan diambil dari folder images/kegiatan/. Untuk fasilitas &
  // wisata, tambahkan foto ke folder images/ lalu isi entry baru di sini
  // (atau pakai driveImg('ID_FILE_DRIVE') kalau menyimpan di Google Drive).
  galeri: [
    ...Array.from({ length: 56 }, (_, i) => ({
      kategori: "kegiatan",
      judul: `Kegiatan Desa ${i + 1}`,
      foto: `images/kegiatan/kegiatan-${i + 1}.jpeg`,
    })),
  ],

  // ---------- KONTAK ----------
  kontak: {
    alamat:
      "Kantor Desa Laeya, Kecamatan Laeya, Kabupaten Konawe Selatan, Sulawesi Tenggara",
    telepon: "+62 813-4013-7278",
    teleponLink: "6281340137278",
    email: "pemerintahdesalaeya@gmail.com",
    googleMapsShareLink: "https://maps.app.goo.gl/5Sz1k1hmeWg9VunK8",
    // Dipakai khusus untuk src iframe peta (embed), sedangkan link di atas
    // dipakai untuk tombol "Buka di Google Maps".
    googleMapsEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.2859221812587!2d122.47611387559732!3d-4.3573811353660705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2da27b60b5bf086b%3A0xf24a66b6a2f93e05!2sBalai%20Desa%20Laeya!5e0!3m2!1sid!2sid!4v1787283955533!5m2!1sid!2sid",
  },
};
