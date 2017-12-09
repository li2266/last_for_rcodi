
console.log(Dummy)


function initMap() {
        var data_storage = [4, 5]
        var options = {zoom: 14, center: {lat: 40.7291, lng: -73.9965}};
        var main = new google.maps.Map(document.getElementById('map'), options);
        var marker = new google.maps.Marker({position: {lat: 40.7291, lng: -73.9965}, map: main});
        d3.json(Housing_By_Building_url, function(MyArray){
            for (i = 0; i < MyArray.length; i++) {
                for (i = 0; i<results.length(); i++ ) {
                var lat_long = {lat: results[i], lng: results[i]};
        }}
});
        
        window.eqfeed_callback = function (results) {
            console.log("Is it calling to me")
        
        }
}

/*Test data*/
var Data_Storage = [1, 2, 3, 4];
    
function placeMarkers(DataSet) {
    dataSet.Foreach(function (value){
        var marker_two = new google.maps.Marker({});
    });
}

