//token clima   VmuFkPVjDPVPYLTTfeNTfhoYJmNiuCEQ
var minPrice = 0;
var maxPrice = 0;
var sec = 0;
var mapadeNY;
var uLat = 40.7291;
var uLng = -73.9965;
var stateSchools = false;
var stateHealthPoints = false;
var stateMuseums = false;
var stateRestaurants = false;
var stateHouses = false;
var schoolsURL = "https://data.cityofnewyork.us/api/views/s3k6-pzi2/rows.json";
var healthPointsURL = "https://data.cityofnewyork.us/api/views/f7b6-v6v3/rows.json";
var museumsURL = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json";
var restaurantsURL = "https://data.cityofnewyork.us/resource/9w7m-hzhe.json";
var fireDepURL = "https://data.ny.gov/resource/yvdw-83ff.json";
var housesURL = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json";
var schoolIcon = "https://c24215cec6c97b637db6-9c0895f07c3474f6636f95b6bf3db172.ssl.cf1.rackcdn.com/framed/~/media/multimedia/interactives/2016/ecci/images/school_icon.gif";
var treeIcon ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXglyxiT4Ma7LmClxEu67lgmrxIISeCd5LGywIsBbT36RGJc5lRw";
var patitoIcon ='https://orig00.deviantart.net/1c3a/f/2013/257/b/3/gatito_kawaii_png__by_fatthda-d6m9164.png';
//var museumIcon = "http://www.museonacional.gov.co/Style%20Library/museo/images/favicon.ico?rev=23";
var museumIcon = "https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-container_4x.png,icons/onion/1834-museum-jp_4x.png&highlight=C2185B&scale=2.0";
var healthPointIcon = "http://dashboard.apostrophesolutions.com/mapiconscollection-markers/hospital-building.png";
var randomIcon = "https://www.childrensmuseum.org/sites/all/themes/tcmi/images/infobar/cart.png";
var libraryIcon = "http://skywalkboston.com/wp-content/uploads/2015/07/icon2_book.png";
var houseIcon = "http://bddatabase.net/images/icon_house.png";

function initMap(){
  var latLong = {lat: uLat, lng: uLng};
  mapadeNY =  new google.maps.Map(document.getElementById('mapita'), {
    zoom: 15,
    center: latLong
  });
  var newMarker = new google.maps.Marker({
    position: latLong,
    map: mapadeNY,
    icon : "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
  });
  getHighSchools();
  getHealthPoints();
  getMuseums();
  getHouses();
}

var schoolMarkers = [];

function getHighSchools(){
    var data = $.get(schoolsURL, function(){
		//console.log(URL)
	})
		.done( function(){
			//Success
			//jsonSchools = data;
			//console.log(data);
			for (var i = 0; i < data.responseJSON.data.length; i++) {
			    //console.log(i);
                if(data.responseJSON.data[i][458] == "Manhattan"){
                    //console.log(data.responseJSON[i].latitude);
                    //console.log(data.responseJSON[i].longitude);
                    var latLong = new google.maps.LatLng(data.responseJSON.data[i][461], data.responseJSON.data[i][462]);
                    var newMarker = new google.maps.Marker({
                        position: latLong,
                        map: mapadeNY,
                        icon: schoolIcon
                    });
                    newMarker.setMap(null);
                    schoolMarkers.push(newMarker);
                }else{
                    //console.log(uno);
                }
            }
		})
		.fail( function(error){
			console.error(error);
		});
}

function markHighSchools(){
    if(!stateSchools){
        for(var i= 0; i< schoolMarkers.length;i++){
            schoolMarkers[i].setMap(mapadeNY);
        }
        document.getElementById("pointHighSchools").innerHTML = "Unpoint High Schools";
        stateSchools = true;
    }else{
        for(var j= 0; j< schoolMarkers.length;j++){
            schoolMarkers[j].setMap(null);
        }
        document.getElementById("pointHighSchools").innerHTML = "Point High Schools";
        stateSchools = false;
    }
}

var healthMarkers = [];

function getHealthPoints(){
    var data = $.get(healthPointsURL, function(){
		//console.log(URL)
	})
		.done( function(){
			//Success
			//jsonSchools = data;
			//console.log(data);
			for(var i=0; i< data.responseJSON.data.length; i++){
			    //console.log(i);
			        if(data.responseJSON.data[i][9] == "Manhattan"){
			            //console.log(1);
                        var latLong = new google.maps.LatLng(data.responseJSON.data[i][13][1], data.responseJSON.data[i][13][2]);
                        //console.log(latLong);
                        var newMarker = new google.maps.Marker({
                            position: latLong,
                            map: mapadeNY,
                            icon: healthPointIcon
                        });
                        newMarker.setMap(null);
                        healthMarkers.push(newMarker);
			        }else{
			            //console.log(0);
			        }
			}
		    //DATASETS_API_SERIES_ID[data.responseJSON.request.series_id].push(data.responseJSON.series[0].data);
		})
		.fail( function(error){
			console.error(error);
		});
}

function markHealthPoints(){
    if(!stateHealthPoints){
        for(var i= 0; i< healthMarkers.length;i++){
            healthMarkers[i].setMap(mapadeNY);
        }
        document.getElementById("pointHealtPoints").innerHTML = "Unpoint Medical Aid";
        stateHealthPoints = true;
    }else{
        for(var j= 0; j< healthMarkers.length;j++){
            healthMarkers[j].setMap(null);
        }
        document.getElementById("pointHealtPoints").innerHTML = "Point Medical Aid";
        stateHealthPoints = false;
    }
}

var museumsMarkers = [];

function getMuseums(){
    var data = $.get(museumsURL, function(){
		//console.log(URL)
	})
		.done( function(){
			//Success
			//jsonSchools = data;
			//console.log(data);
			for (var i = 0; i < data.responseJSON.data.length; i++) {
                if(data.responseJSON.data[i][14] == "New York"){
                    //console.log(data.responseJSON[i].latitude);
                    //console.log(data.responseJSON[i].longitude);
                    var positionRaw = data.responseJSON.data[i][8];
                    var positionArray = positionRaw.split(" ");
                    var positionLng = positionArray[1].substring(1);
                    var positionLat = positionArray[2].substring(0, (positionArray[2].length)-1);
                    //console.log(positionLng);
                    //console.log(positionLat);
                    //console.log(positionArray[2]);
                    var latLong = new google.maps.LatLng(positionLat, positionLng);
                    var newMarker = new google.maps.Marker({
                        position: latLong,
                        map: mapadeNY,
                        icon:museumIcon
                    });
                    museumsMarkers.push(newMarker);
                    newMarker.setMap(null);
                    //console.log(1);
                }else{
                    //console.log(i);
                }
            }
		    //DATASETS_API_SERIES_ID[data.responseJSON.request.series_id].push(data.responseJSON.series[0].data);
		})
		.fail( function(error){
			console.error(error);
		});
}

function markMuseums(){
    if(!stateMuseums){
        for(var i= 0; i< museumsMarkers.length;i++){
            museumsMarkers[i].setMap(mapadeNY);
        }
        document.getElementById("pointMuseums").innerHTML = "Unpoint Museums";
        
        stateMuseums = true;
    }else{
        for(var j= 0; j< museumsMarkers.length;j++){
            museumsMarkers[j].setMap(null);
        }
        document.getElementById("pointMuseums").innerHTML = "Point Museums";
        stateMuseums = false;
    }
}

var housesMarkers = [];

function getHouses(){
    var data = $.get(housesURL, function(){
		//console.log(URL)
	})
		.done( function(){
			//Success
			//jsonSchools = data;
			//var housesjson = csvToJSON(data);
			//console.log(data);
			for (var i = 0; i < data.responseJSON.data.length; i++) {
                if(data.responseJSON.data[i][15] == "Manhattan" && data.responseJSON.data[i][9] != "CONFIDENTIAL"){
                    //var titulo = data.responseJSON[i].project_name.toString();
                    //var addressStr = data.responseJSON[i].street_name.split(" ");
                    //var addressHTML = "";
                    //for(var j = 0; j<addressStr.length; j++){
                    //    addressHTML = addressHTML + "+"+ addressStr[j];
                    //};
                    //console.log(addressHTML);
                    //var distance = getDistanceFromLatLonInKm(uLat,uLng,data.responseJSON.data[i][23],data.responseJSON.data[i][24]);
                    //var distance = getDistance(data.responseJSON.data[i][23], data.responseJSON.data[i][24]);
                    //var data2 = $.get("https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=40.7291,-73.9965&destinations="+data.responseJSON.data[i][23]+","+data.responseJSON.data[i][24]+"&key=AIzaSyDb61z8bGfd8c7AlRNks21NwSytDzEhBAs", function(){
        
                    //})
                    //console.log(distance);
                    var latLong = new google.maps.LatLng(data.responseJSON.data[i][23], data.responseJSON.data[i][24]);
                    //zillowULR = $.parseHTML("http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18wha5608i3_at3ig&address=" + data.responseJSON[i].house_number+addressHTML+"&citystatezip=NewYork%2C+NY");
                    //console.log("http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18wha5608i3_at3ig&address=" + data.responseJSON[i].house_number+addressHTML+"&citystatezip=NewYork%2C+NY.xlm");
                    //getZillowInfo("http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18wha5608i3_at3ig&address=" + data.responseJSON[i].house_number+addressHTML+"&citystatezip=NewYork%2C+NY.xml");
                    var newMarker = new google.maps.Marker({
                        position: latLong,
                        map: mapadeNY,
                        icon: houseIcon
                    });
                    //var projectStr = data.responseJSON.data[i][9].split(" ");
                    //var projectHTML = "";
                    //for(var j = 0; j<projectStr.length; j++){
                    //    projectHTML = projectHTML + "+"+ projectHTML[j];
                    //};
                    //var contentString = '<p>'+ projectHTML +', is '+ distance +'KM away from NYU Stern School of Business</p>';
                    //var infowindow = new google.maps.InfoWindow({
                    //    content: contentString
                    //});
                    //newMarker.addListener('click', function() {
                    //    infowindow.open(mapita, newMarker);
                    //});
                    housesMarkers.push(newMarker);
                    newMarker.setMap(null);
                    //console.log(1);
                }else{
                    //console.log(0);
                }
            }
            
		})
		.fail( function(error){
			console.error(error);
		});
}

function getZillowInfo(){
    var data =  $.ajax({
                    type: 'GET',
                    url: "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18wha5608i3_at3ig&address=2395+FREDERICK+DOUGLASS+BOULEVARD+&citystatezip=NewYork%2C+NY.xml",
                    headers: {'Accept':'application/xml'},
                    dataType: 'xml',
                    success: function (data) {
                        console.log(data);
                    }
                });
}

function getDistance(hLat, hLng){
    var data = $.get("https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=40.7291,-73.9965&destinations="+hLat+","+hLng+"&key=AIzaSyDb61z8bGfd8c7AlRNks21NwSytDzEhBAs", function(){
        
    })
        .done(function(){
            console.log(data);
        })
        .fail(function(error){
            console.log(error);
        })
}

function markHouses(){
    if(!stateHouses){
        for(var i= 0; i< housesMarkers.length;i++){
            housesMarkers[i].setMap(mapadeNY);
        }
        document.getElementById("pointHouses").innerHTML = "Unpoint Houses";
        
        stateHouses = true;
    }else{
        for(var j= 0; j< housesMarkers.length;j++){
            housesMarkers[j].setMap(null);
        }
        document.getElementById("pointHouses").innerHTML = "Point Houses";
        stateHouses = false;
    }
}

function updateRequirements(){
    var minPrice = document.getElementById("minPrice").value;
    var maxPrice = document.getElementById("maxPrice").value;
    var sec = document.getElementById("sec").value;
    
    console.log(minPrice);
    console.log(maxPrice);
    console.log(sec);
}

$(document).ready(function(){
    $("#updateRequirements").on("click", updateRequirements);
	$("#pointHighSchools").on("click", markHighSchools);
	$("#pointHealtPoints").on("click", markHealthPoints);
	$("#pointMuseums").on("click", markMuseums);
	$("#pointHouses").on("click", markHouses);
	$("#askData").on("click", updateInfo);
});