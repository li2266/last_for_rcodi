//ON DOCUMENT LOAD...
$(document).ready(function() {
    $('select').material_select();
});

//******** VARIABLES ********//
//API DETAILS
var nycNeigborhoodsUrl = 'https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD';
//GLOBAL VARIABLES
var map;
var coordinates;
var logo = 'http://svgshare.com/i/3tY.svg';
var museumSvg = 'http://svgshare.com/i/3vH.svg';
var careerSvg = 'http://svgshare.com/i/3uw.svg';
var fireSvg = 'http://svgshare.com/i/3u3.svg';
var marketSvg = 'http://svgshare.com/i/3uc.svg';
var nycMarker = 'http://svgshare.com/i/3wy.svg';
//OBJECTS
var climate = {name: 'Climate', url: 'https://api.weather.gov/points/40.7291,-73.9965/forecast', json: climateJson = {}, isActive: false};
var safety = {name: 'Safe', url: 'https://data.ny.gov/api/views/4kp7-7jt3/rows.json?accessType=DOWNLOAD', json: safetyJson = {}, isActive: false};
var transportation = {name: 'Transportation', url: '', isActive: false};
var traffic = {name: 'Traffic', url: '', isActive: false};
var bikePaths = {name: 'Bike Paths', url: '', isActive: false};
var museums = {name: 'Museums', url: 'https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD', json: nycMuseumsJson = {}, isActive: false};
var careerCenters = {name: 'CareerCenters', url: 'https://data.ny.gov/api/views/g8h7-98zz/rows.json?accessType=DOWNLOAD', json: careerCentersJson = {}, isActive: false};
var farmersMarkets = {name: 'Farmer\'s Markets', url: 'https://data.ny.gov/api/views/gfni-eg8a/rows.json?accessType=DOWNLOAD', json: farmersMarketJson = {}, isActive: false};
var apartments = {url: 'https://data.cityofnewyork.us/resource/ffxx-dfvk.json', json: apartmentsJson = {}, isActive: false};

//***** DATABASE REQUESTS *****//
//CLIMATE API REQUEST
$.ajax({ 
    type : "GET", 
    url : climate.url, 
    success : function(result) { 
        climate.json = result;
        updateWeather();
    }, 
    error : function(result) { 
        //handle the error 
    } 
});
//APARTMENT DATA
$.ajax({ 
    type : "GET", 
    url : apartments.url,
    success : function(result) {
        apartments.json = result;
        updateListings();
    }, 
    error : function(result) { 
        //handle the error 
    }
});
//NYC FARMERS MARKET DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : farmersMarkets.url,
    success : function(result) { 
        farmersMarkets.json = result;
    }, 
    error : function(result) { 
        //handle the error 
    } 
}); 
//NYC CAREER CENTERS DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : careerCenters.url,
    success : function(result) { 
        careerCenters.json = result;
    }, 
    error : function(result) { 
        //handle the error 
    } 
});
//NYC MUSEUMS DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : museums.url,
    success : function(result) {
        museums.json = result;
    }, 
    error : function(result) { 
        //handle the error 
    } 
});
//NYC FIRE STATIONS DATABASE REQUEST
$.ajax({ 
    type : "GET", 
    url : safety.url,
    success : function(result) { 
        safety.json = result;
    }, 
    error : function(result) { 
        //handle the error 
    } 
});

//UPDATE THE DAILY BRIEFING
function updateWeather() {
    var name;
    var desc;
    var temp;
    for(var i = 0; i < 3; i++) {
        name = climate.json.properties.periods[i].name;
        desc = climate.json.properties.periods[i].shortForecast;
        temp = climate.json.properties.periods[i].temperature;
        icon = climate.json.properties.periods[i].icon;
        $('#weather').append('<li><b>' + name + ': </b><p><img class="weather-icon" src= "' + icon + '">' + desc + ' - ' + temp + '&#8457;' + '</p></li>');
    }
}

function updateListings() {
    var cheapIndex;
    var listingNum = 1;
    apartments.json.splice(98, 1);
    apartments.json.splice(146, 1);
    var cheapest = parseInt(apartments.json[5].avg_monthly_gross_rent.substring(1));
    var currentPrice;
    for(var i = 0; i < apartments.json.length - 1; i++) {
        if(apartments.json[i].borough == 'MANHATTAN') {
            currentPrice = parseFloat(apartments.json[i].avg_monthly_gross_rent.substring(1));
            if(currentPrice < cheapest) {
                cheapest = parseFloat(apartments.json[i].avg_monthly_gross_rent.substring(1));
                cheapIndex = i;
            }
            $('#listings').append('<p><b>Listing ' + listingNum + ':</b> ' + apartments.json[i].location_street_a + ' | ' + apartments.json[i].avg_monthly_gross_rent + ' <small>/mo</small></p>');
            listingNum++;
        }
    }
    $('#listings').before('<div class="card"> <div class="card-content"> <span class="card-title">Cheapest Rental</span><p><b>Address:</b> ' + apartments.json[cheapIndex].location_street_a + '</p><p><b>Lowest Price:</b> ' + apartments.json[cheapIndex].avg_monthly_gross_rent + ' <small>/mo</small></p></div></div>');
}

//TOGGLE DIFFERENT DATA LAYER CHIPS
$('#choices').on('change', function() {
    var array = [];
    for (var i = 0; i < $(this).val().length; i++) {
        array.push($(this).val()[i]);
    }
    
    if (array.indexOf('1') > -1) {
        if(!(safety.isActive))
            $('#safety').fadeIn().css("display", "inline-block");
        safety.isActive = true;
    }
    else {
        if(safety.isActive)
            $('#safety').fadeOut();
        safety.isActive = false;
    }
    if (array.indexOf('2') > -1) {
        if(!(transportation.isActive))
            $('#subway').fadeIn().css("display", "inline-block");
        transportation.isActive = true;
    }
    else {
        if(transportation.isActive)
            $('#subway').fadeOut();
        transportation.isActive = false;
    }
    if (array.indexOf('3') > -1) {
        if(!(traffic.isActive))
            $('#traffic').fadeIn().css("display", "inline-block");
        traffic.isActive = true;
    }
    else {
        if(traffic.isActive)
            $('#traffic').fadeOut();
        traffic.isActive = false;
    }
    if (array.indexOf('4') > -1) {
        if(!(bikePaths.isActive))
            $('#bike-paths').fadeIn().css("display", "inline-block");
        bikePaths.isActive = true;
    }
    else {
        if(bikePaths.isActive)
            $('#bike-paths').fadeOut();
        bikePaths.isActive = false;
    }
    if (array.indexOf('5') > -1) {
        if(!(museums.isActive))
            $('#museums').fadeIn().css("display", "inline-block");
        museums.isActive = true;
    }
    else {
        if(museums.isActive)
            $('#museums').fadeOut();
        museums.isActive = false;
    }
    if (array.indexOf('6') > -1) {
        if(!(careerCenters.isActive))
            $('#career-centers').fadeIn().css("display", "inline-block");
        careerCenters.isActive = true;
    }
    else {
        if(careerCenters.isActive)
            $('#career-centers').fadeOut();
        careerCenters.isActive = false;
    }
    if (array.indexOf('7') > -1) {
        if(!(farmersMarkets.isActive))
            $('#farmers-markets').fadeIn().css("display", "inline-block");
        farmersMarkets.isActive = true;
    }
    else {
        if(farmersMarkets.isActive)
            $('#farmers-markets').fadeOut();
        farmersMarkets.isActive = false;
    }
    
    console.log(array);
    reloadGoogleMaps();
});

//UPDATES THE GOOGLE MAP TO REFLECT THE ADDED FILTERS
function reloadGoogleMaps() {
    var thisFunc = this, map;

	thisFunc.init = function () {
		map = new google.maps.Map(d3.select("#map").node(), {
            zoom: 11,
            center: new google.maps.LatLng(40.7291, -73.9965),
            mapTypeId: 'roadmap'
        });
        
        var contentString = '<div>' +
            '<h4>NYU Stern School of Business</h4>'+
            '<p>Check out the <b>NYU Stern School of Business</b> program <a href="http://www.stern.nyu.edu/" target="_blank">here.</a></p>' +
            '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        //Adding the starting marker
        var startMarker = new google.maps.Marker({
            position: new google.maps.LatLng(40.7291, -73.9965),
            map: map,
            icon: logo,
            zIndex: google.maps.Marker.MAX_ZINDEX + 100,
            title: 'NYU Stern School of Business'
        });
        startMarker.addListener('click', function() {
            infowindow.open(map, startMarker);
        });
        
        var fiveMileRadius = new google.maps.Circle({
            strokeColor: '#592085',
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: '#592085',
            fillOpacity: 0.06,
            map: map,
            center: new google.maps.LatLng(40.7291, -73.9965),
            radius: 8000
        });
		
		if(safety.isActive) {
            for(var i = 0; i < safety.json.data.length; i++) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(safety.json.data[i][17], safety.json.data[i][18]),
                    icon: fireSvg,
                    clickable: true,
                    title: safety.json.data[i][8], 
                    map: map
                });
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent('<div>' + '<h5>' + safety.json.data[i][8] + '</h5>' + '</div>');
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        }
        
        if(transportation.isActive) {
            var transitLayer = new google.maps.TransitLayer();
            transitLayer.setMap(map);
        }
        
        if(traffic.isActive) {
            var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);
        }
		
		if(bikePaths.isActive) {
            var bikeLayer = new google.maps.BicyclingLayer();
            bikeLayer.setMap(map);
        }
        
        if(museums.isActive) {
            for(var i = 0; i < museums.json.data.length; i++) {
                var combined = museums.json.data[i][8];
                var lat = parseFloat(combined.substring(combined.indexOf("(") + 1, combined.length - 1).split(" ")[1]);
                var lng = parseFloat(combined.substring(combined.indexOf("(") + 1, combined.length - 1).split(" ")[0]);
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    clickable: true,
                    icon: museumSvg,
                    map: map
                });
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent('<div>' + '<h5>' + museums.json.data[i][9] + '</h5>' + '<p>' + 'Get more info about the <b>' + museums.json.data[i][9] + '</b> <a href="' + museums.json.data[i][11] +'" target="_blank">here</a>.</p>' + '</div>');
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        }
        
        if(careerCenters.isActive) {
            for (var i = 1; i < careerCenters.json.data.length-1; i++) {
                if(careerCenters.json.data[i][22][0].indexOf("sll=") > -1) {
                    var base = careerCenters.json.data[i][22][0].substring(careerCenters.json.data[i][22][0].indexOf("sll=") + 4, careerCenters.json.data[i][22][0].indexOf("&sspn"));
                    var lat = parseFloat(base.split(",")[0]);
                    var lng = parseFloat(base.split(",")[1]);
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(lat, lng),
                        clickable: true,
                        icon: careerSvg,
                        map: map
                    });
                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infowindow.setContent('<div>' + '<h5>' + careerCenters.json.data[i][10] + '</h5>' + '<p><b>' + careerCenters.json.data[i][10] + '</b> can be contacted at ' + careerCenters.json.data[i][15] + ' during the hours of: ' + careerCenters.json.data[i][19] + '. Get more info about ' + careerCenters.json.data[i][10] + '<a href="' + careerCenters.json.data[i][18][0] +'" target="_blank"> here</a>.</p>' + '</div>');
                            infowindow.open(map, marker);
                        }
                    })(marker, i));
                }
            }
        }
        
        if(farmersMarkets.isActive) {
            for (var i = 1; i < farmersMarkets.json.data.length-1; i++) {
                var lat = parseFloat(farmersMarkets.json.data[i][22]);
                var lng = parseFloat(farmersMarkets.json.data[i][23]);
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    clickable: true,
                    icon: marketSvg,
                    map: map
                });
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent('<div>' + '<h5>' + farmersMarkets.json.data[i][9] + '</h5>' + '<p><b>' + farmersMarkets.json.data[i][9] + '</b> is open ' + farmersMarkets.json.data[i][19] + ' on ' + farmersMarkets.json.data[i][18] + '. Get more info about ' + farmersMarkets.json.data[i][9] + '<a href="' + farmersMarkets.json.data[i][17][0] +'" target="_blank"> here</a>.</p>' + '</div>');
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        }

		google.maps.event.addDomListenerOnce(map, 'idle', function () {
		    google.maps.event.addDomListener(window, 'resize', function () {
		        map.setCenter(new google.maps.LatLng(40.7291, -73.9965));
		    });
		});
	};
	
    thisFunc.getMap = function() {
        return map;
    };
	thisFunc.init();
}

//INITIALIZE GOOGLE MAP
function initMap() {
    map = new google.maps.Map(d3.select("#map").node(), {
        zoom: 11,
        center: new google.maps.LatLng(40.7291, -73.9965),
        mapTypeId: 'roadmap'
    });

    var contentString = '<div>' +
            '<h4>NYU Stern School of Business</h4>'+
            '<p>Check out the <b>NYU Stern School of Business</b> program <a href="http://www.stern.nyu.edu/" target="_blank">here.</a></p>' +
            '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    //Adding the starting marker
    var startMarker = new google.maps.Marker({
        position: new google.maps.LatLng(40.7291, -73.9965),
        map: map,
        icon: logo,
        title: 'NYU Stern School of Business'
    });
    startMarker.addListener('click', function() {
        infowindow.open(map, startMarker);
    });
    
    var cityCircle = new google.maps.Circle({
        strokeColor: '#592085',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#592085',
        fillOpacity: 0.1,
        map: map,
        center: new google.maps.LatLng(40.7291, -73.9965),
        radius: 8000
    });
}


















