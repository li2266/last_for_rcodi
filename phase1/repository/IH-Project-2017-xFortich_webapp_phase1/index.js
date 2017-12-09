var mainMap

function getDataOfLocations() {
    var dataOfLocation = []
    dataOfLocation.push(["Casita", {lat:1, lng: 2}])

}

function initMap() {
    mainMap = new google.maps.Map(document.getElementById('mainMap'), {
        center: {lat: 40.7291, lng: -73.9965},
        zoom: 15
    });
    var marker = new google.maps.Marker({
            position : {lat: 40.7291, lng: -73.9965},
            map: mainMap,
            mapTypeControl: false
        }
    );

}

function animateMapZoomInTo(map, indexZoom) {
    console.log(map.getZoom())
    if(map.getZoom() < indexZoom){
        google.maps.event.addListenerOnce(map, 'zoom_changed', function (event){
            animateMapZoomInTo(map, indexZoom)
        })
        setTimeout(function () {
            map.setZoom(map.getZoom() + 1)
        }, 600)
    }
}

