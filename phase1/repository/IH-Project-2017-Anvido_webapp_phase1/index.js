function initMap(){
  // Lat Long of NYUStern School of Business
  var latLong = {lat: 40.7291, lng: -73.9965}
  // Create a new map
  var mapNYU =  new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 16,
    center: latLong
  })
  // Add a mark to the map
  var markerNYU = new google.maps.Marker({
    position: latLong,
    map: mapNYU
  })
  // add InfoWindow
  var infoNYU = "NYU Stern School of Business"

  var infoWNYU= new google.maps.InfoWindow({
    content: infoNYU
  })
  //Add event-listeners
  //markerNYU event to zoom the map
  markerNYU.addListener('click', function(){
    mapNYU.setZoom(mapNYU.getZoom() + 1)
    mapNYU.setCenter(markerNYU.getPosition())
  })

  markerNYU.addListener('mouseover', function(){
    infoWNYU.open(mapNYU, markerNYU)
  })

  markerNYU.addListener('mouseout', function(){
    infoWNYU.close()
  })
}

// $(document).ready(function(){
//
// })
