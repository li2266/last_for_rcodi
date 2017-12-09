//googleMap
var mapNYU
// initMap
function initMap(){
  // Lat Long of NYUStern School of Business
  var latLong = {lat: 40.7291, lng: -73.9965}
  // Create a new map
  mapNYU =  new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 14,
    center: latLong
  })
  // Add a mark to the map
  var markerNYU = new google.maps.Marker({
    position: latLong,
    map: mapNYU,
    icon: "https://i.imgur.com/ZMZEu0L.png"
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
//add marker mapNYU
function addMarker(latLong, image){
  return new google.maps.Marker({
    position: latLong,
    icon : image
  })
}
// Get temparature data of New York state from ncdc cdo
function getData(){
  console.log("holi");
  var data = $.ajax({
  //  url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/locations/FIPS:36?locationcategoryid=CNTY",
    url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=FIPS:36&startdate=2017-11-01&enddate=2017-11-06&stationid=GHCND:USR0000NSAR",
   headers:{ token: "yEevoStXYWoCHEjYMjUSRUXkKOSNndkU" },
   success: function(){
     console.log(data);
   }
  })
}
// Get New York City Museums, art Galleries from data.gov
var images = {
      "museums" : "https://i.imgur.com/41P8YlN.png",
      "galleries" : "https://i.imgur.com/XMOAf8y.png",
      "fireDpmt" : "https://i.imgur.com/Oo8IFP8.png"
    },
    markers = {
      "museums" : [],
      "galleries" : [],
      "fireDpmt" : []
    },
    urls = {
      "museums" : "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD",
      "galleries" : "https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD",
      "fireDpmt" : "https://data.ny.gov/api/views/qfsu-zcpv/rows.json?accessType=DOWNLOAD"
    }
var point

function getDataFromDataset(urlDataSet){
  var data = $.get( urls[urlDataSet], function(){
  	// console.log(urls[urlDataSet])
  })
  	.done(function(){
      data = data.responseJSON.data
      for (var place in data) {
        switch(urlDataSet) {
          case "museums":
            point = data[place][8]
            point = point.substring(point.indexOf("(") + 1,point.indexOf(")")).split(" ")
            break;
          case "galleries":
            point = data[place][9]
            point = point.substring(point.indexOf("(") + 1,point.indexOf(")")).split(" ")
            break;
          case "fireDpmt":
            point = [data[place][18],data[place][17]]
            break;
        }

        latLong = {
          lat: parseFloat(point[1]),
          lng: parseFloat(point[0])
        }
        // Control fire deparment data navbar-dropdown
        if (!(isNaN(point[0]) || isNaN(point[1])))
          markers[urlDataSet].push(addMarker(latLong, images[urlDataSet]))
      }

  	})
  	.fail(function(error){
  		console.error(error)
  	})
}

function getData(){
  for (var dataSet in urls) {
    getDataFromDataset(dataSet)
  }
}

function showMuseums(){
  if($('#museums').is(':checked')){
    markers["museums"].forEach(function(marker){
      marker.setMap(mapNYU)
    })
  }else{
    markers["museums"].forEach(function(marker){
      marker.setMap(null)
    })
  }
}

function showGalleries(){
  if($('#galleries').is(':checked')){
    markers["galleries"].forEach(function(marker){
      marker.setMap(mapNYU)
    })
  }else{
    markers["galleries"].forEach(function(marker){
      marker.setMap(null)
    })
  }
}

function showFireDpmt(){
  if($('#fireDpmt').is(':checked')){
    markers["fireDpmt"].forEach(function(marker){
      marker.setMap(mapNYU)
    })
  }else{
    markers["fireDpmt"].forEach(function(marker){
      marker.setMap(null)
    })
  }
}

//Test data

// Get ew York City Art Galleries from data.gov
// url = "https://data.ny.gov/api/views/qfsu-zcpv/rows.json?accessType=DOWNLOAD"
// var datos = $.get( url, function(){
// 	console.log(url)
// })
// 	.done(function(){
//     console.log(datos);
// 	})
// 	.fail(function(error){
// 		console.error(error)
// 	})
//


$(document).ready(function(){
  $(".button-collapse").sideNav()
  getData()
  $("#museums").on('click', showMuseums)
  $("#galleries").on('click', showGalleries)
  $("#fireDpmt").on('click', showFireDpmt)
  // $("#getData").on('click', getDataFromURL(urlMuseums))
})
