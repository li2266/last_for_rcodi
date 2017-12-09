
const univesitiesNewYorkLocation = {
  "New York University (NYU)": [{lat: 40.7291, lng: -73.9965},"50 West 4th Street, New York, NY 10012",[{lat: 40.742136, lng: -73.9907956}, {lat: 40.7253563, lng: -74.0108156}], "Greenwich Village", "Manhattan", "45 W 4th St"],
  "Columbia University" : [ {lat:40.807738, lng:-73.962540}, "535 W 116th St, New York, NY 10027",[{lat: 40.818091, lng: -73.9563131}, {lat: 40.80185549999999, lng: -73.9711901}] , "Morningside Heights", "Manhattan", "417 W 120th St APT 4W"],
  "Fordham University" : [{lat:40.861927, lng: -73.885699}, "441 E Fordham Rd, Bronx, NY 10458",[{lat: 40.873478, lng: -73.8800049}, {lat: 40.8569791, lng: -73.9141048}], "Fordham Manor", "Bronx", "2559 Decatur Ave"],
  "Julliard School" : [{lat:40.773677, lng: -73.982872}, "60 Lincoln Center Plaza, New York, NY 10023", [{lat: 40.781822, lng: -73.97608989999999}, {lat: 40.768483, lng: -73.9963789}], "Lincoln Square", "Manhattan", "152 Columbus Ave APT 4N"],
  "St. John's University" : [{lat:40.721580, lng: -73.794690}, "8000 Utopia Pkwy, Jamaica, NY 11439", [{lat: 40.7322061, lng: -73.7898008}, {lat: 40.715319, lng: -73.808621}], "Hillcrest", "Queens", "16605 76th Ave"],
  "Fashion Institute of Technology" : [{lat: 40.746911, lng:-73.994071}, "227 W 27th St, New York, NY 10001", [{lat: 40.7570384, lng: -73.9877916}, {lat: 40.7373582, lng: -74.0088629}], "Chelsea", "Manhattan", "288 8th Ave APT 2A"],
  "Parsons School of Design" : [{lat: 40.735284, lng: -73.994593}, "66 5th Ave, New York, NY 10011", [{lat: 40.742136, lng: -73.9907956}, {lat: 40.7253563, lng: -74.0108156}], "Greenwich Village" , "Manhattan", "594 6th Ave APT 1"],
  "Pace University" : [{lat: 40.710941, lng: -74.004900}, "31-43 Spruce St, New York, NY 10038", [{lat: 40.7170449, lng: -73.9993878}, {lat: 40.7005852, lng: -74.0164805}], "Distrito Financiero", "Manhattan", "111 Fulton St APT 622"],
  "Baruch College" : [{lat: 40.739068, lng: -73.984650}, "135 E 22nd St, New York, NY 10010", [{lat: 40.74018510000001, lng: -73.9785298}, {lat: 40.7313276, lng: -73.98879459999999}], "Gramercy Park", "Manhattan", "206 E 25th St APT 1A"],
  "The City College of New York" : [{lat: 40.820031, lng: -73.949262}, "160 Convent Ave New York, NY 10031", [{lat: 40.834443, lng: -73.9413373}, {lat: 40.81718, lng: -73.95876109999999}], "Hamilton Heights", "Manhattan", "496 W 133rd St APT 3E"],
  "Hunter College" : [{lat: 40.768492, lng: -73.964604}, "695 Park Ave New York, NY 10065", [{lat: 40.775726, lng: -73.949107}, {lat: 40.7586825, lng: -73.9732511}], "Lenox Hill", "Manhattan", "37 E 65th St APT 2A"],
  "Pratt Institute" : [{lat: 40.691240, lng: -73.962569}, "209-225 Steuben St, Brooklyn, NY 11205", [{lat: 40.6979329, lng: -73.95785099999999}, {lat: 40.679558, lng: -73.971446}],"Clinton Hill", "Brooklyn", "93 Waverly Ave APT 3F"],
  "John Jay College of Criminal Justice" : [{lat: 40.770369, lng: -73.988489}, "899 10th Ave, New York, NY 10019", [{lat: 40.773677, lng: -73.9824487}, {lat: 40.752223, lng: -74.00473989999999}], "Hell's Kitchen", "Manhattan", "33 W 63rd St APT 5E"],
  "Borough of Manhattan Community College" : [{lat: 40.718772, lng: -74.011856}, "199 Chambers St, New York, NY 10007", [{lat: 40.7259498, lng: -74.0018893}, {lat: 40.7113379, lng: -74.0137633}], "TriBeCa", "Manhattan", "450 N End Ave APT 11F"],
  "The New School" : [{lat: 40.735477, lng:-73.997128}, "Johnson Hall, 66 W 12th St, New York, NY 10011", [{lat: 40.742136, lng: -73.9907956}, {lat: 40.7253563, lng: -74.0108156}], "Greenwich Village", "Manhattan", "450 N End Ave APT 11F" ],
  "LaGuardia Community College" : [{lat: 40.743823, lng: -73.934673}, "31-10 Thomson Ave, Long Island City, NY 11101", [{lat: 40.7630563, lng: -73.9094829}, {lat: 40.727849, lng: -73.9628577}], "Long Island City", "Queens", "4541 39th Pl"],
  "New York Film Academy" : [{lat: 40.705096, lng: -74.015816}, "17 Battery Pl, New York, NY 10004", [{lat: 40.7170449, lng: -73.9993878}, {lat: 40.7005852, lng: -74.0164805}], "Distrito Financiero", "Manhattan", "200 Rector Pl APT 19K"],
  "New York City College of Technology" : [{lat: 40.695526, lng: -73.987448}, "300 Jay St, Brooklyn, NY 11201", [{lat: 40.7014311, lng: -73.9785862}, {lat: 40.686561, lng: -73.9923834}], "Downtown Brooklyn", "Brooklyn", "93 Hicks St APT 2RN"]
}

// -------------------Google Maps Section ------------------------
var map, initialLocation, mapInitialSetup, currentPosition, currentMarker, currentSchool, currentBurough;
const  normalZoom = 17;


function onGoogleMapResponse(){
    initialLocation = {lat: 40.7291, lng: -73.9965};
    currentPosition = initialLocation;
    mapInitialSetup = {
        center: initialLocation,
        zoom: normalZoom
    }
    currentSchool = "New York University (NYU)";
    currentBurough = "Manhattan";
    map = new google.maps.Map(document.getElementById("mapContainer"), mapInitialSetup);
    panMap();
    setCurrentMarker(currentPosition, currentSchool);
    getPopulationByBoroughs();  //Get population of each burough
    setSchoolNameInBtn();
}

function panMap(){
  map.panBy(300, 0);
}

function setCurrentMarker(location, name){    //Puts marker on new position
  if(currentMarker != undefined)
    currentMarker.setMap(null);
  currentMarker = new google.maps.Marker({
    position: location,
    map: map,
    title: name,
    animation: google.maps.Animation.DROP,
    icon:{
        url: "https://i.imgur.com/kuB2Qeo.png",
        scaledSize: new google.maps.Size(48, 48)
    }
  });
}
//---------------------- Panel's Functions ---------------------------
function hidePanels(){
  $("#currentlyAtPanel").slideUp();
  $("#controlPanel").slideUp();
}

function togglePanels(){
  $("#currentlyAtPanel").slideToggle();
  $("#controlPanel").slideToggle();
}

function hideCurrentlyPanel(){
  $("#currentlyAtPanel").slideUp();
}

// --------------------- Currently at Section ------------------------

function setCurrentlyAt(name, mode){    //Changes the info panel with current address, neighborhood and burough
  var address = univesitiesNewYorkLocation[name];
  setTimeout(function(){
     $("#currentlyAtPanel > p").html(currentSchool + "<br>" + address[1] + "<br>" +
     address[3] + "<br>" + address[4] + " ,     Population: " + NYBuroughs[address[4]] + "<br>");
     currentBurough = address[4];
     if( mode === "initial"){
       togglePanels();
     }else{
       $("#currentlyAtPanel").slideToggle();
     }
  },400);
}

function setSchoolNameInBtn(){
    $("#schoolName > .namesHere").html(currentSchool);
}

//---------------------- Get Buroughs Population------------------------
var NYBuroughs = {};
function getPopulationByBoroughs(){
    $.ajax({
        url: "https://data.cityofnewyork.us/api/views/9mhd-na2n/rows.json?accessType=DOWNLOAD",
        data: "data",
        dataType: "json",
        success: function(results){
            setBuroughsArray(results);
        }
    });
}

function setBuroughsArray(data){
    var dataLength = data.data.length;
    for(var i = 0; i < dataLength; i++){
        NYBuroughs[data.data[i][8]] = data.data[i][10];
    }
    setCurrentlyAt(currentSchool, "initial");
}

//--------------------- Change School ----------------------------
function selectNewSchool(){
  currentSchool = $(this).html();
  currentPosition = univesitiesNewYorkLocation[ currentSchool ][0];
  map.setCenter(currentPosition, currentSchool);
  map.setZoom(normalZoom);
  panMap();
  setCurrentMarker(currentPosition, currentSchool);
  hideCurrentlyPanel();
  setCurrentlyAt(currentSchool, "new school");
  setSchoolNameInBtn();
}

//-------------------- Weather info -------------------------------
var todaysTemp = {"TMAX":0,"TMIN":0,"TAVG":0}, todaysWeather = [];

function initWeatherData(){
  var tempDate, weatherDate;
  if(todaysWeather.length === 0){
    $.ajax({
      url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets/GHCND",
      data: "data",
      headers:{token: "ngryDvgFvKkUIbrhfGsDJAvTXFpQLrrC"},
      success: function(result){
        var auxDate = new Date(result.maxdate);   //Gets the date of the most recent data
        var day;
        if (auxDate.getDate() < 10){
          day = "0" + (auxDate.getDate());
        }else{
          day = auxDate.getDate();
        }
        tempDate = auxDate.getFullYear()+"-"+(auxDate.getMonth()+1)+"-"+day;
        getTempData(tempDate);
        if (auxDate.getDate()-1 < 10){
          day = "0" + (auxDate.getDate()-1);
        }else{
          day = auxDate.getDate()-1;
        }
        weatherDate = auxDate.getFullYear()+"-"+(auxDate.getMonth()+1)+"-"+day;
        getWeatherData(weatherDate);
      }
    })
  }
}

function getTempData(date){
  $.ajax({            // Here we get data of average temperature, max. temperature and min. temperature
    url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=FIPS:36&datatypeid=TMIN,TMAX,TAVG&startdate="+ date+"&enddate=" + date + "&limit=1000",
    data: "data",
    headers:{token: "ngryDvgFvKkUIbrhfGsDJAvTXFpQLrrC"},
    success: function(result){    // And here we get the mean of all that data
      var n = result.metadata.resultset.count;
      for(var i = 0; i < n; i++){
        todaysTemp[result.results[i].datatype]+=result.results[i].value;
      }
      for(var t in todaysTemp){
        todaysTemp[t] /= (n/3);
        todaysTemp[t] = (todaysTemp[t] - 32)* (5/9);  // we also parse it to Celcius (This ain't US!)
        todaysTemp[t] = Math.round(todaysTemp[t] * 10)/ 10;
      }
    }
  })
}

function getWeatherData(date){
  $.ajax({    //Gets data of weather in previous days
    url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/datatypes?datasetid=GHCND&locationid=FIPS:36&startdate="+ date+"&enddate=" + date,
    data: "data",
    headers:{token: "ngryDvgFvKkUIbrhfGsDJAvTXFpQLrrC"},
    success: function(result){
      var n = result.metadata.resultset.count;
      for(var i = n-1; i >= 0; i--){
        if( result.results[i].id.indexOf("WT") != -1 ){
          todaysWeather.push(result.results[i].name);
        }else if(result.results[i].id.indexOf("WV") != -1){
          continue;
        }else{
          break;
        }
      }
    }
  })
}

var weatherFormat = "The temperature in these days is ...<img class='weatherLogo' src='https://i.imgur.com/futpmh7.png'/><br><br>"+
"Max: <span id='tMax'></span>°C<br>"+
"Min: <span id='tMin'></span>°C<br>"+
"Avg: <span id='tAvg'></span>°C<br><br>"+
"And if you go outside you might encounter: <br>"+
"<div id='currentWeatherList'></div>";

function addPanelWeather(){
  $("#additionalPanel #extraContent").empty().html(weatherFormat);
  $("#tMax").html("\t" + todaysTemp.TMAX);
  $("#tMin").html("\t" + todaysTemp.TMIN);
  $("#tAvg").html("\t" + todaysTemp.TAVG);
  var list = $("#currentWeatherList").empty();
  list.append("<ul></ul>").find("ul");
  for (x in todaysWeather) {
    list.append("<li><span>" + todaysWeather[x] + "</span></li>");
  }
  $("#controlPanel").slideToggle();
  $("#additionalPanel").slideToggle();

}

function returnArrow(){
  $("#additionalPanel").slideToggle();
  $("#additionalPanel #extraContent").empty();
  $("#controlPanel").slideToggle();
}

function delayButton(){
  setTimeout(function(){
    $("#weatherBtn").prop("disabled", false);
  },2000);
}

//--------------------- WiFi Spots -------------------------------
var WiFiMarkers = {"Manhattan":[], "Bronx":[], "Staten Island":[], "Brooklyn":[], "Queens":[]};

function getWiFiSpots(){
  $.ajax({
    url: "https://data.cityofnewyork.us/api/views/varh-9tsp/rows.json?accessType=DOWNLOAD",
    data: "data",
    success: function(result){
      console.log(result);
      var marker, infoWindow, content;
      for (var i = 0; i < result.data.length; i++) {
        var current = result.data[i];
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(current[15], current[16]),
          map: map,
          animation: google.maps.Animation.DROP,
          icon:{
            url: "https://i.imgur.com/595q6cd.png",
            scaledSize: new google.maps.Size(32, 32)
          }
        });
		var additionalInfo = current[20];
		if( additionalInfo === null ){
			additionalInfo = "Info not available!";
		}
        content = "<div style='font-weight:bold;'>" + current[14] + "<br>" + current[11] + "<br>" + additionalInfo + "</div>";
        infoWindow = new google.maps.InfoWindow({
          content: content
        });
        listenMarker(marker);
        function listenMarker(marker){
          google.maps.event.addListener(marker, 'click', (function(marker, content, infoWindow){
            return function(){
              infoWindow.setContent(content);
              infoWindow.open(map, marker);
            };
          })(marker, content, infoWindow));
        }

        if(current[26] != currentBurough){
          marker.setVisible(false);
        }
        WiFiMarkers[current[26]].push(marker);
      }
    }
  })
}

function toggleWiFiSpots(){
  if( WiFiMarkers[currentBurough].length === 0 ){
    getWiFiSpots();
  }else{
    var setting;
    if( WiFiMarkers[currentBurough][0].getVisible() ){
      setting = false;
    }else{
      setting = true;
    }
    for (var i = 0; i < WiFiMarkers[currentBurough].length; i++) {
      WiFiMarkers[currentBurough][i].setVisible(setting);
    }
  }

}

//---------------------Subway Entrances --------------------------
var subwayMarker = [];

function getSubwayStations(){
  $.ajax({
    url: "https://data.cityofnewyork.us/api/views/he7q-3hwy/rows.json?accessType=DOWNLOAD",
    data: "data",
    success: function(result){
      console.log(result);
      var marker, infoWindow, content;
      for (var i = 0; i < result.data.length; i++) {
        var current = result.data[i];
        var aux = current[11].slice(7, current[11].length-1);
        var coords = aux.split(" ");
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(coords[1], coords[0]),
          map: map,
          animation: google.maps.Animation.DROP,
          icon:{
            url: "https://i.imgur.com/91dqdzg.png",
            scaledSize: new google.maps.Size(24, 24)
          }
        });

        content = "<div style='font-weight:bold;'>" + current[10]
        + "<br>Line " + current[12] + "<br><a href='" + current[9] + "' target='_blank'>More info</a></div>";

        infoWindow = new google.maps.InfoWindow({
          content: content
        });
        listenMarker(marker);
        function listenMarker(marker){
          google.maps.event.addListener(marker, 'click', (function(marker, content, infoWindow){
            return function(){
              infoWindow.setContent(content);
              infoWindow.open(map, marker);
            };
          })(marker, content, infoWindow));

        }
        subwayMarker.push(marker);
      }
    }
  })
}

function toggleSubwayStations(){
  if( subwayMarker.length === 0 ){
    getSubwayStations();
  }else{
    var setting;
    if( subwayMarker[0].getVisible() ){
      setting = false;
    }else{
      setting = true;
    }
    for (var i = 0; i < subwayMarker.length; i++) {
      subwayMarker[i].setVisible(setting);
    }
  }
}
//----------------------Hospitals --------------------------------
var HospitalMarkers = {"Manhattan":[], "Bronx":[], "Staten Island":[], "Brooklyn":[], "Queens":[]};

function getHospitals (){
  $.ajax({
    url: "https://data.cityofnewyork.us/api/views/ymhw-9cz9/rows.json?accessType=DOWNLOAD",
    data: "data",
    success: function(result){
      console.log(result);
      var marker, infoWindow, content;
      for (var i = 0; i < result.data.length; i++) {
        var current = result.data[i];
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(current[13][1], current[13][2]),
          map: map,
          animation: google.maps.Animation.DROP,
    		  icon:{
      			url: "https://i.imgur.com/71rAO06.png",
      			scaledSize: new google.maps.Size(32, 32)
    		  }
        });
        var address = JSON.parse(current[13][0]);
        content = "<div style='font-weight:bold;'>" + current[10] + " - " +current[8]
        + "<br>" + address.address + "<br>" + current[12] + "</div>";

        infoWindow = new google.maps.InfoWindow({
          content: content
        });

        listenMarker(marker);
        function listenMarker(marker){
          google.maps.event.addListener(marker, 'click', (function(marker, content, infoWindow){
            return function(){
              infoWindow.setContent(content);
              infoWindow.open(map, marker);
            };
          })(marker, content, infoWindow));
        }

        if( current[9] != currentBurough ){
          marker.setVisible(false);
        }
        HospitalMarkers[ current[9] ].push(marker);
      }
    }
  })
}

function toggleHospitals(){
  if( HospitalMarkers[currentBurough].length === 0 ){
    getHospitals();
  }else{
    var setting;
    if( HospitalMarkers[currentBurough][0].getVisible() ){
      setting = false;
    }else{
      setting = true;
    }
    for (var i = 0; i < HospitalMarkers[currentBurough].length; i++) {
      HospitalMarkers[currentBurough][i].setVisible(setting);
    }
  }
}
//--------------------- Art Galleries ----------------------------
var artGalleriesMarkers = [];
function getArtGalleries(){
  var data;
  $.ajax({
    url: " https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD",
    data: "data",
    success: function(result){
      console.log(result);
      paintGalleries(result);
    }
  })
}

function paintGalleries(data){
  var n = data.data.length, marker, infoWindow, content;
  for (var i = 0; i < n; i++) {
    var current = data.data[i];
    var aux = data.data[i][9].slice(7, data.data[i][9].length-1)
    var coords = aux.split(" ");
    //console.log(coords);
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(coords[1], coords[0]),
      map: map,
      animation: google.maps.Animation.DROP,
      icon:{
        url: "https://i.imgur.com/ZxRmq4X.png",
        scaledSize: new google.maps.Size(42, 42)
      }
    })
    content = "<div style='font-weight:bold;'>" + current[8] + "<br>" + current[12] +
      " - " + current[10] + "<br><a href='" + current[11] +"' target='_blank'>More info</a></div>";
        infoWindow = new google.maps.InfoWindow({
          content: content
        });
    listenMarker(marker);
        function listenMarker(marker){
          google.maps.event.addListener(marker, 'click', (function(marker, content, infoWindow){
            return function(){
              infoWindow.setContent(content);
              infoWindow.open(map, marker);
            };
          })(marker, content, infoWindow));
        }

    artGalleriesMarkers.push(marker);
  }
}

function toggleGalleries(){
  if(artGalleriesMarkers.length === 0){
    getArtGalleries();
  }else{
    var setting;
    if( artGalleriesMarkers[0].getVisible() ){
      setting = false;
    }else{
      setting = true;
    }
    for (var i = 0; i < artGalleriesMarkers.length; i++) {
      artGalleriesMarkers[i].setVisible(setting);
    }
  }
}
//---------------------Museums -----------------------------------
var museumsMarker = [];

function getMuseums(){
  $.ajax({
    url: "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD",
    data: "data",
    success: function(result){
      console.log(result);
      var marker, infoWindow, content;
      for (var i = 0; i < result.data.length; i++) {
        var current = result.data[i];
        var aux = current[8].slice(7, current[8].length-1);
        var coords = aux.split(" ");
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(coords[1], coords[0]),
          map: map,
          animation: google.maps.Animation.DROP,
          icon:{
            url: "https://i.imgur.com/RPZBNbw.png",
            scaledSize: new google.maps.Size(32, 32)
          }
        });
        content = "<div style='font-weight:bold;'>" + current[9]
        + "<br>" + current[10] + "<br><a href='" + current[11] + "' target='_blank'>More info</a></div>";

        infoWindow = new google.maps.InfoWindow({
          content: content
        });

        listenMarker(marker);
        function listenMarker(marker){
          google.maps.event.addListener(marker, 'click', (function(marker, content, infoWindow){
            return function(){
              infoWindow.setContent(content);
              infoWindow.open(map, marker);
            };
          })(marker, content, infoWindow));
        }
        museumsMarker.push(marker);
      }
    }
  })
}

function toggleMuseums(){
  if( museumsMarker.length === 0 ){
    getMuseums();
  }else{
    var setting;
    if( museumsMarker[0].getVisible() ){
      setting = false;
    }else{
      setting = true;
    }
    for (var i = 0; i < museumsMarker.length; i++) {
      museumsMarker[i].setVisible(setting);
    }
  }
}
//----------------------Bicycle lanes-----------------------------
var bikeLanes;

function toggleBikeLanes(){
  if(bikeLanes === undefined){
    bikeLanes = new google.maps.BicyclingLayer();
    bikeLanes.setMap(map);
  }else{
    if(bikeLanes.getMap() === null){
      bikeLanes.setMap(map);
    }else{
      bikeLanes.setMap(null);
    }
  }
}

//----------------------ZILLOW-------------------------------------
var PropertyMarker = {};

var zillowID = "X1-ZWz18x98exg7wr_avwne";
var firstzpid;

function usefulURL(link){
  return "https://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent("select * from xml where url='" + link + "'") +
         "&format=json";
}

function firstProperty(){
  console.log(currentSchool, univesitiesNewYorkLocation[currentSchool][5]);
  var url = 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=' + zillowID +
              '&address=' + encodeURI( univesitiesNewYorkLocation[currentSchool][5] ) + '&citystatezip=' + encodeURI("NewYork, NY");
  var zillowUrl = usefulURL(url);
  $.ajax({
    url: zillowUrl,
    data: "data",
    success: function(result){
      console.log(result);
      firstzpid = result.query.results.searchresults.response.results.result.zpid;
      console.log("firstzpid: ", firstzpid);
      PropertyList();
    }
  })
}

function PropertyList(){
  var url = "http://www.zillow.com/webservice/GetComps.htm?zws-id=" + zillowID + "&zpid=" + firstzpid +"&count=20&rentzestimate=true";
  var zillowUrl = usefulURL(url);
  $.ajax({
    url: zillowUrl,
    data: "data",
    success: function(result){
      console.log(result);
      var marker, infoWindow, content;
      var aux = result.query.results.comps.response.properties.comparables.comp;
      if(!(currentSchool in PropertyMarker)){
        PropertyMarker[ currentSchool ] = [];
        console.log(PropertyMarker);
      }
      for (var i = 0; i < aux.length; i++) {
        var current = aux[i];
        console.log(current);
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(current.address.latitude, current.address.longitude),
          map: map,
          animation: google.maps.Animation.DROP,
          icon:{
            url: "https://i.imgur.com/9b8Hbr0.png",
            scaledSize: new google.maps.Size(48, 48)
          }
        })


        content = "<div style='font-weight:bold;'>" + current.address.street
        + "<br>Rent: $" + current.rentzestimate.amount.content + " USD<br><a href='" + current.links.homedetails
        +"' target='_blank'>More info</a></div>";

        infoWindow = new google.maps.InfoWindow({
          content: content
        });

        listenMarker(marker);
        function listenMarker(marker){
          google.maps.event.addListener(marker, 'click', (function(marker, content, infoWindow){
            return function(){
              infoWindow.setContent(content);
              infoWindow.open(map, marker);
            };
          })(marker, content, infoWindow));
        }
        PropertyMarker[currentSchool].push(marker);
      }
      console.log(PropertyMarker);
    }
  })
}

function toggleHouses(){
  if( !(currentSchool in PropertyMarker) ){
    firstProperty();
  }  else{
    var setting;
    if( PropertyMarker[currentSchool][0].getVisible() ){
        setting = false;
    }else{
      setting = true;
    }
    for (var i = 0; i < PropertyMarker[currentSchool].length; i++) {
      PropertyMarker[currentSchool][i].setVisible(setting);
    }
  }
}


//--------------------- General Document -------------------------



$(document).ready(function(){
  $(".backArrow").on('click', returnArrow);
  //$("#getAddressBtn").on("click", getAddress);
  //$("#getClimateDataButton").on("click", getDailySummary);
  //$("#artGalleriesBtn").on("click", toggleGalleries);
  //$("#getNeighborhoodDataButton").on("click", drawNeighborhood);
  //$("#checkNeighborhoodDataButton").on("click", checkNeighborhood);
  $(".selectSchool").on("click", selectNewSchool);
  //$("#toggleHood").on("click", toggleHoodFunction);
  $("#weatherBtn").on("click", addPanelWeather);
  $("#WiFiBtn").on('click', toggleWiFiSpots);
  $("#SubwayBtn").on('click', toggleSubwayStations);
  $("#HospitalBtn").on('click', toggleHospitals);
  $("#GalleriesBtn").on('click', toggleGalleries);
  $("#MuseumsBtn").on('click', toggleMuseums);
  $("#BikeLanesBtn").on('click', toggleBikeLanes);
  $("#HousesBtn").on("click", toggleHouses);


  delayButton();
  //getPopulationByBoroughs();
  initWeatherData();
});
