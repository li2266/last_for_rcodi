var map;
var temp;
var rentData = [];
var libraryData = [];
var housingData = [];
var museumData = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12
    });
    var city = "NYU Stern School of Business";
    var location = new google.maps.LatLng(40.712784, -74.005941);
    var geo = new google.maps.Geocoder();
        var marker = new google.maps.Marker({position: location, map:map});
    geo.geocode({'address' : city}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
        }
    });
}

$(function(){
    
    rentUrl = "https://data.cityofnewyork.us/resource/q3m4-ttp3.json?borough=Manhattan";
    libraryUrl = "https://data.cityofnewyork.us/api/views/gysc-yn4h/rows.json?accessType=DOWNLOAD";
    housingUrl = "https://data.cityofnewyork.us/resource/ffxx-dfvk.json";
    museumUrl = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD";
    
    $.getJSON(rentUrl, function(data, status){
        $.each(data, function(i, rent){
            rentData.push(rent);
        })
    })
    console.log(rentData);

    $.getJSON(libraryUrl, function(data, status){
        $.each(data, function(i, library){
            libraryData.push(library);
        })
    })
    console.log(libraryData);

    $.getJSON(housingUrl, function(data, status){
        $.each(data, function(i, housing){
            housingData.push(housing);
        })
    })

    console.log(housingData);
    $.getJSON(museumUrl, function(data, status){
        $.each(data, function(i, museum){
            museumData.push(museum);
        })
    })
    console.log(museumData);
})

function load(){
    for (var i=0;i<rentData.length;i++){
        var location = new google.maps.LatLng(rentData[i].latitude_internal, rentData[i].longitude_internal);
        var marker = new google.maps.Marker({position: location, map:map, icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'});
    }
}

$(document).ready(function(){
    $("#setup").on("click",load);
})