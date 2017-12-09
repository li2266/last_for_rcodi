// Zillow API
    var zillowURL = "https://www.quandl.com/api/v3/databases/ZILLOW/"
    var zillowSpec = "M659_ZRISFRR?start_date=2017-07-31&end_date=2017-09-30&"
    var zillowAPIKey = "api_key=rnpPscYqwHiUYGzfsYA-";
    
// Climate API
    var climateURL = "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations?locationid=ZIP:10003";
    var climateAPI = "tzpNvuupwkPZtrruDHawsoQZSqPwPgNz";
    
    var climateJSON;
    var zillowJSON;
$.ajax({ 
    type : "GET", 
    url : zillowURL + zillowSpec + zillowAPIKey,
    success : function(result) { 
        zillowJSON = result;
    }, 
    error : function(result) { 
        //handle the error 
    } 
});

//CLIMATE API REQUEST
$.ajax({ 
    type : "GET", 
    url : climateAPI, 
    beforeSend: function(xhr){xhr.setRequestHeader('token', climateAPI);},
    success : function(result) { 
        climateJSON = result;
    }, 
    error : function(result) { 
        //handle the error 
    } 
});

function useData() {
    // 
}