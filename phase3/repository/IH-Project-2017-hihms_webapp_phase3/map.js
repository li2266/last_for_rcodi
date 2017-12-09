var map;
var plotted = false;
var marker;
var marker2;

var infowindow = new google.maps.InfoWindow();
var markers = [];
var destinations = [];

var coreMarker;

function initialize() {
    
    var styledMapType = new google.maps.StyledMapType(
        [
          {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{color: '#c9b2a6'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{color: '#dcd2be'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#ae9e90'}]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#93817c'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{color: '#a5b076'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#447530'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#f5f1e6'}]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{color: '#fdfcf8'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#f8c967'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#e9bc62'}]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{color: '#e98d58'}]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{color: '#db8555'}]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#806b63'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{color: '#8f7d77'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#ebe3cd'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{color: '#b9d3c2'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#92998d'}]
          }
        ],
    {name: 'Styled Map'});

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7291, lng: -73.9965},
      zoom: 11,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map']
      }
    });
    

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    
    //TestMarker();
    
    var layer = new google.maps.FusionTablesLayer({
        query: {
          select: 'geometry',
          from: 'ChIJwZVT9ZpZwokRBfO1cTF0MNo'
        },
        styles: [{
          polygonOptions: {
            fillColor: '#ffff33',
            fillOpacity: 0.1
          }
        }, {
            // Howo to find a geoID??
          where: 'GEOID >= 1812870',
          polygonOptions: {
            fillColor: '#aaff00'
          }
        }, {
          where: 'GEOID <= 1805400',
          polygonOptions: {
            fillColor: '#ff8c1a'
          }
        }]
    });
    layer.setMap(map);
    
    coreMarker = new google.maps.Marker({
        map: map,
        //an picture marker?
    });
    coreMarker.name = 'NYU Stern Business School!';
    google.maps.event.addListener(coreMarker, 'mouseover', function() {
        infowindow.setContent(this.name);
        infowindow.open(map, this);
    });
    
    
    $.getJSON("processed.json", function(data){
        viewData(data.results);
        
        $.each(data.destination, function(index, item) {
            destinations.push(new google.maps.LatLng(item.lat,item.lng));
        });
        coreMarker.setPosition(destinations[0]);
        setPlotWidth();
        initDraw('chartForCrimeRate','crimeRate','','.2f','.3f');
        initDraw('chartForDistance','distance','mi','.0f','.1f');
        
        
    });


    $("#climate-div").on('show.bs.collapse', function(){
        if (!plotted) {
            $.getJSON("weatherMMXT.json", function(data1){
               $.getJSON("weatherMMNT.json", function(data2){
                   plotTemperature(data1.results, data2.results);
                });
            });
            plotted = true;
        }
    });
    /*
    marker = new google.maps.Marker({
    map: map,
    draggable: true,
    title: "dragging the mark!",
    animation: google.maps.Animation.DROP,
    position: {lat: 40.7291, lng: -73.9965}
    });
    marker.addListener('click', toggleBounce);
    */
    
    
    
    
    
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}


function viewData(data) {
    /*
    var marker = new google.maps.Marker({
            map: map,
            position: {lat: 40.7283, lng: -73.9795},
            animation: google.maps.Animation.DROP,
           
        });
    */ 
    
    
    
    $.each(data, function(index, item) {
        console.log("check if this works!");
    
        var marker = new google.maps.Marker({
            map: map,
            position: {lat: item.lat, lng: item.lng},
            animation: google.maps.Animation.DROP,
           
        });
        
        
        marker.name = '$'+ item.price + ' / ' + item.bed + 'br - ' + item.size + 'ft<sup>2</sup>';
        marker.price = item.price;
        marker.bed = item.bed;
        marker.size = item.size;
        marker.address = item.address;
        marker.crimeRate = item.crimeRate;
        marker.url = item.url;
        
       
        
       
        //markers.push(marker);
        
        google.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.setContent(this.name);
            infowindow.open(map, this);
        });
        
        google.maps.event.addListener(marker, 'click', function() {
            
            if ($("#detail").is(":hidden")) {
                
                $('#result-link').click();
            }
        
        
            document.getElementById("property-price").innerHTML = '$' + this.price;
            document.getElementById("property-bedroom").innerHTML = this.bed;
            document.getElementById("property-size").innerHTML = this.size + ' ft<sup>2</sup>';
            document.getElementById("property-address").innerHTML = this.address;
            document.getElementById("crime-rate").innerHTML = this.crimeRate;
            document.getElementById("website").innerHTML = '<a href=' + this.url + ' target="_blank"' + '>Rent Data</a>';
            
        
        
        });
    });
    
}


function addMarker(location) {
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

// Testing the addMarker function (San Francisco)
function TestMarker() {
       CentralPark = new google.maps.LatLng(37.7699298, -122.4469157);
       addMarker(CentralPark);
}



google.maps.event.addDomListener(window, 'load', function(){initialize();});