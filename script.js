const map = L.map('map').setView([43.094, 12.414], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker = L.marker([43.094, 12.414]).addTo(map);

document.getElementById('btn-update').addEventListener('click', () => {
    const latRaw = document.getElementById('lat').value;
    const lngRaw = document.getElementById('lng').value;

    if (latRaw !== "" && lngRaw !== "") {
        const lat = parseFloat(latRaw);
        const lng = parseFloat(lngRaw);

        if (!isNaN(lat) && !isNaN(lng)) {
            map.setView([lat, lng], 15);
            marker.setLatLng([lat, lng]);
            marker.bindPopup(`Coordinate: ${lat}, ${lng}`).openPopup();
        } else {
            alert("Inserisci numeri validi!");
        }
    } else {
        alert("Inserisci latitudine e longitudine!");
    }
});

document.getElementById('btn-gps').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            document.getElementById('lat').value = userLat.toFixed(5);
            document.getElementById('lng').value = userLng.toFixed(5);

            map.setView([userLat, userLng], 15);
            marker.setLatLng([userLat, userLng]);
            marker.bindPopup("Sei qui!").openPopup();
        });
    }
});
