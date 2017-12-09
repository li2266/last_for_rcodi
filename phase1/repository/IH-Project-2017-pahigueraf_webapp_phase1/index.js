
var map;
var marker;
var marker2 =[];
function initMap() 
  {
    var dir = {lat: 40.7291, lng: -73.9965};
      map = new google.maps.Map(document.getElementById('map'), 
      {
        zoom: 12,
        center: dir
      }
  );
    marker = new google.maps.Marker(
    {
      position: dir,
      map: map,
      icon: "university.png"
    }
  );
}
function coordinate(lat,lng)
{
  this.lat = lat;
  this.lng = lng;
}

// fire-stations
var json;
var xmlhttp = new XMLHttpRequest();
var url = "https://data.ny.gov/api/views/qfsu-zcpv/rows.json?api_key=pkjUvxlCooq7LAgoGg2AqF7vrAGQV1cWDhArP18t";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() 
{
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
  {
      var myArr = xmlhttp.responseText;
      var text = myArr;
      json = JSON.parse(text);
      createMarker2();
  }
};

function createMarker2()
{
  for (var i = 0; i < json.data.length; i++)
  {
      var c1 = new coordinate(parseFloat(json.data[i][19][1]),parseFloat(json.data[i][19][2]));
      marker2[i] = new google.maps.Marker({
        position:c1,
        map: map,
        icon: "fire.png"

      });

  }
}

//career centers
var json2;
var xmlhttp2 = new XMLHttpRequest();
var url = "https://data.ny.gov/api/views/g8h7-98zz/rows.json?api_key=pkjUvxlCooq7LAgoGg2AqF7vrAGQV1cWDhArP18t";
xmlhttp2.open("GET", url, true);
xmlhttp2.send();
xmlhttp2.onreadystatechange = function() 
{
  if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) 
  {
      var myArr = xmlhttp2.responseText;
      var text = myArr;
      json2 = JSON.parse(text);
      createMarker3();
  }
};
  
marker3 = [];

function createMarker3()
{
  for (var i = 0; i < json2.data.length; i++)
  {
      var aux = json2.data[i][23][1];
      var aux2 = json2.data[i][23][2];
      if(aux!==undefined || aux2!==undefined)
        {
          var c1 = new coordinate(parseFloat(aux),parseFloat(aux2));
          marker3[i] = new google.maps.Marker({
          position:c1,
          map: map,
          icon: "library.png"

        });

      }
  }
}

function fireStsHandler()
{
  if(toggle1.checked)
  {
    for (var i = 0; i < marker2.length; i++)
      {
        marker2[i].setMap(map);
      }
  }
  else
  {
    for (var i = 0; i < marker2.length; i++)
      {
        marker2[i].setMap(null);
      }
  }

}
function carCentersHandler()
{
  if(toggle2.checked)
  {
    for (var i = 0; i < marker3.length; i++)
      {
        marker3[i].setMap(map);
      }
  }
  else
  {
    for (var i = 0; i < marker3.length; i++)
      {
        marker3[i].setMap(null);
      }
  }

}

document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#toggle1').addEventListener('change', fireStsHandler);
      document.querySelector('#toggle2').addEventListener('change', carCentersHandler);
      
});

$("#labelBtn1").tooltip();
$("#labelBtn2").tooltip();
$("#labelBtn3").tooltip();