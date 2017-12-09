function getDistan(latA, lngA, latB, lngB) {
    return Math.sqrt(Math.pow((latA - latB), 2) + Math.pow((lngA - lngB), 2))*125;
}

var wifiMarkersOnScreen = [];

function clearWifiMarkersOnScreen() {
    for (var i = 0; i < wifiMarkersOnScreen.length; i++) {
        wifiMarkersOnScreen[i].setMap(null);
        wifiMarkersOnScreen[i] = null;
    }
    while (wifiMarkersOnScreen.length > 0){
        wifiMarkersOnScreen.pop();
    }
}

function getPulicWifiNear(indexZipCode) {
    for (var i = 0; i < wifiMarkersOnScreen.length; i++){
        wifiMarkersOnScreen[i].setMap(null);
    }
    while (wifiMarkersOnScreen.length > 0){
        wifiMarkersOnScreen.pop()
    }
    var latZip = dataZipCodes[indexZipCode][2].lat;
    var lngZip = dataZipCodes[indexZipCode][2].lng;
    var cantidad = 0;
    var wifiEs = [];
    for(var i = 0; i < dataPublicWifi.length; i ++){
        var latPWF = dataPublicWifi[i][0].lat();
        var lngPWF = dataPublicWifi[i][0].lng();
        if (getDistan(latZip, lngZip, latPWF, lngPWF) < 1){
            cantidad++;
            wifiEs.push(dataPublicWifi[i])
        }
    }

    for (var i = 0; i < wifiEs.length; i ++){
        var markerActual = new google.maps.Marker({
                position: wifiEs[i][0],
                map: mainMap,
                mapTypeControl: false
            }
        );
        wifiMarkersOnScreen.push(markerActual)
    }
    return cantidad;
}

var galeriesMarkersOnScreen = [];

function clearGaleriesMarkersOnScreen() {
    for (var i = 0; i < galeriesMarkersOnScreen.length; i++) {
        galeriesMarkersOnScreen[i].setMap(null);
        galeriesMarkersOnScreen[i] = null;
    }
    while (galeriesMarkersOnScreen.length > 0){
        galeriesMarkersOnScreen.pop();
    }
}

function getGaleriesNear(indexZipCode) {
    for (var i = 0; i < galeriesMarkersOnScreen.length; i++){
        galeriesMarkersOnScreen[i].setMap(null);
    }
    while (galeriesMarkersOnScreen.length > 0){
        galeriesMarkersOnScreen.pop()
    }
    var latZip = dataZipCodes[indexZipCode][2].lat;
    var lngZip = dataZipCodes[indexZipCode][2].lng;
    var cantidad = 0;
    var galeriesEs = [];
    for(var i = 0; i < dataGalerias.length; i ++){
        var latPWF = dataGalerias[i][0].lat();
        var lngPWF = dataGalerias[i][0].lng();
        if (getDistan(latZip, lngZip, latPWF, lngPWF) < 1){
            cantidad++;
            galeriesEs.push(dataGalerias[i])
        }
    }

    for (var i = 0; i < galeriesEs.length; i ++){
        var markerActual = new google.maps.Marker({
                position: galeriesEs[i][0],
                map: mainMap,
                mapTypeControl: false
            }
        );
        galeriesMarkersOnScreen.push(markerActual)
    }
    return cantidad;
}

//maxZillowValue 31.84
//meanZillowValue 22.02
//minZillowValue 8.65
//maxgaleries 163
//meanGaleries 7.48
//mingaleries 0
//maxwifi 92
//meanWifi 12.16
//minwifi 0

function getLiveIndexFromZipCode(zipCodeIndex) {
    return ((1 - dataZipCodes[zipCodeIndex][1]/31.84)*0.6 + (getGaleriesNear(zipCodeIndex)/163)*0.2 +
        (getPulicWifiNear(zipCodeIndex)/92)*0.2)
}

function findBesto() {
    var max = 0;
    var index = -1;
    for(var i = 0; i < dataZipCodes.length; i++){
        var liveIn = getLiveIndexFromZipCode(i);
        console.log(liveIn);
        if(max < liveIn){
            max =  liveIn;
            index = i
        }
    }
    getLiveIndexFromZipCode(index)
}

$(function () {
    $('#showMeBesto').click(function () {
        if (dataZipCodesReady) {
            findBesto();
        } else {
            alert("Data not Ready" + ((dataZipCodes.length*100 / 123.0).toFixed(2)))
        }
    })
});