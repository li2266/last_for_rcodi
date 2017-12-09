/**
Author: Priyank Jain
This is the core js logic for adding markes and radarchart for Purdue 2016 Ironhacks Tutorials
**/

//variables for map and marks
var elevator;
var map;
var d;
// 2-level array for washed markets data
var washedData = [];

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//init the google map in the webpage
function initMap() {
    
    //create the google map
    map = new google.maps.Map(document.getElementById('map'), {
        //center: {lat: 41.85081542, lng: -87.69123528},
       center: {lat: 40.7291, lng: -73.9965},
        zoom: 12
    });


    var infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
    
    //create a new httprequest for this session
    var xmlhttp = new XMLHttpRequest();
    //json format data resource url 
    //var url = "https://data.cityofchicago.org/api/views/hu6v-hsqb/rows.json?accessType=DOWNLOAD";
    var url = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";
    //console.log(json.data[0][18]);
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    //once the request is accepted, process the fowllowing function to get data and complete the app information
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            console.log(json);
            //alert(json.data[1][1]);
            //document.getElementById("id01").innerHTML = myArr;
            
            //
            //add the information of the markets here 
            //
            for (var i = 0; i<44; i++) {

                var dataLine = [];

                //latitude - 0
                dataLine.push(json.data[i][23]);
                //longitude - 1
                dataLine.push(json.data[i][24]);
                // //name - 2
                 dataLine.push(json.data[i][9]);
                // //street - 3
                dataLine.push(json.data[i][14]);
                // //Extremely Low Income - 4
                dataLine.push(json.data[i][31]);
                // //Total Units - 5
                dataLine.push(json.data[i][39]);
                // //Very Low Income - 6
                 dataLine.push(json.data[i][32]);
                // // Low Income -7
                 dataLine.push(json.data[i][33]);
                // //Moderate Income - 8
                 dataLine.push(json.data[i][34]);
                // //Middle Income - 9
                 dataLine.push(json.data[i][35]);
                 // Number - 10
                 dataLine.push(json.data[i][13]);
                 // Borough - 11
                 dataLine.push(json.data[i][15]);
                // Post Code - 12
                 dataLine.push(json.data[i][16]);
                 // Total Units - 13
                 dataLine.push(json.data[i][40]);

                washedData.push(dataLine);
            };
            //alert(washedData);
            //number of the markets
            //var numberOfMarkets = washedData.length;
            var numberOfMarkets = washedData.length;
            //add markers on the map
            var markers = [];
            google.maps.event.addListener(map, 'idle', function() {
            // Create an ElevationService
            elevator = new google.maps.ElevationService();
            $.each(markers, function(key, value)
            {
                value.setMap(null);
            });
            // getting bounds of current location
            var boundBox = map.getBounds();
            var southWest = boundBox.getSouthWest();
            var northEast = boundBox.getNorthEast();
            var lngSpan = northEast.lng() - southWest.lng();
            var latSpan = northEast.lat() - southWest.lat();
            // adding 20 markers to the map at random locations
            var locations = [];
            //lat: 41.85081542, lng: -87.69123528
            for (var j = 0; j < numberOfMarkets; j++)
            {
                var location = new google.maps.LatLng(
                        southWest.lat() + latSpan * Math.random(),
                        southWest.lng() + lngSpan * Math.random()
                        );
                locations.push(location);
            }

            // Create a LocationElevationRequest object using the array's one value
            var positionalRequest = {
                'locations': locations
            };


            elevator.getElevationForLocations(positionalRequest, function(results, status)
            {
                if (status === google.maps.ElevationStatus.OK)
                {
                    //if the infowindow is open
                    var prev_infowindow =false;

                    $.each(results, function(key, value) {

                        //alert(key);
                        markers[key] = new google.maps.Marker({
                            position: {lat: Number(washedData[key][0]), lng: Number(washedData[key][1])},
                            map: map,
                            //icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + key.toString()).slice(-2) + '.png'
                        });
                        google.maps.event.addListener(markers[key], 'click', function() {
                            //if another window is open, close it
                            if( prev_infowindow ) {
                                prev_infowindow.close();
                            }
                            infowindow.setContent("Project Name: " + washedData[key][2]);
                            infowindow.open(map, markers[key]);
                            //set the menu information about the market
                            document.getElementById("market-name").innerHTML = "<b>Building Number</b>: " + washedData[key][10] + "</em>";
                            document.getElementById("street-name").innerHTML = "<b>Street</b>: <em>" + washedData[key][3] + "</em>";
                            document.getElementById("website").innerHTML = "<b>Post Code</b>: <em>" + washedData[key][12] + "</em>";
                            // document.getElementById("units").innerHTML = "<b>Total Units</b>: <em>" + washedData[key][13] + "</em>";
                    
                            document.getElementById("open-status").innerHTML = "<b>Total Units</b>: <em>" +  washedData[key][13] + "</em>";

                            //dtata - scored stores
                            //you will use scoring algorithm to get these value in the final project
                            //here we only use random method to show the process
                            var w = 200,
                            h = 250;
                            var array  = [];
                            for (var i = 0; i<9; i++) {
                                array[i] = Math.random();
                            }
                            d = [
                                    [
                                    {axis:"Extremely Low Income Units",value:(washedData[key][4]/washedData[key][5])},
                                    {axis:"Middle Income",value:(washedData[key][9]/washedData[key][5])},
                                    {axis:"Low Income",value:(washedData[key][7]/washedData[key][5])},
                                    {axis:"Moderate Income",value:(washedData[key][8]/washedData[key][5])},
                                    {axis:"Very Low Income Units",value:(washedData[key][6]/washedData[key][5])}
                                  //  {axis:"Customer ratings",value:array[5]},
                                  //  {axis:"Personal preference",value:array[6]},
                                 //   {axis:"Other",value:array[7]},
                                   // {axis:"service",value:array[8]}
                                    ]
                                ];

                            //document.getElementById("scores").innerHTML = "The final score for this market is <b><em>" + parseInt(score(array)*100) + "</b></em> out of <b><em>100</b></em>";                            

                            var mycfg = {
                              w: w,
                              h: h,
                              maxValue: 0.6,
                              levels: 6,
                              ExtraWidthX: 200
                            }

                            RadarChart.draw("#chart", d, mycfg);
                        });
                        
                    });
                }
            });
        
        });

        }
    };
}



function calcIncome (json) {


}

//show the request function in the text format
function myRequestFunction(arr) {
        var out = "";
        var i;
        for(i = 0; i < arr.length; i++) {
            out += '<a href="' + arr[i].url + '">' + 
            arr[i].display + '</a><br>';
        }
        document.getElementById("id01").innerHTML = out;
    }
// Add a listener for idle event and call getElevation on a random set of marker in the bound

//get the result of whether contains a substring
function contain(str, substr) {
   // if(str.indexOf(substr) > -1)
   if(1>0)
        return "open";
    else
        return "closed";
}

//get the day in a week by the number
function day() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[d.getDay()];
}

//the algorithm for scoring
//you should create your own reasonable methods for calculating scores
function score(data) {
    return data[0]*0.1 + data[2]*0.01 + data[3]*0.11 + data[1]*0.1 + data[4]*0.2 + data[5]*0.1 + data[6]*0.2 + data[7]*0.01 + data[8]*0.01;
}




