var cadena = [];	
var arreglo = [];
var names = [];
var xy = [];
var arrayInterest = [];
var longitudFireHouses = [];
var latitudFireHouses = [];
var fireHousesNames = [];
var arrayfireHouses = [];
var listos = 0;
var positionX = [];
var positionY = [];
var nameHotel = [];
var arrayHotels = [];

$.get("https://data.cityofnewyork.us/api/views/ssdk-4qjy/rows.json", {accessType: "DOWNLOAD"}, function(data){
    
    for(var i = 0; i < data.data.length; i++){
        arreglo.push(data.data[i][8]);
        names.push(data.data[i][11]);
       
    }
    
    for(var j = 0; j < arreglo.length; j++){
        
        cadena = arreglo[j];
        cadena = cadena.substring(7,40);
        cadena = cadena.split(" ");
        xy.push(cadena);
    
    }
    initMap();
});


$.get("https://data.cityofnewyork.us/resource/byk8-bdfw.json", {}, function(datas){
    for(var i = 0; i < datas.length; i++){
       
       latitudFireHouses.push(datas[i].latitude);
       longitudFireHouses.push(datas[i].longitude);
       fireHousesNames.push(datas[i].facilityname);    
    }
    initMap();
});

$.get("https://data.cityofnewyork.us/api/views/cpmt-8qnr/rows.json?accessType=DOWNLOAD", {}, function(dataset){
    
   
    for(var i = 0; i < dataset.data.length; i++){
       
        positionX.push(dataset.data[i][11][1]);
        positionY.push(dataset.data[i][11][2]);
        nameHotel.push(dataset.data[i][8]);    
    }
    
    initMap();
});

function setMarkersHotel(map){
    console.log(JSON.stringify(nameHotel))
    console.log(nameHotel.length)
    for(var i = 0; i < nameHotel.length; i++){
        
        
        image = "https://imgur.com/HVE6L0U.png";
        var mark = new google.maps.Marker({ 
            
            position : {lat: Number(positionX[i]), lng : Number(positionY[i])},
            title : nameHotel[i],
            map: map, 
            icon: image
            });
            
        arrayHotels.push(mark);
    }
    
}

function setMarkersFire(map){
    
    for(var i = 0; i < fireHousesNames.length; i++){
        
        
        image = "https://imgur.com/pXyTsu4.png";
        var mark = new google.maps.Marker({ 
            
            position : {lat: Number(latitudFireHouses[i]), lng : Number(longitudFireHouses[i])},
            title : fireHousesNames[i],
            map: map, 
            icon: image
            });
            
        arrayfireHouses.push(mark);
    }
    
}

function setMarkers(map){
    
    for(var i = 0; i < xy.length; i++){
        
        image = "https://imgur.com/eEItGaf.png";
        var mark = new google.maps.Marker({ 
            
            position : {lat: Number(xy[i][1]), lng : Number(xy[i][0])},
            title : names[i],
            map: map, 
            icon: image
            });
            
        arrayInterest.push(mark);
    }
    
}



var show = 1;

function buttonAreas(){
    
    var elem = document.getElementById("Areas");
    if(show == 1){
        elem.style.backgroundColor = "#d9534f";
        elem.innerHTML = "<dd>Show Interest Areas</dd>"
        deleteMarkers(arrayInterest);
        show = 0;
    }else{
        elem.style.backgroundColor = "#5bc0de";
        elem.innerHTML = "<dd>Hide Interest Areas</dd>"
        showMarkers(arrayInterest);
        show = 1;
    }
    
}

var showf = 1;    
function buttonFire(){
    
    var elem = document.getElementById("Fire");
    if(showf == 1){
        elem.style.backgroundColor = "#d9534f";
        elem.innerHTML = "<dd>Show Fire Stations</dd>"
        deleteMarkers(arrayfireHouses);
        showf = 0;
    }else{
        elem.style.backgroundColor = "#5bc0de";
        elem.innerHTML = "<dd>Hide Fire Stations</dd>"
        showMarkers(arrayfireHouses);
        showf = 1;
    }
    
}

var showH = 1;    
function buttonHotels(){
    
    var elem = document.getElementById("Hotels");
    if(showH == 1){
        elem.style.backgroundColor = "#d9534f";
        elem.innerHTML = "<dd>Show Hotels</dd>"
        deleteMarkers(arrayHotels);
        showH = 0;
    }else{
        elem.style.backgroundColor = "#5bc0de";
        elem.innerHTML = "<dd>Hide Hotels</dd>"
        showMarkers(arrayHotels);
        showH = 1;
    }
    
}

function initMap(){
        listos++;
        if(listos < 4)
            return;
		var mapDiv = document.getElementById('map');
		
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 40.7291, lng: -73.9965},
			zoom: 12});
			
	    var image = "https://imgur.com/6aTZAUS.png";
		
		var marker = new google.maps.Marker({ 
			    position: {lat: 40.7291, lng: -73.9965},
		    	map: map,
		    	title: 'NYU Stern School of Business',
		        icon: image
		  
		});
		setMarkers(map);
		showMarkers(arrayInterest);
		setMarkersFire(map);
		showMarkers(arrayfireHouses);
		setMarkersHotel(map);
		showMarkers(arrayHotels);
}

function showMarkers(markersArray) {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setVisible(true);
    }
}

function deleteMarkers(markersArray) {

    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setVisible(false);
    }

}


var listos = 0;

function chequear(){
   if(listos == 4)
      initMap();
}

function sumarUno(){
   listos += 1;
   chequear(listos);
}

/*function loadMark(mp, cadena) {
    
    console.log("estoy en la funcion") 
    console.log(cadena)
    var marker2 = new google.maps.Marker({ 
        
        position: {lat: Number(cadena[1]), lng: Number(cadena[0])},
    		    
        map: mp,
    	title: 'new'
    });  
    
}*/





