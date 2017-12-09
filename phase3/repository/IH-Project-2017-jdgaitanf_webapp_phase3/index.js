//const url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets/";
const url = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json"


var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
}

$(window).scroll(function(e){
    parallax();
});



function initMap() {
	var uluru = {lat: 40.729, lng: -73.996};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 16,
	  center: uluru
	});
	var marker = new google.maps.Marker({
	  position: uluru,
	  map: map
	});
}


function dataSet(){
	var data = $.get(url, function(){
		console.log (url)
	})
	.done(function(){
		console.log(data);
	})
	.fail(function(error){
		console.error(error);
	})
}

// $(document).ready(function(){
// 	$.ajax({ 
// 		url:url,
// 		headers:{ "token":"hxFyhkMGHJZIIgznhWQzWmmuXvihxTZV" } 
// 	});

// 	$("#getData").on("click", dataSet);

// })


$(document).ready(function(){
	$("#getData").on("click", dataSet);
})



