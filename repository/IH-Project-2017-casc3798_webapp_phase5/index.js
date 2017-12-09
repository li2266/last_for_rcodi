var museumIcon = 'https://i.imgur.com/hIXzGf8.png';
var artIcon = 'https://i.imgur.com/dfn7MR2.png';
var firehouseIcon = "https://i.imgur.com/1dSpYMY.png";
var houseByBuildingIcon = "https://i.imgur.com/2huQ4qq.png";
var alternativeFuelStationIcon = "https://i.imgur.com/wiEM0rh.png";

var artMarkers = [];
var bikeRoutesPaths=[];
var museumMarkers = [];
var fireHouseMarkers = [];
var houseByBuildingMarkers= [];
var alternativeFuelStationMarkers=[];

var map;
var bikeLayer;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7291, lng: -73.9965},
        zoom: 10
    });
    bikeLayer = new google.maps.BicyclingLayer();
    getMuseums();
    getBikeRoutes();
    getArt();
    getFireHouse();
    getHouseByBuilding();
    getAlternativeFuelStation();
}

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});


function getMuseums(){
    var museums = $.get("https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD")
    .done(function(){
        for (var i = 0; i < (museums.responseJSON.data).length; i++) {
            var posStr = museums.responseJSON.data[i][8];
            var pos = posStr.split("(")[1].split(")")[0].split(" ");
            var latlng = new google.maps.LatLng(pos[1],pos[0]);
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
                icon: museumIcon
            });
            museumMarkers.push(marker);
            marker.setMap(null);
        }
    })
    .fail(function(error){
        console.error(error);
    });
}

function putMuseums(toDo){
    for(var i=0; i<museumMarkers.length;i++){
        museumMarkers[i].setMap(toDo);
    }
}

function museums(){
    if(document.getElementById("museumsButton").checked){
        putMuseums(map);
    }else{
        putMuseums(null);
    }
}



function getBikeRoutes(){
    var bikeRoutes = $.get("https://data.ny.gov/api/views/bzam-7she/rows.json?accessType=DOWNLOAD")
    
    .done(function(){
        for(var i=0;i<(bikeRoutes.responseJSON.data).length;i++){
            var walk = [];
            var posStr = bikeRoutes.responseJSON.data[i][9];
            var pos = posStr.split("((")[1].split(")")[0].split(", ");
            for(var j = 0; j<pos.length; j++){
                var lonlat = pos[j].split(" ");
                var latlon = {"lat": Number(lonlat[1]), "lng": Number(lonlat[0])};
                walk.push(latlon);
            }
            var polyline = new google.maps.Polyline({
                path: walk,
                geodesic: true,
                strokeColor: '#F39C12',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            bikeRoutesPaths.push(polyline);
            polyline.setMap(null);
        }
        document.getElementById("bikeRules").style.display = "none";
    })
    .fail(function(error){
        console.error(error);
    });
}

function putBikeroutes(toDo){
    for(var i=0;i<bikeRoutesPaths.length;i++){
        bikeRoutesPaths[i].setMap(toDo);
    }
}

function bikeRoutes(){
    if(document.getElementById("bikeRoutesButton").checked){
        putBikeroutes(map);
        bikeLayer.setMap(map);
    }else{
        putBikeroutes(null);
        bikeLayer.setMap(null);
    }
    var x = document.getElementById("bikeRules");
    if(x.style.display === "none"){
        x.style.display = "block";
    }else{
        x.style.display = "none";
    }
}


function getArt(){
    var art = $.get("https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD")
    .done(function(){
        for (var i = 0; i < (art.responseJSON.data).length; i++) {
            var posStr = art.responseJSON.data[i][9];
            var pos = posStr.split("(")[1].split(")")[0].split(" ");
            var latlng = new google.maps.LatLng(pos[1],pos[0]);
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
                icon: artIcon
            });
            artMarkers.push(marker);
            marker.setMap(null);
        }
    })
    .fail(function(error){
        console.error(error);
    });
}

function putArt(toDo){
    for(var i=0; i<artMarkers.length;i++){
        artMarkers[i].setMap(toDo);
    }
}

function art(){
    if(document.getElementById("artButton").checked){
        putArt(map);
    }else{
        putArt(null);
    }
}


function getFireHouse(){
    var fireHouse = $.get("https://data.ny.gov/api/views/qfsu-zcpv/rows.json?accessType=DOWNLOAD")
    .done(function(){
        for (var i = 0; i < (fireHouse.responseJSON.data).length; i++) {
            var latlng = new google.maps.LatLng(fireHouse.responseJSON.data[i][17],fireHouse.responseJSON.data[i][18])
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
                icon: firehouseIcon
            });
            fireHouseMarkers.push(marker);
            marker.setMap(null);
        }
    })
    .fail(function(error){
        console.error(error);
    });
}

function putfireHouse(toDo){
    for(var i=0; i<fireHouseMarkers.length;i++){
        fireHouseMarkers[i].setMap(toDo);
    }
}

function fireHouse(){
    if(document.getElementById("fireHouseButton").checked){
        putfireHouse(map);
    }else{
        putfireHouse(null);
    }
}


function getHouseByBuilding(){
    var houseByBuilding = $.get("https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD")
    .done(function(){
        for (var i = 0; i < (houseByBuilding.responseJSON.data).length; i++) {
            var latlng = new google.maps.LatLng(houseByBuilding.responseJSON.data[i][23],houseByBuilding.responseJSON.data[i][24])
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
                icon: houseByBuildingIcon
            });
            houseByBuildingMarkers.push(marker);
            marker.setMap(null);
        }
    })
    .fail(function(error){
        console.error(error);
    });
}

function putHouseByBuilding(toDo){
    for(var i=0; i<houseByBuildingMarkers.length;i++){
        houseByBuildingMarkers[i].setMap(toDo);
    }
}

function houseByBuilding(){
    if(document.getElementById("houseByBuildingButton").checked){
        putHouseByBuilding(map);
    }else{
        putHouseByBuilding(null);
    }
}

function getAlternativeFuelStation(){
    var alternativeFuelStation = $.get("https://data.ny.gov/api/views/bpkx-gmh7/rows.json?accessType=DOWNLOAD")
    .done(function(){
        for (var i = 0; i < (alternativeFuelStation.responseJSON.data).length; i++) {
            var latlng = new google.maps.LatLng(alternativeFuelStation.responseJSON.data[i][32],alternativeFuelStation.responseJSON.data[i][33])
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
                icon: alternativeFuelStationIcon
            });
            alternativeFuelStationMarkers.push(marker);
            marker.setMap(null);
        }
    })
    .fail(function(error){
        console.error(error);
    });
}

function putAlternativeFuelStation(toDo){
    for(var i=0; i<alternativeFuelStationMarkers.length;i++){
        alternativeFuelStationMarkers[i].setMap(toDo);
    }
}

function AlternativeFuelStation(){
    if(document.getElementById("AlternativeFuelStationButton").checked){
        putAlternativeFuelStation(map);
    }else{
        putAlternativeFuelStation(null);
    }
}