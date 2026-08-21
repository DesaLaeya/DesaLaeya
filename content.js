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

// ID Google Drive untuk foto Kegiatan (urutan 1 s/d 50).
// Kalau ID-nya diisi (tidak kosong ""), foto diambil dari Google Drive.
// Kalau kosong "", otomatis pakai foto lokal di images/kegiatan/ sebagai
// cadangan — jadi tidak ada foto lama yang hilang atau tertimpa.
// kegiatan-51 s/d kegiatan-56 belum ada ID Drive-nya, jadi tetap pakai lokal.
const idKegiatanDrive = [
    "1FE7YvLTvn8rnD9wTCN-FwmUwbx04KprC",
    "1h0rCpQgLxlswEg8wsY-ZMJi1enbgvC_h",
    "1hWQbWdd7cHhGP7AtnjfT81luBI2YcHmg",
    "1T3ff7gwA0Erv1pyB1mBFe0pxI_tF2DmE",
    "1fROAM88os_jDLyuDansQkug62m_qzO3T",
    "1smPWF5QvoMHQ3ikW49JRfsMXc4As1_jz",
    "1dNh_ohQtky638qX5ZvlCRW5P5NlsSLS2",
    "1EL9HVXpJqCSkv11V42de7qNkWgz5cNYZ",
    "1FF0aDIcPNuXXSn0e9-7csOHmgoILS9sO",
    "1OI-C6nyy5_Wz_gLfwai58jpe5Sljak2_",
    "1tZTX7dbZTIqnughDPOAirD-gS2TEVxY7",
    "1GphrWeEWwQoln56kLW0eBT1xy7Dx2A8H",
    "1uW4z3Xt-f3w3ga6g3Ymu6yXrnnpAv-1M",
    "1SNovx9cDNMn-_LAjm3v42QXNMzeM3wfK",
    "1kmFgmju7PyCcZJE295WVGieuzZVGka-O",
    "1aupa6jzvIwkQUn8QtC9FM_2YhXmgf0iS",
    "18LaX7qhivC08SkZ_FtFA7vq_dIw_UTg6",
    "18Izt3ZRvm1FaCqyeGgNC3Cpnkv5vcbLX",
    "1iDRKbLu3WAq7noh3AjOgQ8xpdCEj9VJx",
    "1PsHcAjJ9LDUhgm3nseEH8c_5J0NiyM93",
    "1nf87-WQdRT26U2UdGLNitOi1Vo6-X_VK",
    "1iGFSTTGEfoOAb-Xt9ao3Occ_V8mVDWwi",
    "1rRW2q6fqoBbLy7XOrEwXXfh_N2pVOuoE",
    "1mjW0STfTm6c2X5WRYOorfT18UHGBcQ56",
    "14_xByaPRNFc3a78pdv9m5zgkz8p1aay2",
    "1isaAI5qmq9E-bS6s09GWn69VX_ezGHSt",
    "17K4n_m4U4B-FpLwb_lyibeU2jXKJJQ73",
    "1ofPdmlQDzCbf5G4iVC04N71j7S-OejE_",
    "1MkmBfci6hOIuSYeuMRJkeXaDRzvTkD7Z",
    "1LlP9jkaktwOkPCGA1zF72FYIaHG3Fd-e",
    "1c3fW-gyIAfQUJdH98mHIwOLlEMD07uzI",
    "1u1ntDewmqNywvDN18A58uRpMiiGMWbrE",
    "16funwuFVy0hkE5VXYfPQglOrVSe59svI",
    "1Ei3v1QIFb91XNCCcIm-U-_2A-zHwwEZl",
    "1svv2LCw2_vMJ_c9HDAAutCqHLRXbfbRR",
    "1PW9xqhOA475B1txeqMPx9y4o142Nlzmy",
    "1duPExvhPOP73UesAtohoxwHL_j6V7KRh",
    "12oFxjDxqERqkfA7Xy6xx2gdEfHj2iEV6",
    "1wgcHtEiA0wYrmuviOvSqmtSGlN1voCei",
    "1g8ldT35JmPGU9BYfwyIDciApZtVEQAKz",
    "1m89sFbBzfKSHYZFgEGF-WKJfkmqS9O7f",
    "1pQMsi-1Y7zWsENIq1VDtjUf8XTXsMVYv",
    "1394sO7jdpCOBXapj7ftV0zdz2T4DnN0i",
    "1f3qRq0NkbVZkUyW8dgJiPUxwUE1ZleXz",
    "185N-4Fm6EfbZE3M9p0Cpwl9BTDdm8r0s",
    "1bdW0IOjfbnbW_jV8NeqGGvNTMJMQL2DE",
    "1TMkxSfwrO8j5ax8YsuNg4rPRjzlZMsne",
    "141xjddu8HBqIG1r9Ap9vh4QCa8sjwxWT",
    "1hdfz0Y7u4KhclnNc-3ud9P1w2a_38vTi",
    "14BnE-VAFDYgskOHXQ07R8kXz5W4aQwlu",
];

// ID Google Drive untuk foto Fasilitas.
const idFasilitasDrive = [
    "10ybC6FcQmCaNDqRJm3LnomAz6sK3iA3b",
    "1Bj6sQ_dPGQmdDvQvrGUTYnwl7tU5YD0h",
    "1sCrRhs9FljCGi2FGk0mXnKg0Z87LVFSt",
    "1nVPUDLYuOEOW31VNYMVbezFPAn79DY9d",
    "1d1rjxmXYEFfJ1ByrMlEfbMApYm2yaJjQ",
    "1E0UT3DdTwDkGZQl4bkDyFumrMsoKnx9J",
    "1algq9Ic0v_xUGG4prJy60QDVpvvhOIsB",
];

const CONTENT = {

  // ---------- IDENTITAS DESA ----------
  desa: {
    nama: "Desa Laeya",
    slogan: "Bersama Membangun Desa yang Maju, Mandiri, dan Sejahtera",
    kecamatan: "Kecamatan Laeya",
    kabupaten: "Kabupaten Konawe Selatan",
    provinsi: "Provinsi Sulawesi Tenggara",
    fotoUtama: "images/hero-image.webp",
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
      "Siap Melayani, Mengutamakan Masyarakat dan Terwujudnya Masyarakat Desa yang Maju, Adil, Mandiri, dan Aman.",
    misi: [
      "Mewujudkan tata kelola pemerintahan desa yang baik berdasarkan kepentingan umum, transparansi, profesionalitas, efektivitas, akuntabilitas, efisiensi, kearifan lokal, dan partisipasi masyarakat.",
      "Menumbuhkembangkan Badan Usaha Milik Desa (BUMDes) sebagai aset dan penggerak perekonomian desa guna meningkatkan Pendapatan Asli Desa serta kesejahteraan masyarakat.",
      "Meningkatkan kesejahteraan dan perekonomian masyarakat melalui pengembangan kelompok usaha, kelompok tani, serta penguatan dan pengembangan potensi ekonomi masyarakat yang ada di Desa Laeya.",
      "Melaksanakan pembangunan desa secara merata, terencana, berkelanjutan, dan berkeadilan, dengan mengutamakan kebutuhan serta kepentingan masyarakat.",
      "Memberdayakan dan mengembangkan sumber daya manusia Desa Laeya, khususnya generasi muda, serta mengoptimalkan kegiatan kepemudaan, olahraga, kreativitas, dan prestasi masyarakat.",
      "Meningkatkan kesejahteraan Guru Ngaji dan pengelola Taman Pendidikan Al-Qur'an (TPQ) sebagai bagian dari upaya meningkatkan kemampuan baca tulis Al-Qur'an dan pembinaan kehidupan keagamaan masyarakat.",
      "Meningkatkan rasa aman, nyaman, tertib, dan harmonis di lingkungan desa guna memperkuat persatuan dan kesatuan masyarakat serta mendukung terciptanya kehidupan desa yang kondusif.",
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
    luasWilayah: "114,20 Km²",
    letakGeografis: `4°38' 82" Lintang Selatan dan 122°03' 9" Bujur Timur`,
  },

  // ---------- POTENSI DESA ----------
  potensi: [
    {
      judul: "Pertanian & Perkebunan",
      deskripsi:
        "Sektor pertanian dan perkebunan menjadi salah satu mata pencaharian utama warga Desa Laeya, meliputi tanaman pangan dan komoditas perkebunan unggulan.",
      foto: "images/potensi-desa.webp",
    },
  ],

  // ---------- GALERI DESA ----------
  // kategori: "kegiatan" | "fasilitas" | "wisata"
  //
  // CARA MENAMBAH FOTO — 2 CARA, BOLEH DICAMPUR BEBAS:
  //
  // (A) FOLDER LOKAL — foto ikut dikirim bareng file website ini.
  //     1. Taruh file foto ke folder images/fasilitas/ atau images/wisata/
  //        (folder sudah disiapkan, masih kosong).
  //     2. Tambahkan satu baris baru di array "galeri" di bawah, contoh:
  //        { kategori: "fasilitas", judul: "Kantor Desa", foto: "images/fasilitas/kantor-desa.jpg" },
  //
  // (B) GOOGLE DRIVE — kalau foto sudah/mau disimpan di Drive.
  //     1. Upload foto ke Google Drive.
  //     2. Klik kanan file → "Bagikan" → ubah akses jadi
  //        "Siapa saja yang memiliki link" (WAJIB, kalau tidak foto tidak muncul).
  //     3. Salin ID dari link, contoh:
  //        https://drive.google.com/file/d/1AbCdeFGhIJkLmNoPQRstuVWxyz/view
  //                                         ^^^^^^^^^^^^^^^^^^^^^^^^^^ ini ID-nya
  //     4. Tambahkan baris baru, tempel ID ke driveImg(...), contoh:
  //        { kategori: "wisata", judul: "Air Terjun Contoh", foto: driveImg("1AbCdeFGhIJkLmNoPQRstuVWxyz") },
  //
  //  Jadi yang perlu disiapkan untuk cara Drive: cuma ID file-nya saja
  //  (bukan link lengkap), dan pastikan akses share-nya "Siapa saja yang punya link".
  //
  // Kegiatan (di bawah): 56 foto. Yang sudah punya ID Drive (lihat
  // idKegiatanDrive di atas) otomatis diambil dari Drive; sisanya yang
  // belum ada ID-nya otomatis pakai foto lokal di images/kegiatan/.
  // Untuk Fasilitas & Wisata, tambahkan baris-baris baru mengikuti contoh
  // di atas begitu fotonya sudah siap.
  galeri: [
    ...Array.from({ length: 56 }, (_, i) => ({
      kategori: "kegiatan",
      judul: `Kegiatan Desa ${i + 1}`,
      foto: driveImg(idKegiatanDrive[i], `images/kegiatan/kegiatan-${i + 1}.jpeg`),
    })),

    // Contoh entri Wisata (hapus tanda // di depan baris saat fotonya
    // sudah ada — lihat panduan di atas):
    // { kategori: "wisata", judul: "Nama Tempat Wisata", foto: driveImg("ID_FILE_DRIVE_DISINI") },

    ...idFasilitasDrive.map((id, i) => ({
      kategori: "fasilitas",
      judul: `Fasilitas Desa ${i + 1}`,
      foto: driveImg(id),
    })),
  ],

  // ---------- KONTAK ----------
  kontak: {
    alamat:
      "Kantor Desa Laeya, Kecamatan Laeya, Kabupaten Konawe Selatan, Sulawesi Tenggara",
    telepon: "+62 822-5940-6369",
    teleponLink: "6282259406369",
    email: "pemerintahdesalaeya@gmail.com",
    googleMapsShareLink: "https://maps.app.goo.gl/5Sz1k1hmeWg9VunK8",
    // Dipakai khusus untuk src iframe peta (embed), sedangkan link di atas
    // dipakai untuk tombol "Buka di Google Maps".
    googleMapsEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.2859221812587!2d122.47611387559732!3d-4.3573811353660705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2da27b60b5bf086b%3A0xf24a66b6a2f93e05!2sBalai%20Desa%20Laeya!5e0!3m2!1sid!2sid!4v1787283955533!5m2!1sid!2sid",
  },
};
