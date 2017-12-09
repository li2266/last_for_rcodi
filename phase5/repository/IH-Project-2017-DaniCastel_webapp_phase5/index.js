var museumIcon = 'https://i.imgur.com/AMlmfFH.png';
var artIcon = 'https://i.imgur.com/duAko5I.png';

//For map markers
var artMarkers = [];
var bikeRoutesPaths=[];
var museumMarkers = [];

//-----------------GOOGLE MAPS AND INITIALIZE THINGS :B-----------------

/*Google Maps js */
var map;
var bikeLayer;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7291, lng: -73.9965},
        zoom: 13
    });
    bikeLayer = new google.maps.BicyclingLayer();
    getMuseums();
    getBikeRoutes();
    getArt();
}

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});

//------------------------------------------------MUSEUMS GET DATASET AND FUNCTIONS------------------------------------------------------

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


//------------------------------------------BIKE GET ROUTES DATASETS AND FUNCTIONS---------------------------------------------------------

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

//------------------------------------------------ART GET GALLERIES DATASET AND FUNCTIONS------------------------------------------------------

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

//-----------------------------------------------------PAINT CLIMATE CHARTS----------------------------------------------------------


function getChart(){
    d3.select("svg").text("")
    if(document.getElementById("selectChart").value == "minTemp"){
        graphMinTemp();
    }else if(document.getElementById("selectChart").value == "maxTemp"){
        graphMaxTemp();
    }else{
        graphPrecp();
    }
}