//const csv_url = "http://192.168.1.8:8080/iris.csv";
const { csv, select, scaleLinear } = d3;
const margin = { top: 50, right: 50, bottom: 50, left: 60 };
//PraseRow for Excel
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var svg = d3
  .select("#myChart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var dataset = [
  {
    theTime: "2016/07/12 15:58:40",
    theValue: "A",
    theValue2: "A1",
  },
  {
    theTime: "2016/07/12 16:21:10",
    theValue: "B",
    theValue2: "B2",
  },
  {
    theTime: "2016/07/12 16:45:40",
    theValue: "C",
    theValue2: "C2",
  },
  {
    theTime: "2016/07/12 17:14:40",
    theValue2: "C2",
  },
  {
    theTime: "2016/07/12 17:55:10",
    theValue2: "E2",
  },
];
// Sample data with string values for the Y-axis
var data = [
  { category: "Category A", value: 30 },
  { category: "Category B", value: 50 },
  { category: "Category C", value: 20 },
  { category: "Category D", value: 40 },
  { category: "Category E", value: 60 },
];

// Create scales for X and Y axes
var xScale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(data, function (d) {
      return d.value;
    }),
  ])
  .range([0, width]);

var yScale = d3
  .scaleBand()
  .domain(
    data.map(function (d) {
      return d.category;
    })
  )
  .range([height, 0])
  .padding(0.1); // Adjust the padding between bars

// Create X and Y axes
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

// Append X-axis to the SVG
svg
  .append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

// Append Y-axis to the SVG
svg.append("g").attr("class", "y axis").call(yAxis);

// Create bars
svg
  .selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", 0)
  .attr("y", function (d) {
    return yScale(d.category);
  })
  .attr("width", function (d) {
    return xScale(d.value);
  })
  .attr("height", yScale.bandwidth());
console.log(yScale.bandwidth());
