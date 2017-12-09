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

var paleta = ["#7BBC53", "#DE6736", "#67C1EC", "#E6B90D"];

var mainColor;
var mainColor2;
var mainColor3;

function animatePBarUP(i) {
    if (i < 100) {
        setTimeout(function () {
            $('#pbar').css('width', i + '%');
            animatePBarUP(i + 1)
        }, 1)
    }
}

function animatePBarDown(i) {
    if (i > -1) {
        setTimeout(function () {
            $('#pbar').css('width', i + '%');
            animatePBarDown(i - 1)
        }, 1)
    }
}

function updatePBar(i) {
    $('#pporcentaje').css('width', i + '%');
}


$(function init () {
    getAllDataOfZipCodes();
    getAllDataOfMuseums();
    getAllDataOfGalerias();
    getAllDataOfPublicWifi();
});

function distanceOfHouse(Xmouse, YMouse) {
    var pos = $('#casita').offset();
    return Math.sqrt(Math.pow(pos.top - YMouse, 2) + Math.pow(pos.left - Xmouse, 2))
}

$('#mainBody').mousemove(
    function (event){
        var distance = distanceOfHouse(event.pageX, event.pageY);
        if(distance < 300){
            $('#casita').css("height", (1 + (1 - (distance)/300))*50);
        }else{
            $('#casita').css("height", 50);
        }
    }
);

$('#casita').click(function () {
    var page = "<div class=\"col-4\">\n" +
        "            <div class=\"row\">\n" +
        "                <p>Looking for home?</p>\n" +
        "            </div>\n" +
        "            <div class=\"row\">\n" +
        "                <button id=\"showMePrice\">Show me price!</button>\n" +
        "            </div>\n" +
        "            <div class=\"row\">\n" +
        "                <button id=\"showMeNear\">Show me near!</button>\n" +
        "            </div>\n" +
        "            <div class=\"row\">\n" +
        "                <button id=\"clear\">Clear everything!</button>\n" +
        "            </div>\n" +
        "            <div class=\"row\">\n" +
        "                <button id=\"showMeMuseums\">Show me museums!</button>\n" +
        "            </div>\n" +
        "            <div class=\"row\">\n" +
        "                <button id=\"showMeGalleries\">Show me Galleries!</button>\n" +
        "            </div>\n" +
        "            <div class=\"row\">\n" +
        "                <button id=\"showMePublicWifi\">Show me Public Wifi!</button>\n" +
        "            </div>\n" +
        "            <div class=\"row\">\n" +
        "                <button id=\"showMeBesto\">Show me Besto Zip Area!</button>\n" +
        "            </div>\n" +
        "            <div class=\"row\">\n" +
        "                <p id=\"campo\"></p>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <div id=\"mainMap\" class=\"col-8\"></div>";
    $('#casita').unbind();
    $('#mainBody').unbind();
    $('#midView').empty();
    $('#midView').append(page);
    initButtoms();
    initMap();
});

function initButtoms() {

    $(function () {
        $('#showMeBesto').click(function () {
            if (dataZipCodesReady) {
                findBesto();
            } else {
                alert("Data not Ready" + ((dataZipCodes.length*100 / 123.0).toFixed(2)))
            }
        })
    });

    $(function () {
        $('#showMeGalleries').click(function () {
            if (dataGaleriasReady) {
                drawGalleries();
            } else {
                alert("Data not Ready")
            }
        })
    });


    $(function () {
        $('#showMeMuseums').click(function () {
            if (dataMuseosReady) {
                drawMuseums();
            } else {
                alert("Data not Ready")
            }
        })
    });

    $(function () {
        $('#showMePublicWifi').click(function () {
            if (dataPublicWifiReady) {
                drawPublicWifi();
            } else {
                alert("Data not Ready")
            }
        })
    });


    $(function () {
        $('#showMeNear').click(function () {
            if(dataZipCodesReady) {
                masCercaCerca();
            }else{
                alert("Data not Ready")
            }
        })
    });

    $(function () {
        $('#showMePrice').click(function () {
            if(dataZipCodesReady){
                masBaraBara();
            }else{
                alert("Data not Ready")
            }
        })
    });

    $('#clear').click(function () {
        if (markerMasBaraBara != null) {
            markerMasBaraBara.setMap(null);
            markerMasBaraBara = null;
        }
        if (markerMasCercaCerca != null) {
            markerMasCercaCerca.setMap(null);
            markerMasCercaCerca = null;
        }
        clearMuseums();
        clearGalleries();
        clearPublicWifi();
        clearWifiMarkersOnScreen();
        clearGaleriesMarkersOnScreen();
    });
}

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


var dataZipCodes;
var geteadas = 0;

var zipCodes = ["10025",
    "10002",
    "11226",
    "10016",
    "11235",
    "10128",
    "10011",
    "10003",
    "10462",
    "10456",
    "10463",
    "11206",
    "11230",
    "11209",
    "11201",
    "11212",
    "10024",
    "11214",
    "11377",
    "11234",
    "11207",
    "10314",
    "11215",
    "11221",
    "11211",
    "11373",
    "11385",
    "10457",
    "10027",
    "11238",
    "11233",
    "11223",
    "10021",
    "11208",
    "11204",
    "10032",
    "11219",
    "11225",
    "11213",
    "11368",
    "11203",
    "10031",
    "10014",
    "10473",
    "10033",
    "11210",
    "11434",
    "11224",
    "10306",
    "11691",
    "10312",
    "10022",
    "11432",
    "10065",
    "11222",
    "10459",
    "11435",
    "11205",
    "10026",
    "11217",
    "11237",
    "11365",
    "11103",
    "11367",
    "10035",
    "10075",
    "11101",
    "11231",
    "10301",
    "10001",
    "10304",
    "11249",
    "10305",
    "11357",
    "11105",
    "10017",
    "11228",
    "10038",
    "11379",
    "11413",
    "11420",
    "11414",
    "10309",
    "11412",
    "11361",
    "11421",
    "11378",
    "11419",
    "11433",
    "10308",
    "11418",
    "11423",
    "11369",
    "10310",
    "10303",
    "11694",
    "11422",
    "11232",
    "11417",
    "11427",
    "11692",
    "11370",
    "11356",
    "11429",
    "11362",
    "11411",
    "10470",
    "11426",
    "10005",
    "10302",
    "11428",
    "11693",
    "11004",
    "10280",
    "11436",
    "11416",
    "11366",
    "10307",
    "10069",
    "11363",
    "10006",
    "10004",
    "10464"
];

var dataZipCodesReady = false

var markerMasBaraBara;
var markerMasCercaCerca;

function getURL(zipCode) {
    var URLSTD = ["https://www.quandl.com/api/v3/datasets/ZILLOW/Z",
        "ZIPCODE",
        "_PRRAH?start_date=2017-01-30&api_key=9A-WjryqmMFf1vMFQpur"];
    return URLSTD[0] + zipCode + URLSTD[2];
}

function getAllDataOfZipCodes() {
    dataZipCodes = [];
    geteadas = 0;
    animatePBarUP(0);
    getAllDataOfZipCodesAux(dataZipCodes, geteadas);
}

function getAllDataOfZipCodesAux(dataZipCodes, index) {
    if (index < zipCodes.length) {
        dataZipCodes[index] = ([zipCodes[index], $.get(getURL(zipCodes[index]),
            function () {
                geteadas++;
                updatePBar((geteadas / 123.0) * 100)
                dataZipCodes[index].push($.get("https://maps.googleapis.com/maps/api/geocode/json?address=" +
                    zipCodes[index] +
                    "&key=AIzaSyCXUMCj7PArJQRuMPvtO7RzJo5MsHNyceI", function () {
                    dataZipCodes[index].push(dataZipCodes[index][2].responseJSON.results[0].formatted_address)
                    dataZipCodes[index][2] = dataZipCodes[index][2].responseJSON.results[0].geometry.location
                    getAllDataOfZipCodesAux(dataZipCodes, geteadas)
                }));
            })]);
    } else {
        setData();
        animatePBarDown(100)
        dataZipCodesReady = true;
    }
}

function setData() {
    for (var i = 0; i < dataZipCodes.length; i++) {
        dataZipCodes[i][1] = dataZipCodes[i][1].responseJSON.dataset.data[0][1]
    }
}
function precio(cosa, cosaOtra) {
    if (cosa[1] === cosaOtra[1]) {
        return 0;
    }
    else {
        return (cosa[1] < cosaOtra[1]) ? -1 : 1;
    }
}

function distanciaAUni(location) {
    return Math.sqrt(Math.pow(location.lat - 40.7291, 2) + Math.pow(location.lng + 73.9965, 2));
}

function cercania(cosa, cosaOtra) {
    if (cosa[2] === cosaOtra[2]) {
        return 0;
    }
    else {
        return (distanciaAUni(cosa[2]) < distanciaAUni(cosaOtra[2])) ? -1 : 1;
    }
}

function masBaraBara() {
    if (markerMasCercaCerca != null) {
        markerMasBaraBara.setMap(null);
    }
    dataZipCodes.sort(precio);
    markerMasBaraBara = new google.maps.Marker({
            position: dataZipCodes[0][2],
            map: mainMap,
            mapTypeControl: false
        }
    );
    var baraBara = new google.maps.LatLng(dataZipCodes[0][2]);
    mainMap.panTo(baraBara);
}

function masCercaCerca() {
    if (markerMasCercaCerca != null) {
        markerMasCercaCerca.setMap(null);
    }
    dataZipCodes.sort(cercania);
    markerMasCercaCerca = new google.maps.Marker({
            position: dataZipCodes[0][2],
            map: mainMap,
            mapTypeControl: false
        }
    );
    var cercaCerca = new google.maps.LatLng(dataZipCodes[0][2]);
    mainMap.panTo(cercaCerca);
}

function marcadores() {
    dataZipCodes.sort(secondColumn);
    if (geteadas == 123) {
        for (var i = 0; i < dataZipCodes.length; i++) {
            var marker = new google.maps.Marker({
                    position: dataZipCodes[i][2],
                    map: mainMap,
                    mapTypeControl: false
                }
            );
        }
    } else {
        alert("Data not dataZipCodesReady " + Math.ceil(geteadas * 100 / 123.0) + "%")
    }
}
