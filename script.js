/* ==========================================================
   RENDER: mengisi HTML dari data di content.js
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const C = CONTENT;

  /* ---------- Hero / Beranda ---------- */
  document.getElementById("heroEyebrow").textContent = C.beranda.eyebrow;
  document.getElementById("heroHeadline").textContent = C.beranda.headline;
  document.getElementById("heroSlogan").textContent = C.desa.slogan;
  document.getElementById("heroDesc").textContent = C.beranda.deskripsi;
  setHeroPhoto(C.desa.fotoUtama);

  /* ---------- Profil Desa ---------- */
  document.getElementById("txtSejarah").textContent = C.profil.sejarah;
  document.getElementById("txtVisi").textContent = C.profil.visi;
  const misiList = document.getElementById("listMisi");
  C.profil.misi.forEach(m => {
    const li = document.createElement("li");
    li.textContent = m;
    misiList.appendChild(li);
  });

  // Modal "Baca Selengkapnya" Visi & Misi
  document.getElementById("modalVisi").textContent = C.profil.visi;
  const modalMisiList = document.getElementById("modalMisi");
  C.profil.misi.forEach(m => {
    const li = document.createElement("li");
    li.textContent = m;
    modalMisiList.appendChild(li);
  });
  initVisiMisiModal();

  const dusunGrid = document.getElementById("dusunGrid");
  C.wilayah.dusun.forEach(d => {
    dusunGrid.innerHTML += `
      <div class="dusun-card">
        <p class="d-eyebrow">Kepala Dusun</p>
        <h4>${d.nama}</h4>
        <p>${d.kepala}</p>
      </div>`;
  });

  /* ---------- Pemerintahan ---------- */
  const kd = C.pemerintahan.kepalaDesa;
  document.getElementById("kadesNama").textContent = `${kd.nama} — ${kd.jabatan}`;
  document.getElementById("kadesSambutan").textContent = kd.sambutan;
  if (kd.foto) {
    document.getElementById("kadesPhoto").innerHTML =
      `<img src="${kd.foto}" alt="Foto ${kd.nama}" loading="lazy" decoding="async">`;
  }
  renderOrgTree(C);

  /* ---------- Statistik ---------- */
  renderStats(C.statistik);
  document.getElementById("geoLuas").textContent = C.statistik.luasWilayah;
  document.getElementById("geoLetak").textContent = C.statistik.letakGeografis;

  /* ---------- Potensi ---------- */
  const potensiGrid = document.getElementById("potensiGrid");
  C.potensi.forEach(p => {
    potensiGrid.innerHTML += `
      <div class="potensi-card">
        <div class="potensi-photo">${photoOrPattern(p.foto)}</div>
        <div class="potensi-body">
          <h3>${p.judul}</h3>
          <p>${p.deskripsi}</p>
        </div>
      </div>`;
  });

  /* ---------- Galeri ---------- */
  renderGaleri(C.galeri);

  /* ---------- Kontak ---------- */
  const k = C.kontak;
  document.getElementById("txtAlamat").textContent = k.alamat;
  document.getElementById("txtTelepon").textContent = k.telepon;
  document.getElementById("txtEmail").textContent = k.email;
  document.getElementById("kontakAlamat").href = k.googleMapsShareLink;
  document.getElementById("kontakTelepon").href = `https://wa.me/${k.teleponLink}`;
  document.getElementById("kontakEmail").href = `mailto:${k.email}`;
  document.getElementById("mapFrame").src = k.googleMapsEmbedSrc || k.googleMapsShareLink;
  document.getElementById("mapButton").href = k.googleMapsShareLink;

  /* ---------- Footer ---------- */
  document.getElementById("footerLocation").textContent =
    `${C.desa.kecamatan}, ${C.desa.kabupaten}, ${C.desa.provinsi}`;
  document.getElementById("footerYear").textContent = new Date().getFullYear();

  /* ---------- Interaksi ---------- */
  initNav();
  initScrollSpy();
  initCounters();
});

/* ==========================================================
   HELPERS
   ========================================================== */
function photoOrPattern(url) {
  if (url) return `<img src="${url}" alt="" loading="lazy" decoding="async">`;
  return `<svg viewBox="0 0 400 250" width="100%" height="100%">
    <rect width="400" height="250" fill="#DCEEE7"/>
    <path d="M0 180 Q100 150 200 180 T400 180 V250 H0 Z" fill="#287D66" opacity=".85"/>
  </svg>`;
}

function setHeroPhoto(url) {
  if (!url) return; // biarkan pola SVG bawaan
  const wrap = document.getElementById("heroPhoto");
  // Foto hero TIDAK di-lazy load — ini gambar pertama yang tampil (LCP),
  // jadi harus langsung dimuat dengan prioritas tinggi.
  wrap.innerHTML = `<img src="${url}" alt="Foto utama desa" style="width:100%;height:100%;object-fit:cover;" fetchpriority="high" decoding="async">
    <span class="photo-caption">Foto utama desa</span>`;
}

function renderOrgTree(C) {
  const p = C.pemerintahan;
  const tree = document.getElementById("orgTree");

  const node = (nama, jabatan, top = false) =>
    `<div class="org-node ${top ? "top" : ""}">
       <div class="org-name">${nama}</div>
       <div class="org-role">${jabatan}</div>
     </div>`;

  let html = "";

  // Level 0: Kepala Desa
  html += `<div class="org-row first">${node(p.kepalaDesa.nama, p.kepalaDesa.jabatan, true)}</div>`;

  // Level 1: Sekretaris
  html += `<div class="org-row">${node(p.sekretaris.nama, p.sekretaris.jabatan)}</div>`;

  // Level 2: Kaur + Kasi
  html += `<div class="org-group-label">Kaur &amp; Kasi</div>`;
  html += `<div class="org-row">${[...p.kaur, ...p.kasi].map(x => node(x.nama, x.jabatan)).join("")}</div>`;

  tree.innerHTML = html;
  fitOrgTree();
}

// Menyusutkan bagan (org chart) secara proporsional supaya selalu muat
// dalam lebar layar tanpa perlu scroll horizontal, terutama di mobile.
// Desktop tetap tampil skala 1:1 selama masih muat.
function fitOrgTree() {
  const wrap = document.querySelector(".org-tree-wrap");
  const tree = document.getElementById("orgTree");
  if (!wrap || !tree) return;

  // reset dulu supaya ukuran asli (natural) terbaca dengan benar
  tree.style.transform = "none";
  wrap.style.height = "";

  const naturalWidth = tree.scrollWidth;
  const naturalHeight = tree.offsetHeight;
  const available = wrap.clientWidth;

  // Kalau lebar wadah belum siap dibaca (mis. layout belum settle saat
  // pertama kali dipanggil), jangan set scale 0 — coba lagi sebentar lagi
  // daripada bikin bagan hilang total.
  if (!available || !naturalWidth) {
    requestAnimationFrame(fitOrgTree);
    return;
  }

  const scale = naturalWidth > available ? available / naturalWidth : 1;

  tree.style.transformOrigin = "top center";
  tree.style.transform = `scale(${scale})`;
  // Tinggi wrapper disesuaikan supaya tidak menyisakan ruang kosong
  // di bawah bagan yang sudah mengecil.
  wrap.style.height = naturalHeight * scale + "px";
}

let _fitOrgTreeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(_fitOrgTreeTimeout);
  _fitOrgTreeTimeout = setTimeout(fitOrgTree, 150);
});
window.addEventListener("orientationchange", () => setTimeout(fitOrgTree, 200));

// Font web (Google Fonts) dimuat async dan bisa "swap" setelah render
// pertama, sedikit mengubah lebar tiap kotak nama/jabatan. Hitung ulang
// skala begitu font benar-benar siap, dan sekali lagi setelah semua
// resource halaman (termasuk gambar) selesai dimuat, supaya bagan tidak
// terpotong di desktop maupun hilang di mobile.
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(fitOrgTree).catch(() => {});
}
window.addEventListener("load", () => setTimeout(fitOrgTree, 100));

function renderStats(s) {
  const items = [
    { value: s.jumlahPenduduk, label: "Jumlah Penduduk (jiwa)" },
    { value: s.lakiLaki, label: "Laki-laki" },
    { value: s.perempuan, label: "Perempuan" },
    { value: s.jumlahKK, label: "Kepala Keluarga" },
    { value: s.jumlahDusun, label: "Dusun" },
  ];
  const grid = document.getElementById("statGrid");
  items.forEach(it => {
    grid.innerHTML += `
      <div class="stat-card">
        <div class="stat-value" data-count="${it.value}">0</div>
        <div class="stat-label">${it.label}</div>
      </div>`;
  });
}

function renderGaleri(items) {
  const grid = document.getElementById("galeriGrid");
  const empty = document.getElementById("galeriEmpty");
  const pagination = document.getElementById("galeriPagination");
  const tabs = document.querySelectorAll("#galeriTabs .tab");
  const PER_PAGE = 10;
  let currentPage = 1;

  function draw(filter, page = 1) {
    currentPage = page;
    const filtered = filter === "semua" ? items : items.filter(i => i.kategori === filter);
    empty.style.display = filtered.length ? "none" : "block";

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;
    const start = (currentPage - 1) * PER_PAGE;
    const pageItems = filtered.slice(start, start + PER_PAGE);

    grid.innerHTML = "";
    pageItems.forEach(item => {
      const el = document.createElement("div");
      el.className = "galeri-item";
      el.innerHTML = `<img src="${item.foto}" alt="${item.judul || ""}" loading="lazy" decoding="async">
        <span class="galeri-tag">${item.kategori}</span>`;
      el.addEventListener("click", () => openLightbox(item.foto, item.judul));
      grid.appendChild(el);
    });

    drawPagination(filter, filtered.length, totalPages);
  }

  function drawPagination(filter, totalItems, totalPages) {
    pagination.innerHTML = "";
    if (totalItems <= PER_PAGE) return; // hanya muncul jika lebih dari 10 foto

    const makeBtn = (label, page, opts = {}) => {
      const b = document.createElement("button");
      b.className = "page-btn" + (opts.active ? " active" : "");
      b.textContent = label;
      b.disabled = !!opts.disabled;
      b.addEventListener("click", () => draw(filter, page));
      return b;
    };

    pagination.appendChild(makeBtn("‹", currentPage - 1, { disabled: currentPage === 1 }));
    for (let p = 1; p <= totalPages; p++) {
      pagination.appendChild(makeBtn(String(p), p, { active: p === currentPage }));
    }
    pagination.appendChild(makeBtn("›", currentPage + 1, { disabled: currentPage === totalPages }));
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      draw(tab.dataset.filter, 1);
    });
  });

  draw("semua", 1);
}

function openLightbox(src, alt) {
  const lb = document.getElementById("lightbox");
  document.getElementById("lightboxImg").src = src;
  document.getElementById("lightboxImg").alt = alt || "";
  lb.classList.add("open");
}
document.getElementById("lightboxClose")?.addEventListener("click", () => {
  document.getElementById("lightbox").classList.remove("open");
});
document.getElementById("lightbox")?.addEventListener("click", (e) => {
  if (e.target.id === "lightbox") e.target.classList.remove("open");
});

/* ---------- Modal Visi & Misi (baca selengkapnya) ---------- */
function initVisiMisiModal() {
  const modal = document.getElementById("visiMisiModal");
  const openBtn = document.getElementById("btnVisiMisiMore");
  const closeBtn = document.getElementById("visiMisiModalClose");

  openBtn?.addEventListener("click", () => modal.classList.add("open"));
  closeBtn?.addEventListener("click", () => modal.classList.remove("open"));
  modal?.addEventListener("click", (e) => {
    if (e.target.id === "visiMisiModal") modal.classList.remove("open");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal?.classList.remove("open");
  });
}

/* ---------- Nav toggle (mobile) ---------- */
function initNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", false);
    })
  );
}

/* ---------- Scroll spy: highlight nav aktif ---------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".main-nav a[href^='#']");
  const map = {};
  links.forEach(l => (map[l.getAttribute("href").slice(1)] = l));

  const obs = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const link = map[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach(s => obs.observe(s));
}

/* ---------- Count-up angka statistik ---------- */
function initCounters() {
  const counters = document.querySelectorAll(".stat-value[data-count]");
  const obs = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach(c => obs.observe(c));
}

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10) || 0;
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString("id-ID");
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
