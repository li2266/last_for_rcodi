var noaaUrl = "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations";
var tokenFromNoaa = "HwmqLMavaxPYjnQOSotAIfgTDuATbOxb";

var Noaa = $.get({
    url: noaaUrl,
    headers:{
        token: tokenFromNoaa
    },
    success: function(returnedData) {
        console.log(returnedData);
    }
});

