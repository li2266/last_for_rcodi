mydata = null;

$(document).ready(function(){
    $("#btn").click( function () {
        alert("Hi! :)");
        $.ajax({
            url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/locations", 
            data:{}, 
            headers:{ 
                token:"nZyWesNgmnHkQYKQsvkCArBxFODJktsv" 
                
            },
            success:function(data){
                console.log(data.results[0]);
                mydata = data;
            }
        });
    });
});
