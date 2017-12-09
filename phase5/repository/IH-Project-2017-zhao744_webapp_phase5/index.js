

var NCDC_TOKEN = "RzyOYHaNfSodkWMBLfICKqBDkAJZVnLM";
var ncdcURL = "https://www.ncdc.noaa.gov/cdo-web/api/v2/"

class Seasonal {
	constructor(spring = null, summer = null, autumn = null, winter = null) {
		this.a = [spring, summer, autumn, winter];
	}
	
	get set() {
		return (this.a[0] !== null && this.a[1] !== null && this.a[2] !== null && this.a[3] !== null);
	}
	
	toString() {
		return "<br>Spring: " + this.a[0].toString() + "<br>Summer: " + this.a[1].toString() + "<br>Fall: " + this.a[2].toString() + "<br>Winter: " + this.a[3].toString();
	}
}
function NCDCgetCityID(city, cOffset = 0) {
	return new Promise(function(resolve, reject) {
		var limitSz = 1000;
		$.ajax({
			url: ncdcURL + "locations",
			data: {
				limit: limitSz,
				offset: cOffset,
				sortOrder: name
			}
			,headers: {token: NCDC_TOKEN }
			
			,error: (xqhxr, status, error) => reject(error)
		}).done(function(result){
			var dataList = result.results;
			var index = binarySearch(0, 1000, dataList, city, valueToCity, CityCompare);
			
			if(index < 0) reject("Does not exist");
			if(index >= limitSz) {
				NCDCgetCityID(city, cOffset + limitSz).then(
				(id) => resolve(id),
				(error) => reject(error)
				);
				return;
			}
			resolve(dataList[index].id);
		});
	});
}

function NCDCgetAverageTemperatures(id) {
	return new Promise(function(resolve, reject){
		
		var date = getTenYearRange();
		var startDate = date.start;
		var endDate = date.end;
		
		var returnTemp = new Seasonal();
		
		function errorWrapper(xqhxr, status, error) { reject(error); }
		
		NCDCdataGet("NORMAL_ANN", "MAM-TAVG-NORMAL", startDate, endDate, id, errorWrapper)
		.done( (result) => {
			returnTemp.a[0] = extractBestAverage(result)/10;
			if(returnTemp.a[0] === null) { console.log(result); reject("Could not find valid spring temperature"); }
			if(returnTemp.set) resolve(returnTemp);
		});
		
		NCDCdataGet("NORMAL_ANN", "JJA-TAVG-NORMAL", startDate, endDate, id, errorWrapper)
		.done( (result) => {
			returnTemp.a[1] = extractBestAverage(result)/10;
			if(returnTemp.a[1] === null) { console.log(result); reject("Could not find valid summer temperature"); }
			if(returnTemp.set) resolve(returnTemp);
		});
		
		NCDCdataGet("NORMAL_ANN", "SON-TAVG-NORMAL", startDate, endDate, id, errorWrapper)
		.done( (result) => {
			returnTemp.a[2] = extractBestAverage(result)/10;
			if(returnTemp.a[2] === null) { console.log(result); reject("Could not find valid fall temperature"); }
			if(returnTemp.set) resolve(returnTemp);
		});
		
		NCDCdataGet("NORMAL_ANN", "DJF-TAVG-NORMAL", startDate, endDate, id, errorWrapper)
		.done( (result) => {
			returnTemp.a[3] = extractBestAverage(result)/10;
			if(returnTemp.a[3] === null) { console.log(result); reject("Could not find valid winter temperature"); }
			if(returnTemp.set) resolve(returnTemp);
		});
	
	});
}

function NCDCgetAnnualPrecipitationDays(id) {
	return new Promise(function(resolve, reject){
		
		var date = getTenYearRange();
		var startDate = date.start;
		var endDate = date.end;
		
		var returnTemp = new Seasonal();
		
		function errorWrapper(xqhxr, status, error) { reject(error); }
		
		NCDCdataGet("NORMAL_ANN", "MAM-PRCP-AVGNDS-GE100HI", startDate, endDate, id, errorWrapper)
		.done( (result) => {
			returnTemp.a[0] = extractBestAverage(result);
			if(returnTemp.a[0] === null) { console.log(result); reject("Could not find valid spring temperature"); }
			if(returnTemp.set) resolve(returnTemp);
		});
		
		NCDCdataGet("NORMAL_ANN", "JJA-PRCP-AVGNDS-GE100HI", startDate, endDate, id, errorWrapper)
		.done( (result) => {
			returnTemp.a[1] = extractBestAverage(result);
			if(returnTemp.a[1] === null) { console.log(result); reject("Could not find valid summer temperature"); }
			if(returnTemp.set) resolve(returnTemp);
		});
		
		NCDCdataGet("NORMAL_ANN", "SON-PRCP-AVGNDS-GE100HI", startDate, endDate, id, errorWrapper)
		.done( (result) => {
			returnTemp.a[2] = extractBestAverage(result);
			if(returnTemp.a[2] === null) { console.log(result); reject("Could not find valid fall temperature"); }
			if(returnTemp.set) resolve(returnTemp);
		});
		
		NCDCdataGet("NORMAL_ANN", "ANN-SNWD-AVGNDS-GE001WI", startDate, endDate, id, errorWrapper)
		.done( (result) => {
			returnTemp.a[3] = (extractBestAverage(result)/10) + " days with and inch or more of snow on the ground";
			if(returnTemp.a[3] === null) { console.log(result); reject("Could not find valid winter temperature"); }
			if(returnTemp.set) resolve(returnTemp);
		});
	
	});
}


function extractBestAverage(rawData) {
	var data = rawData.results;
	
	var attributePreference = ["C", "S", "R", "P", "Q"];
	for(var i = 0; i < attributePreference.length; i++) {
		var cAttribute = attributePreference[i];
		var sum = 0;
		var number = 0;
		for(var j = 0; j < data.length; j++) {
			if(data[j].attributes == cAttribute) {
				sum += data[j].value;
				number++;
			}
		}
		
		if(number != 0) {
			return (sum / number);;
		}
	}
	return null;
}

function getTenYearRange() {
		var date = new Date();
		var year = date.getFullYear();
		var month= date.getMonth().toString();
		var day  = date.getDate().toString();
		
		if(month.length != 2) month = "0" + month;
		if(day.length != 2) day = "0" + day;
		
		var endDate = year.toString();
		if(endDate.length != 4) reject("ERROR: Current year (" + endDate + ") is not 4 digits long");
		endDate = endDate + "-" + month + "-" + day; //YYYY-MM-DD
		
		var startDate = (year - 10).toString();
		if(startDate.length !=4) reject("ERROR: Current year (" + startDate + ") is not 4 digits long");
		startDate = startDate + "-" + month + "-" + day; //YYYY-MD-DD
		
		return { start: startDate, end: endDate };
	
}

function NCDCdataGet(dataSetID, dataTypeID, startDate, endDate, locationID, rejection) {
	return $.ajax({
			url: ncdcURL + "data",
			data: {
				datasetid: dataSetID
				,datatypeid: dataTypeID
				,startdate: startDate
				,enddate: endDate,
				includemetadata: false
				,limit: 1000
				,locationid: locationID
			}
			,headers: {token: NCDC_TOKEN }
			
			,error: rejection
		})
}

 
function NCDCgetAllDataTypes(index = 0) {
	return new Promise( (resolve, reject) => {
		
		var date = new Date();
		var year = date.getFullYear();
		var month= date.getMonth().toString();
		var day  = date.getDate().toString();
		
		if(month.length != 2) month = "0" + month;
		if(day.length != 2) day = "0" + day;
		
		var endDate = year.toString();
		if(endDate.length != 4) reject("ERROR: Current year (" + endDate + ") is not 4 digits long");
		endDate = endDate + "-" + month + "-" + day; //YYYY-MM-DD
		
		var startDate = (year - 1).toString();
		if(startDate.length !=4) reject("ERROR: Current year (" + startDate + ") is not 4 digits long");
		startDate = startDate + "-" + month + "-" + day; //YYYY-MD-DD
		
		$.ajax({
			url: ncdcURL + "datatypes",
			data: {
				datasetid:	"NORMAL_ANN"
				,limit: 	1000
			}
			,headers: {token: NCDC_TOKEN }
			
			,error: (xqhxr, status, error) => reject(error)
		}).done( (result) => {
			console.log(result);
			resolve(result);
			if(result.metadata.count < index) NCDCgetAllDataTypes(index + 1000);
		});
	});
}




class City {
	constructor(city, country, state = null) {
		this.city = city;
		this.country = country;
		this.state = state;
	}
}

function CityCompare(a, b) {
	if(a === b) return 0;
	if(a == null) return 1;
	if(b == null) return -1;
	
	var comp = stringCompare(a.country, b.country);
	if(comp != 0) return comp;
	
	comp = stringCompare(a.state, b.state);
	if(comp != 0) return comp;
	
	comp = stringCompare(a.city, b.city);
	return comp;
}

function valueToCity(value) {
	var string = value.name;
	
	var commaIndex = string.indexOf(",");
	var city = string.substring(0, commaIndex);
	
	var country = string.substring(commaIndex + 2);
	var spaceIndex = country.indexOf(' ');
	
	if(spaceIndex == -1) return new City(city, country);
	var state = country.substring(0, spaceIndex);
	
	country = country.substring(spaceIndex + 1);
	return new City(city, country, state);
}

function binarySearch(start, end, array, value, dataProcessor, compare) {
	var left = start;
	var right = end - 1;
	
	while(left <= right) {
		var mid = left + Math.floor((right - left)/2);
		midValue = dataProcessor(array[mid]);
		var comp = compare(midValue, value);

		if(comp == 0) return mid;
		else if(comp < 0) {
			left = mid + 1;
		} else 
			right = mid - 1;
	}
	
	if(left > end || right > end) return end + 1;
	if(right < start || left < start) return start - 1;
	
	if(compare(array[left], value)) return left;
	else return right;
}
class NewYorkCityClimate {
	constructor(id=null, temp=null, rain=null) {
		this.id = id;
		this.temp = temp;
		this.rain = rain;
	}
	
	updateID(id) {
		this.id = id;
		updateNYCClimateData(this);
	}
	
	updateTemperature(temp) {
		this.temp = temp;
		updateNYCClimateData(this);
	}
	
	updateRain(rain) {
		this.rain = rain;
		updateNYCClimateData(this);
	}
}

function stringCompare(a, b){
	if(a === b) return 0;
	if(a == null) return 1;
	if(b == null) return -1;
	
	var minStringLength = (a.length < b.length)? a.length : b.length;
	
	for(var i = 0; i < minStringLength; i++) {
		var charA = a.charAt(i);
		var charB = b.charAt(i);
		if(charA == charB) continue;
		
		if(charA < charB) return -1;
		else return 1;
	}
	
	if(a.length > b.length) return 1;
	else return -1;
}

var climate = new NewYorkCityClimate(null, null, null);

function updateNYCClimateData(climateStructure) {
	var text = $("#nycClimateData");
	
	function smartAppend(value) {
		if(value === null) text.append("Loading...");
		else text.append(value.toString());
	}
	
	text.append("<br><b>Temperatures</b>: ");
	smartAppend(climateStructure.temp);
	
	text.append("<br><b>Precipitation Level Forecast</b>: ");
	smartAppend(climate.rain);
}

function appendToData(string) {
	$("#data").append(string + "<br>");
}

$(document).ready( function() {
	updateNYCClimateData(climate);
	
	test();
	
	
	NCDCgetCityID(new City("New York City", "US", "NY")).then(
	(id) => {
		
		climate.updateID(id);
		    
	    function getRain() {
			setTimeout( () => {
				NCDCgetAnnualPrecipitationDays(climate.id).then(
			    (rain) => { climate.updateRain(rain); }, 
			    (error) => climate.updateRain("<b>Unavailable</b>: " + error)
		    )}, 1000);
	    }
		
		NCDCgetAverageTemperatures(climate.id).then(
    		(temp) => {
    			climate.updateTemperature(temp);
    			getRain();
    		    
    		}
    		,(error) => {
    			climate.updateTemperature("<b>Unavailable</b>: " + error)
    			getRain();
		});
		
	}, (error) => climate.updateID(error)
	);
});


