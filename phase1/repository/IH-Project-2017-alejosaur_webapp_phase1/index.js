const DATASET = " https://data.ny.gov/api/views/ndex-ad5r/rows.json?accessType=DOWNLOAD"


/*Google Maps js */
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7291, lng: -73.9965},
        zoom: 13
    });
}

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});