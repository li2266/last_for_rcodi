var zillow = {
	url: "http://www.zillow.com/webservice/"
	,ZWSID: "X1-ZWz18wi1rll05n_a9fju"
	,address: "44 West 4th Street"
	,zip: 10012
}

function test() {
	//Not done; Hard to get working
	/*$.ajax({
		url: "https://query.yahooapis.com/v1/public/yql?q=select *"
	})*.
	
	/*$.ajax({
		url: zillow.url + "GetSearchResults.htm"
		,type: "GET"
		,contentType: "text/plain"
		,dataType: "json"
		,xhrFields: {ithCredentials: false}
		,headers:{Accept:"application/json"}
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
	})*/
}

function handleIt(result) {
	console.log(result);
}

function ajaxErrorHandler(xqhxr, status, error) {
	console.log(xqhxr);
	console.log(status);
	console.log(error);
}