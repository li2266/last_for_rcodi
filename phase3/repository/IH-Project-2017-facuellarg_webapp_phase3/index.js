var data;
var map;

$( "form" ).on( "submit", function( event ) {
  event.preventDefault();
		data = parseInt($( "#txt" ).serialize().slice($("#txt").attr("name").length+1));
		$('#map').css("visibility","visible");
		$('#buttons').css("visibility","visible");
			$("form").slideUp('slow');
			console.log(data+1);
});
/*var b = $('<button/>', {
    id: 'c',
    name: 'Creado'
});*/



function initMap() {
	
	var cn ={lat:40.7291, lng:-73.996500};
  map = new google.maps.Map(document.getElementById('map'), {
  zoom: 12,
  center: cn
	});
	var marker = new google.maps.Marker({
		position:cn,
		map:map
	});
}
