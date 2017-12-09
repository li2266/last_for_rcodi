var map;

(function () {
    document.getElementById("btn").addEventListener("click", function () {
        alert("Hi! :)");
    });
})();

function onGoogleMapResponse() {
     
    map = new google.maps.Map(document.getElementById('googleMapContainer'), {
       zoom: 4
    });
    
    var country = "United States";
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address' : country } , function(results,status){
        if (status == google.maps.GeocoderStatus.OK){
            map.setCenter(results[0].geometry.location);
        };
    });
    
}