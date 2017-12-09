(function initMap() {
        var uluru = {lat:40.729100 , lng:-73.996500};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
        
        var myLatLng = {lat:40.729995 , lng:-73.995996};
       var marker1 = new google.maps.Marker({
       position: myLatLng,
       map: map,
       title: 'Apartment 1: Cost: $2,650 /mo'
  });
  
   var myLatLng2 = {lat:40.729591 , lng:-73.998576};
       var marker2 = new google.maps.Marker({
       position: myLatLng2,
       map: map,
       title: 'Apartment 2: Cost: $2,725 /mo'
  });
      
        
}
)();