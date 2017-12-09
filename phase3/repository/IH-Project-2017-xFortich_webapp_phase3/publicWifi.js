var URL_PublicWifi_STD = "https://data.cityofnewyork.us/api/views/varh-9tsp/rows.json?accessType=DOWNLOAD";
var dataPublicWifi;
var dataPublicWifiReady = false;
var markersPublicWifi = [];

function getAllDataOfPublicWifi() {
    dataPublicWifi = $.get(URL_PublicWifi_STD, function () {
        clearDataPublicWifi();
    })
}

function clearDataPublicWifi() {
    dataPublicWifi = dataPublicWifi.responseJSON.data;
    var dataTemp = [];
    for (var i = 0; i < dataPublicWifi.length; i++) {
        dataTemp[i] = [];
        var location = dataPublicWifi[i][9].split(" ");
        location = new google.maps.LatLng(location[2].split(")")[0],
            location[1].split("(")[1]);
        dataTemp[i].push(location);
        dataTemp[i].push(dataPublicWifi[i][20]);
        dataTemp[i].push(dataPublicWifi[i][28]);
        dataTemp[i].push(dataPublicWifi[i][26]);
    }
    dataPublicWifi = dataTemp;

    dataPublicWifiReady = true
}

function drawPublicWifi() {
    for (var i = 0; i < dataPublicWifi.length; i++) {
        var markerActual = new google.maps.Marker({
                position: dataPublicWifi[i][0],
                map: mainMap,
                mapTypeControl: false
            }
        );
        markersPublicWifi.push(markerActual)
    }
}

function clearPublicWifi() {
    for (var i = 0; i < markersPublicWifi.length; i++) {
        markersPublicWifi[i].setMap(null);
        markersPublicWifi[i] = null;
    }
    while (markersPublicWifi.length > 0){
        markersPublicWifi.pop();
    }
}

$(function () {
    $('#showMePublicWifi').click(function () {
        if (dataPublicWifiReady) {
            drawPublicWifi();
        } else {
            alert("Data not Ready")
        }
    })
});