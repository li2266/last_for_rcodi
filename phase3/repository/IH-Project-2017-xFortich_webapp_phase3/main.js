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

$(function () {
    getAllDataOfZipCodes();
    getAllDataOfMuseums();
    getAllDataOfGalerias();
    getAllDataOfPublicWifi();
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
        clearMuseums();
        clearGalleries();
        clearPublicWifi();
        clearWifiMarkersOnScreen();
        clearGaleriesMarkersOnScreen();
    })
});
