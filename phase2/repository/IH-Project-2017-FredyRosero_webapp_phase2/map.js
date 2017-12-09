function initMap() {        
    gMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: centerMap,
        mapTypeId: 'hybrid'

    });
    
    var marker = new google.maps.Marker({
      position: centerMap,
      map: gMap
    });
};

function getCircle(magnitude) {
    var circle = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: magnitude
    };
    return circle;a
}

function toggleBounce(m) {
    markers.map(function(el){
       el.setAnimation(null);
    });
    if (m.getAnimation() !== null) {
        m.setAnimation(null);
    } else {
        m.setAnimation(google.maps.Animation.BOUNCE);
    }
}

