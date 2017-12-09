var labels = [ "Spring", "Summer", "Fall", "Winter" ];


class chart {
	
	constructor(label, data, data2 = null) {
		this.data = data;
		this.data2 = data2;
		this.label = label;
		
		this.svg = d3.select("#nycClimateData")
			.append("svg")
			.attr("width", "200")
			.attr("height", "200")
		;
		
		this.margin = {top: 20, right: 20, bottom: 20, left: 30};
		this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
		this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom
		
		this.x = d3.scaleLinear().rangeRound([0, this.width]);
		var y = d3.scaleLinear().rangeRound([this.height, 0]);
		
		this.axis = d3.scaleBand().rangeRound([0, this.width]);
		
		this.x.domain([0, 4]);
		y.domain([0, d3.max(data)]);
		this.axis.domain(labels);
		
		this.g = this.svg.append("g")
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

		
		this.g.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + this.height + ")")
			.call(d3.axisBottom(this.axis))
		;

		this.g.append("g")
			.attr("class", "yAxis")
			.call(d3.axisLeft(y))
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
		;
		
		this.barWidth = Math.floor(this.width / 9);
		this.fullBarWidth = Math.floor(2 * this.width / 9);
	}
	
	render(data = null, data2 = null) {
		if(data) this.data = data;
		if(data2) this.data2 = data2;
		
		if(this.data2 === null)
			this.singleRender();
		else
			this.multiRender();
	}
	
	singleRender() {
		var nyc = this.g.selectAll(".bar").data(this.data);
		
		var y = d3.scaleLinear().rangeRound([this.height, 0]);
		
		var d = d3.extent(this.data);
		var minMod = d[0] % 10;
		if(minMod < 0) minMod = 10 + minMod;
		if(d[0] > 0) d[0] = 0;
		//d[0] -= minMod ? minMod : 10;
		y.domain(d);
		
		var yAxis = this.g.selectAll(".yAxis");
		
		var w = this.fullBarWidth;
		
		
		yAxis.call(d3.axisLeft(y))
		.append("text")
			.attr("transform", "translate(-10, -20)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "middle")
			.text(this.label)
		;
		
		nyc.enter().append("rect")
			.attr("class", "bar")
			.attr("x", (d, i) => this.x(i + 0.5) - w/2)
			.attr("y", (d) => y(d) )
			.attr("width", w)
			.attr("height", (d) => this.height - y(d) )
		;
		
		nyc.transition()
			.attr("height", (d) => this.height - y(d) )
			.attr("y", (d) => y(d) )
		;
	}
	
	multiRender() {
		var nyc =	this.g.selectAll(".bar").data(this.data);
		var other =	this.g.selectAll(".bar2").data(this.data2);
		
		var y = d3.scaleLinear().rangeRound([this.height, 0]);
		
		var nmin = d3.min(this.data);
		var omin = d3.min(this.data2);
		var min = (nmin < omin) ? nmin : omin;
		var minMod = min % 10;
		if(minMod < 0) minMod = 10 + minMod;
		if(min > 0) min = 0;
		//min -= minMod ? minMod : 10;
		
		var nmax = d3.max(this.data);
		var omax = d3.max(this.data2);
		var max = (nmax > omax) ? nmax : omax;
		
		y.domain([min, max]);
		
		var yAxis = this.g.selectAll(".yAxis");
		
		var w = this.barWidth;
		
		yAxis.call(d3.axisLeft(y))
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
		;
		
		nyc.enter().append("rect")
			.attr("class", "bar")
			.attr("x", (d, i) => this.x(i + 0.5) - w )
			.attr("y", (d) => y(d) )
			.attr("width", w)
			.attr("height", (d) => this.height - y(d) )
		;
		
		other.enter().append("rect")
			.attr("class", "bar2")
			.attr("x", (d, i) => this.x(i + 0.5) )
			.attr("y", (d) => y(d) )
			.attr("width", w)
			.attr("height", (d) => this.height - y(d) )
		;
		
		
		nyc.transition()
			.attr("height", (d) => this.height - y(d) )
			.attr("y", function(d) { return y(d); })
		;
		
		other.transition()
			.attr("height", (d) => this.height - y(d) )
			.attr("y", (d) => y(d) )
		;
	}
}
/*
d3.select("#nycClimateData")
	.append("svg")
	.attr("width", "200")
	.attr("height", "200")
;

var svg = d3.select("svg");
var margin = {top: 20, right: 20, bottom: 20, left: 30},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom
;

var x = d3.scaleLinear().rangeRound([0, width]);
var y = d3.scaleLinear().rangeRound([height, 0]);

var axis = d3.scaleBand().rangeRound([0, width]);


var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data	= [ 0, 0, 0, 0 ];
var data2	= [ 0, 0, 0, 0 ];

x.domain([0, 4]);
y.domain([0, d3.max(data)]);
axis.domain(labels);



var barWidth = Math.floor(width / 9);
var fullBarWidth = Math.floor(2 * width/9);

function render(ny_temps, other_temps = null) {
	
	function singleRender() {
		var nyc = g.selectAll(".bar").data(ny_temps);
		
		var y = d3.scaleLinear().rangeRound([height, 0]);
		
		var d = d3.extent(ny_temps);
		minMod = d[0] % 10;
		if(minMod < 0) minMod = 10 + minMod;
		d[0] -= minMod ? minMod : 10;
		
		y.domain(d);
		
		var yAxis = g.selectAll(".yAxis");
		
		var w = fullBarWidth;
		
		yAxis.call(d3.axisLeft(y))
		.append("text")
			//.attr("transform", "translate(-20, -20)rotate(-90)")
			.attr("transform", "translate(-10, -20)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "middle")
			.text("°F")
		;
		
		nyc.enter().append("rect")
			.attr("class", "bar")
			.attr("x", (d, i) => x(i + 0.5) - w/2)
			.attr("y", (d) => y(d) )
			.attr("width", w)
			.attr("height", function(d) { return height - y(d); })
		;
		
		nyc.transition()
			.attr("height", function(d) { return height - y(d); })
			.attr("y", function(d) { return y(d); })
		;
	}
	
	function multiRender() {
		var nyc =	g.selectAll(".bar").data(ny_temps);
		var other =	g.selectAll(".bar2").data(other_temps);
		
		var y = d3.scaleLinear().rangeRound([height, 0]);
		
		var nmin = d3.min(ny_temps);
		var omin = d3.min(other_temps);
		var min = (nmin < omin) ? nmin : omin;
		var minMod = min % 10;
		if(minMod < 0) minMod = 10+minMod;
		min -= minMod ? minMod : 10;
		
		var nmax = d3.max(ny_temps);
		var omax = d3.max(other_temps);
		var max = (nmax > omax) ? nmax : omax;
		
		var yAxis = g.selectAll(".yAxis");
		
		var w = barWidth;
		
		yAxis.call(d3.axisLeft(y))
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
			.text("Frequency")
		;
		
		nyc.enter().append("rect")
			.attr("class", "bar")
			.attr("x", (d, i) => x(i + 0.5) - w )
			.attr("y", (d) => y(d) )
			.attr("width", w)
			.attr("height", function(d) { return height - y(d); })
		;
		
		other.enter().append("rect")
			.attr("class", "bar2")
			.attr("x", (d, i) => x(i + 0.5) )
			.attr("y", (d) => y(d) )
			.attr("width", w)
			.attr("height", function(d) { return height - y(d); })
		;
		
		
		nyc.transition()
			.attr("height", function(d) { return height - y(d); })
			.attr("y", function(d) { return y(d); })
		;
		
		other.transition()
			.attr("height", function(d) { return height - y(d); })
			.attr("y", function(d) { return y(d); })
		;
		
	}
	
	if(other_temps === null)
		singleRender();
	else
		multiRender();

}

//render(data, data2);
//render(data);

function fun() {
	function r(min, max) {
		return Math.floor(Math.random() * (max - min + 1) ) + min;
	}

	for(var i = 0; i < data.length; i++) {
		data[i] = r(-32, 100);
		data2[i] =r(-32, 100);
	}
	//render(data, data2);
	render(data);
}
//fun();
/*setInterval( ()=> {
	fun();
}, 300);
*/