// Wineries Per Country
 var trace1 = {
   labels: ["US", "France", "Italy", "Spain",
    "Argentina", "Australia", "Canada",],
 values: [50.0, 20.0, 17.9, 6.0, 3.0, 2.1, 1.1],
  type: 'pie'
};

 var data = [trace1];

var layout = {
  title: "'Bar' Chart",
 };

Plotly.newPlot("plot", data, layout);