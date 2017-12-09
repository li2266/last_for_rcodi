var map;
var geocoder;
var data;
function codeAddress() {
	for(var i = start; i < start + 1 && i < data.length; i++){
		var address = data[i].name;
		getLocation(address, i);
	}
	start = start + 1;
}
var start = 0;
function getLocation(address, index){
	geocoder.geocode({ 'address': address}, function(results, status) {
		if (status == 'OK') {
			data[index].result = results[0];
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}
var str="";
function concatstr(){
	for(var i = 0; i < data.length; i++){
		str+='{"name":"'+data[i].name+'","code":"'+data[i].code+'","addr1":"' 
		+ data[i].result.address_components[0].long_name+'","addr2":"'
		+ data[i].result.address_components[1].long_name+'","addr3":"'
		+ data[i].result.address_components[2].long_name+'","lng":' 
		+ data[i].result.geometry.location.lng()+',"lat":'+data[i].result.geometry.location.lat()+'},'
	}
	str = str.substr(0, str.length - 1);
}
var totalIndex = 0;
function getDataAddr(){
	getLocation(data[totalIndex].name, totalIndex);
	totalIndex++;
	if(totalIndex >= data.length){
		return;
	}
	setTimeout(function(){
		getDataAddr();
	}, 
	5000);
}
//date format
Date.prototype.Format = function (fmt) {
  var o = {
    "y+": this.getFullYear(),
    "M+": this.getMonth() + 1,              
    "d+": this.getDate(),     
    "h+": this.getHours(),           
    "m+": this.getMinutes(),           
    "s+": this.getSeconds(),              
    "q+": Math.floor((this.getMonth() + 3) / 3), 
    "S+": this.getMilliseconds()       
  };
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)){
      if(k == "y+"){
        fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
      }
      else if(k=="S+"){
        var lens = RegExp.$1.length;
        lens = lens==1?3:lens;
        fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1,lens));
      }
      else{
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
  }
  return fmt;
}


function navigateToMap(ind){
	for(var i = 0; i < markers.length; i++){
		var curmk = markers[i];
		if(curmk.locInfo.index == ind){
			map.setZoom(16);
			map.setCenter(curmk.getPosition());
			$(curmk).trigger("click");
			return;
		}
	}
}
var markers;
var markerCluster;
function displayInMap(results){
	if(typeof(markers) != "undefined" && typeof(markers) != "null"){
		for(var i = 0; i < markers.length; i++){
			markers[i].setMap(null);
			markers[i].unbindAll();
			markers[i] = null;
		}
		markers=[];
	}
	markers = results.map(function(location, i) {
	  return new google.maps.Marker({
		position: {"lat":location.lat,"lng":location.lng},
		label: {"text":location.name, "color":"blue"},
		locInfo: location
	  });
	});
	if(typeof(markerCluster) != "undefined" && typeof(markerCluster) != "null"){
		markerCluster.clearMarkers();
		markerCluster.removeMarkers(markerCluster.getMarkers());
		markerCluster = null;
		markerCluster = new MarkerClusterer(map, markers, {
	imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
		markerCluster.redraw();
	}
	else{
		markerCluster = new MarkerClusterer(map, markers, {
	imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
	}
	
	// Add a marker clusterer to manage the markers.
	markers.forEach(function(mark,i){
		mark.addListener('click', function(event) {
			markerClick(event, this, mark);
		});
	});
}
var infowindow;
function markerClick(event, $this, mark){
	if(typeof(infowindow)!="undefined" && typeof(infowindow)!="null"){
				infowindow.close();
			}	
			var thisloc = $this.locInfo;
			(function(loc, thismark){
				$.ajax({
					url:'https://www.ncdc.noaa.gov/cdo-web/api/v2/locations/' + thisloc.addr2,
					data:{'locationcategoryid': 'ST'},
					headers:{ 
						token:'rpCOPOcHbIzaTTBvDOJXUXRqDJnjbOll'
					},
					success: function(data,textStatus,jqXHR){
			
						$("#sohot").css("color", "red");
					}
				});
				var nowDate = new Date();
				$.ajax({
					url: "https://www.quandl.com/api/v3/datasets/ZILLOW/N" + 
					loc.code + "_PRRAH?api_key=GXyB8tSNm_Ls6DFbAPfB",
					type: "GET",
					dataType: "html",
					success: function(succ, textStatus, jqxHR){
						var dataStart = succ.indexOf('"data": [');
						var dataStr = succ.substring(dataStart+8, succ.indexOf('"collapse":', dataStart)-1);
						dataStr = dataStr.substr(0, dataStr.lastIndexOf(','));
						var dataArr = eval(dataStr);
						var srcArr = [];
						$.each(dataArr, function(index, ele){
							srcArr.push({"date": new Date(ele[0]), "val": ele[1]});
						});
						
						var svg = d3.select('svg');

						var margin = {top: 10, right: 10, bottom: 50, left: 50},
						width = +svg.attr("width") - margin.left - margin.right,
						height = +svg.attr("height") - margin.top - margin.bottom,
						g = svg.append("g").attr("transform", 
						"translate(" + margin.left + "," + margin.top + ")");

						var x = d3.scaleTime()
							.rangeRound([0, width]);

						var y = d3.scaleLinear()
							.rangeRound([height, 0]);

						var line = d3.line()
							.x(function(d) { 
							    return x(d.date); 
							    
							})
							.y(function(d) { 
							    return y(d.val); 
							    
							});


						x.domain(d3.extent(srcArr, function(d) {
						    return d.date; 
						    
						}));
						y.domain(d3.extent(srcArr, function(d) { 
						    return d.val;
						    }));
						
						
						var xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat(""));
						g.append("g")
						  	.attr("transform", "translate(0," + height + ")")
						  	.call(xAxis)
							.append('text')
							.text('month')
							.attr('transform', 'translate(' + width + ', 0)');
						var yAxis = d3.axisLeft(y).ticks(5);
						g.append("g")
							.call(yAxis)
							.append("text")
							.attr("fill", "#000")
							.attr("transform", "rotate(-90)")
							.attr("y", 6)
							.attr("dy", "0.71em")
							.attr("text-anchor", "end")
							.text("Price($)");

						g.append("path")
							.datum(srcArr)
							.attr("fill", "none")
							.attr("stroke", "steelblue")
							.attr("stroke-linejoin", "round")
							.attr("stroke-linecap", "round")
							.attr("stroke-width", 1.5)
							.attr("d", line);
						var xArr = [],yArr=[];
						$.each(srcArr, function(dt, ind){
							xArr.push(dt.date);
							yArr.push(dt.val);
						});
					},
				});
			}(thisloc, mark));
			infowindow = new google.maps.InfoWindow({
				content: 
				'<div id="detailDiv">' + 
					'<h1>' + thisloc.addr1 + ',' + thisloc.addr2 + '</h1>' +
					'<h4 style="margin:3px 0 3px 0;">Safety:</h3><div style="text-align:center;">' + 
					thisloc.safety + '</div>' + 
					'<span style="font-size:0.8em;color:gray;font-style:italic;float:right;">(the higher ther safer)</span>' +
					'<h4 style="margin:3px 0 3px 0;">Weather:</h3><div style="text-align:center;">' 
					+ 'it has a rainy climate here.' + '</div>' + 
					'<h3 style="margin-bottom:3px;">History Price Trend</h3>' +
					'<svg height="300" width="300"></svg>' + 
				'</div>'
			});
			infowindow.open(map, mark);
}

$(document).ready(function(){
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 40.7291, lng: -73.9965},
	  zoom: 13
	});
	geocoder = new google.maps.Geocoder();
	afterDocMapReady();
});