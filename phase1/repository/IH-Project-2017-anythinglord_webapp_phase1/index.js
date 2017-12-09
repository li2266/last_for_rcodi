
var map;
(function () {
    document.getElementById("btn").addEventListener("click", function () {
        alert("Hi! :)");
    });
})();

function onGoogleMapResponse(){
    
    var ubication = {lat: 40.7291, lng: -73.9965};
    map = new google.maps.Map(document.getElementById('googleMapContainer'),{
         //Jason Object
         Zoom : 16,
         center : ubication
    });
    var marker = new google.maps.Marker({
      position: ubication,
      map: map
    });
    
    /*var country = "United States";
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': country},function(results,status){
        if(status == google.maps.GeocoderStatus.OK){
          map.setCenter(results[0].geometry.location);
        };
    });*/
}