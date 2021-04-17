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

var wineData

  // Clears dropdown
var dropdownMenu = d3.select("#selDataset").html(""); 
var data = dropdownMenu.property("value");

  // Function for change on dropdown menu
function selectData(selectedCountry){

  // Check if value is selected in dropdown
  console.log(selectedCountry);

  // Read the json file for the data
  d3.csv("cleaned wine.csv").then((data) => {
  
  wineData=data
  // console.log(data);
  
  var uniqueCountries = [];

  for(i=0; i<data.length; i++){
    if(uniqueCountries.indexOf(data[i].country) === -1){
      uniqueCountries.push(data[i].country);
    }
  }

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
console.log(countrySample);

  var wineryPoints = data.map(winery => winery.points)
  var winePrice = data.map(winery => winery.price)

  // Check values
  //  console.log(sampleValue);
   console.log(winePrice);
   console.log(wineryPoints);
  
  // Define the layout and trace object, edit color and orientation
  
  var trace1 = {
     y: wineryPoints,
     x: winePrice,
     type: 'bar',
     orientation: 'h',
     marker: {
       color: 'red',
       line: {
         width: 3
       }
     }
    },
  layout = {
     title: 'Distribution of Points by Country',
     xaxis: {title: 'Wine Valuation'},
     yaxis: {title: 'Points'}
     };

     var data1 = [trace1]

  // Plot using plotly  
  Plotly.plot("bar", data1, layout, {responsive: true});    

// // BUBBLE CHART


console.log(data);

var countryArray = data.map(winery => winery.country)
console.log(countryArray);

var countryCounts = {};
for (var i=0; i<countryArray.length; i++) {
  countryCounts[countryArray[i]] = 1 + (countryCounts[countryArray[i]] || 0);
}
console.log(countryCounts);

var countryName = [];

var result = [];
for (var i in countryCounts) {
result.push(countryCounts[i]);
countryName.push(i);
}
console.log(result)
console.log(countryName);
// console.log(dataCounts);


var trace2 = {
  x: countryName,
  y: result,
  mode: 'markers',
  marker: {
    color: countryName,

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
  
// // BONUS: GAUGE CHART

// // Gauge Chart to plot weekly washing frequency 
var gaugeDisplay = d3.select("#gauge");
gaugeDisplay.html(""); 

var gaugeData = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: wineryPoints,
    title: { text: "<b>Wine Rating</b><br>" },
    type: "indicator",
    mode: "gauge+number",     
     gauge: {
     axis: { range: [0,9] },
     bar: { color: "#f2e9e4" },
     steps: [
        { range: [0, 1], color: "#e5d5d0" },
        { range: [1, 2], color: "#dbc7c2" },
        { range: [2, 3], color: "#d2b9b4" },
        { range: [3, 4], color: "#c9ada7" },
        { range: [4, 5], color: "#ac9899" },
        { range: [5, 6], color: "#8a7e88" },
        { range: [6, 7], color: "#7d7482" },
        { range: [7, 8], color: "#706a7b" },
        { range: [8, 9], color: "#4a4e69" }
              
      ],
     threshold: {
        value: wineryPoints
      }
    }
  }
]; 
var gaugeLayout = {  width: 600, 
                 height: 400, 
                 margin: { t: 0, b: 0 }, 
                  };

// Plot using Plotly
Plotly.newPlot('gauge', gaugeData, gaugeLayout); 


// Event on change takes the value and calls the function during dropdown selection
//  d3.select("#selDataset").on("change", function(data) {
//    // recover the option that has been chosen
//    var selectedOption = d3.select(this).property("value")
//    // run the updateChart function with this selected option
//    update(selectedOption)

//  });


// init();

  })
}

function optionChanged(winery) {
  console.log(winery);
  // resetData();
  selectData(winery)
 }
// Initial test starts at Italy
selectData("Italy")

