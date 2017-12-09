function initMap() {        
    gMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: centerMap,
        mapTypeId: 'hybrid'

    });
    

    //var service = new google.maps.places.PlacesService(gMap);
    
    var marker = new google.maps.Marker({
      position: centerMap,
      map: gMap,
      icon: "https://image.ibb.co/keOSkw/NYU_25.png"
    });    
    
};

function getCircle(magnitude) {
    var circle = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: magnitude
    };
    return circle;
}

function markerClick () {
    //
    gMap.setZoom(16);
    gMap.setCenter(this.getPosition());

    //
    toggleBounce(this);    
};

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

