//API Google Maps
gMap = null;
centerMap = {lat: 40.7290821, lng: -73.9970246};
markers = [];
markerCluster = null;

//Zillow API
zwsid = 'X1-ZWz18xajro5jbf_9y702';
startZLocation = encodeURI('45 W 4th St');
zCity = encodeURI('NeyYork,NY');
startZpid = null;
zGetSearchResultsUrl  =   'http://www.zillow.com/webservice/GetSearchResults.htm?'+
                            'zws-id='+zwsid+'&'+
                            'address='+startZLocation+'&'+
                            'citystatezip='+zCity;
function zGetCompsUrl(startZpid)
{
    return  'http://www.zillow.com/webservice/GetDeepComps.htm?'+ 
            'zws-id='+zwsid+'&'+
            'zpid='+ (startZpid) +'&'+
            'rentzestimate=true&'+
            'count='+25;
};
// Mashup
class Propertie {
    constructor(index,address, position, zillowUrl,rentzestimate) {
        this.index = index;
        this.address = address;
        this.position = position;
        this.zillowUrl= zillowUrl;
        this.rentzestimate = rentzestimate
    }
}
Propertie.prototype.toString = function() { return '['+this.index+']:'+this.zillowUrl + ", $"+this.rentzestimate+"/mo, (" + this.position +"). " };
propesties = [];
class Position  {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
}
Position.prototype.toString = function() { return this.lat + ", " + this.lng +"." };

//
initApp();

//
function initApp ()
{
    getYQLjson(zGetSearchResultsUrl,GetStartZpid);
}

//
function GetStartZpid (data)
{
    console.log("GetStartZpid",zGetSearchResultsUrl);
    startZpid = $(data).find("zpid").first().text();      
    console.log("zGetCompsUrl: ",zGetCompsUrl(startZpid));
    getYQLjson(zGetCompsUrl(startZpid),GetList);   
};

//
function GetList (data)
{
    xml = $.parseXML( data );
    console.log(xml);
    var comparables = xml.getElementsByTagName("properties")[0].children[1];
    var c = 1;
    $(comparables.children).each(function(i,element) {
        var rentzestimateXML = element.getElementsByTagName("rentzestimate");
        if (!rentzestimateXML)
            return;
        var rent = parseFloat(rentzestimateXML[0].children[0].textContent);
        var zUrl = element.children[1].children[0].textContent;
        var st = element.children[2].children[0].textContent;
        var lat = parseFloat(element.children[2].children[4].textContent);
        var lng = parseFloat(element.children[2].children[5].textContent);
        var pos = new Position (lat,lng);
        var pro = new Propertie (c,st, pos, zUrl,rent);
        

        console.log(""+pro);        
        var marker = new google.maps.Marker({
            position: pos,
            map: gMap,
            label: ""+c
        });
        
        marker.addListener('click', function() {
            gMap.setZoom(16);
            gMap.setCenter(marker.getPosition());
            $('#address').find('span').html(pro.address);
            $('#price').find('span').html(pro.rentzestimate);
            $('#zUrl').find('a').attr('href',pro.zillowUrl);
            toggleBounce(this);
        });
        
        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.35,
            strokeWeight: 1,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: gMap,
            center: pos,
            radius: rent / 100
        });
        
        propesties.push(pro);        
        markers.push(marker);
        c++;
    });
    markerCluster = new MarkerClusterer(gMap, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    gMap.data.setStyle(function(feature) {
    var magnitude = feature.getMagnitude();
    return {
        icon: getCircle(magnitude)
    };
});

};

//
function getYQLjson (url,sucess)
{
    var yqlURL = [
        "http://query.yahooapis.com/v1/public/yql",
        "?q=" + encodeURIComponent("select * from xml where url='" + url + "'"),
        "&format=xml&callback=?"
    ].join("");   
    
    $.getJSON(yqlURL, function(data){
        sucess(data.results[0]);
    });      
     
}