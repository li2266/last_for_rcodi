//These are not working. I do not know why these are not working.
//If they worked, I would have all the data in global variables and 
//then I can do manipulations and more. But I can't, and I don't 
//know why. 


//THis should get data from the sites and return them, setting the 
//variables. It is not doing that.. 



var Dummy = [4, 5];
var Housing_By_Building;

Housing_By_Building_url = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";
d3.json(Housing_By_Building_url, function(MyArray){

});



$.ajax({
    type: "GET",
    url: Housing_By_Building_url,
    async: false,
    sucess: function (results) {
        Housing_By_Building = JSON.parse(results);
        console.log("Sucess");},
    error: function() {console.log("Invalid Request")},
});

console.log(Housing_By_Building)

var Unemployment_Data,
Unemployment_Statistics_url = "https://data.ny.gov/api/views/dh9m-5v4d/rows.json?accessType=DOWNLOAD";
$.ajax({
    type: "GET",
    url: Unemployment_Statistics_url,
    async: false,
    sucess: function(results) {
        console.log(results)
        Unemployment_Data = JSON.parse(results)
        console.log(Unemployment_Data)
        return results
    },
    error: function() {"Error occured in unemployment"},

});
console.log(Unemployment_Data)

var School_Safety_Data,
School_Safety_Url = "https://data.cityofnewyork.us/api/views/q2z5-ai38/rows.json?accessType=DOWNLOAD";
d3.json(School_Safety_Url, function(MyArray){
    School_Safety_Data = MyArray
});
console.log(School_Safety_Data)

$.ajax({
    type: "GET",
    url: School_Safety_Url,
    async: false,
    sucess: function(results){console.log("Happy Happy Day")},
    error: function() {},
});
console.log(School_Safety_Data)

var Museums;
Museums_Url = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD"
$.ajax({
    type: "GET",
    url: School_Safety_Url,
    async: false,
    sucess: function() {},
    error: function() {},
});


var Climate_Data;
Climate_Data_Url = "https://api.weather.gov/points/40.7291,-73.9965/forecast"
$.ajax({
    type: "GET",
    url: School_Safety_Url,
    async: false,
    sucess: function(results) {
        Climate_data = JSON.parse(results)
        console.log("Please")
    },
    error: function() {},
});