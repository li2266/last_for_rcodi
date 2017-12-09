//housing profile submit button
function submitFunction() 
{
    var maxPrice = document.getElementById("txtPriceMax").value;

   
 if (tryParse(maxPrice)===false) //rent check
   {
       if (typeof maxPrice != 'number') //type check
        {
            alert ("Please input a price without the dollar sign (ex. $789 -> 789).");
         }
   }
  else if(parseFloat(maxPrice)<= 1700)
         {
             alert("Sorry there are no results within this budget. Please try a different price point.");
         }
  else  
    {
        alert("Finding your perfect house now!");
        document.getElementById('startInstructions').style.display = 'none';
       //SAVE info
       maxRent = parseFloat(maxPrice);
    }
    
//NY Death Dataset
    var deathURL = "https://data.cityofnewyork.us/api/views/jb7j-dtam/rows.json?accessType=DOWNLOAD";
    $.ajax({
    type: "GET",
    url: deathURL,
    dataType: 'json',
    
 success: function(deathData) {
     //ASSAULT DEATH
    var deathInfo = document.querySelector(".deathA");
    var myd = document.createElement('li');
    console.log(deathData);
    var assault = 0;
    var findAssault = "Assault";
    for (i=0; i< deathData['data'].length; i++)
    {
       if( deathData['data'][i][9].search("Assault") != -1) 
        {
            assault++;
        }
    }
    myd.textContent = assault;
     deathInfo.appendChild(myd);

//ALCOHOL DEATH 
    var deathAlcoholInfo = document.querySelector(".deathB");
    var mya = document.createElement('li');
    var alcohol = 0;
    for (i=0; i< deathData['data'].length; i++)
    {
       if( deathData['data'][i][9].search("Alcohol") != -1) 
        {
            alcohol++;
        }
    }
     mya.textContent = alcohol;
     deathAlcoholInfo.appendChild(mya);
    console.log(deathData);
 }
    });

//rent 
var BrooklynRentURL = "https://www.quandl.com/api/v3/datasets/ZILLOW/N397_MRP1B.json?api_key=cJd3pGaqseWAeCyCR3cE";
$.ajax({
    type: "GET",
    url: BrooklynRentURL,
    dataType: 'json',
   
 success: function( brook ) {
   console.log(brook);
  var priceBrook = document.querySelector(".rentInfo");
  var mybr = document.createElement('li');
  var medianRentBrook = brook['dataset']['data'][0][1];
 // brooklynValue = parseFloat(medianRentBrook);
  mybr.textContent = medianRentBrook;
 priceBrook.appendChild(mybr);
 }
});


//NY available housing by building dataset 
var unitsURL = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";
    
    $.ajax({
    type: "GET",
    url: unitsURL,
    dataType: 'json',
    
  success: function( addressData ) {
     console.log(addressData);
  var unit = document.querySelector(".address");
  var myun = document.createElement('li');
  var number = addressData['data'][625][13];
  var street = addressData['data'][625][14];
  var city = addressData['data'][625][15];
  var zip = addressData['data'][625][16];
  var address = number + " " + street + "\n" + city + ", NY " + zip + " (4.2 miles from NYU)";
     myun.textContent= address;
      unit.appendChild(myun);  
}
});


}

    
//check if a string can be converted to a number    
function tryParse (num) 
{
    if (num !== null)
    {
        if (num.length >0)
        {
            if (!isNaN(num))
            {
                return parseFloat(num);
            }
        }
    }
    return false;
}



 //weather API implementation 
function weather()
{

var weatherURL = "https://api.weather.gov/points/40.7291,-73.9965/forecast";
$.ajax({
    type: "GET",
    url: weatherURL,
    dataType: 'json',
   
 success: function( weather ) {
   console.log(weather);
   var body = document.querySelector(".panel");
   var myp = document.createElement('p');
   var detailedWeatherData =  weather ['properties']['periods'][0]['detailedForecast'];
   myp.textContent = detailedWeatherData;
   $('#panel').empty();
   panel.appendChild(myp);
 }
       
});

}


function temperature()
{
var weatherURL = "https://api.weather.gov/points/40.7291,-73.9965/forecast";
$.ajax({
    type: "GET",
    url: weatherURL,
    dataType: 'json',
   
 success: function( temperatureData ) {
   console.log(temperatureData);
   var button8 = document.querySelector(".temp");
   var myt = document.createElement('p');
   var temp = temperatureData ['properties']['periods'][0]['temperature'] + " degrees " + temperatureData ['properties']['periods'][0]['temperatureUnit'];
   myt.textContent = temp; 
   $('#temp').empty();
   button8.appendChild(myt);
 }
       
});

}


//ACCEPT or REJECT RESULT
function acceptReject()
{
   //window.location.reload();
   alert("Alternative Match: 463 Tompkins Avenue Brooklyn, NY (5.1 miles from NYU)");
 }




//RENT DATASET 
function bronx()
{
var BronxRentURL = "https://www.quandl.com/api/v3/datasets/ZILLOW/CO20_MRPAH.json?api_key=cJd3pGaqseWAeCyCR3cE";
$.ajax({
    type: "GET",
    url: BronxRentURL,
    dataType: 'json',

 success: function( Bronx ) {
   console.log(Bronx);
  var priceBronx = document.querySelector(".bronx");
  var myrb = document.createElement('th');
    var medianRentBronx = Bronx['dataset']['data'][0][1];
   // bronxValue = medianRent;
   // bronxValue = parseFloat(medianRentBronx);
  myrb.textContent = medianRentBronx;
  priceBronx.appendChild(myrb);
 }
});
}



function man(){
var ManRentURL = "https://www.quandl.com/api/v3/datasets/ZILLOW/Z10012_MRP1B.json?api_key=cJd3pGaqseWAeCyCR3cE";
$.ajax({
    type: "GET",
    url: ManRentURL,
    dataType: 'json',
   
 success: function( manh ) {
   console.log(manh);
  var priceMan = document.querySelector(".man");
   var myman = document.createElement('th');
    var medianRentManh = manh['dataset']['data'][0][1];
   // manhValue = parseFloat(medianRentManh);
   myman.textContent = medianRentManh;
   priceMan.appendChild(myman);
 }
});
}

function staten(){
var StatonRentURl = "https://www.quandl.com/api/v3/datasets/ZILLOW/Z10314_MRPST.json?api_key=cJd3pGaqseWAeCyCR3cE";
$.ajax({
    type: "GET",
    url: StatonRentURl,
    dataType: 'json',
   
 success: function( staton ) {
   console.log(staton);
   var priceStaton = document.querySelector(".staton");
  var mystat = document.createElement('th');
   var  medianRentStaton = staton['dataset']['data'][0][1];
  // statonValue = parseFloat(medianRentStaton);
   mystat.textContent = medianRentStaton;
   priceStaton.appendChild(mystat);
 }
});
}


    //QUEENS RENT
    function queens(){
var QueenRentURL = "https://www.quandl.com/api/v3/datasets/ZILLOW/Z11385_MRP1B.json?api_key=cJd3pGaqseWAeCyCR3cE";
$.ajax({
    type: "GET",
    url: QueenRentURL,
    dataType: 'json',
   
 success: function( queen ) {
   console.log(queen);
   var priceQ = document.querySelector(".rentInfo");
  var myqueen = document.createElement('li');
    var medianRentQueen = queen['dataset']['data'][0][1];
   // queenValue = parseFloat(medianRentQueen);
  myqueen.textContent = medianRentQueen;
     $('#rentInfo').empty();
  priceQ.appendChild(myqueen);
   
}
});
}


