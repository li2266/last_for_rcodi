var slider = new Slider("#radiusSlider");
slider.on("slide", function(sliderValue) {
	document.getElementById("sliderVal").textContent = sliderValue;
});

var museumIcon = 'https://i.imgur.com/jl7bwH0.png';
var museumMarkers = [];

 function getMuseums(){
    var museums = $.get("https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD")
    .done(function(){
        for (var i = 0; i < (museums.responseJSON.data).length; i++) {
            var name = museums.responseJSON.data[i][9];
            var posStr = museums.responseJSON.data[i][8];
            
            var pos = posStr.split("(")[1].split(")")[0].split(" ");
            var latlng = new google.maps.LatLng(pos[1],pos[0]);
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
                icon: museumIcon,
                title: name
            });
            museumMarkers.push(marker);
            marker.setMap(null);
        }
    })
    .fail(function(error){
        console.error(error);
    });
}

var fireIcon = "https://i.imgur.com/Ut6dYqk.png";
var fireMarkers = [];
function getFireStations(){
    
    var stations = $.get("https://data.cityofnewyork.us/resource/byk8-bdfw.json")
    .done(function(){
        data = stations.responseJSON;
        for (var i = 0; i < data.length; i++) {
            var latlng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
                icon: fireIcon,
                title: data[i].facilityname
            });
            fireMarkers.push(marker);
            marker.setMap(null); 
        } 
    })
    .fail(function(error){
        console.error(error);
    });
}

var boundariesPolygons = [];
function getBoundaries(){
    var boundaries = $.get("https://data.cityofnewyork.us/resource/7t3b-ywvw.json")
    .done(function(){
        data = boundaries.responseJSON;
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
        } 
    })
    .fail(function(error){
        console.error(error);
    });
}

var vaccineIcon = "https://i.imgur.com/SJAJLMZ.png";
var vaccineMarkers = [];
function getVaccineLocations(){
    var vaccines = $.get("https://data.cityofnewyork.us/api/views/w9ei-idxz/rows.json?accessType=DOWNLOAD")
    .done(function(){
        data = vaccines.responseJSON.data;
        for (var i = 0; i < data.length; i++) {
            var latlng = new google.maps.LatLng(data[i][19],data[i][20]);
            var marker = new google.maps.Marker({
                position: latlng,
                map:map,
                icon: vaccineIcon,
                title: data[i][15]
            });
            vaccineMarkers.push(marker);
            marker.setMap(null);
        } 
    })
    .fail(function(error){
        console.error(error);
    });
}

var museums_on = false;
function putMuseums(){
    if (museums_on === false){
        for(var i=0; i<museumMarkers.length;i++){
            museumMarkers[i].setMap(map);
        }
        museums_on = true;
    }
    else{
        for(var j=0; j<museumMarkers.length;j++){
            museumMarkers[j].setMap(null);
        }
        museums_on = false;
    }
}

var fireStations_on = false;
function putFireStations(){
    if (fireStations_on === false){
        for(var i=0; i<fireMarkers.length;i++){
            fireMarkers[i].setMap(map);
        }
        fireStations_on = true;
    }
    else{
        for(var j=0; j<fireMarkers.length;j++){
            fireMarkers[j].setMap(null);
        }
        fireStations_on = false;
    }
}

var vaccines_on = false;
function putVaccineLocations(){
    if (vaccines_on === false){
        for(var i=0; i<vaccineMarkers.length;i++){
            vaccineMarkers[i].setMap(map);
        }
        vaccines_on = true;
    }
    else{
        for(var j=0; j<vaccineMarkers.length;j++){
            vaccineMarkers[j].setMap(null);
        }
        vaccines_on = false;
    }
}


// --------BIKE ROUTES

/*
var bikePaths = [];
var pathlatlng = [];
function getPaths(){
    var paths = $.get("https://data.ny.gov/api/views/bzam-7she/rows.json?accessType=DOWNLOAD")
    .done(function(){
        for(i=0; i<paths.responseJSON.data.length; i++){
            var posStr = paths.responseJSON.data[i][9];
            pos = posStr.split("((")[1].split("))")[0].split(",");
            var a = pos[0].split(" ");
            var latlngA = new google.maps.LatLng(a[1],a[0]);
                pathlatlng.push(latlngA);
            for (j=1; j<pos.length; j++){
                line = pos[j].split(" ");
                var latlng = new google.maps.LatLng(line[2],line[1]);
                pathlatlng.push(latlng);
            }
            
            var myPath = new google.maps.Polyline({
                path: pathlatlng,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
                
              });
            bikePaths.push(myPath);
            myPath.setMap(null);
            console.log(pathlatlng);
            pathlatlng = [];
            console.log(pathlatlng);
        }        
         
    })
    .fail(function(error){
        console.error(error);
    });
}

function putPaths(toDo){
    for(var i=0; i<bikePaths.length;i++){
        bikePaths[i].setMap(toDo);
        
    }
}

function  paths(){
    putPaths(map);

}
*/

bikePath_on = false;
function bikeLayers() {
    if (bikePath_on === false){
        bikeLayer.setMap(map);
        bikePath_on = true;
    } else {
        bikeLayer.setMap(null);
        bikePath_on = false;
    }
}


// --------GOOGLE MAPS

var map;
var bikeLayer
function onGoogleMapResponse () {
    var NYU = {lat: 40.7291, lng: -73.9965};
    map = new google.maps.Map(document.getElementById('googleMapContainer'), {
        center: (NYU),
        zoom: 14
    });
    
    var marker = new google.maps.Marker({
        position: NYU,
        map:map,
        title: "NYU Stern School of Business"
    });
    
    bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(null);
    
    getMuseums();
    getFireStations();
    getVaccineLocations();
    getBoundaries();
    //getPaths();
    
    var cityCircle = new google.maps.Circle({
          strokeColor: '#ffd21e',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#ffd21e',
          fillOpacity: 0.25,
          map: map,
          center: (NYU),
          radius: 0
        });
        
    //SLider for changing what "Near" means.
    slider.on("slide", function(sliderValue) {
        cityCircle.setRadius(parseFloat(parseInt(document.getElementById("sliderVal").textContent)) * 1609.43);
        //cityCircle.setRadius(parseInt(document.getElementById("sliderVal").textContent) * 1000);
    });

}

function centerMap(){
    map.setCenter({lat: 40.7291, lng: -73.9965});
}


// ----------Buttons

$(document).ready(function(){
    $("#museumsButton").on("click", putMuseums);
    $("#fireButton").on("click", putFireStations);
    $("#vaccineButton").on("click", putVaccineLocations);
    $("#pathsButton").on("click", bikeLayers);
    $("#crimesButton").on("click", centerMap);
    
});