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