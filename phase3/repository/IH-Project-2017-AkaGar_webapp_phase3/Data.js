Housing_By_Building_url = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";
d3.json(Housing_By_Building_url, function(MyArray){
    
});

$.ajax({
    type: "GET",
    url: Housing_By_Building_url,
    sucess: function() {},
    error: function() {},
});

Unemployment_Statistics_url = "https://data.ny.gov/api/views/dh9m-5v4d/rows.json?accessType=DOWNLOAD";
d3.json(Unemployment_Statistics_url, function(MyArray){
    
});

$.ajax({
    type: "GET",
    url: Unemployment_Statistics_url,
    sucess: function() {},
    error: function() {},
});

School_Safety_Url = "https://data.cityofnewyork.us/api/views/q2z5-ai38/rows.json?accessType=DOWNLOAD";
d3.json(School_Safety_Url, function(MyArray){
    
});

$.ajax({
    typr: "GET",
    url: School_Safety_Url,
    sucess: function() {},
    error: function() {},
});