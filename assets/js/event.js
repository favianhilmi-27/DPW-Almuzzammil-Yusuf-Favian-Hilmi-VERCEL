// Mengambil & menampilkan Daftar Event secara asinkron dari data/event.json
async function muatDaftarEvent() {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody) return;

    loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        await new Promise((resolve) => setTimeout(resolve, 600));

        const res = await fetch("../data/event.json");
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const daftarEvent = await res.json();

        daftarEvent.forEach(function (ev) {
            const tr = document.createElement("tr");
            tr.innerHTML =
                "<td>" + ev.nama_event + "</td>" +
                "<td>" + ev.penyelenggara + "</td>" +
                "<td>" + ev.tanggal + "</td>" +
                "<td>" + ev.kuota + "</td>" +
                "<td>" + ev.kategori + "</td>" +
                "<td>" +
                "<button type=\"button\">Edit</button> " +
                "<button type=\"button\" class=\"btn-hapus\">Hapus</button>" +
                "</td>";
            tbody.appendChild(tr);
        });
    } catch (err) {
        tbody.innerHTML =
            "<tr><td colspan=\"6\">Gagal memuat data: " + err.message + "</td></tr>";
    } finally {
        loading.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", muatDaftarEvent);
