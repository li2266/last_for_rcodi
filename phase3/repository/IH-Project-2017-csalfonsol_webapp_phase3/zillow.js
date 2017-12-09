// Zillow variables
var userID = 'X1-ZWz18wilhwpjwr_9vdv4';
var firstLocation = encodeURI('45 W 4th St');
var city = encodeURI('NeyYork,NY');
var firstPropertyID = null;

// Url para obtener la ID de propiedad, dada una direccion.
var searchResultsUrl = 'http://www.zillow.com/webservice/GetSearchResults.htm?' + 'zws-id=' + userID + '&' + 'address=' + firstLocation + '&' + 'citystatezip=' + city;
// Url para obtener un conjunto de propiedades comparables a la propiedad con la ID proporcionada
var compsUrl = null;

propesties = [];
markers = [];
circles = [];

//console.log(searchResultsUrl);

xmlToJson(searchResultsUrl,getFirstPropertyID);

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
    firstPropertyID = $(data).find("zpid").first().text(); // en firstPropertyID se guarda el valor zpid del archivo XML
    compsUrl = 'http://www.zillow.com/webservice/GetDeepComps.htm?' + 'zws-id=' + userID + '&' + 'zpid='+ firstPropertyID + '&' + 'rentzestimate=true&' + 'count=' + 5;
    
};



