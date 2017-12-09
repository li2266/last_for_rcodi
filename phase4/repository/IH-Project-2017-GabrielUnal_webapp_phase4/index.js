

var map;

function onGoogleMapResponse(){
	//var uluru = {lat: ﻿40.67, lng:  -73.94};
	map = new google.maps.Map(document.getElementById('googleMapContainer'),{
		zoom: 10
	});
	var city = "New York";
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address' : city}, function(results, status){
		if(status == google.maps.GeocoderStatus.OK){
			map.setCenter(results[0].geometry.location);
		};
	});
	
}


/*
$(function() {
    $.ajax({
        type: "get",
        url: "https://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18wn3afy1vv_6o78e&address=541%20Hudson%20ST&citystatezip=New%20York,%20NY&rentzestimate=true",
        dataType: "xml",
        success: function(data) {
            /* handle data here */
            
            //$("#show_table").html(data);
       // },
        //error: function(xhr, status) {
            /* handle error here 
            //$("#show_table").html(status);
        }
    });
});*/

/*
function createCORSRequest(method, url){
	    var xhr = new XMLHttpRequest();
	    if ("withCredentials" in xhr){
	        xhr.open(method, url, true);
	    } else if (typeof XDomainRequest != "undefined"){
	        xhr = new XDomainRequest();
	        xhr.open(method, url,"X1-ZWz18wn3afy1vv_6o78e");
	    } else {
	        xhr = null;
	    }
	    return xhr;
	}
*/
/*
function getDataFromURL(url){
	var xmlhttp = new XMLHttpRequest();
	//var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var myArr = xmlhttp.responseText;
		var text = myArr;
		console.log(text);
		}
	};
*/	

 
function getDataFromURL(url){
    var xml = new XMLHttpRequest();
    var valor;
    var completo = "https://cors-anywhere.herokuapp.com/"+ url;                                                                             
    xml.open("GET", completo, true);
    xml.send();
    xml.onreadystatechange = function(){
        if (xml.readyState == 4 && xml.status == 200){
            casa = xml.responseXML;
            if(parseInt(casa.childNodes[0].childNodes[1].childNodes[1].innerHTML) == 0){    
                  console.log(casa.getElementsByTagName("rentzestimate")[0].firstChild.innerHTML);
                  return valor = casa.getElementsByTagName("rentzestimate")[0].firstChild.innerHTML;
            }
        }
    };
}

function updateData(){
    var direccion = "13734+70th+Ave+Flushing+NY+11367";

    var url = "http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz18wn3afy1vv_6o78e&address="+direccion+"&citystatezip=New+York%2C+NY&rentzestimate=true";
    var valor = getDataFromURL(url);
    var geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, map,direccion);
}   

$(document).ready(function(){
    $("#updateButton").on("click",updateData);
})



function geocodeAddress(geocoder, resultsMap, direccion) {
    //var address = document.getElementById('address').value;
    var address = direccion
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
            console.log("OK");
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
