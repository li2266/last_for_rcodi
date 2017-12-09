var paleta = ["#7BBC53", "#DE6736", "#67C1EC", "#E6B90D"];


var mainColor;
var mainColor2;
var mainColor3;


var mainMap;

var dataZipCodes;
var geteadas = 0;

var markerMasBaraBara;
var markerMasCercaCerca;

function getDataOfLocations() {
    var dataOfLocation = [];
    dataOfLocation.push(["Casita", {lat: 1, lng: 2}]);

}

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
    }
}

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
        alert("Data not ready " + Math.ceil(geteadas * 100 / 123.0) + "%")
    }
}

$(function () {
    shuffleArray(paleta)
    $('#topC').css('background-color', paleta[0]);
    $('#bottomC').css('background-color', paleta[0]);
    $('#pporcentaje').css('background-color', paleta[1]);
});

$(function () {
    $('#findMeHome').click(function () {
        getAllDataOfZipCodes();
    })
});

$(function () {
    $('#showMePrice').click(function () {
        masBaraBara();
    })
});

$(function () {
    $('#showMeNear').click(function () {
        masCercaCerca();
    })
});

$(function () {
    $('#clear').click(function () {
        if (markerMasBaraBara != null) {
            markerMasBaraBara.setMap(null);
            markerMasBaraBara = null;
        }
        if (markerMasCercaCerca != null) {
            markerMasCercaCerca.setMap(null);
            markerMasCercaCerca = null;
        }
    })
});


$(function () {
    $('#bicycle').hover(function () {
        $('.bkazuloso').css('background-color', '#FCA648');
    }, function () {
        $('.bkazuloso').css('background-color', '#99DFD4');
    });
});
