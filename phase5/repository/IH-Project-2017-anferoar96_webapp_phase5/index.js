//Init map
var map;
var point;
// JSON for manipulate datasets
var images = {"museums" : "https://i.imgur.com/oUNdsLq.png",};

var   markers = {"museums" : [],};
 var   urls = {"museums" : "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD",}
//Function to init map
function initMap() {
        var ubication = {lat: 40.7291 , lng: -73.9965 }; //
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: ubication
        });
        //add marker
        var markerNY = new google.maps.Marker({
          position: ubication,
          map: map,
          title: 'NSU Stern School of Business',
        });

}

function addMarker(position, image){
  return new google.maps.Marker({
    position: position,
    icon : image
  })
}

//get data from json
function getData(){
  for (var i in urls) {
    getDataFromDataset(i)
  }
}

function getDataFromDataset(urlDataSet){
  var data = $.get( urls[urlDataSet], function(){
    
  })

.done(function(){
      data = data.responseJSON.data

      for (var place in data) {
        switch(urlDataSet) {
          case "museums":
            point = data[place][8]
            point = point.substring(point.indexOf("(") + 1,point.indexOf(")")).split(" ")
            
            break;
        }

        position = {
          lat: parseFloat(point[1]),
          lng: parseFloat(point[0])
        }
        if (!(isNaN(point[0]) || isNaN(point[1]))){
          markers[urlDataSet].push(addMarker(position, images[urlDataSet]))
        }
      }

    })
    .fail(function(error){
      console.error(error)
    })
}

function showMuseums(){

  if($('#museum').is(':checked')){

    markers["museums"].forEach(function(marker){
      marker.setMap(map)
    })
  }else{
    markers["museums"].forEach(function(marker){
      marker.setMap(null)
    })
  }
}


$(document).ready(function(){
  getData()
  $("#museum").on('click', showMuseums)
  
})


function boton(){
    alert("The function is not  available");

}