function InitMap() {
    var main = new google.maps.Map(document.getElementbyID('map'), {
        zoom: 4, center: {lat: 40.7291, lng: -73.9965}});
    return main;
    }


(function () {
    document.getElementById("btn").addEventListener("click", function () {
        alert("Hi! :)");
    });
})();

