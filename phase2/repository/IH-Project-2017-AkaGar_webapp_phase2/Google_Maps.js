

function initMap() {
        var options = {zoom: 14, center: {lat: 40.7291, lng: -73.9965}}
        var main = new google.maps.Map(document.getElementById('map'), options)
        var marker = new google.maps.Marker({position: {lat: 40.7291, lng: -73.9965}, map: main})
    }
