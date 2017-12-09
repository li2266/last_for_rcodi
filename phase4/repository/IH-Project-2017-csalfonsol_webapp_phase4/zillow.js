
// Zillow variables
var userID = 'X1-ZWz18wilhwpjwr_9vdv4';
var firstLocation = encodeURI('45 W 4th St');
var city = encodeURI('NeyYork,NY');
var firstPropertyID = null;

// Url para obtener la ID de propiedad, dada una direccion.
var searchResultsUrl = 'http://www.zillow.com/webservice/GetSearchResults.htm?' + 'zws-id=' + userID + '&' + 'address=' + firstLocation + '&' + 'citystatezip=' + city;
// Url para obtener un conjunto de propiedades comparables a la propiedad con la ID proporcionada
var compsUrl = null;


markers = [];
circles = [];

//console.log(searchResultsUrl);

function loadPlaces(){
    xmlToJson(searchResultsUrl,getFirstPropertyID);
}

function xmlToJson (url,result){
    var yqlURL = [
        "http://query.yahooapis.com/v1/public/yql",
        "?q=" + encodeURIComponent("select * from xml where url='" + url + "'"),
        "&format=xml&callback=?"
    ].join("");

    $.getJSON(yqlURL, function(data){ // data.results[0] es el archivo XML resultado del query realizado
        result(data.results[0]);
    });
}
  // Este metodo se llama con el resultado guardado en data por la funcion xmlToJson
function getFirstPropertyID (data){
    console.log("GetStartZpid",searchResultsUrl);
    firstPropertyID = $(data).find("zpid").first().text(); // en firstPropertyID se guarda el valor zpid del archivo XML
    console.log(firstPropertyID);
    compsUrl = 'http://www.zillow.com/webservice/GetDeepComps.htm?' + 'zws-id=' + userID + '&' + 'zpid='+ firstPropertyID + '&' + 'rentzestimate=true&' + 'count=' + 15;
    xmlToJson(compsUrl,GetList);
};

function GetList (data){
    xml = $.parseXML( data );
    console.log(xml,"adasd");
    var comparables = xml.getElementsByTagName("properties")[0].children[1];
    var c = 1;
    $(comparables.children).each(function(i,element) {
        var rentzestimateXML = element.getElementsByTagName("rentzestimate");
        if (!rentzestimateXML)
            return;
        var rent = parseFloat(rentzestimateXML[0].children[0].textContent);
        var zUrl = element.children[1].children[0].textContent;
        var address = element.children[2].children[0].textContent;
        var lat = parseFloat(element.children[2].children[4].textContent);
        var lng = parseFloat(element.children[2].children[5].textContent);
        var pos = new Position (lat,lng);

        var marker = new google.maps.Marker({
            position: pos,
            title: address,
            map: map,
            label: ""+c,
            animation: google.maps.Animation.DROP
        });

        var circle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.7,
            strokeWeight: 1,
            fillColor: 'A94825',
            fillOpacity: 0.20,
            map: map,
            center: pos,
            radius: rent / 100
        });

        marker.addListener('click', function() {
            map.setZoom(16);
            map.panTo(marker.getPosition());
       
        });
        circles.push(circle);

        markers.push(marker);
        c++;
    });

};

class Position  {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
}
Position.prototype.toString = function() { return this.lat + ", " + this.lng +"." };