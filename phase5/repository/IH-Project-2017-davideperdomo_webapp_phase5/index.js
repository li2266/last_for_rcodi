const IDX_LAT = 0
const IDX_LON = 1

const HOUSEURL = "https://data.cityofnewyork.us/resource/q3m4-ttp3.json"
const CRIMEURL = "https://data.cityofnewyork.us/resource/5jvd-shfj.json"
const FIREDEPURL = "https://data.cityofnewyork.us/resource/byk8-bdfw.json"
const ATMURL = "https://data.ny.gov/api/resource/ndex-ad5r.json?$where=city=\"New%20York\""
const NEIGHURL = "https://data.cityofnewyork.us/api/resource/q2z5-ai38.json?$where=boro_name=%22Manhattan%22"
const POLICEURL = "https://data.cityofnewyork.us/resource/kmub-vria.json"
const PRICEURL = "https://data.cityofnewyork.us/resource/ffxx-dfvk.json"
const ARTURL = "https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD"
const MUSURL = "https://data.cityofnewyork.us/api/resource/fn6f-htvy.json"
//var quandlkey="LzBf7VTjx4mPLM74cvVN";
const nyus_coord=[40.7290549,-73.9965233]

const HOUSEICON = 'http://www.rentsbuy.com/media/com_iproperty/categories/house-icon6.png'
const CRIMEICON = 'http://mpi.krakow.pl/_img/close-icon.png'
const ATMICON = 'http://www.cityofukiah.com/NewWeb/wp-content/themes/deepblue/images/icon-dollar-small.png'
const FIRESTICON = 'http://www.arfd.argonathrpg.com/forum/Smileys/default/ff.png'
const ARTICON = "https://static.tacdn.com/img2/badges/20px/rev_02.png"
const MUSICON = "http://www.doorstepbooks.com/images/suggest-book1.png"

var map = null

var HOUSESDATA = []
var CRIMEDATA = []
var FIRESTDATA = []
var ATMDATA = []
var POLICEDATA = []
var ARTDATA = []
var MUSDATA =[]

var radio = 0.02 //
var max_radio = 0.04

var housesMarkers = []
var crimeMarkers = []
var firestMarkers = []
var atmMarkers = []
var artMarkers = []
var musMarkers = []

/*Xml parser to Json taken from: 
    https://gist.github.com/chinchang/8106a82c56ad007e27b1
--------------------------------------------------------------------------------
*/
function inputRadio(){
    radio = (document.getElementById("selectradio").value)/100;
}
//Provitional distance calculator given to coordinates
function distanceTo(coord1,coord2){
    return Math.sqrt( (Math.pow( coord2[0]-Math.abs(coord1[0]),2 ))+(Math.pow( Math.abs(coord2[1])-Math.abs(coord1[1]),2 )));    
}

/*JSON request to get data of data sets
--------------------------------------------------------------------------------
*/
function getdata(url,adddata){
   var data = $.get(url, () => {
    console.log( url );
  })  
  .done(function () {
    //console.log("dataxx:",data);
    var resp = data.responseJSON;   
    for(i=0;i<resp.length;i++){
       adddata(resp[i]);       
    } 
  })
  .fail(function (error) {
    console.error(error);
  })
}

var npolygon = []
var neighPath = [];
function getNeighdata(){
  $.getJSON(NEIGHURL, function(data, textstatus){
    console.log("NEIGHHDATA",data);
    $.each(data, function(i, entry){
      var path = [];
      var name = entry.ntaname;
      var coor = entry.the_geom.coordinates[0][0]
      if(name=='Lower East Side')
        {coor = entry.the_geom.coordinates[5][0]}
      if(name=='Stuyvesant Town-Cooper Village'||name=='Murray Hill-Kips Bay')
        {coor = entry.the_geom.coordinates[2][0]}
      if(name=='Battery Park City-Lower Manhattan')
        {coor = entry.the_geom.coordinates[7][0]}
      for (var i = 0; i < coor.length; i++) {
        var lati = parseFloat(coor[i][1]);
        var lngi = parseFloat(coor[i][0]);
        path.push({'lat': lati, 'lng': lngi});
      }
      //draw(path,precinct);
      var aux=[
        path,
        name,
        0,      //2 num crimes
        689.01,      //3 rent price
        ]
      npolygon.push(aux)
    });
  });
  //addNeighdata();
};
function addNeighdata(){
  console.log("TESTNEIGH",npolygon);
  for(var i=0;i<npolygon.length;i++){
    addMarkerNeigh(npolygon[i][0],npolygon[i][1],i)}
}

function addMarkerNeigh(path,name,i){
  //console.log("TESTING"+name,path);
  var neighPol = new google.maps.Polygon({
    paths: path,
    strokeColor: '#999999',
    strokeOpacity: 0.7,
    strokeWeight: 2,
    fillColor: '#999999',
    fillOpacity: 0.2
  });

  var dataNeigh = '<br>Neighboor name: ' + name + '</br><br>Number of crimes ' + npolygon[i][2] +'</br><br>Avg rent price '+ npolygon[i][3]+'</br>' ;
  neighPol.setMap(null);
  neighPath.push(neighPol);
  neighPol.addListener('click', showData);

  infoWindow = new google.maps.InfoWindow;

  function showData(event) {
    var vertices = this.getPath();

    infoWindow.setContent(dataNeigh);
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  }
  google.maps.event.addListener(neighPol,"mouseover",function(){
   this.setOptions({fillColor: "#00FF00"});
  });
  google.maps.event.addListener(neighPol,"mouseout",function(){
   this.setOptions({fillColor: "#999999"});
  });  
}
function setNeighMarks(type){
  for (var i = 0; i < neighPath.length; i++) {
    neighPath[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
  $("#neighbor").on('click', function(){
    if (!x){
      setNeighMarks(null)
      x = true;
    }
    else {
      setNeighMarks(map)
      x = false;
    }
  });
});

/*Police precinct in ney york data set  TEST
--------------------------------------------------------------------------------
*/
var polygons = []
var policeprePath = [];
function getPolicedata(){
  $.getJSON(POLICEURL, function(data, textstatus){
    $.each(data, function(i, entry){
      //console.log(entry.precinct);
      var path = [];
      var precinct = entry.precinct;
      var coor = entry.the_geom.coordinates[0][0];
      for (var i = 0; i < coor.length; i++) {
        var lati = parseFloat(coor[i][1]);
        var lngi = parseFloat(coor[i][0]);
        path.push({'lat': lati, 'lng': lngi});
      }
      //draw(path,precinct);
      var aux=[path,precinct]
      polygons.push(aux)
    });
  });
};

function addPolicepre(){
  //console.log("TESTPREC ",polygons);
  for(var i=0;i<polygons.length;i++){
    draw(polygons[i][0],polygons[i][1])
  }
}

function draw(path,precinct){
  var policePol = new google.maps.Polygon({
    paths: path,
    strokeColor: '#216291',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#216291',
    fillOpacity: 0.2
  });
  var dataPol = 'Police precinct number: ' + precinct;
  policePol.setMap(null);
  policeprePath.push(policePol);
  policePol.addListener('click', showData);

  infoWindow = new google.maps.InfoWindow;

  function showData(event) {
    var vertices = this.getPath();

    infoWindow.setContent(dataPol);
    infoWindow.setPosition(event.latLng);

    infoWindow.open(map);
  }
  google.maps.event.addListener(policePol,"mouseover",function(){
   this.setOptions({fillColor: "#00FF00"});
  });
  google.maps.event.addListener(policePol,"mouseout",function(){
   this.setOptions({fillColor: "#216291"});
  });  
}
function setPolicepre(type){
  for (var i = 0; i < policeprePath.length; i++) {
    policeprePath[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
  $("#police").on('click', function(){
    if (!x){
      setPolicepre(null)
      x = true;
    }
    else {
      setPolicepre(map)
      x = false;
    }
  });
});

/*Houses pricess in ney york data set  TEST
--------------------------------------------------------------------------------
key=AIzaSyDFTTOZFnZN48o0qeUe1s__h4oDVb3mjN0
*/

/**/

var PRICEDATA=[]
function getdataPrice(){
  var url = PRICEURL+"?$where=borough=\"MANHATTAN\"";
  var data = $.get(url, () => {
    console.log( url );
  })  
  .done(function () {
    console.log("dataprice:",data);
    var resp = data.responseJSON;     
    for(var i=0;i<resp.length;i++){
      var rent = 2000     
      if(resp[i].avg_monthly_gross_rent!=undefined){
         rent = parseFloat(resp[i].avg_monthly_gross_rent.split("$")[1]);
      }
      var acres = parseFloat(resp[i].acres) 
      var parka = acres - parseFloat(resp[i].excluding_park_acres)
      var streeta = resp[i].location_street_a; 
      var aux = [
        {},
        rent,
        acres,
        parka,
        streeta
      ]
      PRICEDATA.push(aux);
    } 
    console.log("TEST1PRICE==",PRICEDATA);
    for (var j=0;j<PRICEDATA.length;j++){
      getcoorPrice(PRICEDATA[j][4],j);
    }
    console.log("TEST2PRICE==",PRICEDATA);
  })
  .fail(function (error) {
    console.error(error);
  })
}

function getcoorPrice(streeta,i){
  $.ajax({
    url:'https://maps.googleapis.com/maps/api/geocode/json?address='+streeta+',NY',
    dataType: 'json'
    }).done(function(obj){
     // console.log("data"+i,datus);
      if(obj.status=="OK"){  
        //console.log("obj ",obj);
        point = ({"lat": parseFloat(obj.results[0].geometry.location.lat), "lng": parseFloat(obj.results[0].geometry.location.lng)});
        //console.log("point ",point)            
        PRICEDATA[i][0]=point;
      }
    });
}
/*Houses in ney york data set 
--------------------------------------------------------------------------------
*/
function adddataHouse(house){
  var aux = [
    house.latitude,   
        house.longitude,
    house.house_number,    //2
        house.street_name, //3
        0,                 //4 dist
        "",                //5 neigh
        0                  //6 crimes 
        ]
    aux[4]=( distanceTo(nyus_coord,[ aux[IDX_LAT], aux[IDX_LON] ]) );  //4: distance to nyu      
    
    if(aux[4] < max_radio){
        HOUSESDATA.push(aux);
    }
}

/*Crimes information data set
--------------------------------------------------------------------------------
*/
function adddataCrime(crime){
  var aux = [
    crime.latitude,   
        crime.longitude,    
        crime.ofns_desc,  //2 
        "crime"       //3 
        ];
    aux.push( distanceTo(nyus_coord,[ aux[IDX_LAT], aux[IDX_LON] ]) );    //4: distance to nyu    
    if(aux[4] < max_radio){
        CRIMEDATA.push(aux);
    }
}
/*Fire department data set
--------------------------------------------------------------------------------
*/

function adddataFirest(station){
  var aux = [
    parseFloat(station.latitude),
    parseFloat(station.longitude),
    station.nta,
    station.borough
  ];
  FIRESTDATA.push(aux);
}

/*Atm data set
--------------------------------------------------------------------------------
*/
function adddataATM(atm){
  if (atm.hasOwnProperty('location_1')){
    var aux = [
      parseFloat(atm.location_1.latitude),
      parseFloat(atm.location_1.longitude),
      atm.name_of_institution,
      atm.street_address
    ];
    ATMDATA.push(aux);
  }
}
/*Art data set
--------------------------------------------------------------------------------
*/
function adddataArt(){
  var url = ARTURL
  var data = $.get(url, () => {
    console.log( url );
  })  
  .done(function () {
    console.log("dataart:",data);
    var resp = data.responseJSON.data;   
    for(i=0;i<resp.length;i++){
       //console.log(resp[i]);       
      var coor = resp[i][9].replace("(","").replace(")","").split(" ");
      var aux =[
        parseFloat(coor[2]),
        parseFloat(coor[1]),
        resp[i][8],
        resp[i][12]
      ]
      ARTDATA.push(aux)
    }
    console.log(ARTDATA)
  })
  .fail(function (error) {
    console.error(error);
  })
}
/*Museums data set
--------------------------------------------------------------------------------
*/
function adddataMus(mus){
  //console.log("Mus",mus)
  var aux = [
    parseFloat(mus.the_geom.coordinates[1]),
    parseFloat(mus.the_geom.coordinates[0]),
    mus.name,
    mus.adress1
  ];
  MUSDATA.push(aux);
}
/*Test Air quality data set
--------------------------------------------------------------------------------
*/
function getdataAirq(){
    //var url = "https://data.cityofnewyork.us/api/views/c3uy-2p5r/rows.json?accessType=DOWNLOAD"
    var url = "https://data.cityofnewyork.us/resource/ah89-62h9.json?$where=year_description=%222013%22%20AND%20geo_entity_name=%22Manhattan%22";
    var data = $.get(url, () => {
    console.log( url );
  })
  .done(function () {
    console.log(data);
    var resp = data.responseJSON;
    alert("Air Quality in Manhattan:\n"+resp[0].name+": "+resp[0].data_valuemessage+" "+resp[0].measure);
  })
  .fail(function (error) {
    //fail
    console.error(error);
  })
}

/*Test current weather in New York
--------------------------------------------------------------------------------
*/
function getdataWeather(){
    var url = "http://api.openweathermap.org/data/2.5/weather?q=newyork&appid=9830879c002bb5e78eebb68edc11b148";
    var data = $.get(url, () => {
        console.log(url);
    })    
    .done(function () {
    console.log(data);
    var resp = data.responseJSON;
    alert("Current Weather in New York\nTemperature "+(resp.main.temp-273.0)+" °C\nHumidity: "+resp.main.humidity+"\nPressure: "+data.responseJSON.main.pressure) 
  })
}

/**COUNTING**/
function countcrimes(){
  //console.log(CRIMEDATA);
  for(i=0;i<CRIMEDATA.length;i++){    
    //console.log("npol:",npolygon) 
    var crime = CRIMEDATA[i]
    //console.log("CRIM",crime)
    var point = new google.maps.LatLng(parseFloat(crime[IDX_LAT]),parseFloat(crime[IDX_LON]));
    //console.log("point",point)
    for(j=0;j<npolygon.length;j++){
      var neighbor = new google.maps.Polygon({paths: npolygon[j][0]});
      //console.log("neighbor "+j,neighbor);
      if (google.maps.geometry.poly.containsLocation(point,neighbor)){
        //console.log("point "+point+" in "+npolygon[j][1]);
        npolygon[j][2]++
        break;
      }
    }
  }
  console.log("end count",npolygon);
  updateHouse();
}
/**COUNTING**/
function updateHouse(){
  //console.log(HOUSESDATA);
  for(i=0;i<HOUSESDATA.length;i++){    
    //console.log("npol:",npolygon) 
    var house = HOUSESDATA[i]
    //console.log("HOUS",house);
    var point = new google.maps.LatLng(parseFloat(house[IDX_LAT]),parseFloat(house[IDX_LON]));
    //console.log("point",point)
    for(j=0;j<npolygon.length;j++){
      var neighbor = new google.maps.Polygon({paths: npolygon[j][0]});
      //console.log("neighbor "+j,neighbor);
      if (google.maps.geometry.poly.containsLocation(point,neighbor)){
        //console.log("point"+point+" of "+house[3]+" in "+npolygon[j][1]+" crimes "+npolygon[j][2]);        
        HOUSESDATA[i][5]=npolygon[j][1];
        HOUSESDATA[i][6]=npolygon[j][2];
        break;
      }
    }    
  }
  console.log("end update",HOUSESDATA);  
  updatePrice();
}
/**COUNTING**/
function updatePrice(){
  //console.log("countprice",PRICEDATA);
  for(i=0;i<PRICEDATA.length;i++){    
    //console.log("npol:",npolygon) 
    var price = PRICEDATA[i]
    //console.log("Pric",price);
    var point = new google.maps.LatLng(price[0].lat , price[0].lng);
    for(j=0;j<npolygon.length;j++){
      var neighbor = new google.maps.Polygon({paths: npolygon[j][0]});
      //console.log("neighbor "+j,neighbor);
      if (google.maps.geometry.poly.containsLocation(point,neighbor)){
        //console.log("point"+point+" of "+price[1]+" in "+npolygon[j][1]+" crimes "+npolygon[j][2]);        
        npolygon[j][3]=price[1];
        break;
      }
    }   
  }
  console.log("end update2",npolygon);
}

/*Functions to draw the google map
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
*/
function myMap() {
    var centermap = new google.maps.LatLng(nyus_coord[0],nyus_coord[1]);
        
    map = new google.maps.Map(document.getElementById("googleMap"),{
        center:centermap,
        zoom:14,
        styles: [
                {"featureType": "poi",
                  "stylers": [
                    {"visibility": "off"}
                  ]
                },
                {
                  "featureType": "poi.attraction",
                  "elementType": "labels",
                  "stylers": [
                    {"visibility": "off"}
                  ]
                },
                {
                  "featureType": "poi.government",
                  "elementType": "labels",
                  "stylers": [
                    {"visibility": "off"}
                  ]
                },
                {
                  "featureType": "poi.park",
                  "stylers": [
                    {"visibility": "on"}
                  ]
                }

              ]
    });
   
    var marker = new google.maps.Marker({
        position: centermap,
        map: map,
        title: 'NYU Stern'
    });    
    var infowindow = new google.maps.InfoWindow({ content: ''});
    var content = 'Title of stern';
    google.maps.event.addListener(marker, 'click', (function (marker, content) {
        return function () {
            console.log('Gmarker gets pushed');
            infowindow.setContent(content);
            infowindow.open(map, marker);
            //map.panTo(this.getPosition());
            //map.setZoom(15);
        }
    })(marker, content));

    inputRadio();
    addMarkersCrime();   
    addMarkersHouse();
    addMarkersFirest();
    addMarkersATM();
    //addMarkersPolice();
    addNeighdata();
    addMarkersArt();
    addMarkersMus();  
    addPolicepre();
    addMarkersRent()
    countcrimes();
}
/*--
--------------------------------------------------------------------------*/
function addMarker(marker,image,listMarkers){
  var category = marker[3];
    var title = marker[2];
    var pos = new google.maps.LatLng(marker[IDX_LAT], marker[IDX_LON]);
    gmarker = new google.maps.Marker({
        title: title,
        position: pos,
        category: category,
        map: map,
        visible: false,
        icon: image
    });
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(gmarker, 'click', function () {
        infowindow.setContent(this.title)
        infowindow.open(map, this);
    });
    listMarkers.push(gmarker);
}
/*-----------------------------------------------------------------------*/

function addMarkerHouse(marker){
    var category = marker[2];
    var title = marker[3];
    var pos = new google.maps.LatLng(marker[IDX_LAT], marker[IDX_LON]);
    var image = HOUSEICON;
    gmarker = new google.maps.Marker({
        title: title,
        position: pos,
        category: category,
        map: map,
        icon: image
    });
    
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(gmarker, 'click', function () {
        infowindow.setContent(this.title)
        infowindow.open(map, this);
    });
    housesMarkers.push(gmarker);
    //console.log(housesMarkers)
}

function addMarkersHouse(opt){
  for (i=0; i < HOUSESDATA.length; i++){
        if (radio>HOUSESDATA[i][4]){
            addMarkerHouse(HOUSESDATA[i])
        }
    }
}

$(document).ready(function() {
  var hflag = false;
  $("#houses").on('click', function(){
    if (!hflag){
      for(i=0;i<housesMarkers.length;i++){
        housesMarkers[i].setVisible(false);
      }
      hflag = true;
    }
    else {      
      for(i=0;i<housesMarkers.length;i++){
        housesMarkers[i].setVisible(true);
      }
      hflag = false;
    }
  });
});
/*-----------------------------------------------------------------------*/
rentMarkers=[];
function addMarkerRent(marker){
    var title = ""+marker[1]+"";
    var pos = marker[0];
    var image = 'https://mt.googleapis.com/vt/icon/name=icons/onion/1494-wht-circle-blank-4x.png&filter=ffDB4436';
    gmarker = new google.maps.Marker({
        title: title,
        position: pos,
        map: map,
        icon: image
    });
    
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(gmarker, 'click', function () {
        infowindow.setContent(this.title)
        infowindow.open(map, this);
    });
    rentMarkers.push(gmarker);
    //console.log(housesMarkers)
}

function addMarkersRent(){
  for (i=0; i < PRICEDATA.length; i++){
        //if (radio>HOUSESDATA[i][4]){
            addMarkerRent(PRICEDATA[i])
        //}
    }
}
/*----------------------------------------------------------------*/
function addMarkersCrime(){
  for (i = 0; i < CRIMEDATA.length; i++) {
        if(radio>CRIMEDATA[i][4]){
            //addMarkerCrime(CRIMEDATA[i],map);
            addMarker(CRIMEDATA[i],CRIMEICON,crimeMarkers)
        }
    }
}
$(document).ready(function() {
  var crflag = true;
  $("#crimes").on('click', function(){
    if (!crflag){
      for(i=0;i<crimeMarkers.length;i++){
        crimeMarkers[i].setVisible(false);
      }
      crflag = true;
    }
    else {      
      for(i=0;i< crimeMarkers.length;i++){
        crimeMarkers[i].setVisible(true);
      }
      crflag = false;
    }
  });
});

/*------------------------------------------------------------------------*/

function addMarkersFirest(){
  for (i = 0; i < FIRESTDATA.length; i++) {
        //addMarkerFirest(FIRESTDATA[i],map);
        addMarker(FIRESTDATA[i],FIRESTICON,firestMarkers);
    }
}
$(document).ready(function() {
  var fsflag = true;
  $("#firest").on('click', function(){
    if (!fsflag){
      for(i=0;i<firestMarkers.length;i++){
        firestMarkers[i].setVisible(false);
      }
      fsflag = true;
    }
    else {      
      for(i=0;i< firestMarkers.length;i++){
        firestMarkers[i].setVisible(true);
      }
      fsflag = false;
    }
  });
});

/*-----------------------------------------------------------------------*/

function addMarkersATM(){
  for (i = 0; i < ATMDATA.length; i++) {
        addMarker(ATMDATA[i],ATMICON,atmMarkers);
    }
}
$(document).ready(function() {
  var atmflag = true;
  $("#atm").on('click', function(){
    if (!atmflag){
      for(i=0;i<atmMarkers.length;i++){
        atmMarkers[i].setVisible(false);
      }
      atmflag = true;
    }
    else {      
      for(i=0;i< atmMarkers.length;i++){
        atmMarkers[i].setVisible(true);
      }
      atmflag = false;
    }
  });
});
/*---------------------------------------------------------------------*/

function addMarkersArt(){
  for (i = 0; i < ARTDATA.length; i++) {
        addMarker(ARTDATA[i],ARTICON,artMarkers);
    }
}
$(document).ready(function() {
  var artflag = true;
  $("#art").on('click', function(){
    if (!artflag){
      for(i=0;i<artMarkers.length;i++){
        artMarkers[i].setVisible(false);
      }
      artflag = true;
    }
    else {      
      for(i=0;i< artMarkers.length;i++){
        artMarkers[i].setVisible(true);
      }
      artflag = false;
    }
  });
});
/*---------------------------------------------------------------------*/
function addMarkersMus(){
  for (i = 0; i < MUSDATA.length; i++) {
        addMarker(MUSDATA[i],MUSICON,musMarkers);
    }
}
$(document).ready(function() {
  var musflag = true;
  $("#mus").on('click', function(){
    if (!musflag){
      for(i=0;i<musMarkers.length;i++){
        musMarkers[i].setVisible(false);
      }
      musflag = true;
    }
    else {      
      for(i=0;i< musMarkers.length;i++){
        musMarkers[i].setVisible(true);
      }
      musflag = false;
    }
  });
});
/*----*/
/*
--------------------------------------------------------------------------------
*//*
window.onload = function(){
  nyus_coord=[40.7290549,-73.9965233];
  myMap();
}*/
function run(){
  myMap();
  getNeighdata();
  getPolicedata();
  getdataPrice();
  getdata(HOUSEURL+"?$where=counted_rental_units%3E0%20AND%20borough=%22Manhattan%22",adddataHouse);
  getdata(CRIMEURL,adddataCrime);
  getdata(FIREDEPURL,adddataFirest);
  getdata(ATMURL,adddataATM);
  adddataArt();
  getdata(MUSURL,adddataMus);
}

$(document).ready(function() {
  run();    
  $("#testairq").on("click", getdataAirq);
  $("#testweather").on("click", getdataWeather);  
  //getdata(NEIGHURL,adddataNeighb);   
  //$("#testmap").on("click", addPolicepre);
  //$("#testmap").on("click", addNeighdata);
  //$("#testneigh").on("click" )
  inputRadio();
  //$("#testzillow").on("click", getdataPrice);
  //$("#testzillow").on("click", getHouse);
  //$("#testmap").on("click", countcrimes);
  $("#testmap").on("click", myMap);
  $("#showall").on("click", myMap); 
})
