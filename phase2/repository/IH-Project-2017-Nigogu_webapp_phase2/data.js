var ejemplo = "https://www.quandl.com/api/v3/datasets/ZILLOW/N9_MRP2B.json?api_key=ync2xgJFoeiEyGtvbQcX";

/*
https://catalog.data.gov/dataset/new-york-city-population-by-boroughs-fd2c0 
https://catalog.data.gov/dataset/new-york-city-museums 
https://catalog.data.gov/dataset/new-york-city-art-galleries 
https://catalog.data.gov/dataset/fire-department-directory-for-new-york-state 
https://catalog.data.gov/dataset/housing-new-york-units-by-building
https://catalog.data.gov/dataset/bank-owned-atm-locations-in-new-york-state 
https://catalog.data.gov/dataset/neighborhood-names-gis 
https://catalog.data.gov/dataset/air-quality-ef520 
https://catalog.data.gov/dataset/school-safety-report-8067a 
*/

$(document).ready(function(){
  document.getElementById("search").onclick = function () {
         getDataFromURL(ejemplo);
  };
});


function getDataFromURL(URL) {
  var data = $.get(URL, function() {
    //console.log(URL);
  })
  .done( function(){
    console.log(data);
  })
  .fail(function(error){
    console.error(error);
  })
}
