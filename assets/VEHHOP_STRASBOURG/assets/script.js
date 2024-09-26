// Initialisation de la carte centrée sur Strasbourg
let map = L.map('map').setView([48.5734053, 7.7521113], 13);

// Ajout de la couche de tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Parcours des données pour ajouter des marqueurs et des popups
datas.forEach(zone => {
    // Coordonnées GPS de la zone
    let coordinates = [zone.lat, zone.lon];

    // Contenu du popup
    let popupContent = `
        <b>Nom:</b> ${zone.na}<br>
        <b>ID:</b> ${zone.id}<br>
        <b>Latitude:</b> ${zone.lat}<br>
        <b>Longitude:</b> ${zone.lon}<br>
        <b>Nombre de vélos disponibles:</b> ${zone.av}<br>
        <b>Nombre de docks disponibles:</b> ${zone.num_docks_available}
    `;

    // Ajout des marqueurs pour chaque zone
    let marker = L.marker(coordinates).addTo(map);

    // Ajout d'un popup au marqueur
    marker.bindPopup(popupContent);
});