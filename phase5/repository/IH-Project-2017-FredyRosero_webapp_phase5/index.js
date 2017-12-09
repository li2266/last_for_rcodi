'use strict'

//API Google Maps
var gMap;
var centerMap = {lat: 40.7290821, lng: -73.9970246};
var markers = [];
var heatmapData = [];
var infowindows = [];
var markerCluster;;

// Mashup
let properties = new Properties();
var temperature = [];
var markProperties = [];

//
initApp();

//
function initApp ()
{
    GetData(GetDataCallback);
}

function GetDataCallback(data)
{
    properties = data;
    properties = sort(properties,"rentzestimate",false);
    LoadDataToMap();
    LoadDataToTable();
    LoadTemperature();
    console.log("Datos cargados");
}

function ChangeMarkersColor(attr,minHue,maxHue)
{
    properties.map(p => p.marker.icon.fillColor = HslToHex(properties.linearFunction(p.rentzestimate,attr,minHue,maxHue),1,0.5) )
};

function LoadDataToMap ()
{           
    properties.map(function(p){        

        //
        var icon = {
            path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
            fillColor: "#FFFFFF",
            fillOpacity: .9,
            anchor: new google.maps.Point(0,0),
            strokeWeight: 0,
            scale: 0.6
        }        
        
        //
        var marker = new google.maps.Marker({
            position: p.position,
            map: gMap,
            icon: icon,
            label: ""+p.index
        });
        p.marker = marker;                    
        
        //
        var infowindow = new google.maps.InfoWindow({
          content: '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+p.address+'</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Rent estimate </b> by Sillow: '+
            CurrencyFormat(p.rentzestimate)+'</p>'+
            '<p>More info: <a href="'+p.zillowUrl+'">www.zillow.com/homedetails</a>.</p>'+
            '</div>'+
            '</div>'
        });
        infowindows.push(infowindow);
        marker.addListener('click', function(){
            infowindows.forEach(function(win) { win.close(); });
            infowindow.open(gMap, this);            
        });        
        
        marker.addListener('click', markerClick);
        markers.push(marker);            

    });
    markerCluster = new MarkerClusterer(gMap, markers,{imagePath:'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}); 
    ChangeMarkersColor("rentzestimate",0.25,0.5);
};

function LoadDataToTable ()
{    
    for (var i=0; i<properties.length; i++)
    {
        var t=i+1;
        var p = properties[i];
        
        var $tr = $('#table').find("tr").eq(t);
        
        if ($tr.length)
            $tr.html("");
        else
            $tr = $("<tr>");
        
        $tr.attr("p",p.index);
               
        $tr.on('click',function(){
            $(this).addClass('selected').siblings().removeClass('selected');    
            var p = parseInt(this.attributes.p.value);
            var propertie = findAttribute(properties,"index",p);
            new google.maps.event.trigger( propertie.marker, 'click' );
        });
                
        var $td = $("<td>").html(p.index);
        $tr.append($td);
        var $td = $("<td>").html(p.address);
        $tr.append($td);
        var $td = $("<td>").html(CurrencyFormat(p.rentzestimate)+" /mo");
        $tr.append($td);
        $('#table').append($tr);          
    };      
};

