function initMap() {
        var newYork = {lat: 40.7291, lng: -73.9965};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: newYork
        });
        var marker = new google.maps.Marker({
          position: newYork,
          map: map
        });
      }
(function () {
    document.getElementById("btn").addEventListener("click", function () {
        alert("Hi! :)");
    });
})();
(function () {
    document.getElementById("btn").addEventListener("click", function () {
        alert("Hi! :)");
    });
})();