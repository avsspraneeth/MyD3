//const csv_url = "http://192.168.1.8:8080/iris.csv";
const { csv, select, scaleLinear } = d3;
//const margin = { top: 50, right: 50, bottom: 50, left: 60 };
//PraseRow for Excel
var dataset = [
  {
    theTime: "2016/07/12 15:58:40",
    theValue: 1123.07275390625,
  },
  {
    theTime: "2016/07/12 16:21:10",
    theValue: 1055.6793212890625,
  },
  {
    theTime: "2016/07/12 16:45:40",
    theValue: 962.4850463867188,
  },
  {
    theTime: "2016/07/12 17:14:40",
    theValue: 831.2259521484375,
  },
  {
    theTime: "2016/07/12 17:55:10",
    theValue: 625.3046875,
  },
];
var margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 50,
};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
//var parseDate = d3.time.format("%Y/%m/%d %H:%M:%S").parse;
var parseDate = d3.timeParse("%Y/%m/%d %H:%M:%S");
//var x = d3.time.scale().range([0, width]);
var x = d3.scaleTime().range([0, width]);

var y = d3.scaleLinear().range([height, 0]);

//var xAxis = d3.svg.axis().scale(x).orient("bottom");

//var yAxis = d3.svg.axis().scale(y).orient("left");
var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);
var line = d3
  .line()
  .x(function (d) {
    return x(d.theTime);
  })
  .y(function (d) {
    return y(d.theValue);
  });

var svg = d3
  .select("#myChart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

dataset.forEach(function (d) {
  d.theTime = parseDate(d.theTime);
  d.theValue = +d.theValue;
});
console.log(dataset);
x.domain(
  d3.extent(dataset, function (d) {
    return d.theTime;
  })
);
y.domain(
  d3.extent(dataset, function (d) {
    return d.theValue;
  })
);

svg
  .append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg
  .append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("return time(ms)");

svg.append("path").datum(dataset).attr("class", "line").attr("d", line);
