var map;
var market0;

var artmarket=[];
var musmarket=[];
var schmarket=[];
var rentmarket=[];

var artGalleryData = []; 
var museumData = []; 
var schoolData = []; 
var streetData = [];

var rentList=[];

var manhattanZip=["10003","10011","10014","10012"]

var token="sBCHKqeIGFtIYzftYfcTldsyqGjyYdjw";
var zid ="X1-ZWz18wv3cye2a3_aypsc";
var urlZip = "http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id="+zid+"&state=NY&county=new+york&childtype=zipcode";

var musIcon= "https://www.flaticon.com/premium-icon/icons/png/512/203/203210.png";
var schIcon="https://image.flaticon.com/icons/png/512/167/167707.png";
var artIcon="https://image.flaticon.com/icons/png/512/223/223226.png";
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Map Functions

function initMap(){
	var NYUSSB={lat: 40.7291, lng: -73.9965};
	var mapDiv = document.getElementById('map');
	map = new google.maps.Map(mapDiv, {
		center: NYUSSB,
		zoom: 14});
        
	var marker0 = new google.maps.Marker({
		position: NYUSSB,
		label: 'U',
		map:map,
		title: 'NYU Stern School of Business'
	})
}

function addDataMarkets(dataL,dataM,iconD){
	for (var i = 0; i < dataL.length; i++) {
		var marker = new google.maps.Marker({
			position: {lat: dataL[i][1], lng: dataL[i][2]},
			map:map,
			title: dataL[i][0],
			icon: new google.maps.MarkerImage( iconD, undefined, undefined, undefined, new google.maps.Size(20, 20))
		})	
		dataM.push(marker);
	}
}

function addRentalMarkets(dataL,dataM){
	for (var i = 0; i < dataL.length; i++) {
		if (parseFloat(dataL[i].amount)>=document.forms["form1"]["price"].value) {
			var marker = new google.maps.Marker({
			position: {lat: parseFloat(dataL[i].lat), lng: parseFloat(dataL[i].log)},
			map:map,
			title: dataL[i].address,
			icon: new google.maps.MarkerImage( "https://image.flaticon.com/icons/svg/125/125296.svg" , undefined, undefined, undefined, new google.maps.Size(30, 30))
		})	
		dataM.push(marker);
		}

	}
}


function removeMarket(market) {
    for(i=0; i<market.length; i++){
        market[i].setMap(null);
    }
}
function hideMarket(market) {
    for(i=0; i<market.length; i++){
        market[i].setMap(null);
    }
}

function cleanMarkets(){
	removeMarket(artmarket);
	removeMarket(musmarket);
	removeMarket(schmarket);
	removeMarket(rentmarket);
	artmarket=[];
	musmarket=[];
	schmarket=[];
	rentmarket=[];
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function loadApp(){
		var tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
	streetNYC();
	museumsL();
	artGalerias();
	schoolL();
	document.getElementById("defaultOpen").click();
}

document.getElementById("sendData").addEventListener("click", function(){
	cleanMarkets();
	addRentalMarkets(rentList,rentmarket);
	if(document.forms["form1"]["ArtGalleries"].checked){
		addDataMarkets( artGalleryData, artmarket, artIcon );
	}
	if (document.forms["form1"]["Museums"].checked) {
		addDataMarkets( museumData, musmarket, musIcon );
	}
	if (document.forms["form1"]["Schools"].checked) {
		addDataMarkets( schoolData, schmarket, schIcon);
	}
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Get Rental Info
function streetNYC(){
  	var requestURL = 'https://data.cityofnewyork.us/api/views/7xnr-9g4c/rows.json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		getStreetList(request);
  	}
}

function getStreetList(request){
  	var street = request.response;
	var streetAr=[];

	for (var i = 0; i < street.data.length; i++) {
		if (street.data[i][33]=="ST" /*|| street.data[i][33] == "AVE"*/ ) {
			streetAr[i]={zip: street.data[i][15] , name: street.data[i][37]+' '+street.data[i][33]};
		}
	}

	streetData = streetAr.filter(function(item){
   		return manhattanZip.indexOf(item.zip)!=-1;
	});

	streetData = removeDuplicates(streetData,"name");
	getZillowRent();
}

function removeDuplicates( arr, prop ) {
  var obj = {};
  return Object.keys(arr.reduce((prev, next) => {
    if(!obj[next[prop]]) obj[next[prop]] = next; 
    return obj;
  }, obj)).map((i) => obj[i]);
}

function getZillowRent(){
	var myxml;
	var yqlurl1=[];
	//var yqlurl2=[];

	for (var i = 0; i < streetData.length; i++) {
		
		url="http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18wv3cye2a3_aypsc&address=1+W+"+ streetData[i].name.split(" ").join("+")+"&citystatezip="+streetData[i].zip;

		yqlurl1[i]=	{url:"http://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent("select * from xml where url='"+ url
    	+ "'")+"&format=xml&callback=?"};

    	/*url="http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18wv3cye2a3_aypsc&address=W+"+ streetData[i].name.split(" ").join("+")+"&citystatezip="+streetData[i].zip;
		yqlurl2[i]=	"http://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent("select * from xml where url='"+ url
    	+ "'")+"&format=xml&callback=?";*/
    }

    for (var i = 0; i < 5/*yqlurl1.length*/; i++) {
    	$.getJSON(yqlurl1[i].url, function(data){

        	myxml=data.results[0];
        	parser = new DOMParser();
			xmlDoc = parser.parseFromString(myxml,"text/xml");
			x=xmlDoc.getElementsByTagName("code");
			if(x[0].childNodes[0].nodeValue==0){
				y=xmlDoc.getElementsByTagName("result");
				for (var j = 0; j < y.length; j++) {
					var zpidz=y[j].childNodes[0].childNodes[0].nodeValue;
					var streetz=y[j].childNodes[2].childNodes[0].childNodes[0].nodeValue;
					var latz=y[j].childNodes[2].childNodes[4].childNodes[0].nodeValue;
					var logz=y[j].childNodes[2].childNodes[5].childNodes[0].nodeValue;
					var amountz;
					if (y[j].childNodes[3].childNodes[0].childNodes.length > 0){
    					var amountz=y[j].childNodes[3].childNodes[0].childNodes[0].nodeValue;
						rentList.push({zpid: zpidz, address: streetz, lat: latz, log: logz, amount: amountz});}
				}
			}
   	 	});
    }
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Get museum location data from json
function museumsL(){
	var requestURL = 'https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
  		var museum = request.response;
  		getMuseumList(museum);
	}
}

function getMuseumList(museumjson){
	var musdata=museumjson.data;
	for (var i = 0; i < musdata.length ; i++) {
		var musname = musdata[i][9];
		var muslocation=musdata[i][8];
		muslocation=muslocation.replace( 'POINT (','');
		muslocation=muslocation.replace( ')','');
		muslocation=muslocation.split(' ');
		muslocation=[parseFloat(muslocation[1]),parseFloat(muslocation[0])];
		
		museumData[i]=[musname, muslocation[0],muslocation[1]];
	}
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Add School location markets fron json data to map
function schoolL(){
	var requestURL = 'https://data.cityofnewyork.us/api/views/qybk-bjjc/rows.json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
  		var school_safety = request.response;
  		getSchoolList(school_safety);
	}
}

function getSchoolList(schjson){
	var schdata=schjson.data;
  	for (var i = 0; i < schdata.length; i++) {
  		var schname = schdata[i][11];
		shclocation=[parseFloat(schdata[i][34]),parseFloat(schdata[i][35])];
		schoolData[i]=[schname, shclocation[0],shclocation[1]];
	}
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Add Art Gallery location markets fron json data to map
function artGalerias(){
	var requestURL = 'https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
  		var galart = request.response;
  		getGalleryList(galart);
	}
}

function getGalleryList(artjson){
	var artdata=artjson.data;

	for (var i = 0; i < artdata.length ; i++) {
		var artname = artdata[i][8];

		var artlocation=artdata[i][9];
		artlocation=artlocation.replace( 'POINT (','');
		artlocation=artlocation.replace( ')','');
		artlocation=artlocation.split(' ');
		artlocation=[parseFloat(artlocation[1]),parseFloat(artlocation[0])];

		artGalleryData[i]=[artname, artlocation[0], artlocation[1]]
	}
}

/*function getGalleryList(artjson){
	var artdata=artjson.meta.view.columns;

	for (var i = 0; i < artdata[9].cachedContents.top.length ; i++) {
		var artname = artdata[8].cachedContents.top[i].item;;
		var artlocation=artdata[9].cachedContents.top[i].item.coordinates;
		artGalleryData[i]=[artname, artlocation[1], artlocation[0]]
	}
}*/
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function changeTab(evt, tabN) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabN).style.display = "block";
    evt.currentTarget.className += " active";
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var climaData;
$(document).ready(function(){
	$.ajax({ 
		url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/locations?locationcategoryid=ST&limit=52",
		headers:{ token: token },
		success: function(result){
			climaData = result;
			console.log(climaData);

		} 
	})
})
