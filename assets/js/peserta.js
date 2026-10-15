// Mengambil & menampilkan Daftar Peserta secara asinkron dari data/peserta.json
async function muatDaftarPeserta() {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody) return;

    loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        await new Promise((resolve) => setTimeout(resolve, 600));

        const res = await fetch("../data/peserta.json");
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const daftarPeserta = await res.json();

        daftarPeserta.forEach(function (peserta) {
            const tr = document.createElement("tr");
            tr.innerHTML =
                "<td>" + peserta.nim + "</td>" +
                "<td>" + peserta.nama + "</td>" +
                "<td>" + peserta.prodi + "</td>" +
                "<td>" + peserta.no_hp + "</td>" +
                "<td>" +
                "<button type=\"button\">Edit</button> " +
                "<button type=\"button\" class=\"btn-hapus\">Hapus</button>" +
                "</td>";
            tbody.appendChild(tr);
        });
    } catch (err) {
        tbody.innerHTML =
            "<tr><td colspan=\"5\">Gagal memuat data: " + err.message + "</td></tr>";
    } finally {
        loading.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", muatDaftarPeserta);
