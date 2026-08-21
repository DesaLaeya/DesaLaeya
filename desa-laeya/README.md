# Website Desa Laeya

Website statis — HTML, CSS, JS murni, tanpa database, tanpa build tool.
Buka `index.html` langsung di browser, atau hosting gratis di GitHub Pages / Netlify / Cloudflare Pages.

## Struktur file

```
index.html    → struktur & isi section
style.css     → semua tampilan/desain
script.js     → logika (render data, nav, statistik, galeri, peta)
content.js    → SEMUA teks & gambar yang bisa diedit
```

**Untuk mengubah isi website, cukup edit `content.js`.** Tidak perlu sentuh file lain.

## Mengelola gambar

Ada 3 opsi, dari yang paling simpel ke paling fleksibel:

### Opsi 1 — Folder lokal (paling disarankan)
Buat folder `images/` di samping `index.html`, taruh foto di situ, lalu di `content.js` isi langsung:
```js
foto: "images/kantor-desa.jpg"
```
Paling cepat & tidak tergantung layanan luar. Kekurangan: setiap tambah foto harus upload ulang filenya bareng kode (misalnya lewat GitHub).

### Opsi 2 — Google Drive (sesuai rencana Anda)
1. Upload foto ke Drive → klik kanan → **Bagikan** → ubah jadi "Siapa saja yang memiliki link".
2. Ambil ID file dari link `.../file/d/ID_FILE/view`.
3. Di `content.js`, panggil `driveImg('ID_FILE')`.

Sudah saya siapkan helper `driveImg()` di baris atas `content.js` yang otomatis membentuk URL `https://drive.google.com/thumbnail?id=...&sz=w1600` — format ini paling stabil untuk ditampilkan langsung (embed), lebih andal dibanding link `uc?export=view` yang kadang diblokir Google untuk hotlink.

Kekurangan: Drive kadang membatasi jumlah akses (rate limit) kalau foto sering diakses banyak orang sekaligus, dan loading sedikit lebih lambat dari hosting gambar biasa.

### Opsi 3 (bonus) — Google Sheets sebagai "CMS" untuk Berita & Galeri
Karena berita/galeri isinya sering nambah, ini pola gratis yang umum dipakai tim non-developer:
1. Buat Google Sheet dengan kolom: `judul, tanggal, ringkasan, foto, kategori`.
2. **File → Bagikan → Publikasikan ke web**.
3. Ambil data itu dari JavaScript pakai endpoint bawaan Google Visualization tanpa API key:
   ```js
   const SHEET_ID = "ID_SHEET_ANDA";
   fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`)
     .then(r => r.text())
     .then(text => {
       const json = JSON.parse(text.substring(47).slice(0, -2));
       const rows = json.table.rows.map(r => ({
         judul: r.c[0]?.v, tanggal: r.c[1]?.v, ringkasan: r.c[2]?.v,
         foto: r.c[3]?.v, kategori: r.c[4]?.v
       }));
       // gabungkan `rows` ke CONTENT.berita / CONTENT.galeri lalu render ulang
     });
   ```
Staf desa yang tidak paham kode tinggal isi baris baru di Sheet, tidak perlu sentuh `content.js` sama sekali. Ini yang paling cocok kalau Berita/Galeri sering diupdate oleh orang berbeda-beda.

**Rekomendasi saya:** pakai **Opsi 1 (folder lokal)** untuk foto tetap seperti foto kantor desa/kepala desa, dan **Opsi 3 (Google Sheets)** khusus untuk Berita & Galeri yang isinya sering bertambah. Google Drive (Opsi 2) tetap bisa dipakai sebagai jalan tengah kalau ingin tetap simpan foto di Drive tanpa commit ke folder proyek.

## Catatan konten

Beberapa data belum tersedia dan diberi placeholder yang jelas agar mudah ditemukan & diisi:
- `profil.sejarah`, `profil.visi`, `profil.misi`
- `statistik.luasWilayah`, `statistik.letakGeografis`
- Pemetaan RT ke Dusun tertentu (saat ini RT ditampilkan sebagai daftar umum karena pembagiannya belum dikonfirmasi)
- Foto (kepala desa, foto utama desa, potensi, galeri) — saat ini memakai ilustrasi SVG sebagai pengganti sementara

Cari kata `null` atau komentar `Belum tersedia` di `content.js` untuk menemukan semua bagian yang masih perlu dilengkapi.
