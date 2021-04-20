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
  
  // wineData.forEach(function(data) {
  //         data.price = +data.price;
  //         data.points = +data.points;
  //       });

  
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

