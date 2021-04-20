var wineData

  // Clears dropdown
var dropdownMenu = d3.select("#selDataset").html(""); 
var data = dropdownMenu.property("value");

  // Function for change on dropdown menu
function selectData(selectedCountry){

  // Check if value is selected in dropdown
  console.log(selectedCountry);

var margin = {top: 100, right: 0, bottom: 0, left: 0},
  width = 460 - margin.left - margin.right,
  height = 460 - margin.top - margin.bottom,
  innerRadius = 90,
  outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

// append the svg object
var svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");


// Read the json file for the data
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
// var x = d3.scaleBand()
// .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
// .align(0)                  // This does nothing
// .domain(data.map(function(d) { return d.points; })); // The domain of the X axis is the list of states.
// var y = d3.scaleRadial()
// .range([innerRadius, outerRadius])   // Domain will be define later.
// .domain([0, 14000]); // Domain of Y is from 0 to the max seen in the data

// // Add the bars
// svg.append("g")
// .selectAll("path")
// .data(data)
// .enter()
// .append("path")
// .attr("fill", "#69b3a2")
// .attr("d", d3.arc()     // imagine your doing a part of a donut plot
//     .innerRadius(innerRadius)
//     .outerRadius(function(d) { return y(d['Value']); })
//     .startAngle(function(d) { return x(d.country); })
//     .endAngle(function(d) { return x(d.country) + x.bandwidth(); })
//     .padAngle(0.01)
//     .padRadius(innerRadius))

// // Add the labels
// svg.append("g")
// .selectAll("g")
// .data(data)
// .enter()
// .append("g")
//   .attr("text-anchor", function(d) { return (x(d.country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
//   .attr("transform", function(d) { return "rotate(" + ((x(d.country) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['Value'])+10) + ",0)"; })
// .append("text")
//   .text(function(d){return(d.country)})
//   .attr("transform", function(d) { return (x(d.country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
//   .style("font-size", "11px")
//   .attr("alignment-baseline", "middle")



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

// CIRCLES CHART
  
  wineData.forEach(function(data) {
          data.price = +data.price;
          data.points = +data.points;
        });

  
  // var xLinearScale = d3.scaleLinear()
  //       .domain([0, d3.max(wineData, d => d.price)])
  //       .range([0, width]);
        
  // var yLinearScale = d3.scaleLinear()
  //       .domain([75, d3.max(wineData, d => d.points)])
  //       .range([height, 0]);
        
  // var bottomAxis = d3.axisBottom(xLinearScale);
  // var leftAxis = d3.axisLeft(yLinearScale);

  // chartGroup.append("g")
  //     .attr("transform", `translate(0, ${height})`)
  //     .call(bottomAxis);

  // chartGroup.append("g")
  //     .call(leftAxis);
  
  // var circlesGroup = chartGroup.selectAll("circle")
  //     .data(wineData)
  //     .enter()
  //     .append("circle")
  //     .attr("cx", d => xLinearScale(d.price))
  //     .attr("cy", d => yLinearScale(d.points))
  //     .attr("r", "4")
  //     .attr("fill", "red")
  //     .attr("opacity", ".5");
  
      
  // var toolTip = d3.tip()
  //     .attr("class", "tooltip")
  //     .offset([80, -60])
  //     .html(function(d) {
  //       return (`${d.winery}<br>Winery: ${d.winery}<br>Points: ${d.points}`);
  //     }); 

  // chartGroup.call(toolTip);

  // circlesGroup.on("click", function(data) {
  //         toolTip.show(data, this);
  //       })
  //         // onmouseout event
  //         .on("mouseout", function(data, index) {
  //           toolTip.hide(data);
  //         });
    
  //       chartGroup.append("text")
  //         .attr("transform", "rotate(-90)")
  //         .attr("y", 0 - margin.left + 40)
  //         .attr("x", 0 - (height / 2))
  //         .attr("dy", "1em")
  //         .attr("class", "axisText")
  //         .text("Price");
    
  //       chartGroup.append("text")
  //         .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  //         .attr("class", "axisText")
  //         .text("Points");
  //     }).catch(function(error) {
  //       console.log(error);
  //     });

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

  // console.log(uniqueCountries);
  
  
  // Select the uniqueCountries array and for each item append the item ID and adds ID to dropdown
  uniqueCountries.forEach(country =>
       {
  //       // console.log(item.id);
       d3.select("#selDataset").append('option').attr('value', country).text(country);
       });

  // Selected value is passed
  d3.select("#selDataset").node().value = selectedCountry;
  
  // Filter data for selected country from dropdown
  var countryData = data.filter(winery=> (winery.country == selectedCountry));
    
//   // Check the data loaded for the selected country
  // console.log(countryData);
  
  // Update the panel display to have the selected country
  var panelDisplay = d3.select("#sample-data");
  panelDisplay.html("");
  Object.entries(countryData[0]).forEach(winery=> 
     {
        console.log(winery);
        panelDisplay.append("p").text(`${winery[0]}: ${winery[1]}`)
     });

//   // BAR CHART

// Filter sample array data for the selected country
var countrySample = data.filter(winery => winery.country == selectedCountry);
  
// Check values
// console.log(countrySample);

  var wineryPoints = data.map(winery => winery.points)
  var winePrice = data.map(winery => winery.price)

  // Check values
  //  console.log(sampleValue);
  //  console.log(winePrice);
  //  console.log(wineryPoints);
  
  // Define the layout and trace object, edit color and orientation
  
  var trace1 = {
     y: wineryPoints,
     x: winePrice,
     type: 'bar',
     orientation: 'h',
     marker: {
       color: 'red',
       
     }
    },
  layout = {
     title: 'Price vs. Points by Country',
     xaxis: {title: 'Wine Valuation'},
     yaxis: {title: 'Points'}
     };

     var data1 = [trace1]

  // Plot using plotly  
  Plotly.plot("bar", data1, layout, {responsive: true});    

// // BUBBLE CHART

var countryArray = data.map(winery => winery.country)
// console.log(countryArray);

var countryCounts = {};
for (var i=0; i<countryArray.length; i++) {
  countryCounts[countryArray[i]] = 1 + (countryCounts[countryArray[i]] || 0);
}
// console.log(countryCounts);

var countryName = [];

var result = [];
for (var i in countryCounts) {
result.push(countryCounts[i]);
countryName.push(i);
}
// console.log(result)
// console.log(countryName);
// console.log(dataCounts);


var trace2 = {
  x: countryName,
  y: result,
  mode: 'markers',
  marker: {
    color: "red",

    size: result,
    sizeref: 500
  }
};

var data2 = [trace2];

var layout2 = {
  title: 'Number of Wineries by Country',
  showlegend: false,
  height: 600,
  width: 600
};

// Plot using Plotly
Plotly.newPlot('bubble', data2, layout2);
  
  })
}

function optionChanged(winery) {
  console.log(winery);
  // resetData();
  selectData(winery)
 }
// Initial test starts at Italy
selectData("Italy")

