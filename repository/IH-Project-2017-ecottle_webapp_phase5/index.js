
function climate() {
    
    $.ajax({
        url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets";
        data:
    })
    document.getElementById("btn").addEventListener("click", function () {
        alert("Hi! :)");
    });
})();

//create a new httprequest for this session
var xmlhttp = new XMLHttpRequest();
//json format data resource url 
var url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/dbAFRXqgZVOaUpZvkowqxvkQDESAEKJU";
xmlhttp.open("GET", url, true);
xmlhttp.responseType = 'json';
xmlhttp.send();

var requestBike = new XMLHTttpRequest();

var urlBike = "Bicycle Routes Across New York State https://catalog.data.gov/dataset/bicycle-routes-across-new-york-state";
requestBike.open("GET", urlBike, true);
requestBike.requestType = 'json';
requestBike.send();