function initMap() {
        var options = {zoom: 14, center: {lat: 40.7291, lng: -73.9965}};
        var main = new google.maps.Map(document.getElementById('map'), options);
        var marker = new google.maps.Marker({position: {lat: 40.7291, lng: -73.9965}, map: main});
    }

/*Test data*/
var Data_Storage = [1, 2, 3, 4];
    
function placeMarkers(DataSet) {
    dataSet.Foreach(function (value){
        var marker_two = new google.maps.Marker({});
    });
}

