/**
Author: Priyank Jain

**/


var elevator;
var map;
var washedData = [];


String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


function initMap() {
   
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7291, lng: -73.9965},
        zoom: 6
    });


    var infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
    
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.ny.gov/api/views/qfsu-zcpv/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);

            for (var i = 0; i<44; i++) {
                var dataLine = [];
                //latitude - 0
                dataLine.push(json.data[i][17]);
                //longitude - 1
                dataLine.push(json.data[i][18]);

                washedData.push(dataLine);
            };

            var numberOfMarkets = washedData.length;
            var markers = [];

            google.maps.event.addListener(map, 'idle', function() {

            elevator = new google.maps.ElevationService();
            $.each(markers, function(key, value)
            {
                value.setMap(null);
            });

            var boundBox = map.getBounds();
            var southWest = boundBox.getSouthWest();
            var northEast = boundBox.getNorthEast();
            var lngSpan = northEast.lng() - southWest.lng();
            var latSpan = northEast.lat() - southWest.lat();

            var locations = [];
            for (var j = 0; j < numberOfMarkets; j++)
            {
                var location = new google.maps.LatLng(
                        southWest.lat() + latSpan * Math.random(),
                        southWest.lng() + lngSpan * Math.random()
                        );
                locations.push(location);
            }

            var positionalRequest = {
                'locations': locations
            };

            elevator.getElevationForLocations(positionalRequest, function(results, status)
            {
                if (status === google.maps.ElevationStatus.OK)
                {
                    //if the infowindow is open
                    var prev_infowindow =false;

                    $.each(results, function(key, value) {

                        //alert(key);
                        markers[key] = new google.maps.Marker({
                            position: {lat: Number(washedData[key][0]), lng: Number(washedData[key][1])},
                            map: map,
                            //icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + key.toString()).slice(-2) + '.png'
                        });
                        google.maps.event.addListener(markers[key], 'click', function() {
                            //if another window is open, close it
                            if( prev_infowindow ) {
                                prev_infowindow.close();
                            }
                            infowindow.setContent(washedData[key][2]);
                            infowindow.open(map, markers[key]);
                        });
                        
                    });
                }
            });
        
        });

        }
    };

}

