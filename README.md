|  | Desain dan Pemrograman Web |
|---|---|
| NIM | 254107020115 |
| Nama | Almuzzammil Yusuf Favian Hilmi |
| Kelas | TI - 2F |
| Absen | 3 |
| Repository | [DPW-2026-ALMUZZAMMIL-YUSUF-FAVIAN-HILMI](https://github.com/favianhilmi-27/DPW-2026-ALMUZZAMMIL-YUSUF-FAVIAN-HILMI) |

# Jobsheet 6 — Fetch API & JSON

## Materi

Jobsheet 6 membahas **komunikasi asinkron** di sisi client — mengambil data dari luar HTML memakai `fetch()`, format `JSON`, dan pola `async`/`await` dengan `try`/`catch`/`finally`. Untuk pertama kalinya, data tabel (Daftar Buku & Daftar Anggota) **tidak lagi ditulis manual** di HTML, melainkan diambil secara dinamis dari file JSON dan dirender lewat JavaScript.

## Konsep yang Digunakan

| Konsep | Fungsi |
|---|---|
| `fetch(url)` | Meminta data dari file/alamat tertentu (di sini: file JSON lokal) |
| `Promise` & `await` | Menunggu hasil operasi asinkron (fetch, delay) sebelum lanjut ke baris berikutnya |
| `async function` | Fungsi yang boleh memakai `await` di dalamnya |
| `try` / `catch` / `finally` | Menangani kegagalan fetch tanpa membuat aplikasi "mati", sekaligus memastikan kode pembersihan (sembunyikan loading) selalu jalan |
| `res.ok` & `res.status` | Memeriksa manual apakah permintaan fetch benar-benar berhasil |
| `res.json()` | Mengubah teks respons JSON mentah menjadi array objek JavaScript |
| `document.createElement` + `appendChild` | Membuat elemen `<tr>` baru dan menyisipkannya ke `<tbody>` secara dinamis |
| **Event delegation** (`document.addEventListener` + `e.target.closest()`) | Menangani klik pada tombol Hapus yang barunya dibuat setelah halaman selesai dimuat |
| CORS & server lokal | Alasan `fetch()` ke file lokal butuh dijalankan lewat `http://`, bukan `file://` |

## Perubahan dari Jobsheet 5

* Ditambahkan folder `data/` berisi `buku.json` (10 objek, termasuk field baru `kategori`) dan `anggota.json` (4 objek) sebagai pengganti sementara API/server sungguhan.
* `<tbody>` di `buku/list.html` dan `anggota/list.html` **dikosongkan** (cuma berisi komentar) — baris tabel sekarang dirender dinamis oleh dua file JS baru: `assets/js/buku.js` dan `assets/js/anggota.js`.
* Ditambahkan elemen `<p id="loading-indicator">` di kedua halaman list yang tampil sesaat ("Memuat data...") selama proses fetch berlangsung.
* Penanganan error dengan `try`/`catch`: kalau fetch gagal (nama file salah, dsb.), tabel menampilkan pesan error di dalam satu baris (`colspan`) alih-alih halaman kosong/rusak.
* `initHapusConfirm` di `app.js` diubah dari memasang listener langsung ke tiap tombol, menjadi **event delegation** di `document` — wajib karena tombol `.btn-hapus` sekarang berada di baris yang baru dibuat *setelah* proses fetch selesai, bukan sudah ada sejak `DOMContentLoaded`.
* Fungsi `updateCounter` (dari Jobsheet 5) kini juga dipanggil di akhir `buku.js`/`anggota.js` setelah baris selesai dirender, supaya counter "Menampilkan X dari Y" tetap akurat meskipun rendernya sekarang asinkron.
* Ditambahkan kolom **Kategori** di tabel Daftar Buku — satu `<th>` baru di HTML, satu `<td>` baru di `buku.js`, dan `colspan` pesan error disesuaikan dari 5 menjadi 6.
* Ditambahkan tombol **"Muat Ulang"** di halaman Daftar Buku yang memanggil ulang `muatDaftarBuku()` saat diklik.
* Delay simulasi jaringan di `buku.js` diperbesar dari 600ms menjadi 3000ms supaya loading indicator lebih terlihat jelas (`anggota.js` tetap 600ms).
* Ditambahkan `console.log(e.target)` di awal `initHapusConfirm` untuk mendemonstrasikan cara kerja event bubbling/delegation lewat DevTools Console.

## Struktur File

```text
Jobsheet 6/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── app.js         
│       ├── buku.js        
│       └── anggota.js     
├── data/
│   ├── buku.json          
│   └── anggota.json       
├── buku/
│   ├── list.html            # <tbod
│   └── tambah.html
└── anggota/
    ├── list.html
    └── tambah.html
```

## Cara Menjalankan

**Penting:** halaman ini tidak bisa lagi dibuka langsung dengan klik-dua-kali (`file://`) — `fetch()` akan diblokir kebijakan CORS. Jalankan lewat server lokal, misalnya:
```bash
php -S localhost:8000
```
lalu buka `http://localhost:8000/index.html`. Bisa juga memakai ekstensi **Live Server** di VS Code, atau Laragon.

Setelah server jalan, coba:
* Buka Daftar Buku — amati teks "Memuat data..." tampil sekitar 3 detik sebelum 10 baris buku (termasuk kolom Kategori) muncul.
* Klik tombol **Muat Ulang** untuk memuat ulang data tanpa refresh halaman.
* Buka DevTools → Console, lalu klik beberapa tempat di halaman untuk melihat log `Elemen yang diklik: ...` dari `initHapusConfirm`.
* Coba fitur pencarian, counter, dan konfirmasi hapus — semuanya tetap berfungsi meski baris tabel sekarang dibuat dinamis.
* Uji error handling: ganti sementara `fetch("../data/buku.json")` di `buku.js` jadi nama file yang salah, simpan, lalu buka lagi Daftar Buku — pesan error akan tampil di dalam tabel.

## Materi yang Dipelajari

* Mengambil data eksternal secara asinkron dengan `fetch` + `async`/`await`
* Membaca dan memvalidasi struktur data JSON
* Menangani kegagalan jaringan dengan `try`/`catch`/`finally` tanpa merusak pengalaman pengguna
* Merender elemen DOM secara dinamis dari data, bukan menulisnya manual di HTML
* Event delegation untuk elemen yang dibuat setelah halaman selesai dimuat
* Kebutuhan server lokal (CORS) saat bekerja dengan `fetch()` ke file lokal

## Catatan

* `data/buku.json` dan `data/anggota.json` adalah pengganti sementara untuk API/server sungguhan. Pola `fetch` + `async/await` di jobsheet ini akan dipakai ulang untuk memanggil endpoint PHP asli mulai Jobsheet 9, meskipun mulai Jobsheet 7 rendering utama justru berpindah ke sisi server (PHP).
* Latihan mandiri opsional "menyatukan `buku.js` dan `anggota.js` jadi satu fungsi generik" **belum dikerjakan** di versi ini — kedua file sengaja masih terpisah dan eksplisit untuk kemudahan belajar.