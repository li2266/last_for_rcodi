// // // DATA FOR NEW YORK CITY // // //
// datacoverage:1
// id:"CITY:US360018"
// maxdate:"2017-11-06"
// mindate:"1899-06-01"
// name:"New City, NY US"

// Used for the starting marking which marks the location of NYU
var nyuLogo = 'http://gdurl.com/jTPQ'
var museumLogo = 'http://gdurl.com/RCWGl';
var apartmentMarker = 'http://gdurl.com/o3M7'

// // // KEYS // // //
var weatherDataToken = 'tFCYNcNdjrqidjGoDpOSzAxMKEmbKlCx';
var quandlDataKey = '8CfnmNDDNH7KhQXdzQf4';
var zillowAPIKey = 'X1-ZWz1g3zvgixdl7_9tzan';
// // // KEYS END // // //

// // // DATA // // //
var medianRentalStudio = 'https://www.quandl.com/api/v3/datasets/ZILLOW/N15706_MRPST.json?api_key=8CfnmNDDNH7KhQXdzQf4';
var medianRentalOneBed = 'https://www.quandl.com/api/v3/datasets/ZILLOW/N9_MRP1B.json?api_key=8CfnmNDDNH7KhQXdzQf4';
var medianRentalTwoBed = 'https://www.quandl.com/api/v3/datasets/ZILLOW/N9_MRP2B.json?api_key=8CfnmNDDNH7KhQXdzQf4';
var medianRentalThreeBed = 'https://www.quandl.com/api/v3/datasets/ZILLOW/N9_MRP3B.json?api_key=8CfnmNDDNH7KhQXdzQf4';
var medianRentalFourBed = 'https://www.quandl.com/api/v3/datasets/ZILLOW/M2_MRP4B.json?api_key=8CfnmNDDNH7KhQXdzQf4';
var nycNeigborhoodsUrl = 'https://data.cityofnewyork.us/api/geospatial/cpf4-rkhq?method=export&format=GeoJSON';
var nycFireDeptUrl = 'https://data.ny.gov/api/views/bpkx-gmh7/rows.json?accessType=DOWNLOAD';
var nycMuseumsUrl = 'https://data.cityofnewyork.us/api/geospatial/ekax-ky3z?method=export&format=GeoJSON';

// // // DATA END // // //

//Map Options
var startMarkerOptions = {
    zoom: 15,
    center: {
        lat: 40.7291,
        lng: -73.9965
    }
}

var i = 0;
var distanceFromCampus;
distanceFromCampus = 1;

function initMap() {

    //Adjuct map zoom level for when custom search distance used
    if (i >= 1) {
        startMarkerOptions.zoom = 14;
        if (document.getElementById('location').value <= 1) {
            startMarkerOptions.zoom = 15;
        }
    }

    //The Map
    var map = new google.maps.Map(document.getElementById('map'), startMarkerOptions);

    //Updating Search Radius Circle if it is not the first time initMap is called
    if (i >= 1) {
        distanceFromCampus = document.getElementById('location').value;
        startMarkerOptions.zoom = 14;
    }
    distanceFromCampus = distanceFromCampus * 1000;


    //Adding the starting marker
    var startMarker = new google.maps.Marker({
        position: startMarkerOptions.center,
        map: map,
        icon: nyuLogo
    });

    var startMarkerCircle = new google.maps.Circle({
        strokeColor: '#57068c',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#57068c',
        fillOpacity: 0.15,
        map: map,
        center: startMarkerOptions.center,
        radius: distanceFromCampus
    });

    // // // Transportation Information Layers // // //
    var bikeLayer = new google.maps.BicyclingLayer();
    var trafficLayer = new google.maps.TrafficLayer();
    var transitLayer = new google.maps.TransitLayer();

    $("#cb").click(function() {
        if ($(this).is(':checked'))
            bikeLayer.setMap(map); // show
        else
            bikeLayer.setMap(null); // hide
    });

    $("#tra").click(function() {
        if ($(this).is(':checked'))
            trafficLayer.setMap(map); // show
        else
            trafficLayer.setMap(null); // hide
    });

    $("#trn").click(function() {
        if ($(this).is(':checked'))
            transitLayer.setMap(map); // show
        else
            transitLayer.setMap(null); // hide
    });

    //
        map.data.setStyle({
            fillOpacity: '0.25',
            fillColor: '#FDE3A7',
            strokeColor: '#22313F',
            strokeWeight: 1.2,
            icon: museumLogo
        });
        map.data.loadGeoJson(nycNeigborhoodsUrl);

        var data_layer_museum = new google.maps.Data({map:map});
        data_layer_museum.loadGeoJson(nycMuseumsUrl);
        data_layer_museum.setStyle({
            icon: museumLogo
        });

        var data_layer_firedept = new google.maps.Data({map:map});
        data_layer_firedept.loadGeoJson(nycFireDeptUrl);



    // // // END SETTINGS // // //
    i++;
    // // // END // // //
}

//weather API
function weather() {
    var weatherURL = "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations/CITY:US360018";
    // var weatherURL = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&id=CITY:US360018'
    // var weatherURL = "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets?locationid=FIPS:36";
    var weatherURL = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets/GSOY?stationid=FIPS:36061'

    $.ajax({
        type: "GET",
        url: weatherURL,
        dataType: 'json',
        headers: {
            token: weatherDataToken
        },
        success: function(data) {
            console.log(data); //data._(whatever specific data want from the array)__
        }

    })

}

$(document).ready(function() {

    $("#advanced-options").hide();

    $("#advanced-options-button").click(function() {
        $("#advanced-options").toggle("slide");
    });

});
