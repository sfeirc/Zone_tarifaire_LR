// Initialisation de la carte centrée sur les coordonnées spécifiées
let map = L.map('map').setView([46.1635705075646, -1.1268395422898], 13);

// Ajout de la couche de tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Fonction pour obtenir une couleur en fonction du type de zone de tarification
function getColor(zoneType) {
    switch(zoneType) {
        case 1: return '#ff8000'; // Rouge pour type 1
        case 3: return '#00FF00'; // Bleu pour type 3
    }
}

// Parcours des données pour ajouter des polygones et des popups
datas.forEach(zone => {
    // Coordonnées GPS de la zone
    let coordinates = zone.fields.coordinates;

    // Contenu du popup
    let popupContent = `
        <b>Type de zone de tarification:</b> ${zone.fields.zt_type_zone_tarification}<br>
        <b>Zone tarifaire:</b> ${zone.fields.st_type_zone_tarifaire_tzt_libelle}<br>
        <b>Latitude:</b> ${coordinates[1]}<br>
        <b>Longitude:</b> ${coordinates[0]}
    `;

    // Ajout des polygones colorés pour chaque zone de tarification
    if (zone.fields.geo_shape) {
        let polygon = L.geoJSON(zone.fields.geo_shape, {
            style: {
                color: getColor(zone.fields.zt_type_zone_tarification),
                weight: 2,
                opacity: 1,
                fillOpacity: 0.5
            }
        }).addTo(map);

        // Ajout d'un popup au polygone
        polygon.bindPopup(popupContent);
    }
});