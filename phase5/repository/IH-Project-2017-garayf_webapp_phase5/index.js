    const DATASETH = 'https://data.cityofnewyork.us/resource/ffxx-dfvk.json';
    const DATASETM = 'https://data.cityofnewyork.us/resource/fn6f-htvy.json';
    const DATASETA = 'https://data.cityofnewyork.us/resource/43hw-uvdj.json'; 
  
      var Distance;  // distancia para el asistente como pasar variablkes de una pagina a otra?
      var map;
      var markers = [];
      var center = {lat: 40.7291, lng: -73.9965};
      var prueba1 = true;
      var prueba2 = 1;
      var markers1 = [];   
      var cityCircle;
      var prueba3= true;
      var markers2 = [];
      var prueba4 = false;
      var houseMarks = [];
      var prueba5=true;
      var housePosition = [];
    
     
 

function MuseumD(){
  $.getJSON(DATASETM, function(data, text){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.the_geom.coordinates[1]),
                                         parseFloat(entry.the_geom.coordinates[0])),
        map: null,
        icon: "https://www.merkado.co.za/media/favicon/default/merkado-favicon.png"
      });
      markers1.push(marker);
         });
  });
}

function setMuseumData(type){
  for (var i = 0; i < markers1.length; i++) {
    markers1[i].setMap(type);
  }
}

function Museums(){
    
     if (!prueba1){
      setMuseumData(null);
      prueba1 = true;
    }
    else {
      setMuseumData(map);
      prueba1 = false;
    }
}


function Art(){
  $.getJSON(DATASETA, function(data, text){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.the_geom.coordinates[1]),
                                         parseFloat(entry.the_geom.coordinates[0])),
        map: null,
        icon:"http://www.puntal.com.ar/imgs/txtsize/grande.png"
       
          
          
      });
      markers2.push(marker);
      
    });
  });
}

function setArt(type){
  for (var i = 0; i < markers2.length; i++) {
    markers2[i].setMap(type);
  }
}


function Galleries(){
    
     if (!prueba3){
      setArt(null);
      prueba3 = true;
    }
    else {
      setArt(map);
      prueba3 = false;
    }
}






function initMap() {
  var prodId = getParameterByName("prodId");
  
  Distance = parseInt(prodId);
  
  map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 14,
    center: center,
    
  });
  //Add Marker
  var marker = new google.maps.Marker({
    position: center,
    map: map,
   icon:"https://www.prensa.com/mercadeo/Botoncierre_LPRFIL20150422_0001.jpg"
  });
     map.addListener('click', function(event) {
          addMarker(event.latLng,markers);
        });
  circleA ();
  MuseumD();
  Art();
  House();
}
      
function searchL(){
for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
    
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
        markers1 = [];
      }




function ch (){
    
       window.location.replace("index.html");
    
}



function reset (){
      prueba1= true;
      prueba2= 1;
      initMap();  
      Distance=0;
       /*
    map.setCenter(new google.maps.LatLng(40.729100, -73.996500));
    map.setZoom(13)
    deleteMarkers();
    */
}

 function ch1 (){
     window.location.replace("dos.html");
 }
 function ch2 (){
       window.location.replace("tres.html");
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
    

 function mainm (){
     $('#navia').fadeIn(200);
 }
 function mainm2 (){
     $('#navia').fadeOut(200);
 }     


 
 
 
 function showsearch (){
     if (prueba4===false){
     $('#look').fadeIn(200);
      prueba4=true;
     }
     else{
      $('#look').fadeOut(200);
      prueba4=false;
     }
 }


    $(document).ready(function() {
    setTimeout(function() {
       $('#precio1').fadeOut(700);
    },700);
    });

 function searchU()
 {
   switch(prueba2) {
    case 2:
       cityCircle.setMap(null);
       prueba2=3;
        break;
    case 3:
        cityCircle.setMap(map);
        prueba2=2;
        break;
    case 1:
      circle();
      prueba2= 2;
}    
 }

 function circle (){
    cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: center,
      radius: 500,
      editable: true
    });
}    

 function circleA (){
   var Circlea = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: center,
      radius: Distance
    });
} 


 function remove(){
     cityCircle.setMap(null);
 }

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function House(){
  $.getJSON(DATASETH, function(data, textstatus){
    $.each(data, function(i, entry){
   
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(parseFloat(entry.the_geom.coordinates[1]),
                                           parseFloat(entry.the_geom.coordinates[0])),
          map: null,
        
        });
        houseMarks.push(marker);
          });
    });
};



function House(){
  $.getJSON(DATASETH, function(data, textstatus){
    $.each(data, function(i, entry){
      var add = entry.location_street_a.replace(/\s/,"+");
      $.ajax({
         url:'https://maps.googleapis.com/maps/api/geocode/json?address='+add+',NY&key=AIzaSyBAy-6ZveHc1fdtwCDOROH8QJC2-VowEUo',
         dataType: 'json'
      }).done(function(obj){
        housePosition.push({"lat": parseFloat(obj.results[0].geometry.location.lat), "lng": parseFloat(obj.results[0].geometry.location.lng)});
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(parseFloat(obj.results[0].geometry.location.lat),
                                           parseFloat(obj.results[0].geometry.location.lng)),
          map: null,
         icon:"http://wellscountyvoice.com/images/02-03-0201-home_icon.png"
          });
        houseMarks.push(marker);
        
         var infowindow = new google.maps.InfoWindow({
          content:'Cost per month: ' + entry.avg_monthly_gross_rent
         });
          marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
              });
    });
  });
};

function sHouse(type){
  for (var i = 0; i < houseMarks.length; i++) {
    houseMarks[i].setMap(type);
  }
}


function depart(){
    
    if (!prueba5){
      sHouse(null)
      prueba5 = true;
    }
    else {
      sHouse(map)
      prueba5 = false;
    }
}

function Buscar(){
    alert("Tengo"+ distan+" años");  
}

function Contact(){
    window.location.replace("contacto.html");
}





