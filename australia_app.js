var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 60,
  right: 40,
  bottom: 120,
  left: 100
};

var margin2 = {top: 100, right: 0, bottom: 0, left: 0},
  width = 460 - margin.left - margin.right,
  height = 460 - margin.top - margin.bottom,
  innerRadius = 90,
  outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg1 = d3.select("#circle")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// append the svg object
var svg2 = d3.select("#sunburst")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

var chartGroup1 = svg1.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import Data
d3.csv("Australia.csv").then(function(AustraliaWineData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    AustraliaWineData.forEach(function(data) {
      data.price = +data.price;
      data.points = +data.points;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(AustraliaWineData, d => d.price)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([75, d3.max(AustraliaWineData, d => d.points)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup1.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup1.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup1.selectAll("circle")
    .data(AustraliaWineData)
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
    chartGroup1.call(toolTip);

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
    chartGroup1.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Price");

    chartGroup1.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Points");
  }).catch(function(error) {
    console.log(error);
  });

    // List of words
    var wineTypes = [];

    for(i=0; i<data.length; i++){
      if(wineTypes.indexOf(data[i].variety) === -1){
        wineTypes.push(data[i].variety);
      }
    }
    // console.log(wineTypes);

  // Sunburst Chart

  d3.csv("wine.csv").then((data) => {
  
    wineData=data
    // console.log(data);
  
    // WORD CLOUD
  
    // List of words
  var wineTypes = [];
  
  for(i=0; i<data.length; i++){
    if(wineTypes.indexOf(data[i].variety) === -1){
      wineTypes.push(data[i].variety);
    }
  }
  // console.log(wineTypes);
  
  // // Scales
  var x = d3.scaleBand()
  .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
  .align(0)                  // This does nothing
  .domain(data.map(function(d) { return d.points; })); // The domain of the X axis is the list of states.
  var y = d3.scaleRadial()
  .range([innerRadius, outerRadius])   // Domain will be define later.
  .domain([0, 14000]); // Domain of Y is from 0 to the max seen in the data
  
  // // Add the bars
  svg2.append("g")
  .selectAll("path")
  .data(data)
  .enter()
  .append("path")
  .attr("fill", "#69b3a2")
  .attr("d", d3.arc()     // imagine your doing a part of a donut plot
      .innerRadius(innerRadius)
      .outerRadius(function(d) { return y(d['Value']); })
      .startAngle(function(d) { return x(d.country); })
      .endAngle(function(d) { return x(d.country) + x.bandwidth(); })
      .padAngle(0.01)
      .padRadius(innerRadius))
  
  // // Add the labels
  svg2.append("g")
  .selectAll("g")
  .data(data)
  .enter()
  .append("g")
    .attr("text-anchor", function(d) { return (x(d.country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
    .attr("transform", function(d) { return "rotate(" + ((x(d.country) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['Value'])+10) + ",0)"; })
  .append("text")
    .text(function(d){return(d.country)})
    .attr("transform", function(d) { return (x(d.country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
    .style("font-size", "11px")
    .attr("alignment-baseline", "middle")
  
  
  
  // // set the dimensions and margins of the graph
  // var margin = {top: 10, right: 10, bottom: 10, left: 10},
  //     width = 450 - margin.left - margin.right,
  //     height = 450 - margin.top - margin.bottom;
  
  // // append the svg object to the body of the page
  // var svg = d3.select("#word-cloud").append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //   .append("g")
  //     .attr("transform",
  //           "translate(" + margin.left + "," + margin.top + ")");
  
  // // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
  // var layout = d3.layout.cloud()
  //   .size([width, height])
  //   .words(wineTypes.map(function(d) { return {text: d}; }))
  //   .padding(10)
  //   .fontSize(60)
  //   .on("end", draw);
  // layout.start();
  
  // // This function takes the output of 'layout' above and draw the words
  // // Better not to touch it. To change parameters, play with the 'layout' variable above
  // function draw(words) {
  //   svg
  //     .append("g")
  //       .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
  //       .selectAll("text")
  //         .data(words)
  //       .enter().append("text")
  //         .style("font-size", function(d) { return d.size + "px"; })
  //         .attr("text-anchor", "middle")
  //         .attr("transform", function(d) {
  //           return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
  //         })
  //         .text(function(d) { return d.text; });
  // }
  
    var uniqueCountries = [];
    var uniqueWineries = [];
  
    for(i=0; i<data.length; i++){
      if(uniqueCountries.indexOf(data[i].country) === -1){
        uniqueCountries.push(data[i].country);
      }
    }
  
    // for(i=0; i<data.length; i++){
    //   if(uniqueWineries.indexOf(data[i].winery) === -1){
    //     uniqueWineries.push(data[i].winery);
    //   }
    // }

  })
