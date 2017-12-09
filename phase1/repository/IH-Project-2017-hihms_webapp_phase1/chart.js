var margin = {top: 10, right: 30, bottom: 30, left: 30};



function plotTemperature(originalDataHigh, originalDataLow) {
    var width =  document.getElementById('chart-temp').offsetWidth - margin.left - margin.right;
    var height = document.getElementById('chart-temp').offsetHeight - margin.top - margin.bottom;
    var color = d3.scale.ordinal()
        .domain(["Low", "High"])
        .range(["#6495ED", "#FFD700"]);
    var data = [];
    var tmax=0, tmin=100;
    var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    for (var i=0; i < originalDataHigh.length; i+=3) {
        var meanHigh = (originalDataHigh[i].value + originalDataHigh[i+1].value + originalDataHigh[i+2].value)/10./3.*1.8 + 32;
        var meanLow = (originalDataLow[i].value + originalDataLow[i+1].value + originalDataLow[i+2].value)/10./3.*1.8 + 32;
        var low = {'name': 'Low', 'y0': 0, 'y1': meanLow};
        var high = {'name': 'High', 'y0': meanLow, 'y1': meanHigh};
        data.push({'temp': [low, high], 'month': month[i/3]});
        if (meanHigh > tmax) tmax = meanHigh;
        //if (meanLo < tmin) tmin = meanLo;
    }
    //tmin -= 5;
    tmin = 0;
    tmax += 5;
    var xScale = d3.scale.ordinal()
        .domain(data.map(function(d){ return d["month"]; }))
        .rangeRoundBands([0, width], .1);
    var yScale = d3.scale.linear()
        .domain([tmin, tmax])
        .range([height, 0]);

    var svg = d3.select('#chart-temp').append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var xBinwidth = width / data.length *0.9;

    var month = svg.selectAll(".month")
         .data(data)
         .enter().append("g")
         .attr("class", "g")
         .attr("transform", function(d) { return "translate(" + xScale(d.month) + ",0)"; });

    month.selectAll("rect")
         .data(function(d) { return d.temp; })
         .enter().append("rect")
         .attr("width", function(d) { return xBinwidth })
         .attr("y", function(d) { return yScale(d.y1); })
         .attr("height", function(d) { return yScale(d.y0) - yScale(d.y1); })
         .style("fill", function(d) { return color(d.name); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.svg.axis().scale(xScale).orient("bottom"));

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .ticks(8)
        .orient("left");
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temperature (F)");

    var legend = svg.selectAll(".legend")
       .data(color.domain().slice().reverse())
       .enter().append("g")
       .attr("class", "legend")
       .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

}
