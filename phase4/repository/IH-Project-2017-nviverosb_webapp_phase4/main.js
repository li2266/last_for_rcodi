function testjson(){
    //alert("inside testjson");
    jsontest = $.ajax({
        type: 'GET',
        url:  'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:28801&startdate=2010-05-01&enddate=2010-05-01',
        headers: {
            Token: 'BbNUmUCzRDoQtcwioTTeLfNjuJQtXLRu'
        },
        //  async: false,
        dataType: 'json',
        success: function (data) {
            var len = data.length;
            var txt = "";
            alert(JSON.stringify(data));
            jsontest = data;
            console.log("data is: " + data);
        },failure: function(){
            alert("ajax failed");
        }
    });
    console.log(jsontest);  
    //console.log(jsontest[0]);
}

function getDirection(){

    jsontest = $.ajax({
        type: 'GET',
        url:  'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.7291,-73.9965&key=AIzaSyAWtHnv1nl33pvl1tWU-YJ7IOqGklDC1pc',
        headers: {
            //Token: 'BbNUmUCzRDoQtcwioTTeLfNjuJQtXLRu'
        },
        //  async: false,
        dataType: 'json',
        success: function (data) {
            var len = data.length;
            var txt = "";
            jsontest = data;
            //            alert(JSON.stringify(data.results[0].formatted_address));
            var formatted_address = JSON.stringify(data.results[0].formatted_address);
            var address = String(formatted_address);
            var parsedAddress = address.split(',');
            var final = String(parsedAddress[2]);
            var zip = final.split(" ");
            //            alert(zip[2]);
            getWheather(zip[2]);

        },failure: function(){
            alert("ajax failed");
        }
    });
    console.log(jsontest);
}

function getWeather(zip){

    var zipCode = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:' + zip + '&startdate=2010-05-01&enddate=2010-05-01';
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var hour = today.getHours();
    var startdate = "2010-" + String(mm) + "-" + String(dd) + "T" + String(hour) + ":00:00";
    var enddate = "2010-" + String(mm) + "-" + String(dd) + "T" + String(hour+1) + ":00:00";
    //    alert(enddate);
    jsontest = $.ajax({
        type: 'GET',
        url:  'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=NORMAL_HLY&datatypeid=HLY-TEMP-NORMAL&locationid=CITY:US360019&&stationid=GHCND:USW00014734&startdate=' + startdate + '&enddate=' + enddate + '&limit=1000',
        headers: {
            Token: 'BbNUmUCzRDoQtcwioTTeLfNjuJQtXLRu'
        },
        //  async: false,
        dataType: 'json',
        success: function (data) {
            var len = data.length;
            var txt = "";
//            alert(JSON.stringify(data));
            jsontest = data;
            var temp = JSON.stringify(data.results[0].value);
//            alert(temp);
            document.getElementById("today2").innerHTML=temp; 
        },failure: function(){
            alert("ajax failed");
        }
    });
    console.log(jsontest);  
}

function getTwoBedrooms(){

    jsontest = $.ajax({
        type: 'GET',
        //        url: zipCode,
        url:  'https://www.quandl.com/api/v3/datasets/ZILLOW/N9_MRP2B.json?api_key=LPs8myY5kj_2ppDzJacp',
        headers: {
            Token: 'LPs8myY5kj_2ppDzJacp'
        },
        //  async: false,
        dataType: 'json',
        success: function (data) {
            var len = data.length;
            var txt = "";
            alert(JSON.stringify(data));
            jsontest = data;
        },failure: function(){
            alert("ajax failed");
        }
    });
    console.log(jsontest);
}

//testjson();