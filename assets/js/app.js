// ===== Hamburger menu (JS-driven, menggantikan checkbox hack) =====
function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

function updateCounter(table) {
    const counter = document.getElementById("filter-counter");
    if (!counter || !table) return;

    const rows = table.querySelectorAll("tbody tr");
    const total = rows.length;
    let tampil = 0;
    rows.forEach(function (row) {
        if (row.style.display !== "none") tampil++;
    });

    const label = counter.dataset.label || "data";
    counter.textContent = "Menampilkan " + tampil + " dari " + total + " " + label;
}

// ===== Konfirmasi hapus (front-end only, belum ke server) =====

function initHapusConfirm() {
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".btn-hapus");
        if (!btn) return;

        const table = btn.closest(".table-responsive table");
        const row = btn.closest("tr");
        const nama = row ? row.querySelector("td")?.textContent : "data ini";
        const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");
        if (yakin && row) {
            row.remove();
            updateCounter(table);
        }
    });
}

// ===== Filter/pencarian tabel real-time (Latihan 8.4 no.3) =====

function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    if (!input || !table) return;

    const kolom = parseInt(input.dataset.searchCol || "0", 10);

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach(function (row) {
            const cells = row.querySelectorAll("td");
            const target = cells[kolom] ? cells[kolom].textContent.toLowerCase() : "";
            row.style.display = target.includes(keyword) ? "" : "none";
        });
        updateCounter(table);
    });
}

// ===== Validasi form (client-side) =====
function tampilkanError(input, pesan) {
    hapusError(input);
    const span = document.createElement("span");
    span.className = "error";
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span);
}

function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) {
        next.remove();
    }
}

const aturanValidasi = [
    {
        selector: "[name='judul'], [name='nama']",
        wajib: true,
        pesanWajib: "Field ini wajib diisi."
    },
    {
        selector: "[name='pengarang']",
        wajib: true,
        pesanWajib: "Pengarang wajib diisi."
    },
    {
        selector: "[name='tahun']",
        tipe: "angka",
        min: 1900,
        max: 2026,
        pesanRange: "Tahun harus di antara 1900-2026."
    },
    {
        selector: "[name='stok']",
        tipe: "angka",
        min: 0,
        pesanRange: "Stok tidak boleh negatif."
    },
    {

        selector: "[name='isbn']",
        wajib: false,
        pola: /^[0-9-]+$/,
        pesanPola: "ISBN hanya boleh berisi angka dan tanda hubung (-)."
    }
];

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        let valid = true;

        aturanValidasi.forEach(function (aturan) {
            const field = form.querySelector(aturan.selector);
            if (!field) return; // field ini tidak ada di form halaman ini, lewati

            const nilai = field.value.trim();

            if (aturan.wajib && nilai === "") {
                tampilkanError(field, aturan.pesanWajib);
                valid = false;
                return;
            }

            if (aturan.tipe === "angka" && nilai !== "") {
                const angka = parseInt(nilai, 10);
                const dibawahMin = aturan.min !== undefined && angka < aturan.min;
                const diatasMax = aturan.max !== undefined && angka > aturan.max;
                if (isNaN(angka) || dibawahMin || diatasMax) {
                    tampilkanError(field, aturan.pesanRange);
                    valid = false;
                    return;
                }
            }

            if (aturan.pola && nilai !== "" && !aturan.pola.test(nilai)) {
                tampilkanError(field, aturan.pesanPola);
                valid = false;
                return;
            }

            hapusError(field);
        });

        if (!valid) {
            e.preventDefault();
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();

    // Tampilkan counter awal ("Menampilkan 5 dari 5 buku") begitu halaman dimuat
    const table = document.querySelector(".table-responsive table");
    if (table) updateCounter(table);
});