//Smooth scrolling -------------------------------------------------------------
$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href')
        ).offset().top
    },1500);
    return false;
});

//Funcion for Integrate GoogleMaps----------------------------------------------
function initMap() {
  var uluru = {lat: 40.730610, lng: -73.935242};
  //Google Maps JS
	//Set Map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: uluru
  });
  //Add Marker
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  //Resize Function
  google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  });
}