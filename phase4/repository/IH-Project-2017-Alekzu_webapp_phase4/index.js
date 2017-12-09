
/*(function () {
    document.getElementById("btn").addEventListener("click", function () {
        alert("Hi! :)");
    });
})();*/
var map;
var marker;
var nyschool = {lat: 40.7291, lng: -73.9965};


      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: nyschool,
          zoom: 14
        });
        
        marker = new google.maps.Marker({
            position: nyschool,
            title: "NYU",
            animation: google.maps.Animation.DROP,
            icon: {path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            color: 'red'},
            map: map
        });
      }
      
    