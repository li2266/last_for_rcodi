var test = "test";

$(document).ready(function(){
    $("button").click(function(){
      //$.ajax({ url:www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:28801&startdate=2010-05-01&enddate=2010-05-01, headers:{ token:"BuNXXVFLuFkztcQjJsNVphTaJSwpNGQT" } })
      console.log(test);
          });
});


function getDataFromURL(URL) {
  var data = $.get(URL, function() {
    console.log("URL");
  })
  .done( function(){
    //Success
  })
  .fail( function(error){
    console.error(error);
  })
}
