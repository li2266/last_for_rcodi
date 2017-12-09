    var map;

    function myMap() {
    var mapProp= {
      center:new google.maps.LatLng(40.729131,-73.995946),
      zoom:18,
    };
    map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }


    var direcciones = [];
    var dataLine;


    var url = 'https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD';
    $.getJSON(url, function(data){
    var myarr = data.data;

    //_-----------------------------------------
      for (var i = 0; i<data.data.length; i++) {
       
        dir ='';
        if(myarr[i][13]!='----'){

           dir=dir+myarr[i][13];

           var arr = myarr[i][14].split(" ");
           for (var j = 0; j<arr.length; j++) {
            dir=dir+'+'+arr[j];
         }
        
         direcciones[i]=dir;
     }
    }
    });

    var strin = 'hola';



    function data(urlP){

    var proxy = 'https://cors-anywhere.herokuapp.com/';
    //_-----------------------------------------
    //for (var i = 0; i < direcciones.length; i++) {
       //this is for the maximun of request per day of Zillow api
    for (var i = 0; i < 200; i++) {
      
      var direcc = '';
      var add = direcciones[i];
      

       var pre = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1g4khc5a0az_4ixyf&address=';
       var pos = '&citystatezip=New+York%2C+NY';
       site = pre+add+pos;
       
       /*
       var addr = add.split('+');
       direcc = addr[0];

       for (var k = 1; k < addr.length; k++) {
        direcc += ' ' + addr[k];
       }*/

       var finalURL = proxy + site;


    var infoWindow;

    $.get(finalURL, function( dato ) {
    var texto="";
    var counter = 0;
    var text="";
    
    texto = dato.getElementsByTagName("code")[counter].childNodes[0].nodeValue;

    if (texto=="0"){

      while(counter<dato.getElementsByTagName("latitude").length){
       text += " " + dato.getElementsByTagName("latitude")[counter].childNodes[0].nodeValue;
       counter++;
    }
    var lat = text;
    counter = 0;
    text ="";
    while(counter<dato.getElementsByTagName("longitude").length){
       text += " " + dato.getElementsByTagName("longitude")[counter].childNodes[0].nodeValue;
       counter++;
    }

    var long =text;
    dataLine = new google.maps.LatLng(lat, long);
    var marker = new google.maps.Marker({
      position: dataLine,
      map: map, 
      title: add,
      
    });    

    infoWindow = new google.maps.InfoWindow({
      content: ''
    });


                  google.maps.event.addListener(marker, 'click', function(){ 
                     index=this.id; infoWindow.setContent('<h1 style="color: orange;">Address: '+this.title);
                      infoWindow.open(map, this);
                  });

    }  
    

    });
    }

    }


    $(document).ready(function(){

    $("#botonconsulta").on("click", data)

    });




