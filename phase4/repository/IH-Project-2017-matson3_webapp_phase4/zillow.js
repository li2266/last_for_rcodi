var zillow = {
	url: "http://www.zillow.com/webservice/"
	,ZWSID: "X1-ZWz18wi1rll05n_a9fju"
	,address: "44 West 4th Street"
	,zip: 10012
	,yqlurl: 'https://query.yahooapis.com/v1/public/yql?q='
	,query: 'select * from xml where url="'
	
	,searchURL: function() {
		var fullUrl = 
			"https://crossorigin.me/"
			+ this.url + 'GetSearchResults.htm?' 
			+ 'zws-id=' + this.ZWSID
			+ '&address=' + encodeURIComponent(this.address)
			+ '&citystatezip=' + this.zip
			+ '&rentzestimate=true'
			+ '&format=xml';
		return fullUrl;
	}
	
	,listURL: function() {
		var fullUrl = 
			"https://crossorigin.me/"
			+ this.url + 'GetSearchResults.htm?' 
			+ 'zws-id=' + this.ZWSID
			+ '&address=' + encodeURIComponent(this.address)
			+ '&citystatezip=' + this.zip
			+ '&rentzestimate=true'
			+ '&format=xml'
		
	}
}

function test() {
	
	$.ajax({
		url: zillow.listURL()
		,beforeSend: (jq, settings) => console.log(settings.url)
	})
	.always((result) => {
		console.log(result);
		//var v = JSON.parse(result);
		//console.log(v);
	});
	
	/*$.ajax({
		url: zillow.url + "GetSearchResults.htm"
		,data: {
			"zws-id": zillow.ZWSID
			,address: "2114 Bigelow Ave"
			,citystatezip: "Seattle, WA"
			,rentzestimate: true
		}
		,error: ajaxErrorHandler
	}).done( (result) => {
		console.log(this.url);
	}).always(()=>{
		console.log(this.url);
	})/**/
}

function handleIt(result) {
	console.log(result);
}

function ajaxErrorHandler(xqhxr, status, error) {
	console.log(xqhxr);
	console.log(status);
	console.log(error);
}