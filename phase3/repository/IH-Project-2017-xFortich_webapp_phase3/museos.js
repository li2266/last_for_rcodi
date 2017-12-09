var URL_MUSEOS_STD = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json"
var dataMuseos;
var dataMuseosReady = false;
var markersMuseums = [];

function getAllDataOfMuseums() {
    dataMuseos = $.get(URL_MUSEOS_STD, function () {
        clearDataMuseos();
    })
}

function clearDataMuseos() {
    dataMuseos = dataMuseos.responseJSON.data;
    var dataTemp = [];
    for (var i = 0; i < dataMuseos.length; i++) {
        dataTemp[i] = [];
        var location = dataMuseos[i][8].split(" ");
        location = new google.maps.LatLng(location[2].split(")")[0],
            location[1].split("(")[1]);
        dataTemp[i].push(location);
        dataTemp[i].push(dataMuseos[i][9]);
        dataTemp[i].push(dataMuseos[i][10]);
        dataTemp[i].push(dataMuseos[i][11]);
    }
    dataMuseos = dataTemp;

    dataMuseosReady = true
}

function drawMuseums() {
    for (var i = 0; i < dataMuseos.length; i++) {
        var markerActual = new google.maps.Marker({
                position: dataMuseos[i][0],
                map: mainMap,
                mapTypeControl: false
            }
        );
        markersMuseums.push(markerActual)
    }
}

function clearMuseums() {
    for (var i = 0; i < markersMuseums.length; i++) {
        markersMuseums[i].setMap(null);
        markersMuseums[i] = null;
    }
    while (markersMuseums.length > 0){
        markersMuseums.pop();
    }
}

$(function () {
    $('#showMeMuseums').click(function () {
        if (dataMuseosReady) {
            drawMuseums();
        } else {
            alert("Data not Ready")
        }
    })
});