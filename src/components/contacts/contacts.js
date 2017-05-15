function contactsMap(){
    if ($('#map').length) {
        DG.then(function() {
            var map,
                myIcon;

            map = DG.map('map', {
                center: [52.257533, 104.361261],
                zoom: 16.33,
                scrollWheelZoom: false
            });

            myIcon = DG.icon({
                iconUrl: '../images/form/marker.png',
                iconSize: [24, 32],
                iconAnchor: [12, 32]
            });
            
            DG.marker([52.257533, 104.361261], {
                icon: myIcon
            }).addTo(map);
        });
    }
}

module.exports = contactsMap;