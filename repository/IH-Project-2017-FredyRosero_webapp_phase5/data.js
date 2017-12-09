'use strict'
var GetDataCallback = null;
//Zillow API
var zwsid = 'X1-ZWz18xajro5jbf_9y702';
var startZLocation = encodeURI('45 W 4th St');
var zCity = encodeURI('NeyYork,NY');
var startZpid = null;
var zGetSearchResultsUrl =  'http://www.zillow.com/webservice/GetSearchResults.htm?'+
                        'zws-id='+zwsid+'&'+
                        'address='+startZLocation+'&'+
                        'citystatezip='+zCity;

var zGetCompsUrl = function (startZpid)
{
    return  'http://www.zillow.com/webservice/GetDeepComps.htm?'+ 
            'zws-id='+zwsid+'&'+
            'zpid='+ (startZpid) +'&'+
            'rentzestimate=true&'+
            'count='+25;
};








//
function GetYQLjson (url,sucess)
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

//
function GetStartZpid (data)
{
    console.log("GetStartZpid",zGetSearchResultsUrl);
    startZpid = $(data).find("zpid").first().text();      
    console.log("zGetCompsUrl: ",zGetCompsUrl(startZpid));
    GetYQLjson(zGetCompsUrl(startZpid),GetProperties);   
};

//
function GetProperties (data)
{
    var xml = $.parseXML( data );
    console.log(xml);
    var comparables = xml.getElementsByTagName("properties")[0].children[1];
    var c = 1;
    var properties = new Properties();
    
    $(comparables.children).each(function(i,element) {
        var rentzestimateXML = element.getElementsByTagName("rentzestimate");
        if (!rentzestimateXML)
            return;
        var index = c;
        var rent = parseFloat(rentzestimateXML[0].children[0].textContent);
        var zUrl = element.children[1].children[0].textContent;
        var st = element.children[2].children[0].textContent;
        var lat = parseFloat(element.children[2].children[4].textContent);
        var lng = parseFloat(element.children[2].children[5].textContent);
        var pos = new Position (lat,lng);
        var pro = new Propertie (index, st, pos, zUrl,rent);
        properties.push(pro);
        c++;
    });
    GetDataCallback(properties);
};

function GetData (callback)
{
    GetDataCallback = callback;
    GetYQLjson(zGetSearchResultsUrl,GetStartZpid);
}