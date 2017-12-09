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

function putMuseums(toDo){
    for(var i=0; i<museumMarkers.length;i++){
        museumMarkers[i].setMap(toDo);
    }
}

function museums(){
    putMuseums(map);

}

// --------BIKE ROUTES

var bikePaths = [];
var pathlatlng = [];
function getPaths(){
    var paths = $.get("https://data.ny.gov/api/views/bzam-7she/rows.json?accessType=DOWNLOAD")
    .done(function(){
        
            var posStr = paths.responseJSON.data[1][9];
            pos = posStr.split("((")[1].split("))")[0].split(",");
            for (j=0; j<pos.length; j++){
                line = pos[j].split(" ");
                var latlng = new google.maps.LatLng(line[1],line[0]);
                pathlatlng.push(latlng);
            }
            var flightPath = new google.maps.Polyline({
                path: pathlatlng,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 20
                
              });
        flightPath.setMap(map);
        
    })
    .fail(function(error){
        console.error(error);
    });
}


// --------GOOGLE MAPS

var map;
function onGoogleMapResponse () {
 
    map = new google.maps.Map(document.getElementById('googleMapContainer'), {
        center: ({lat: 40.7291, lng: -73.9965}),
        zoom: 13
    });
    
    getMuseums();
    getPaths();
}


// ----------Buttons

$(document).ready(function(){
    $("#getDataButton").on("click", museums);
    
});
