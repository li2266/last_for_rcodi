var map;
var marker;
var marker2 =[];
var dir;
var xmlRequest;
function initMap() 
  {
    dir = {lat: 40.7291, lng: -73.9965};
      map = new google.maps.Map(document.getElementById('map'), 
      {
        zoom: 13,
        center: dir
      }
  );
    marker = new google.maps.Marker(
    {
      position: dir,
      map: map,
      icon: "http://drive.google.com/uc?export=view&id=0B4HRypZd-dwSUmFEOFV6aS1LeFA5WGtxSUxUdUNSNmtDN2pj"

    });
    //distance();
    
    
}

function coordinate(lat,lng)
{
  this.lat = lat;
  this.lng = lng;

}

// housesAddress
var json;
var xmlhttp = new XMLHttpRequest();
var url = "https://data.cityofnewyork.us/resource/qxp9-hd2v.json?$where=within_circle(the_geom,40.7291,-73.9965,200)";
xmlhttp.open("GET", url, true); 
xmlhttp.send();
xmlhttp.onreadystatechange = function() 
{
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
  {
      var myArr = xmlhttp.responseText;
      var text = myArr;
      json = JSON.parse(text);
      createMarkerAddress();
  }
};
marker1 = [];
addressPoints = [];
var z;
function createMarkerAddress()
{
  for (var i = 0; i < json.length; i++)
  {
      z=i;
      var c1 = new coordinate(parseFloat(json[i].the_geom.coordinates[1]),parseFloat(json[i].the_geom.coordinates[0])); 
      var c2 = json[i].h_no+"+"+json[i].st_name+"+"+json[i].post_type;
      $.ajax({
        type: 'GET',
        url:"https://cors-anywhere.herokuapp.com/"+ "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1g38cz0dtzf_a80zd&address="+c2+"&citystatezip=New+York%2C+NY&rentzestimate=true",
        dataType: 'xml',
        Origin: "http://localhost" ,
        success: function (xml){
          xmlRequest = xml;
          if(parseInt(xmlRequest.childNodes[0].childNodes[1].childNodes[1].innerHTML) == 0)
          {
            var aux3 = xmlRequest.childNodes[0].childNodes[2].childNodes[0].lastChild.childNodes[4];
            if(parseInt(aux3.childNodes[3].innerHTML)>0)
            {
              marker1.push(new google.maps.Marker({
                position:c1,
                map: map, 
                icon :"http://drive.google.com/uc?export=view&id=0B4HRypZd-dwSLUJmWUM1QW1qNUFsQzlJNnROZzF1ckFZb1U4"
              }));
              addressPoints.push(c2);
            }
            
          }
          
          
        },
        error: function(){
          console.log('error');
        }
      });

      

  }
}


// fire-stations
var json2;
var xmlhttp2 = new XMLHttpRequest();
var url = "https://data.ny.gov/api/views/qfsu-zcpv/rows.json?api_key=pkjUvxlCooq7LAgoGg2AqF7vrAGQV1cWDhArP18t";
xmlhttp2.open("GET", url, true);
xmlhttp2.send();
xmlhttp2.onreadystatechange = function() 
{
  if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) 
  {
      var myArr = xmlhttp2.responseText;
      var text = myArr;
      json2 = JSON.parse(text);
      createMarker2();
  }
};

function createMarker2()
{
  for (var i = 0; i < json2.data.length; i++)
  {
      var c1 = new coordinate(parseFloat(json2.data[i][19][1]),parseFloat(json2.data[i][19][2]));
      if((Math.pow(c1.lat-dir.lat,2) + Math.pow(c1.lng-dir.lng,2))<=0.025){  
        marker2.push(new google.maps.Marker({
          position:c1,
          map: map,
          icon: "http://drive.google.com/uc?export=view&id=0B4HRypZd-dwScG1SbHFuZ1pSWHA0eEM5WTltSy1tX3VoaUQ4"
        })
        );
      }
  }
}

//career centers
var json3;
var xmlhttp3 = new XMLHttpRequest();
var url = "https://data.ny.gov/api/views/g8h7-98zz/rows.json?api_key=pkjUvxlCooq7LAgoGg2AqF7vrAGQV1cWDhArP18t";
xmlhttp3.open("GET", url, true);
xmlhttp3.send();
xmlhttp3.onreadystatechange = function() 
{
  if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) 
  {
      var myArr = xmlhttp3.responseText;
      var text = myArr;
      json3 = JSON.parse(text);
      createMarker3();
  }
};
  
marker3 = [];

function createMarker3()
{
  for (var i = 0; i < json3.data.length; i++)
  {
      var aux = json3.data[i][23][1];
      var aux2 = json3.data[i][23][2];
      if(aux!==undefined || aux2!==undefined)
      {
        var c1 = new coordinate(parseFloat(aux),parseFloat(aux2));
        if((Math.pow(c1.lat-dir.lat,2) + Math.pow(c1.lng-dir.lng,2))<=0.025)
        {
          marker3.push( new google.maps.Marker({
          position:c1,
          map: map,
          icon: "http://drive.google.com/uc?export=view&id=0B4HRypZd-dwSQmp4UXVWR3V0RDZpdWxPaTBsX0FzejNtSEFJ"

          })
          );
        }  
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
function housesHandler()
{
  if(toggle3.checked)
  {
    for (var i = 0; i < marker1.length; i++)
      {
        marker1[i].setMap(map);
      }
  }
  else
  {
    for (var i = 0; i < marker1.length; i++)
      {
        marker1[i].setMap(null);
      }
  }

}
var distances = [];
var houses = [];
function distance(){
  var service = new google.maps.DistanceMatrixService();

  service.getDistanceMatrix(
    {
      origins: [dir],
      destinations: [{lat: 40.7791,lng:-73.9965}],
      travelMode: 'DRIVING'
    }, callback);

 
  function callback(response, status) {
    if (status == 'OK') {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;

      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          var distance = element.distance.text;
          distances.push(distance);
          var from = origins[i];
          var to = destinations[j];
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#toggle1').addEventListener('change', fireStsHandler);
      document.querySelector('#toggle2').addEventListener('change', carCentersHandler);
      document.querySelector('#toggle3').addEventListener('change', housesHandler);
      
});



$("#labelBtn1").tooltip();
$("#labelBtn2").tooltip();
$("#labelBtn3").tooltip();