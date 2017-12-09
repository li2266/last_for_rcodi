// Zillow API
    var zillowURL = "https://www.quandl.com/api/v3/databases/ZILLOW/"
    var zillowSpec = "M659_ZRISFRR?start_date=2017-07-31&end_date=2017-09-30&"
    var zillowAPIKey = "api_key=rnpPscYqwHiUYGzfsYA-";
    
    var climateURL = "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations?locationid=ZIP:10003";
    var climateAPI = "tzpNvuupwkPZtrruDHawsoQZSqPwPgNz";
    
//CLIMATE API REQUEST
$.ajax({ 
    type : "GET", 
    url : zillowURL + zillowSpec + zillowAPIKey,
    success : function(result) { 
        
    }, 
    error : function(result) { 
        //handle the error 
    } 
});

$.ajax({ 
    type : "GET", 
    url : climateAPI, 
    beforeSend: function(xhr){xhr.setRequestHeader('token', climateAPI);},
    success : function(result) { 
        console.log('climate', result);
    }, 
    error : function(result) { 
        //handle the error 
    } 
});