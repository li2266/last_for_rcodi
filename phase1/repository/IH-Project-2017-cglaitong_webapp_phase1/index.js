/*
(function () {
    document.getElementById("btn").addEventListener("click", function () {
        alert("Hi! :)");
    });
})();
*/


var map;


function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: new google.maps.LatLng(40.7291,-73.9965),
          mapTypeId: 'terrain'
          
        });
        var latLng = new google.maps.LatLng(40.7291,-73.9965);
        var marker = new google.maps.Marker({
	            position: latLng,
	            map: map,
	            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          });

    	}
function mostrarColgyU(){

    		  
        var script = document.createElement('script');
     
        script.src = 'cu.geojson';
        document.getElementsByTagName('head')[0].appendChild(script);
    	}

         window.eqfeed_callback = function(results) {
       		for (var i = 0; i < results.features.length; i++) {
	          var coords = results.features[i].geometry.coordinates;
	          var latLng = new google.maps.LatLng(coords[1],coords[0]);
	          var marker = new google.maps.Marker({
	            position: latLng,
	            map: map
          });
        }
      }


