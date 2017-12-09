var map;
var marker;
var nyschool = {lat: 40.7291, lng: -73.9965};
var urlClimate = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=NORMAL_MLY&locationid=CITY:US360019&units=metric&startdate=2010-01-01&enddate=2010-12-01&datatypeid=mly-tavg-normal";

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
        //climate dataset
         $.getJSON(urlClimate, function(data, textstatus) {
          $.each(data, function(i, entry) {
              var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(entry.location_1.coordinates[0], 
                                                   entry.location_1.coordinates[1]),
                  map: map,
                  title: location.name
              });
          });
        });
      }
   