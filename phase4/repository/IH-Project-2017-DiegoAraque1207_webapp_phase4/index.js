  var map;
  function onGoogleMapResponse(){
  	map = new google.maps.Map(document.getElementById('mapDiv'), {
  		center: {lat: 40.729131, lng: -73.9965},
  		zoom: 17
  		
  	});
  }


var direcciones = [];
var dataLine;

  

function getDataFromURL( url ){
  var data = $.getJSON(url, function(data){

  })
    .done(function(){
      var xt =data.responseJSON.results["0"];
      var type = typeof(xt);
      var help =xt.search("<code>");
      var t ="<code>".length;
      var cont = help+t;
      var code = xt[cont];
      if (code == "0") {

      help =xt.search("<latitude>");
      t ="<latitude>".length;
      cont = help+t;
      var lat="";
      while (xt[cont]!="<"){
        lat=lat+xt[cont];
        cont++;
      }
      

      help =xt.search("<longitude>");
      t ="<longitude>".length;
      cont = help+t;
      var long="";
      while (xt[cont]!="<"){
        long=long+xt[cont];
        cont++;
      }
      help =xt.search('<amount currency="USD">');
      t ='<amount currency="USD">'.length;
      cont = help+t;
      var price="";
      while (xt[cont]!="<"){
        price=price+xt[cont];
        cont++;
      }

      dataLine = new google.maps.LatLng(lat, long);
       var marker = new google.maps.Marker({
                    position: dataLine,
                    map:map, 
                    title: "house"
                });    
      //console.log("latitud  "+lat);  
      //console.log("longitud  "+long);
      //console.log("precio   "+price)
      
      }

      
      
    })
    .fail(function(error){
      console.error(error);
    })
}



  var url = 'https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD';
  $.getJSON(url, function(data){
    var myarr = data.data;
    

    for (var i = 0; i<data.data.length; i++) {
      dir ='';
      if(myarr[i][13]!='----'){

      dir=dir+myarr[i][13];
      
      var arr = myarr[i][14].split(" ");
      for (var j = 0; j<arr.length; j++) {
        dir=dir+'+'+arr[j];
      }
      direcciones[i]=dir;
      //console.log(dir);
      }
      }
  //leer el arreglo, las posociones de la direccion es 13 y 14, concatenar y buscar en zillow
  });


function consultar (){
  for (var i = 0; i < direcciones.length; i++) {
    
    var add = direcciones[i];
    
    var pre = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz18w8ei5rci3_75222&address=';
    var pos = '&citystatezip=New+York%2C+NY';
        site = pre+add+pos;
    yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + site + '"') + '&format=xml&callback=?';
    
    getDataFromURL(yql);
  }
}


$(document).ready(function(){
    $("#boton").on("click", consultar)

  });


