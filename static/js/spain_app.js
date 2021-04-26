var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 60,
  right: 40,
  bottom: 120,
  left: 100
};

// var margin2 = {top: 100, right: 0, bottom: 0, left: 0},
//   width = 460 - margin.left - margin.right,
//   height = 460 - margin.top - margin.bottom,
//   innerRadius = 90,
//   outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#circle")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// append the svg object
// var svg2 = d3.select("#sunburst")
// .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
// .append("g")
//   .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import Data
d3.csv("../../Spain.csv").then(function(SpainWineData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    SpainWineData.forEach(function(data) {
      data.price = +data.price;
      data.points = +data.points;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(SpainWineData, d => d.price)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([75, d3.max(SpainWineData, d => d.points)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(SpainWineData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.price))
    .attr("cy", d => yLinearScale(d.points))
    .attr("r", "4")
    .attr("fill", "red")
    .attr("opacity", ".5");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.winery}<br>Winery: ${d.winery}<br>Points: ${d.points}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Points");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Price");
  }).catch(function(error) {
    console.log(error);
  });

    // List of words
    // var wineTypes = [];

    // for(i=0; i<data.length; i++){
    //   if(wineTypes.indexOf(data[i].variety) === -1){
    //     wineTypes.push(data[i].variety);
    //   }
    // }
    // // console.log(wineTypes);

    // var uniqueCountries = [];
    // var uniqueWineries = [];
  
    // for(i=0; i<data.length; i++){
    //   if(uniqueCountries.indexOf(data[i].country) === -1){
    //     uniqueCountries.push(data[i].country);
    //   }
    // }
  
    // for(i=0; i<data.length; i++){
    //   if(uniqueWineries.indexOf(data[i].winery) === -1){
    //     uniqueWineries.push(data[i].winery);
    //   }
    // }