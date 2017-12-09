//used to know the average price of rent of houses in an area near the university
const DATASET_10003 = "https://www.quandl.com/api/v3/datasets/ZILLOW/Z10003_MRPST.json?api_key=zgsyrViMPsK9VubpGUkQ";
const DATASET_10012 = "https://www.quandl.com/api/v3/datasets/ZILLOW/Z10012_MRP1B.json?api_key=zgsyrViMPsK9VubpGUkQ";
const DATASET_10014 = "https://www.quandl.com/api/v3/datasets/ZILLOW/Z10014_MLP1B.json?api_key=zgsyrViMPsK9VubpGUkQ";

// Prices for month
var PricesPerMomth = ["a","b"]; 
//Obtein a data from a URL
function getDataFromURL(URL) {
  var data = $.get(URL,function(){
    //PricesPerMomth[0].push(data.responseJSON.dataset.data);
    PricesPerMomth[0]=data.responseJSON.dataset.data;
  })
    .done(function(){

    })
    .fail(function(error){
      console.log(error)
    })
}
//Update all data sets
function UpdateTable(){
  tableReference = $("#mainTableBody")[0];
  var newRow, price , year;
  newRow = tableReference.insertRow(tableReference.rows.length);
  year = newRow.insertCell(0);
  price = newRow.insertCell(1);
  year.innerHTML = PricesPerMomth[0][0][0];
  price.innerHTML = PricesPerMomth[0][0][1];
}

function UpdateAllDatasets(){
  var URL = DATASET_10003;
  getDataFromURL(URL);
}
function onGoogleMapResponse(){
    var ubication = {lat: 40.7291, lng: -73.9965};
    map = new google.maps.Map(document.getElementById('googleMapContainer'),{
         //Jason Object
         Zoom : 15,
         center : ubication
    });
    var marker = new google.maps.Marker({
      position: ubication,
      map: map
    });
}

$(document).ready(function(){
  $("#GetData").on("click",UpdateAllDatasets);
  $("#ShowData").on("click",UpdateTable);
})
