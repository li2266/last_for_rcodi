// // // DATA FOR NEW YORK CITY // // //
// datacoverage:1
// id:"CITY:US360018"
// maxdate:"2017-11-06"
// mindate:"1899-06-01"
// name:"New City, NY US"

// Used for the starting marking which marks the location of NYU
var nyuLogo = 'http://gdurl.com/jTPQ'
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

// // // DATA END // // //


function initMap() {
    //Map Options
    var startMarkerOptions = {
        zoom: 15,
        center: {
            lat: 40.7291,
            lng: -73.9965
        }
    }

    //The Map
    var map = new google.maps.Map(document.getElementById('map'), startMarkerOptions);

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
        radius: 1000
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
