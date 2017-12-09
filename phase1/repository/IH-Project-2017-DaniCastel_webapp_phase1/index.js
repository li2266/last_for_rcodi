

      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.7291 , lng: -73.9965},
          zoom: 8
        });
      }
      
      
(function () {
    document.getElementById("btn").addEventListener("click", function () {
        alert("Hi! :)");
    });
})();