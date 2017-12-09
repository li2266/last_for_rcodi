
/*Google map*/
var map;
var markers = [ ];
var markers_museum = [];
var markers_art =[];
var markers_atm=[];
var markers_dmv=[];
var bike_routes=[];
var data = [4, 8, 15, 16, 23, 42];


function initMap() {
          
       	  map = new google.maps.Map(document.getElementById('googleMapContainer'), {
          zoom: 12,
          center:new google.maps.LatLng(40.729100, -73.996500),
          
        });
        
        
           new google.maps.Marker({
              map: map,
              position: new google.maps.LatLng(40.729100, -73.996500)
            });
          
        showMuseums();
        showGalleries();
        showATMs();
        showDMVs();
        showBikeRoutes();
        
        /*var geocoder = new google.maps.Geocoder
        geocoder.geocode({'address': 'New York'}, function(results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
          } else {
            window.alert('Geocode was not successful for the following reason: ' +
                status);
          }
        });
      */
      }
      

      /*Data-sets*/
//Data-set Population by borough      
const DATASET_QUERY_FORMAT = 'https://data.cityofnewyork.us/api/views/xi7c-iiu2/rows.json?accessType=DOWNLOAD';

var request = new XMLHttpRequest();

request.open('GET', DATASET_QUERY_FORMAT);
request.responseType = 'json';
request.send();
var population;

request.onload = function() {
  var population = request.response;
  console.log(population.meta.view.columns[8].cachedContents.top);
}
//Data set NOAA
//https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=PRECIP_15&stationid=COOP:010008&units=metric&startdate=2010-05-01&enddate=2010-05-31
//https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&locationid=FIPS:36&units=metric&startdate=2016-01-01&limit=50
//https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets?locationid=FIPS:36&units=metric&startdate=2016-01-01&limit=50
//https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&datatypeid=PRCP&locationid=FIPS:36&limit=50&startdate=2017-06-01&enddate=2017-10-31
//https://www.ncdc.noaa.gov/cdo-web/api/v2/datatypes?/locationid=FIPS:36&limit=200&startdate=2017-06-01&enddate=2017-10-31
//https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=NEXRAD2&datatypeid=ALL&locationid=ZIP:30008&limit=50&startdate=2017-06-01&enddate=2017-10-31
//https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TMAX&datatypeid=TMIN&location=FIPS:36&startdate=2017-10-01&enddate=2017-10-31&limit=200
const DATASET_QUERY_FORMAT_B = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?locationid=FIPS:36&limit=1000&startdate=2017-10-31';

var noaa = new XMLHttpRequest();
noaa.open('GET',DATASET_QUERY_FORMAT_B);
noaa.setRequestHeader ("Token","TyuZzlPzZZGkyDBQhthmJYFJtUjnZbAx");

noaa.responseType = 'json';
noaa.send();
var climate;

noaa.onload = function() {
  var climate = noaa.response;
  console.log(climate);
}

//Data set Museum
    const DATASET_QUERY_FORMAT_C = ' https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD';

    var museum = new XMLHttpRequest();
    museum.open('GET',DATASET_QUERY_FORMAT_C);

    museum.responseType = 'json';
    museum.send();
    var data_museums;

museum.onload = function() {
  var data_museums = museum.response;
  console.log(data_museums);
}
//Data set ArtGallerys
    const DATASET_QUERY_FORMAT_D = '  https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD';

    var art_gal = new XMLHttpRequest();
   art_gal.open('GET',DATASET_QUERY_FORMAT_D);

    art_gal.responseType = 'json';
    art_gal.send();
    var art_galleries;

art_gal.onload = function() {
  var art_galleries = art_gal.response;
  console.log(art_galleries);
}
//Data set ATMs
    const DATASET_QUERY_FORMAT_E = '  https://data.ny.gov/api/views/ndex-ad5r/rows.json?accessType=DOWNLOAD';

    var atm = new XMLHttpRequest();
   atm.open('GET',DATASET_QUERY_FORMAT_E);

   atm.responseType = 'json';
    atm.send();
    var atms;

atm.onload = function() {
  var atms = atm.response;
  console.log(atms)
  
}
//Data set DMVs
    const DATASET_QUERY_FORMAT_F = '  https://data.ny.gov/api/views/nhjr-rpi2/rows.json?accessType=DOWNLOAD';

    var dmv = new XMLHttpRequest();
   dmv.open('GET',DATASET_QUERY_FORMAT_F);

   dmv.responseType = 'json';
   dmv.send();
    var dmvs;

dmv.onload = function() {
  var dmvs = dmv.response;
  console.log(dmvs)
  
}
//Data set BikeRoutes
    const DATASET_QUERY_FORMAT_G = '  https://data.ny.gov/api/views/bzam-7she/rows.json?accessType=DOWNLOAD';

    var bike_a= new XMLHttpRequest();
   bike_a.open('GET',DATASET_QUERY_FORMAT_G);

   bike_a.responseType = 'json';
   bike_a.send();
    var bikes_a;

bike_a.onload = function() {
  var bikes_a = bike_a.response;
  console.log(bikes_a);
   
  
}
/*
function showHeroes(jsonObj) {
  var heroes = jsonObj['members'];
      
  for (var i = 0; i < heroes.length; i++) {
    var myArticle = document.createElement('article');
    var myH2 = document.createElement('h2');
    var myPara1 = document.createElement('p');
    var myPara2 = document.createElement('p');
    var myPara3 = document.createElement('p');
    var myList = document.createElement('ul');

    myH2.textContent = heroes[i].name;
    myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
    myPara2.textContent = 'Age: ' + heroes[i].age;
    myPara3.textContent = 'Superpowers:';
        
    var superPowers = heroes[i].powers;
    for (var j = 0; j < superPowers.length; j++) {
      var listItem = document.createElement('li');
      listItem.textContent = superPowers[j];
      myList.appendChild(listItem);
    }

    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);

    section.appendChild(myArticle);
  }
}

function populateHeader(jsonObj) {
     var myList = document.createElement('ul');
     var boroughs = jsonObj['data'];
    for (var j = 0; j < boroughs.length; j++) {
      var listItem = document.createElement('li');
      listItem.textContent = boroughs[j][8];
      myList.appendChild(listItem);
    }
  section.appendChild(myList)
}
*/
function showBoroughs(){
    
var borough =request.response.meta.view.columns[8].cachedContents.top;
if(markers.length==0){
for( var j=0; j< borough.length; j++){
    console.log(borough[j]);
    addMarkerWithGeocode(borough[j].item, markers)
}
console.log(markers);
}else{
    setMapOnAll(map, markers);
}


}
function hideBoroughs(){
    
setMapOnAll(null, markers)
}

function showMuseums(){
    if(document.getElementById("cboxmus").checked) {
       if(markers_museum.length==0){
    for( var j=0; j< museum.response.data.length; j++){
     var museum_location=museum.response.data[j][8];
     var mus_split_a=museum_location.split("(");
     var mus_split_b=mus_split_a[1].split(" ");
     var mus_split_c=mus_split_b[1].split(")");
     var lng = mus_split_b[0];
     var lat = mus_split_c[0];
     var description = '<div>'+
            '<div >'+
            '</div>'+
            '<h6 >'+museum.response.data[j][9] +'</h6>'+
            '<div>'+
            '<p>'+museum.response.data[j][10]+'<br>'+museum.response.data[j][11]+'</p>'+
            '</div>'+
            '</div>';
     addMarkerWithLatLng(lat, lng, markers_museum, 'mus',description);
     
    }
        
    }else{
        setMapOnAll(map, markers_museum);
}
    }else{
        HideMarkers(markers_museum);
    }
   
   
    
} 
    
function showGalleries(){
    if(document.getElementById("cboxart").checked) {
       if(markers_art.length==0){
    for( var j=0; j< art_gal.response.data.length; j++){
     var art_location=art_gal.response.data[j][9];
     var art_split_a=art_location.split("(");
     var art_split_b=art_split_a[1].split(" ");
     var art_split_c=art_split_b[1].split(")");
     var lng = art_split_b[0];
     var lat = art_split_c[0];
      var description = '<div>'+
            '<div >'+
            '</div>'+
            '<h6 >'+art_gal.response.data[j][8] +'</h6>'+
            '<div>'+
            '<p>'+art_gal.response.data[j][10]+'<br>'+art_gal.response.data[j][11]+'</p>'+
            '</div>'+
            '</div>';
     addMarkerWithLatLng(lat, lng, markers_art, 'art', description);
    }
        
    }else{
        setMapOnAll(map, markers_art);
}
    }else{
        HideMarkers(markers_art);
    }
   
   
    
}  
function showATMs(){
    if(document.getElementById("cboxatm").checked) {
       if(markers_atm.length==0){
    for( var j=934; j< atm.response.data.length; j++){
        if(atm.response.data[j][10]=='Brooklyn'||atm.response.data[j][10]=='Queens'||atm.response.data[j][10]=='New York'||atm.response.data[j][10]=='Bronx'||atm.response.data[j][10]=='Staten Island'){
            var lng = atm.response.data[j][13][2];
            var lat =  atm.response.data[j][13][1];
            var description = '<div>'+
            '<div >'+
            '</div>'+
            '<h6 >'+atm.response.data[j][8] +'</h6>'+
            '<div>'+
            '<p>'+atm.response.data[j][9]+
            '</div>'+
            '</div>';
             addMarkerWithLatLng(lat, lng, markers_atm, 'atm', description);
      
    }
        
    }
        
    }else{
        setMapOnAll(map, markers_atm);
}
    }else{
        HideMarkers(markers_atm);
    }
   
   
    
}  
function showDMVs(){
    if(document.getElementById("cboxdmv").checked) {
       if(markers_dmv.length==0){
    for( var j=0; j< dmv.response.data.length; j++){
        if(dmv.response.data[j][12]=='BROOKLYN       '||dmv.response.data[j][12]=='BRONX          '||dmv.response.data[j][12]=='NEW YORK       '){
            var lng = dmv.response.data[j][22][2];
            var lat =  dmv.response.data[j][22][1];
            var description = '<div>'+
            '<div >'+
            '</div>'+
            '<h6 >'+dmv.response.data[j][9] +'</h6>'+
            '<div>'+
            '<p>'+dmv.response.data[j][11]+
            '</div>'+
            '</div>';
             addMarkerWithLatLng(lat, lng, markers_dmv, 'dmv', description);
      
    }
        
    }
        
    }else{
        setMapOnAll(map, markers_dmv);
}
    }else{
        HideMarkers(markers_dmv);
    }
   
   
    
} 
function showBikeRoutes(){
    if(document.getElementById("cboxbike").checked) {
       if(bike_routes.length==0){
        for(var i=0; i< bike_a.response.data.length; i++){
        var bike_route=bike_a.response.data[i][9];
        var bike_split=bike_route.split("(");
        var bike_split_a=bike_split[2].split(",");
       
        
       
        var Route=[];
        for(var j=0; j< bike_split_a.length-2; j++){
        var points= bike_split_a[j].split(" ");
        if(j==0){
        var point= new google.maps.LatLng(Number(points[1]), Number(points[0]));
        }else{
        var point=new google.maps.LatLng(Number(points[2]), Number(points[1]));
        }
        Route.push(point);
        }
       
        var bikeRoute = new google.maps.Polyline({
          path: Route,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 5,
        });
        bike_routes.push(bikeRoute);
        bikeRoute.setMap(map);
        }
       }else{
        setMapOnAll(map, bike_routes);
    }
        
    }else{
        HideMarkers(bike_routes);
    }}
   
   
    
  
    
/*if(markers.length==0){
for( var j=0; j< borough.length; j++){
    console.log(borough[j]);
    addMarker(borough[j].item)
}
console.log(markers);
}else{
    setMapOnAll(map);
}
*/





function addMarkerWithGeocode(location, list) {
        
        var geocoder = new google.maps.Geocoder
        geocoder.geocode({'address': location}, function(results, status) {
        if (status === 'OK') {
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
             
            });
            list.push(marker);
          } else {
            window.alert('Geocode was not successful for the following reason: ' +
                status);
          }
        });
       
      }
      

function addMarkerWithLatLng(lat, lng, list, icon, desc) {
       var infowindow = new google.maps.InfoWindow({
          content: desc,
         
        });
       if(icon=='mus')
       var image='https://st-p.pinbo.es/v61/img/pin-2.png';
       if(icon=='art')
       var image='https://st-p.pinbo.es/v61/img/pin-8.png';
       if(icon=='atm')
       var image='https://st-p.pinbo.es/v61/img/pin-6.png';
       if(icon=='dmv')
       var image='https://st-p.pinbo.es/v61/img/pin-7.png';
       
       var marker =  new google.maps.Marker({
              map: map,
              position: new google.maps.LatLng(lat, lng),
              icon:image
        });
         marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        
        list.push(marker);
      }
function setMapOnAll(map, list) {
        for (var i = 0; i < list.length; i++) {
          list[i].setMap(map);
        }
      }
function HideMarkers(list) {
        setMapOnAll(null, list);
      }
function showResultsIn(location){
    var geocoder = new google.maps.Geocoder
        geocoder.geocode({'address': location}, function(results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            
          } else {
            window.alert('Geocode was not successful for the following reason: ' +
                status);
          }
        });
         map.setZoom(12)
}     
function reCenter(){
     map.setCenter(new google.maps.LatLng(40.729100, -73.996500));
     map.setZoom(12)
}
$(document).ready(function() {
	$("#ShowMarkerB").on("click", showBoroughs)
	$("#HideMarkerB").on("click", hideBoroughs)
    
})

