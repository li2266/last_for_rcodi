var mainMap;


function initMap() {
    mainMap = new google.maps.Map(document.getElementById('mainMap'), {
        center: {lat: 40.7291, lng: -73.9965},
        zoom: 15
    });
    var marker = new google.maps.Marker({
            position: {lat: 40.7291, lng: -73.9965},
            map: mainMap,
            mapTypeControl: false
        }
    );

}

function shuffleArray(data) {
    for (var i = 0; i < data.length; data++) {
        var rand = Math.ceil(Math.random() * (data.length - 1));
        var mem = data[0];
        data[0] = data[rand];
        data[rand] = mem;
    }
}

$(function () {
    shuffleArray(paleta)
    $('#topC').css('background-color', paleta[0]);
    $('#bottomC').css('background-color', paleta[0]);
    $('#pporcentaje').css('background-color', paleta[1]);
});