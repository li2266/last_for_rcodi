var map;
var Json_Colegios = [];
var Json_People = [];
var Json_Price = [];
var Json_Museums = [];
var Json_Farmers = [];
var Json_Location_Price = [];
var marker_in_map = [];


/*
Funcion Mapa
---------------------------------------------------------------------------------------
---------------------------------Inicio del mapa---------------------------------------
---------------------------------------------------------------------------------------
*/
function myMap() {
  var center = new google.maps.LatLng(40.7290549,-73.99652329999998);
  var mapOptions = { zoom: 10, center: center }
  map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var markerini = new google.maps.Marker({
    position: center,
    map: map,
    icon: iconBase + 'info-i_maps.png'
  });
}


/*
Funcion JSON
---------------------------------------------------------------------------------------
------------------This function get JSON of URL and save in variable-------------------
---------------------------------------------------------------------------------------
*/

$(function() {
    // Construct the query string
    url1 = 'https://data.cityofnewyork.us/resource/sm8b-9vim.json?borough_name=MANHATTAN&geographical_district_code=2'
    url2 = 'https://data.cityofnewyork.us/resource/27iv-9uub.json'
    url3 = 'https://www.quandl.com/api/v3/datasets/ZILLOW/N9_ZHVICO.json?api_key=9CmNMU6PZG4D1PB_ofLg'
    url4 = 'https://data.cityofnewyork.us/resource/fn6f-htvy.json'
    url5 = 'https://data.cityofnewyork.us/resource/cw3p-q2v6.json?facilitycity=Manhattan'
    url6 = "https://data.cityofnewyork.us/resource/q3m4-ttp3.json?borough=Manhattan";

    // Retrieve our data and plot it
    $.getJSON(url1, function(data, textstatus) {
        $.each(data, function(i, entry1) {
          Json_Colegios.push(entry1);
        });
      });
     $.getJSON(url2, function(data, textstatus) {
        $.each(data, function(i, entry2) {
          Json_People.push(entry2);
        });
      });
      $.getJSON(url3, function(data, textstatus) {
        $.each(data, function(i, entry3) {
          Json_Price.push(entry3);
        });
      });
      $.getJSON(url4, function(data, textstatus) {
        $.each(data, function(i, entry4) {
          Json_Museums.push(entry4);
        });
      });
      $.getJSON(url5, function(data, textstatus) {
        $.each(data, function(i, entry5) {
          Json_Farmers.push(entry5);
        });
      });
      $.getJSON(url6, function(data, textstatus) {
        $.each(data, function(i, entry6) {
          Json_Location_Price.push(entry6);
        });
      });
      //console.log(Json_Location_Price);
});


/*
Function
---------------------------------------------------------------------------------------
-----------------------------Colleges near the university------------------------------
---------------------------------------------------------------------------------------
*/

vercolegios.onclick = function(){
  for(var i = 0; i < Json_Colegios.length; i++){
    var lat = Json_Colegios[i].latitude;
    var long = Json_Colegios[i].longitude;
    var latLng = new google.maps.LatLng(lat,long);
    var circle = new google.maps.Circle({
      strokeColor: "#2EB872",
      strokeOpacity: 0.8,
      center: latLng,
      map: map,
      radius:500
    })
    marker_in_map.push(circle);

    var name = Json_Colegios[i].schools_in_building;
    var nocrim = Json_Colegios[i].nocrim_n;
    ///update table
    tableReference = $("#mainTableBody")[0];
    var newRow, co2Amount, colegio;
    newRow = tableReference.insertRow(tableReference.rows.length);
    colegio = newRow.insertCell(0);
    co2Amount = newRow.insertCell(1);
    colegio.innerHTML = name;
    co2Amount.innerHTML = nocrim;
    //end update
  }
}


/*
Function
---------------------------------------------------------------------------------------
-------------------------Number of inhabitants in New York-----------------------------
---------------------------------------------------------------------------------------
*/

verhabitantes.onclick = function(){
   // console.log(Json_People);
    for(var i = 0; i < Json_People.length; i++){
      var located = Json_People[i].borough;
    //  console.log(located);
      var geocod = new google.maps.Geocoder();
      var people =parseInt(Json_People[i]._2010_population);
      geocod.geocode({'address' : located}, function(results,status){
        if (status==google.maps.GeocoderStatus.OK){
          var circle = new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            center: results[0].geometry.location,
            map: map,
            radius:people/100
          })
          marker_in_map.push(circle);
        };
      });
      //update Table
      tableReference = $("#mainTableHabitantes")[0];
      var newRow, co2Amount, localidad;
      newRow = tableReference.insertRow(tableReference.rows.length);
      localidad = newRow.insertCell(0);
      co2Amount = newRow.insertCell(1);
      localidad.innerHTML = located;
      co2Amount.innerHTML = people;
      //end update
    }
}


/*
Function
---------------------------------------------------------------------------------------
--------------------------------Values of rent around of ------------------------------
------------------------------------- University --------------------------------------
---------------------------------------------------------------------------------------
*/

verprecios.onclick = function(){

    //update table
    for(var j = 0; j < Json_Price[0].data.length; j++){
      var date = Json_Price[0].data[j][0];
      var value = Json_Price[0].data[j][1];
      tableReference = $("#mainTablePrecios")[0];
      var newRow, co2Amount, fecha;
      newRow = tableReference.insertRow(tableReference.rows.length);
      fecha = newRow.insertCell(0);
      co2Amount = newRow.insertCell(1);
      fecha.innerHTML = date;
      co2Amount.innerHTML = value;
      //end update
    }
    for (var i = 0; i < Json_Location_Price.length ;  i++) {
      //console.log(Json_Location_Price[i].street_name);
      var lat = Json_Location_Price[i].latitude_internal;
      var long = Json_Location_Price[i].longitude_internal;
      var center = new google.maps.LatLng(lat,long);
      var marker = new google.maps.Marker({
        position: center,
        map: map
      });
      marker_in_map.push(marker);

      var street_name = Json_Location_Price[i].street_name;
      var Postcode = Json_Location_Price[i].postcode;
      tableReference = $("#mainTableLocated")[0];
      var newRow, co2Amount, nombre;
      newRow = tableReference.insertRow(tableReference.rows.length);
      nombre = newRow.insertCell(0);
      co2Amount = newRow.insertCell(1);
      nombre.innerHTML = street_name;
      co2Amount.innerHTML = Postcode;
    }  
}


/*
Function
---------------------------------------------------------------------------------------
--------------------------------- Museums in New York ---------------------------------
---------------------------------------------------------------------------------------
*/
verMuseos.onclick = function(){
  //console.log(Json_Museums);

  for(var i = 0; i < Json_Museums.length; i++){
    var lat = Json_Museums[i].the_geom.coordinates[1];
    var long = Json_Museums[i].the_geom.coordinates[0];
    var latLng = new google.maps.LatLng(lat,long);
    var circle = new google.maps.Circle({
      strokeColor: "#FFDE25",
      strokeOpacity: 0.8,
      center: latLng,
      map: map,
      radius:500
    })
    marker_in_map.push(circle);

    var name = Json_Museums[i].name;
    var phone = Json_Museums[i].tel;
    ///update table
    tableReference = $("#mainTableMuseum")[0];
    var newRow, co2Amount, nombre;
    newRow = tableReference.insertRow(tableReference.rows.length);
    nombre = newRow.insertCell(0);
    co2Amount = newRow.insertCell(1);
    nombre.innerHTML = name;
    co2Amount.innerHTML = phone;
    //end update
  }
    
}


/*
Function
---------------------------------------------------------------------------------------
--------------------------------- Farm in New York ---------------------------------
---------------------------------------------------------------------------------------
*/

verGranjas.onclick = function(){
  //console.log(Json_Farmers);
    
    
  for(var i = 0; i < Json_Farmers.length; i++){
    var zipCode = Json_Farmers[i].facilityzipcode;
    var geocod = new google.maps.Geocoder();
    var name_farm = Json_Farmers[i].facilityname;
    var street_farm = Json_Farmers[i].facilitystreetname;

    geocod.geocode({'address' : zipCode}, function(results,status){
      if (status==google.maps.GeocoderStatus.OK){
        var circle = new google.maps.Circle({
          strokeColor: "#166678",
          strokeOpacity: 0.8,
          center: results[0].geometry.location,
          map: map,
          radius:500
        })
        marker_in_map.push(circle);
      };
    });

    //update Table
    tableReference = $("#mainTableFarmers")[0];
    var newRow, co2Amount, nombre;
    newRow = tableReference.insertRow(tableReference.rows.length);
    nombre = newRow.insertCell(0);
    co2Amount = newRow.insertCell(1);
    nombre.innerHTML = name_farm;
    co2Amount.innerHTML = street_farm;
    //end update

  }
    
}


/*
Function
---------------------------------------------------------------------------------------
-----------------------------------Clean Map----------------------------------------
---------------------------------------------------------------------------------------
*/
DeleteData.onclick = function(){    
    for (var i = 0; i < marker_in_map.length; i++) {
          marker_in_map[i].setMap(null);
        }
}

/*
Function
---------------------------------------------------------------------------------------
---------------------------------------- Go Up ----------------------------------------
---------------------------------------------------------------------------------------
*/

  
$(document).ready(function(){
 
  $('.ir-arriba').click(function(){
    $('body, html').animate({
      scrollTop: '0px'
    }, 300);
  });
 
  $(window).scroll(function(){
    if( $(this).scrollTop() > 0 ){
      $('.ir-arriba').slideDown(300);
    } else {
      $('.ir-arriba').slideUp(300);
    }
  });
 
});
