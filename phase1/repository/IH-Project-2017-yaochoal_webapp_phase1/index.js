
(function () {
    document.getElementById("btn").addEventListener("click", function () {
        alert("Test");
    });
}
)();
( function initMap() {
        var uluru = {lat:40.729100 , lng:-73.996500};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      })()
