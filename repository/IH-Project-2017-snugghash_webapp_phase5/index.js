function initMap() {
    console.log("Gmap works!");
}

function testLoading () {
    quandlTextCodesURL = "https://drive.google.com/file/d/1S2u1DPXorVtnFjUphnjwP1URbuRBx-tf"
    localURL = "data.json"
    testURL = "http://api.open-notify.org/astros.json"
    // loadJSON(testURL, getData, "jsonp") // Not defined
    fetch(testURL)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            });
    // https://stackoverflow.com/a/42272155/1797533
    fetch(localURL)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            });
    fetch(localURL).then(function(response) {
      if(response.ok) {
        return response.blob();
      }
      throw new Error('Network response was not ok.');
    }).then(function(myBlob) { 
      var objectURL = URL.createObjectURL(myBlob); 
      myImage.src = objectURL; 
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
}

/*
Load, clean and organize required data.
*/
function initDatasets() {
    NY_housing_occupancy_tenure_by_borughs = "https://data.ny.gov/api/views/vfrh-bvhu"
    fetch(NY_housing_occupancy_tenure_by_borughs)
        .then(response => response.json())
        .then(json => {
            console.log(json)
        });
        
    weather_data = "https://api.weather.gov/points/40.7291,-73.9965/forecast"
    fetch(weather_data)
        .then(response => response.json())
        .then(json => {
            console.log(json)
        });
}

initDatasets();