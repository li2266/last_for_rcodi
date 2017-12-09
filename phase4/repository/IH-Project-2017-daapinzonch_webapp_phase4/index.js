var map;
var temp;
var rentData = [];
var libraryData = [];
var housingData = [];
var museumData = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16
    });

    var city = "NYU Stern School of Business";
    var geo = new google.maps.Geocoder();
    geo.geocode({'address' : city}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
        }
    });
}

function load(){
    url = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";
    temp = $.get(url, function(){
        //console.log(url);
    })
    .done(function(){
        console.log(temp);
        var i=0;
        while(rentData.length<2610){
            var rent = [];
            //rent.push(temp.responseJSON.data[i]);
            rentData.push(rent);
            i+=1;
        }
    })
    .fail(function(error){
        console.error(error);
    })
}

function libraryLoad(){
    url = "https://data.cityofnewyork.us/api/views/gysc-yn4h/rows.json?accessType=DOWNLOAD";
    templib = $.get(url, function(){
        //console.log(url);
    })
    .done(function(){
        console.log(templib);
        var i=0;
        while(libraryData.length<30509){
            var lib = [];
            //rent.push(temp.responseJSON.data[i]);
            libraryData.push(lib);
            i+=1;
        }
    })
    .fail(function(error){
        console.error(error);
    })
}


function housingLoad(){
    url = "https://data.cityofnewyork.us/resource/ffxx-dfvk.json";
    temphou = $.get(url, function(){
        //console.log(url);
    })
    .done(function(){
        console.log(temphou);
        var i=0;
        while(housingData.length<345){
            var hou = [];
            //rent.push(temp.responseJSON.data[i]);
            housingData.push(hou);
            i+=1;
        }
    })
    .fail(function(error){
        console.error(error);
    })
}


function museumLoad(){
    url = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD";
    tempmus = $.get(url, function(){
        //console.log(url);
    })
    .done(function(){
        console.log(tempmus);
        var i=0;
        while(museumData.length<130){
            var hou = [];
            //rent.push(temp.responseJSON.data[i]);
            museumData.push(mus);
            i+=1;
        }
    })
    .fail(function(error){
        console.error(error);
    })
}

$(document).ready(function(){
    $("#setup").on("click",load);
    $("#lib").on("click",libraryLoad);
    $("#hou").on("click",housingLoad);
    $("#mus").on("click",museumLoad);
})