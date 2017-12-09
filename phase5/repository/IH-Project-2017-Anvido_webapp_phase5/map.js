//googleMap
var mapNYU
var directionA, directionB, service,
    addressNYU = "NYU Stern School of Busines"
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

  //add directions
  directionA = new google.maps.DirectionsService
  directionB = new google.maps.DirectionsRenderer

  directionB.setMap(mapNYU)

  //Initializate service of distance matrix
  service = new google.maps.DistanceMatrixService
}

//add marker mapNYU
function addMarker(latLong, image){
  return new google.maps.Marker({
    position: latLong,
    icon : image
  })
}

// Get New York City Museums, art Galleries from data.gov
var images = {
      "museums" : "https://i.imgur.com/41P8YlN.png",
      "galleries" : "https://i.imgur.com/XMOAf8y.png",
      "fireDpmt" : "https://i.imgur.com/Oo8IFP8.png",
      "housing" : "https://imgur.com/1YjvJO8.png",
      "vaccination" : "https://imgur.com/oBv8Xqk.png",
      "fuel" : "https://imgur.com/rEmpxMb.png",
      "atm" : "https://imgur.com/ymYAlop.png"
    },
    markers = {
      "museums" : [],
      "galleries" : [],
      "fireDpmt" : [],
      "housing": [],
      "vaccination" : [],
      "fuel" : [],
      "atm" : []
    },
    urls = {
      "museums" : "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD",
      "galleries" : "https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD",
      "fireDpmt" : "https://data.ny.gov/api/views/qfsu-zcpv/rows.json?accessType=DOWNLOAD",
      "housing" : "https://data.cityofnewyork.us/resource/ffxx-dfvk.json",
      "vaccination" : "https://data.cityofnewyork.us/resource/inaf-e6a5.json",
      "fuel" : "https://data.ny.gov/resource/223s-7yza.json",
      "atm" : "https://data.ny.gov/resource/7998-yipb.json"

    }
var point, infoData
// Get Museums, Art Galleries and FireDepartments
function getDataFromDataset(urlDataSet){
  var data = $.get( urls[urlDataSet], function(){
  	// console.log(urls[urlDataSet])
  })
  	.done(function(){
      if (urlDataSet == "vaccination" || urlDataSet == "fuel" || urlDataSet == "atm")
        data = data.responseJSON
      else
        data = data.responseJSON.data
      for (var place in data) {
        switch(urlDataSet) {
          case "museums":
            point = data[place][8]
            point = point.substring(point.indexOf("(") + 1,point.indexOf(")")).split(" ")
            //add Info Museums
            infoData= '<p><i class="material-icons">account_balance</i>Name: '
            + data[place][9] + '</p><p><i class="material-icons">phone</i>Phone: '
            + data[place][10] + '</p><p><i class="material-icons">insert_drive_file</i>Web page: '
            + data[place][11] + '</p><p><i class="material-icons">location_on</i>Address: '
            + data[place][12] + '</p>'
            break;
          case "galleries":
            point = data[place][9]
            point = point.substring(point.indexOf("(") + 1,point.indexOf(")")).split(" ")
            //add Info art galleries
            infoData= '<p><i class="material-icons">brush</i>Name: '
            + data[place][8] + '</p><p><i class="material-icons">phone</i>Phone: '
            + data[place][10] + '</p><p><i class="material-icons">insert_drive_file</i>Web page: '
            + data[place][11] + '</p><p><i class="material-icons">location_on</i>Address: '
            + data[place][12] + '</p>'
            break;
          case "fireDpmt":
            point = [data[place][18],data[place][17]]
            //add Info fire departments
            infoData= '<p><i class="material-icons">directions_bus</i>Name: '
            + data[place][8] + '</p><p><i class="material-icons">phone</i>Phone: '
            + data[place][16] + '</p><p><i class="material-icons">location_on</i>Address: '
            + data[place][10] + '</p>'
            break;
          case "vaccination":
            point = [data[place].location.coordinates[0], data[place].location.coordinates[1]]
            //add Info Museums
            infoData= '<p><i class="material-icons">info</i>Service type: '
            + data[place].service_type + '</p><p><i class="material-icons">phone</i>Phone: '
            + data[place].phone + '</p><p><i class="material-icons">location_on</i>Address: '
            + data[place].address + '</p>'
          break;
          case "fuel":
            point = [data[place].location.coordinates[0], data[place].location.coordinates[1]]
            //add Info Museums
            infoData= '<p><i class="material-icons">local_gas_station</i>Station name: '
            + data[place].station_name + '</p><p><i class="material-icons">info</i>Fuel type: '
            + data[place].fuel_type_code +'</p><p><i class="material-icons">phone</i>Phone: '
            + data[place].station_phone + '</p><p><i class="material-icons">location_on</i>Address: '
            + data[place].street_address + '</p>'
          break;
          case "atm":
            if (!(data[place].location_1 === undefined)){
              point = [data[place].location_1.coordinates[0], data[place].location_1.coordinates[1]]
              //add Info Museums
              infoData= '<p><i class="material-icons">local_atm</i>Institution: '
              + data[place].name_of_institution + '</p><p><i class="material-icons">location_on</i>Address: '
              + data[place].street_address + '</p>'
              // console.log(data[place].location_1);
            }else{
              infoData = undefined
            }
          break;
        }

        latLong = {
          lat: parseFloat(point[1]),
          lng: parseFloat(point[0])
        }
        // Control fire deparment data navbar-dropdown
        if (!(isNaN(point[0]) || isNaN(point[1])) && !(infoData === undefined)){
          markers[urlDataSet].push(addMarker(latLong, images[urlDataSet]))
          addInfo(markers[urlDataSet][markers[urlDataSet].length - 1], urlDataSet, infoData)
          // console.log(infoData);
        }
      }

  	})
  	.fail(function(error){
  		console.error(error)
  	})
}
//Add InfoWindow
function addInfo(marker, dataset, st){
  //Add infoWindow of marker house
  var infowindow = new google.maps.InfoWindow({
    content: st
  })

  marker.addListener('click', function() {
    infowindow.open(mapNYU, marker);
  })

  switch (dataset) {
    case "houses":
      $("#cHouses").append('<a href="#!" class="collection-item">'+ st +'</a>')
    break;
    case "museums":
      $("#cMuseums").append('<a href="#!" class="collection-item">'+ st +'</a>')
    break
    case "galleries":
      $("#cGalleries").append('<a href="#!" class="collection-item">'+ st +'</a>')
    break
    case "fireDpmt":
      $("#cFireDpmt").append('<a href="#!" class="collection-item">'+ st +'</a>')
    break
    case "vaccination":
      $("#cVaccination").append('<a href="#!" class="collection-item">'+ st +'</a>')
    break
    case "fuel":
      $("#cFuel").append('<a href="#!" class="collection-item">'+ st +'</a>')
    break
    case "atm":
      $("#cATM").append('<a href="#!" class="collection-item">'+ st +'</a>')
    break
    default:
  }


}


//Add more info for house
var distance, duration, infoMarker
function moreHInfo(marker, address, info){
  //get distance to NYU
  service.getDistanceMatrix({
    origins: [address],
    destinations: [addressNYU],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.METRIC
  }, function(response, status){
    if (status != 'OK'){
      // console.log(status)
    }else{
      distance = response.rows[0].elements[0].distance.text
      duration = response.rows[0].elements[0].duration.text
      infoMarker = '<p><i class="material-icons">location_on</i>Address: '
      + address + '</p> ' + info +'<p><i class="material-icons">show_chart</i>distance: '
      + distance + '</p><p><i class="material-icons">directions_car</i>duration: '
      + duration + '</p>'
      //Add infoWindow, synchronized data
      addInfo(marker, "houses", infoMarker)
    }
  })

  //Add suggested route
  marker.addListener('click', function(){
    directionA.route({
      origin: address,
      destination: addressNYU,
      travelMode: 'DRIVING',
    }, function(response, status) {
      if (status === 'OK') {
        // console.log(status);
        directionB.setDirections(response)
      } else {
        // console.log(status)
      }
    })
  })
}

//Get housing dataSet
var addressA, addressB, addressC, addressD

function geoLocation(address, info){
  var geocoder = new google.maps.Geocoder(), marker
  geocoder.geocode({'address' : address}, function(results, status){
    if (status == 'OK'){
      markers["housing"].push(addMarker(results[0].geometry.location, images["housing"]))
      marker = markers["housing"][markers["housing"].length - 1]
      moreHInfo(marker, address, info)
      // console.log(markers["housing"].length)
    }else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
      setTimeout(function() {geoLocation(address, info)}, 250)
    }else{
      // console.log(status)
    }
  })
}

function getHousingData(){
  var data = $.get( urls["housing"], function(){
  	 // console.log(urls["housing"])
  })
  	.done(function(){
      data = data.responseJSON
      // console.log(data);
      for (var place in data) {
        if(data[place]["borough"] == "MANHATTAN"){

          addressA = data[place]["location_street_a"] + ", New York"
          addressB = data[place]["location_street_b"] + ", New York"
          addressC = data[place]["location_street_c"] + ", New York"
          addressD = data[place]["location_street_d"] + ", New York"

          var info = '<p><i class="material-icons">attach_money</i>Average rent: '+
          data[place]["avg_monthly_gross_rent"]
          +'</p>'
          geoLocation(addressA, info)
          geoLocation(addressB, info)
          geoLocation(addressC, info)
          geoLocation(addressD, info)
        }

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
  getHousingData()
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

function showHouses(){
  if($('#houses').is(':checked')){
    markers["housing"].forEach(function(marker){
      marker.setMap(mapNYU)
    })
  }else{
    markers["housing"].forEach(function(marker){
      marker.setMap(null)
    })
  }
}

function showVaccination(){
  if($('#vaccination').is(':checked')){
    markers["vaccination"].forEach(function(marker){
      marker.setMap(mapNYU)
    })
  }else{
    markers["vaccination"].forEach(function(marker){
      marker.setMap(null)
    })
  }
}

function showFuel(){
  if($('#fuel').is(':checked')){
    markers["fuel"].forEach(function(marker){
      marker.setMap(mapNYU)
    })
  }else{
    markers["fuel"].forEach(function(marker){
      marker.setMap(null)
    })
  }
}

function showATM(){
  if($('#atm').is(':checked')){
    markers["atm"].forEach(function(marker){
      marker.setMap(mapNYU)
    })
  }else{
    markers["atm"].forEach(function(marker){
      marker.setMap(null)
    })
  }
}

$(document).ready(function(){
  $(".button-collapse").sideNav()
  $('.collapsible').collapsible()
  getData()
  $("#museums").on('click', showMuseums)
  $("#galleries").on('click', showGalleries)
  $("#fireDpmt").on('click', showFireDpmt)
  $("#houses").on('click', showHouses)
  $("#vaccination").on('click', showVaccination)
  $("#fuel").on('click', showFuel)
  $("#atm").on('click', showATM)
})
