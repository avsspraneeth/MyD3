// Sample data for Gantt chart
var data = [
  {
    task: "Task 1",
    start: new Date("2024-02-22T08:00:00"),
    end: new Date("2024-02-22T16:00:00"),
  },
  {
    task: "Task 2",
    start: new Date("2024-02-23T09:30:00"),
    end: new Date("2024-02-23T17:30:00"),
  },
  {
    task: "Task 3",
    start: new Date("2024-02-24T07:00:00"),
    end: new Date("2024-02-24T15:00:00"),
  },
  // Add more tasks as needed
];

// Set up the SVG container
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", 800)
  .attr("height", 400);

// Set up scales for X and Y axes
var xScale = d3
  .scaleTime()
  .domain([d3.min(data, (d) => d.start), d3.max(data, (d) => d.end)])
  .range([0, 600]);

var yScale = d3
  .scaleBand()
  .domain(data.map((d) => d.task))
  .range([0, 300])
  .padding(0.1);

// Draw the Gantt chart
svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d) => xScale(d.start))
  .attr("y", (d) => yScale(d.task))
  .attr("width", (d) => xScale(d.end) - xScale(d.start))
  .attr("height", yScale.bandwidth())
  .attr("fill", "steelblue");

// Add axes
var xAxis = d3.axisBottom(xScale);
svg.append("g").attr("transform", "translate(0, 300)").call(xAxis);

var yAxis = d3.axisLeft(yScale);
svg.append("g").call(yAxis);
