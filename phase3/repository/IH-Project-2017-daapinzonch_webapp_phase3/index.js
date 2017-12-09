var map;
var temp;
var rentData = [];

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

$(document).ready(function(){
    $("#setup").on("click",load);
})