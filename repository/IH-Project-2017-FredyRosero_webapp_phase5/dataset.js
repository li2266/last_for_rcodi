var gsoyXHR = $.ajax({ 
    url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOY&datatypeid=TAVG&locationid=CITY:US360019&startdate=2016-01-01&enddate=2017-01-01&limit=100", 
    headers:{ token:"bJgXVudtpQzwoZTwYGUTOFtlFuKGgBla" },
    dataType: "json"
});

gsoyXHR.done(function( data ) {    
    var array = data.results;
    array.forEach(function(element) {
        $.ajax({ 
            url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/stations/"+element.station, 
            headers:{ token:"bJgXVudtpQzwoZTwYGUTOFtlFuKGgBla" },
            dataType: "json"
        }).done(function( data ) {    
            var t = new Temperature(element.value,data.latitude,data.longitude,element.date)
            temperature.push(t);
        });
    });
});

function LoadTemperature () {
    var heatmapData = [];
    temperature.map(function (t){
        var latLng = new google.maps.LatLng(t.position.lat, t.position.lng)
        heatmapData.push(latLng);
    })
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      dissipating: false,
      map: gMap
    });

}
//https://www.ncdc.noaa.gov/cdo-web/api/v2/stations/COOP:010008

