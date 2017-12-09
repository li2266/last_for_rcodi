var date = new Date()
var tempInfo = {"max":[], "min":[]}
// D3
function updateChart(){
  var svg = d3.select("svg"),
      margin = {top: 20, right: 20, bottom: 30, left: 20},
      width = $("#tempChart").width() - margin.right - margin.left,
      height = $("#tempChart").height()  - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  var parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%S") // Revisar formato

  //Axis Chart
  var x = d3.scaleTime()
    .rangeRound([0, width])

  var y = d3.scaleLinear()
      .rangeRound([height, 0])

  //Data Chart
  var line = d3.line()
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.close) })

  var data = tempInfo["max"].map(function(data){
    return {
      date: parseTime(data[0]),
      close: data[1]
    }
  })

  var data2 = tempInfo["min"].map(function(data2){
    return {
      date: parseTime(data2[0]),
      close: data2[1]
    }
  })

  x.domain(d3.extent(data, function(d) { return d.date }))
  y.domain([0, d3.max(data, function(d) { return d.close; })])

  g.append("g").attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

  g.append("g").call(d3.axisLeft(y))
  .append("text")
  .attr("fill", "#000")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .text("Temperature (C)")
  .attr("dy", "0.5em")

  g.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "orange")
  .attr("stroke-width", 1.5)
  .attr("d", line)

  g.append("path")
  .datum(data2)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1.5)
  .attr("d", line)
}


// Get temparature data of New York state from ncdc cdo
function getData(){
  var sDate = date.toISOString().substring(0, 10);
  var data = $.ajax({
    url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=FIPS:36&stationid=GHCND:USR0000NSHR&units=standard&startdate=2017-11-01&enddate="+sDate+"&limit=1000",
    headers:{ token: "yEevoStXYWoCHEjYMjUSRUXkKOSNndkU" },
    success: function(){
      var Aux = data.responseJSON.results, position
      for (var i in Aux) {
        if (Aux[i]["datatype"] == "TMAX"){
          tempInfo["max"].push([Aux[i]["date"], Aux[i]["value"]])
        }
        if (Aux[i]["datatype"] == "TMIN"){
          tempInfo["min"].push([Aux[i]["date"], Aux[i]["value"]])
        }
      }
      updateChart()
    }
  })
}

$(document).ready(function(){
  getData()
  $(".button-collapse").sideNav()
})
