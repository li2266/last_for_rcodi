function initMap(){
		var mapDiv = document.getElementById('map');
		
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 40.7291, lng: -73.9965},
			zoom: 12});
			
	    var image = "https://image.flaticon.com/icons/png/512/5/5109.png"
		
		var marker = new google.maps.Marker({ 
			    position: {lat: 40.7291, lng: -73.9965},
		    	map: map,
		    	title: 'NYU Stern School of Business'
		
		  
		});
		
	    loadMark(map);
}
	
var arreglo = [];
        $.get("https://data.cityofnewyork.us/api/views/ssdk-4qjy/rows.json", {accessType: "DOWNLOAD"}, function(data){
        for(var i = 0; i < data.data.length; i++)
            arreglo.push(data.data[i][8])
        console.log(arreglo)
        var cadena = arreglo[2]
        cadena = cadena.substring(7,42)
        console.log(cadena)
        cadena = cadena.split(" ")
        console.log(cadena)
        });

function loadMark(mp) {
   
    var marker2 = new google.maps.Marker({ 
        
        position: {lat: 40.88696522165708, lng: -73.8386418872537},
    		    
        map: mp,
    	title: 'new'
    });  
    
    var marker3 = new google.maps.Marker({ 
        
        position: {lat: Number(40.7191), lng: Number(-73.9765)},
    		    
        map: mp,
    	title: 'new'
    });
    
    var marker4 = new google.maps.Marker({ 
        
        position: {lat: Number(40.7391), lng: Number(-73.9865)},
    		    
        map: mp,
    	title: 'new'
    });
    
    var marker5 = new google.maps.Marker({ 
        
        position: {lat: Number(40.7491), lng: Number(-73.9765)},
    		    
        map: mp,
    	title: 'new'
    });
    
    var marker6 = new google.maps.Marker({ 
        
        position: {lat: Number(40.7321235), lng: Number(-73.9895)},
    		    
        map: mp,
    	title: 'new'
    });
    
    var marker7 = new google.maps.Marker({ 
        
        position: {lat: Number(40.73881), lng: Number(-73.9795)},
    		    
        map: mp,
    	title: 'new'
    });
    
};
