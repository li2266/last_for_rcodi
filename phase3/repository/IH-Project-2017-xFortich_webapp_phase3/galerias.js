var URL_Galerias_STD = "https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json";

var dataGalerias;
var dataGaleriasReady = false;
var markersGalerias = [];

function getAllDataOfGalerias() {
    dataGalerias = $.get(URL_Galerias_STD, function () {
        clearGalerias();
    })
}

function clearGalerias() {
    dataGalerias = dataGalerias.responseJSON.data;
    var dataTemp = [];
    for (var i = 0; i < dataGalerias.length; i++) {
        dataTemp[i] = [];
        var location = dataGalerias[i][9].split(" ");
        location = new google.maps.LatLng(location[2].split(")")[0],
            location[1].split("(")[1]);
        dataTemp[i].push(location);
        dataTemp[i].push(dataGalerias[i][8]);
        dataTemp[i].push(dataGalerias[i][10]);
        dataTemp[i].push(dataGalerias[i][11]);
    }
    dataGalerias = dataTemp;

    dataGaleriasReady = true
}

function drawGalleries() {
    for (var i = 0; i < dataGalerias.length; i++) {
        var markerActual = new google.maps.Marker({
                position: dataGalerias[i][0],
                map: mainMap,
                mapTypeControl: false
            }
        );
        markersGalerias.push(markerActual)
    }
}

function clearGalleries() {
    for (var i = 0; i < markersGalerias.length; i++) {
        markersGalerias[i].setMap(null);
        markersGalerias[i] = null;
    }
    while (markersGalerias.length > 0){
        markersGalerias.pop();
    }
}

$(function () {
    $('#showMeGalleries').click(function () {
        if (dataGaleriasReady) {
            drawGalleries();
        } else {
            alert("Data not Ready")
        }
    })
});