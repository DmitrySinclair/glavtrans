function contactsMap(){
    if ($('#map').length) {
        DG.then(function() {
            var map,
                myIcon;

            map = DG.map('map', {
                center: [52.2797, 104.260],
                zoom: 16,
                scrollWheelZoom: false
            });

            myIcon = DG.icon({
                iconUrl: '/dist/images/contacts/map-pin-silhouette.png',
                iconSize: [24, 32],
                iconAnchor: [12, 32]
            });
            DG.marker([52.279518, 104.255206], {
                icon: myIcon
            }).addTo(map);
        });
    }
}

module.exports = contactsMap;