
  const DATASET_QUERY_FORMAT_C = ' https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD';

    var Places1 = new XMLHttpRequest();
    Places1.open('GET',DATASET_QUERY_FORMAT_C);

    Places1.responseType = 'json';
    Places1.send();
    var datamu;

  Places1.onload = function() {
  var datamu = Places1.response;
  console.log(datamu);
      
  }
      var Distance;  // distancia para el asistente como pasar variablkes de una pagina a otra?
      var map;
      var markers = [];
      var markers1 = [];    
         
      function initMap() {
      //  var haightAshbury = {lat: 37.769, lng: -122.446};
          Distance = parseInt(getParameterByName('prodId'));
          map = new google.maps.Map(document.getElementById('googleMap'), {
          zoom: 13,
          center:new google.maps.LatLng(40.729100, -73.996500),
          
        });
            new google.maps.Marker({
              map: map,
              position: new google.maps.LatLng(40.729100, -73.996500)
            });
        
          map.addListener('click', function(event) {
          addMarker(event.latLng,markers);
        });
        //crar circulos
         var cityCircle = new google.maps.Circle({
       strokeColor: '#FF0000',
       strokeOpacity: 0.8,
       strokeWeight: 2,
       fillOpacity: 0.2,
       map: map,
       center: {lat: 40.729100, lng: -73.996500 },
       radius: Distance
      
    });
        
      }
      
     
     

      // Adds a marker to the map and push to the array.
         // Adds a marker to the map and push to the array.
      function addMarker(location,array) {
        var marker = new google.maps.Marker({
          position: location,
          map: map
        });
        array.push(marker);
      }

      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
         }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
        
         }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }




function ch (){
    
       window.location.replace("index.html");
    
}



function reset (){
     initMap();
       
       
       /*
    map.setCenter(new google.maps.LatLng(40.729100, -73.996500));
    map.setZoom(13)
    deleteMarkers();
    */
    
    // for some reason this didn't erase the marks of the datasets
    
}

function ch1 (){
    
     window.location.replace("dos.html");
    
}
function ch2 (){
    
       window.location.replace("tres.html");
    
}


function showdata(){

       
    for( var j=0; j< Places1.response.data.length; j++){
     var muubic=Places1.response.data[j][8];
     var musa=muubic.split("(");
     var musb=musa[1].split(" ");
     var musc=musb[1].split(")");
     addMarker2(musc[0],musb[0], markers1);
     //addMarker(lat:musc[0],lng:musb[0],markers) no work
    }
     
} 

    
    function addMarker2(lat, long, array) {
       var marker =  new google.maps.Marker({
              map: map,
              position: new google.maps.LatLng(lat, long),
            
        });
        array.push(markers1);
      }
      

 function GetdistanceB (){
     Distance=1800;
     window.location.replace("dos.html"+"?prodId="+Distance);
   
 }
 function GetdistanceC (){
     Distance=2900;
      window.location.replace("dos.html"+"?prodId="+Distance);
     }
 function GetdistanceW (){
     Distance=700;
      window.location.replace("dos.html"+"?prodId="+Distance);
     }
    
      //obtener distancias
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


    
  