// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 60,
//   left: 100
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
// var svg = d3.select(".chart")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);


// // Import Data
// d3.csv("winemag-data-130k-v2.csv").then(function(wineData) {

//     // Step 1: Parse Data/Cast as numbers
//     // ==============================
//     wineData.forEach(function(data) {
//       data.price = +data.price;
//       data.points = +data.points;
//     });

//     // Step 2: Create scale functions
//     // ==============================
//     var xLinearScale = d3.scaleLinear()
//       .domain([0, d3.max(wineData, d => d.price)])
//       .range([0, width]);

//     var yLinearScale = d3.scaleLinear()
//       .domain([75, d3.max(wineData, d => d.points)])
//       .range([height, 0]);

//     // Step 3: Create axis functions
//     // ==============================
//     var bottomAxis = d3.axisBottom(xLinearScale);
//     var leftAxis = d3.axisLeft(yLinearScale);

//     // Step 4: Append Axes to the chart
//     // ==============================
//     chartGroup.append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(bottomAxis);

//     chartGroup.append("g")
//       .call(leftAxis);

//     // Step 5: Create Circles
//     // ==============================
//     var circlesGroup = chartGroup.selectAll("circle")
//     .data(wineData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d.price))
//     .attr("cy", d => yLinearScale(d.points))
//     .attr("r", "4")
//     .attr("fill", "red")
//     .attr("opacity", ".5");

//     // Step 6: Initialize tool tip
//     // ==============================
//     var toolTip = d3.tip()
//       .attr("class", "tooltip")
//       .offset([80, -60])
//       .html(function(d) {
//         return (`${d.winery}<br>Winery: ${d.winery}<br>Points: ${d.points}`);
//       });

//     // Step 7: Create tooltip in the chart
//     // ==============================
//     chartGroup.call(toolTip);

//     // Step 8: Create event listeners to display and hide the tooltip
//     // ==============================
//     circlesGroup.on("click", function(data) {
//       toolTip.show(data, this);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//       });

//     // Create axes labels
//     chartGroup.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left + 40)
//       .attr("x", 0 - (height / 2))
//       .attr("dy", "1em")
//       .attr("class", "axisText")
//       .text("Price");

//     chartGroup.append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//       .attr("class", "axisText")
//       .text("Points");
//   }).catch(function(error) {
//     console.log(error);
//   });

  // var wineScoreMetadata = data.metadata.filter(item=> (item.id == selectedID));

  // var gaugeDisplay = d3.select("#gauge");
  // gaugeDisplay.html("");

  // // var wineScore = 

  // var gaugeData = [
  //   {
  //     domain: {x: [0,1], y:[0,1]},
  //     value
  //   }
  // ]

var gData 

  // Clears dropdown
var dropdownMenu = d3.select("#selDataset").html(""); 
var data = dropdownMenu.property("value");

  // Function for change on dropdown menu
function selectData(selectedCountry){

  // Check if value is selected in dropdown
  console.log(selectedCountry);

  // Read the json file for the data
  d3.json("winemag-data-130k-v2.json").then((data) => {
  
  gData=data
  console.log(data);
  
  
  // Select the metadata array and for each item append the item ID and adds ID to dropdown
  // data.metadata.forEach(winery =>
  //      {
  // //       // console.log(item.id);
  //      d3.select("#selDataset").append('option').attr('value', winery.country).text(winery.country);
  //      });

  // console.log(data)
  // Selected value is passed
  d3.select("#selDataset").node().value = selectedCountry;
  
  // Filter Metadata for selected country from dropdown
  var countryMetadata = data.filter(winery=> (winery.country == selectedCountry));
    
//   // Check the metadata loaded for the selected ID
  console.log(countryMetadata);
  
  var panelDisplay = d3.select("#sample-metadata");
  panelDisplay.html("");
  Object.entries(countryMetadata[0]).forEach(winery=> 
     {
        console.log(winery);
        panelDisplay.append("p").text(`${winery[0]}: ${winery[1]}`)
     });

//   // BAR CHART

//   // Filter sample array data for the selected ID
var countrySample = data.filter(winery => winery.country == selectedCountry);
  
//   // // Check values
console.log(countrySample)
  
//   // Slice top 10 sample values
  var sampleValue = countrySample[0].country.slice(0,10);
//   // sampleValue= sampleValue.reverse();
  var winerySample = countrySample[0].winery.slice(0,10);
//   // otuID = otuID.reverse();
  var wineryPoints = countrySample[0].points
//   // otuLabels = otuLabels.reverse();

//   // // Check values
   console.log(sampleValue);
   console.log(winerySample);
   console.log(wineryPoints);
  
  // Define the layout and trace object, edit color and orientation
     const trace = {
     y: wineryPoints,
     x: sampleValue,
     type: 'bar',
     orientation: "h",
     text:  wineryPoints,
     marker: {
        color: 'rgb(154, 140, 152)',
        line: {
           width: 3
       }
      }
     },
     layout = {
     title: 'Top 10 Operational Taxonomic Units (OTU)/Individual',
     xaxis: {title: 'Number of Samples Collected'},
     yaxis: {title: 'OTU ID'}
     };

     // Plot using Plotly
     Plotly.newPlot('.bar', data, layout);    
     
// // BUBBLE CHART

// // Remove Sample value and otuID from individual
// var sampleValue1 =idSample[0].sample_values;
// var otuID1= idSample[0].otu_ids;

// // Define the layout and trace object, edit color and orientation
// const trace1 = {
//   x: otuID1,
//   y: sampleValue1,
//   mode: 'markers',
//   marker: {
//     color: otuID1,
    
//     size: sampleValue1
//   }
// },

// layout1 = {
//   title: '<b>Bubble Chart For Each Sample</b>',
//   xaxis: {title: 'OTU ID'},
//   yaxis: {title: 'Number of Samples Collected'},
//   showlegend: false,
//   height: 800,
//   width: 1800
//   };
  
// // Plot using Plotly
// Plotly.newPlot('bubble', [trace1], layout1);

// // BONUS: GAUGE CHART

// // Gauge Chart to plot weekly washing frequency 
// const gaugeDisplay = d3.select("#gauge");
// gaugeDisplay.html(""); 
// const wineRating = countryMetadata[0].points;

// const gaugeData = [
//   {
//     domain: { x: [0, 1], y: [0, 1] },
//     value: wineRating,
//     title: { text: "<b>Wine Rating</b><br>" },
//     type: "indicator",
//     mode: "gauge+number",     
//      gauge: {
//      axis: { range: [0,9] },
//      bar: { color: "#f2e9e4" },
//      steps: [
//         { range: [0, 1], color: "#e5d5d0" },
//         { range: [1, 2], color: "#dbc7c2" },
//         { range: [2, 3], color: "#d2b9b4" },
//         { range: [3, 4], color: "#c9ada7" },
//         { range: [4, 5], color: "#ac9899" },
//         { range: [5, 6], color: "#8a7e88" },
//         { range: [6, 7], color: "#7d7482" },
//         { range: [7, 8], color: "#706a7b" },
//         { range: [8, 9], color: "#4a4e69" }
              
//       ],
//      threshold: {
//         value: wineRating
//       }
//     }
//   }
// ]; 
// const gaugeLayout = {  width: 600, 
//                  height: 400, 
//                  margin: { t: 0, b: 0 }, 
//                   };

// // Plot using Plotly
// Plotly.newPlot('gauge', gaugeData, gaugeLayout); 


// Event on change takes the value and calls the function during dropdown selection
 d3.select("#selDataset").on("change", function(data) {
   // recover the option that has been chosen
   var selectedOption = d3.select(this).property("value")
   // run the updateChart function with this selected option
   update(selectedOption)

 });

function optionChanged(country) {
 console.log(country);
 // resetData();
 selectData(country)
}
init();
})
}
// Initial test starts at Italy
selectData("Italy")
