/* Variable Declarations */
var map;
var climateApiKey = 'LOqOvbRFiRapoYybvMyINnrMoKKdgTPg';

/* Variable URL's*/
var nycRestaurantInspectionResultsUrl = ' https://data.cityofnewyork.us/api/views/43nn-pn8j/rows.json?accessType=DOWNLOAD';
var FarmersMarketUrl = 'https://data.cityofnewyork.us/api/views/j8gx-kc43/rows.json?accessType=DOWNLOAD';
var nyBikeRoutesUrl = 'https://data.ny.gov/resource/ftr4-g3cq.json';
var nyBankAtmsUrl = 'https://data.ny.gov/api/views/ndex-ad5r/rows.json?accessType=DOWNLOAD';
var nycArtGalleries = ' https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD';
var climateUrl = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/locations?locationid=ZIP:10003';


/* Functions */
$(document).ready(function(){
    
    
    $('#button4').click(function(){ /* function for Go button */
        $('html, body').animate({scrollTop:0}, 'slow');
    });
    
     $('#button1').click(function(){ /* function for the What are we button */

      var WH = $(window).height();  
      var SH = $('body').prop("scrollHeight");
      $('html, body').stop().animate({scrollTop: SH-(WH+200)}, 1000);

    });
    
    $('#button2').click(function(){ /* function for the What are we button */

      var WH = $(window).height();  
      var SH = $('body').prop("scrollHeight");
      $('html, body').stop().animate({scrollTop: SH-(WH)}, 1000);

    });
    
    $('#button3').click(function(){ /* function for the Explore button */

      var WH = $(window).height();  
      var SH = $('body').prop("scrollHeight");
      $('html, body').stop().animate({scrollTop: SH-(WH-200)}, 1000);

    }); 
    
    
})

function initMap() 
{
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7291, lng: -73.9965},
      zoom: 13
    });
    
    var infowindow = new google.maps.InfoWindow({content: ""});
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    //once the request is accepted, process the fowllowing function to get data and complete the app information
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            //add the information of the markets here 
            //
            for (var i = 0; i<44; i++) {
                var dataLine = [];
                //latitude - 0
                dataLine.push(json.data[i][18]);
                //longitude - 1
                dataLine.push(json.data[i][19]);
                //name - 2
                dataLine.push(json.data[i][8]);
                //street - 3
                dataLine.push(json.data[i][9]);
                //day in week - 4
                dataLine.push(json.data[i][10]);
                //start time - 5
                dataLine.push(json.data[i][11]);
                //end time - 6
                dataLine.push(json.data[i][12]);
                //start date -7
                dataLine.push(json.data[i][13]);
                //end date - 8
                dataLine.push(json.data[i][14]);
                //website - 9
                dataLine.push(json.data[i][15][0]);

                washedData.push(dataLine);
            };
            //alert(washedData);
            //number of the markets
            var numberOfGalleries = washedData.length;

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
                            infowindow.setContent(washedData[key][2]);
                            infowindow.open(map, markers[key]);
                            //set the menu information about the market
                            document.getElementById("market-name").innerHTML = "<b>Market Name</b>: " + washedData[key][2] + "</em>";
                            document.getElementById("street-name").innerHTML = "<b>Address</b>: <em>" + washedData[key][3] + "</em>";
                            if(washedData[key][9])
                                document.getElementById("website").innerHTML = "<b>Website</b>: <em><a href=\"" + washedData[key][9] + "\">" + washedData[key][9] + "</a></em>";
                            else
                                document.getElementById("website").innerHTML = "<b>Website</b>: <em>Not available</em>";
                            document.getElementById("open-status").innerHTML = "<b>Market Status</b>: <em>" + contain(washedData[key][4], day()).capitalizeFirstLetter() + "</em>";

                            //dtata - scored stores
                            //you will use scoring algorithm to get these value in the final project
                            //here we only use random method to show the process
                            var w = 200,
                            h = 250;
                            var array  = [];
                            for (var i = 0; i<9; i++) {
                                array[i] = Math.random();
                            }
                            var d = [
                                [
                                    {axis:"Open hours",value:array[0]},
                                    {axis:"Availability",value:array[1]},
                                    {axis:"Freshness",value:array[2]},
                                    {axis:"Distance",value:array[3]},
                                    {axis:"Prices",value:array[4]},
                                    {axis:"Customer ratings",value:array[5]},
                                    {axis:"Personal preference",value:array[6]},
                                    {axis:"Other",value:array[7]},
                                    {axis:"service",value:array[8]}
                                ]
                            ];

                            document.getElementById("scores").innerHTML = "The final score for this market is <b><em>" + parseInt(score(array)*100) + "</b></em> out of <b><em>100</b></em>";                            

                            //Options for the Radar chart, other than default
                            var mycfg = {
                              w: w,
                              h: h,
                              maxValue: 0.6,
                              levels: 6,
                              ExtraWidthX: 200
                            }

                            //Call function to draw the Radar chart
                            //Will expect that data is in %'s
                            RadarChart.draw("#chart", d, mycfg);
                        });
                        
                    });
                }
            });
        
        });

        }
    };
}

