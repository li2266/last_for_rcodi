
/*(function () {
    document.getElementById("btn").addEventListener("click", function () {
        alert("Hi! :)");
    });
})();*/

function onGoogleMapResponse(){
    var country = {lat: 40.729513, lng: -73.996461};
	var map = new google.maps.Map(document.getElementById('googleMapContainer'), {
	zoom: 16,
        center: country,
	});
	var marker = new google.maps.Marker({
          position: country,
          map: map
        });
}