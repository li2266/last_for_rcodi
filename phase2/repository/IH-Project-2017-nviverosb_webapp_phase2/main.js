//const DATASET_WHEATHER = "https://www.ncdc.noaa.gov/cdo-web/api/v2/{datasets}";
//
//
//document.getElementById( 'overlay' ).addEventListener( 'click', function() {
//
//    if(this.style.height == '50px' || this.style.height == '' ){
//        this.style.height = '100.0em';
//        this.style.width = '100.0em';
//    }
//    else{
//        this.style.width = '70%';
//        this.style.height = '50px';
//    }
//    //    ( this.style.height == '50px' || this.style.height == '' )
//    //        ? this.style.height = '100.0em' 
//    //        : this.style.height = '50px';
//    //    
//}, false );

function testjson(){
    //alert("inside testjson");
    jsontest = $.ajax({
        type: 'GET',
        url:  'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:28801&startdate=2010-05-01&enddate=2010-05-01',

//you can use different data-set values.
   headers: {
    Token: 'BbNUmUCzRDoQtcwioTTeLfNjuJQtXLRu'//example:'kxhfoJOtnEuxSNnMGMMSEITkmcsAFmFT'
        },
      //  async: false,
        dataType: 'json',
        success: function (data) {
            //Do stuff with the JSON data
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

//testjson();