//var dataPRCP  =[];
//var dataDate = [];
var dataAll = [];
var dataAll2 = [];

$(window).on('load',function() {

var noaaUrl = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=PRCP&startdate=2017-10-01&enddate=2017-10-31&locationid=CITY:US360019&stationid=GHCND:USW00094728&limit=31&units=metric";
var tokenFromNoaa = "ptnyvHndQdSpIvHCUHwUafjBDwBgxecH";

$.ajax({
    url: noaaUrl,
    headers:{
        token: tokenFromNoaa
    },
    success: function(data) {
        console.log(data);
        for (var i = 0; i < data.results.length; i++) {
         dataAll.push([ data.results[i].date.substring(0,10),data.results[i].value]);
        }
        
        console.log(dataAll);
         console.log(data.results.length);
    }
})
});

function updateChart(){
    var svg =d3.select("#pre");
        margin = {top: 20, right : 20,bottom: 30, left: 50},
        width =970-margin.right -margin.left,
        height =400- margin.top - margin.bottom ,
        g = svg.append("g").attr("transform","translate("+ margin.left + "," + margin.top+")");
    var parseTime=d3.timeParse("%Y-%m-%d");
    
    var x =d3.scaleTime()
        .rangeRound([0,width*0.7]);
        
    var y =d3.scaleLinear()
        .range([height, 0]);
        
    var line = d3.line()
     .x(function(data) { return x(data.date); })
     .y(function(data) { return y(data.close); })
     
     
    var data = dataAll.map(function(data){
        return{
            date: parseTime(data[0]),
            close: data[1]
            
        };
    
    
});

    x.domain(d3.extent(data, function(d) {return d.date; }))
    y.domain(d3.extent(data, function(d) {return d.close; }))

    g.append("g")
        .attr("transform", "translate(0," + height+ ")")
        .call(d3.axisBottom(x));
        
    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy" , "0.7em")
        .text("Precipitacion (mm)");       
        
    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#472AD9")
        .attr("stroke-width", 3)
        .attr("d", line);
}




$(window).on('load',function() {

var noaaUrl = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=AWND&startdate=2017-10-01&enddate=2017-10-31&locationid=CITY:US360019&stationid=GHCND:USW00094728&limit=31&units=metric";
var tokenFromNoaa = "ptnyvHndQdSpIvHCUHwUafjBDwBgxecH";

$.ajax({
    url: noaaUrl,
    headers:{
        token: tokenFromNoaa
    },
    success: function(data) {
        console.log(data);
        for (var i = 0; i < data.results.length; i++) {
         dataAll2.push([ data.results[i].date.substring(0,10),data.results[i].value*3.6]);
        }
        
        console.log(dataAll2);
         console.log(data.results.length);
    }
})
});

function updateChart2(){
    var svg =d3.select("#temp");
        margin = {top: 20, right : 20,bottom: 30, left: 50},
        width =970 -margin.right -margin.left,
        height = 400 - margin.top - margin.bottom ,
        g1 = svg.append("g").attr("transform","translate("+ margin.left + "," + margin.top+")");
    var parseTime=d3.timeParse("%Y-%m-%d");
    
    var x =d3.scaleTime()
        .rangeRound([0,width*0.7]);
        
    var y =d3.scaleLinear()
        .range([height, 0]);
        
    var line = d3.line()
     .x(function(data) { return x(data.date); })
     .y(function(data) { return y(data.close); })
     
     
    var data = dataAll2.map(function(data){
        return{
            date: parseTime(data[0]),
            close: data[1]
            
        };
    
    
});

    x.domain(d3.extent(data, function(d) {return d.date; }))
    y.domain(d3.extent(data, function(d) {return d.close; }))

    g1.append("g")
        .attr("transform", "translate(0," + height+ ")")
        .call(d3.axisBottom(x));
        
    g1.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy" , "0.7em")
        .text("Velocidad viento (km/h)");       
        
    g1.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#908E5C")
        .attr("stroke-width", 3)
        .attr("d", line);
}
var alfuelMarker = [];
 function alfuel(){

//$(window).on('load',function() {
    // Construct the query string
    url = 'https://data.ny.gov/resource/223s-7yza.json'

    // Intialize our map
  
    
    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          $.each(data, function(i, entry) {
              alfuelMakers(entry);


          });
    });
//});
}

function alfuelMakers(entry){
var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(entry.latitude, 
                                                   entry.longitude),
                  map: map,
                  title: location.name,
                  icon: 'https://cdn0.iconfinder.com/data/icons/ecology-33/140/Ecology_green_fuel-32.png'
              });

marker.setVisible(false);                  
alfuelMarker.push(marker);
}
function showalfuelMakers(){

for (var i = 0; i < alfuelMarker.length; i++) {
    if(alfuelMarker[i]!=undefined){
    if(alfuelMarker[i].getVisible()) 
      alfuelMarker[i].setVisible(false);
    else 
      alfuelMarker[i].setVisible(true);
  }
  }

}



var museumMarker = [];
 function museum(){

//$(window).on('load',function() {
    // Construct the query string
    url = 'https://data.cityofnewyork.us/resource/fn6f-htvy.json'

    // Intialize our map
  
    
    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          $.each(data, function(i, entry) {
              museumMakers(entry);


          });
    });
//});
}

function museumMakers(entry){
var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(entry.the_geom.coordinates[1], 
                                                   entry.the_geom.coordinates[0]),
                  map: map,
                  title: location.name,
                  icon: 'https://cdn0.iconfinder.com/data/icons/buildings-ultra/60/Buildings_-_040_-_Mueseum-32.png'
              });

marker.setVisible(false);                  
museumMarker.push(marker);
}
function showmuseumMakers(){

for (var i = 0; i < museumMarker.length; i++) {
    if(museumMarker[i]!=undefined){
    if(museumMarker[i].getVisible()) 
      museumMarker[i].setVisible(false);
    else 
      museumMarker[i].setVisible(true);
  }
  }

}

var gallerieMarker = [];



function gallerie(){

//$(window).on('load',function() {
    // Construct the query string
    url = 'https://data.cityofnewyork.us/resource/43hw-uvdj.json?'

    // Intialize our map
  
    
    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          $.each(data, function(i, entry) {
              gallerieMakers(entry);

             
          });
    });
//});
}
function gallerieMakers(entry){
 var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(entry.the_geom.coordinates[1], 
                                                   entry.the_geom.coordinates[0]),
                  map: map,
                  title: location.name,
                  icon: 'https://cdn0.iconfinder.com/data/icons/holiday-piconic/512/canvas-32.png'
              });


marker.setVisible(false);                  
gallerieMarker.push(marker);
}

function showgallerieMakers(){

for (var i = 0; i < gallerieMarker.length; i++) {
    if(gallerieMarker[i]!=undefined){
    if(gallerieMarker[i].getVisible()) 
      gallerieMarker[i].setVisible(false);
    else 
      gallerieMarker[i].setVisible(true);
  }
  }

}








var dCPofficeMarker =[];
function DCPoffice(){
//$(window).on('load',function() {
    // Construct the query string
    url = 'https://data.cityofnewyork.us/resource/w449-f4d7.json?'
          
    
    // Intialize our map
   
    
    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          $.each(data, function(i, entry) {
            DCPofficeMakers(entry);
              
          });
    });
//});
}
function DCPofficeMakers(data){
var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(data.latitude, 
                                                   data.longitude),
                  map: map,
                  title: location.name,
                  icon: 'https://cdn4.iconfinder.com/data/icons/life-insurance-2/256/Child_Life_Insurance-64.png'
              });

marker.setVisible(false);                  
dCPofficeMarker.push(marker);
}

function showDCPofficeMarkers() {
  for (var i = 0; i < dCPofficeMarker.length; i++) {
    if(dCPofficeMarker[i]!=undefined){
    if(dCPofficeMarker[i].getVisible()) 
      dCPofficeMarker[i].setVisible(false);
    else 
      dCPofficeMarker[i].setVisible(true);
  }
  }
}

var careerMarker =[];

function career(){
//$(window).on('load',function() {
    // Construct the query string
    url = 'https://data.ny.gov/resource/g8h7-98zz.json'

          
    
    // Intialize our map
   
    
    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          $.each(data, function(i, entry) {
            if(data[i].location_1!= undefined){

            careerMakers(entry);

          }
            
          });

    });
//});
}

function careerMakers(data) {

              var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(data.location_1.latitude, 
                                                   data.location_1.longitude),
                  map: map,
                  title: location.name,
                  icon: 'https://cdn4.iconfinder.com/data/icons/business-and-office-10-1/64/501-64.png'
              });
marker.setVisible(false);                  
careerMarker.push(marker);
}


function showCareerMarkers() {
  for (var i = 0; i < careerMarker.length; i++) {
    if(careerMarker[i]!=undefined){
    if(careerMarker[i].getVisible()) 
      careerMarker[i].setVisible(false);
    else 
      careerMarker[i].setVisible(true);
  }
  }
}

var vacMarker = [];

function vac(map){
//$(window).on('load',function() {
    // Construct the query string
    url = 'https://data.cityofnewyork.us/resource/w9ei-idxz.json'
          
    
    // Intialize our map
   
    
    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          $.each(data, function(i, entry) {
            
             vacMarkers(entry);
            
          });
    });
    
  }

function vacMarkers(data){

    marker = new google.maps.Marker({
    position: new google.maps.LatLng(data.latitude, 
                                                   data.longitude),
    map: map,
    title: location.name,
    icon: 'https://cdn2.iconfinder.com/data/icons/medical-specialties-set-3/256/Anesthesiology-32.png'
});

marker.setVisible(false);                  
vacMarker.push(marker);
            
}
function showVacMarkers() {
  for (var i = 0; i < vacMarker.length; i++) {
    if(vacMarker[i]!=undefined){
    if(vacMarker[i].getVisible()) 
      vacMarker[i].setVisible(false);
    else 
      vacMarker[i].setVisible(true);
  }
  }
}

/*
https://www.ncdc.noaa.gov/cdo-web/api/v2/stations
https://www.ncdc.noaa.gov/cdo-web/api/v2/datacategories?locationid=CITY:US390029&locationid&=FIPS:37&limit=1000
https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?offset=60&locationid=CITY:US360019

*/



var casaMarker = [];

 function casa(){

//$(window).on('load',function() {
    // Construct the query string
    url = 'https://data.cityofnewyork.us/resource/ffxx-dfvk.json'

    // Intialize our map
  
    
    // Retrieve our data and plot it
    $.getJSON(url, function(data, textstatus) {
          $.each(data, function(i, entry) {
              casaMarkers1(entry);


          });
    });
//});


}
var array_aux =[];
function casaMarkers1(data){
     j=-1;
if (data.location_street_a !=undefined && data.location_street_b !=undefined && data.location_street_c !=undefined && data.location_street_d !=undefined && data.avg_monthly_gross_rent !=undefined ){
   array_aux.push(data.avg_monthly_gross_rent)
   
   // console.log(rent)
    loc=data.location_street_a+'&'+data.location_street_b + '&'+  data.location_street_c + '&' +data.location_street_d
    
   request = 'https://maps.googleapis.com/maps/api/geocode/json?address='+loc+'&key=AIzaSyDFTTOZFnZN48o0qeUe1s__h4oDVb3mjN0'
  
   $.getJSON(request, function(data, textstatus) {
       j++;
          $.each(data, function(i, entry) {
              
             casaMarkers(entry,j);
             
              console.log(entry);

          });
   });

}

}

function casaMarkers(data,i) {
    
    console.log(array_aux[i])
    if (data[0].geometry!=undefined){
var marker = new google.maps.Marker({
    
                  position: new google.maps.LatLng(data[0].geometry.location.lat, 
                                                   data[0].geometry.location.lng),
                  map: map,
                  title: location.name,
                  icon: 'https://newcdn.iconfinder.com/data/icons/business-home-3/512/4-64.png'
              });

marker.setVisible(false);       
 marker.addListener('click', function() {
     $(".mod").html(array_aux[i]);
  });
casaMarker.push(marker);

}
}
function showcasaMarkers(){

for (var i = 0; i < casaMarker.length; i++) {
    if(casaMarker[i]!=undefined){
    if(casaMarker[i].getVisible()) 
      casaMarker[i].setVisible(false);
    else 
      casaMarker[i].setVisible(true);
  }
  }

}
