



$(window).on('load',function() {

var noaaUrl = "https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?locationid=FIPS:36061";
var tokenFromNoaa = "ptnyvHndQdSpIvHCUHwUafjBDwBgxecH";

$.ajax({
    url: noaaUrl,
    headers:{
        token: tokenFromNoaa
    },
    success: function(returnedData) {
        console.log(returnedData);
    }
})
});


var alfuelMarker = [];
 function alfuel(){

//$(window).on('load',function() {
    // Construct the query string
    url = 'https://data.ny.gov/resource/223s-7yza.json'

    // Intialize our map
  
    
    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          $.each(data, function(i, entry) {
              alfuelMakers(entry);


          });
    });
//});
}

function alfuelMakers(entry){
var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(entry.latitude, 
                                                   entry.longitude),
                  map: map,
                  title: location.name,
                  icon: 'https://cdn0.iconfinder.com/data/icons/ecology-33/140/Ecology_green_fuel-32.png'
              });

marker.setVisible(false);                  
alfuelMarker.push(marker);
}
function showalfuelMakers(){

for (var i = 0; i < alfuelMarker.length; i++) {
    if(alfuelMarker[i]!=undefined){
    if(alfuelMarker[i].getVisible()) 
      alfuelMarker[i].setVisible(false);
    else 
      alfuelMarker[i].setVisible(true);
  }
  }

}



var museumMarker = [];
 function museum(){

//$(window).on('load',function() {
    // Construct the query string
    url = 'https://data.cityofnewyork.us/resource/fn6f-htvy.json'

    // Intialize our map
  
    
    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          $.each(data, function(i, entry) {
              museumMakers(entry);


          });
    });
//});
}

function museumMakers(entry){
var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(entry.the_geom.coordinates[1], 
                                                   entry.the_geom.coordinates[0]),
                  map: map,
                  title: location.name,
                  icon: 'https://cdn0.iconfinder.com/data/icons/buildings-ultra/60/Buildings_-_040_-_Mueseum-32.png'
              });

marker.setVisible(false);                  
museumMarker.push(marker);
}
function showmuseumMakers(){

for (var i = 0; i < museumMarker.length; i++) {
    if(museumMarker[i]!=undefined){
    if(museumMarker[i].getVisible()) 
      museumMarker[i].setVisible(false);
    else 
      museumMarker[i].setVisible(true);
  }
  }

}

var gallerieMarker = [];



function gallerie(){

//$(window).on('load',function() {
    // Construct the query string
    url = 'https://data.cityofnewyork.us/resource/43hw-uvdj.json?'

    // Intialize our map
  
    
    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          $.each(data, function(i, entry) {
              gallerieMakers(entry);

             
          });
    });
//});
}
function gallerieMakers(entry){
 var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(entry.the_geom.coordinates[1], 
                                                   entry.the_geom.coordinates[0]),
                  map: map,
                  title: location.name,
                  icon: 'https://cdn0.iconfinder.com/data/icons/holiday-piconic/512/canvas-32.png'
              });


marker.setVisible(false);                  
gallerieMarker.push(marker);
}

function showgallerieMakers(){

for (var i = 0; i < gallerieMarker.length; i++) {
    if(gallerieMarker[i]!=undefined){
    if(gallerieMarker[i].getVisible()) 
      gallerieMarker[i].setVisible(false);
    else 
      gallerieMarker[i].setVisible(true);
  }
  }

}








var dCPofficeMarker =[];
function DCPoffice(){
//$(window).on('load',function() {
    // Construct the query string
    url = 'https://data.cityofnewyork.us/resource/w449-f4d7.json?'
          
    
    // Intialize our map
   
    
    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          $.each(data, function(i, entry) {
            DCPofficeMakers(entry);
              
          });
    });
//});
}
function DCPofficeMakers(data){
var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(data.latitude, 
                                                   data.longitude),
                  map: map,
                  title: location.name,
                  icon: 'https://cdn4.iconfinder.com/data/icons/life-insurance-2/256/Child_Life_Insurance-64.png'
              });

marker.setVisible(false);                  
dCPofficeMarker.push(marker);
}

function showDCPofficeMarkers() {
  for (var i = 0; i < dCPofficeMarker.length; i++) {
    if(dCPofficeMarker[i]!=undefined){
    if(dCPofficeMarker[i].getVisible()) 
      dCPofficeMarker[i].setVisible(false);
    else 
      dCPofficeMarker[i].setVisible(true);
  }
  }
}

var careerMarker =[];

function career(){
//$(window).on('load',function() {
    // Construct the query string
    url = 'https://data.ny.gov/resource/g8h7-98zz.json'

          
    
    // Intialize our map
   
    
    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          $.each(data, function(i, entry) {
            if(data[i].location_1!= undefined){

            careerMakers(entry);

          }
            
          });

    });
//});
}

function careerMakers(data) {

              var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(data.location_1.latitude, 
                                                   data.location_1.longitude),
                  map: map,
                  title: location.name,
                  icon: 'https://cdn4.iconfinder.com/data/icons/business-and-office-10-1/64/501-64.png'
              });
marker.setVisible(false);                  
careerMarker.push(marker);
}


function showCareerMarkers() {
  for (var i = 0; i < careerMarker.length; i++) {
    if(careerMarker[i]!=undefined){
    if(careerMarker[i].getVisible()) 
      careerMarker[i].setVisible(false);
    else 
      careerMarker[i].setVisible(true);
  }
  }
}

var vacMarker = [];

function vac(map){
//$(window).on('load',function() {
    // Construct the query string
    url = 'https://data.cityofnewyork.us/resource/w9ei-idxz.json'
          
    
    // Intialize our map
   
    
    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          $.each(data, function(i, entry) {
            
             vacMarkers(entry);
            
          });
    });
    
  }

function vacMarkers(data){

    marker = new google.maps.Marker({
    position: new google.maps.LatLng(data.latitude, 
                                                   data.longitude),
    map: map,
    title: location.name,
    icon: 'https://cdn2.iconfinder.com/data/icons/medical-specialties-set-3/256/Anesthesiology-32.png'
});

marker.setVisible(false);                  
vacMarker.push(marker);
            
}
function showVacMarkers() {
  for (var i = 0; i < vacMarker.length; i++) {
    if(vacMarker[i]!=undefined){
    if(vacMarker[i].getVisible()) 
      vacMarker[i].setVisible(false);
    else 
      vacMarker[i].setVisible(true);
  }
  }
}