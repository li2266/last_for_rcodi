  var map;
  function onGoogleMapResponse(){
  	map = new google.maps.Map(document.getElementById('mapDiv'), {
  		center: {lat: 40.729131, lng: -73.9965},
  		zoom: 17
  		
  	});
  }

var address = [];
  var poss;


var info;
function getAddress(){
var url = 'https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD';
$.getJSON(url, function(data){
  var array = data.data;
    for (var i = 0; i<data.data.length; i++) {
      dir ='';
      if(array[i][13]!='----'){

         dir=dir+array[i][13];

         var arr = array[i][14].split(" ");
         for (var j = 0; j<arr.length; j++) {
          dir=dir+'+'+arr[j];
       }
         poss = new google.maps.LatLng(array[i][23], array[i][24]);
  var marker = new google.maps.Marker({
    position: poss,
    map:map, 
    title: array[i][9],
    name: array[i][13] + " " + array[i][14],
 });
  address[i]=dir;
info = new google.maps.InfoWindow({
    content: ''
  });
  google.maps.event.addListener(marker, 'click', function(){ 
   index=this.id; info.setContent('<h3 style="color: orange;">Name: '+this.title+'</h3><p> <b> Address: </b>' + this.name);
   info.open(map, this);
});
      
   }
}
});
   
}

$(document).ready(function(){
  $("#boton").on("click", getAddress)
});


  //FUNCIONA!!!!!!
  /*
  //sample site that returns xml
  //site = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz18w8ei5rci3_75222&address=114-W-27th-St-APT-4S&citystatezip=New+York%2C+NY';
  var add = '358 41 STREET';
  site = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz18w8ei5rci3_75222&address='+add+'&citystatezip=New+York%2C+NY';




  var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + site + '"') + '&format=xml&callback=?';

  // Request that YSQL string, and run a callback function.
   //Pass a defined function to prevent cache-busting.
  $.getJSON(yql, function(data){
      
       var text,parser, xmlDoc,holi;
          text =data.results[0];
          parser = new DOMParser();
          xmlDoc = parser.parseFromString(text,"text/xml");
         holi = xmlDoc.getElementsByTagName("address")[0].childNodes[0].nodeValue;
          console.log(holi);
          



  });
  */
