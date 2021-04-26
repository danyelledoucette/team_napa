var idb = ["../../Argentina.json", "../../Australia.json", "../../Canada.json", "../../France.json", "../../Italy.json", "../../Spain.json", "../../US.json"];
//var cp = [];

//for (var i=0; i<7; i++){
d3.json(idb[6]).then((importedData) => {
    var data = importedData;
    var cp =[{
        x: Object.values(data.country),
        y: Object.values(data.price),
        type: "box",
        name: Object.values(data.country)[0],
        boxpoints: "all"
    }];
    //console.log(cp)
    cp.push();
    console.log(cp)

d3.json(idb[4]).then((importedData) => {
    var data = importedData;
    var cp1 =[{
        x: Object.values(data.country),
        y: Object.values(data.price),
        type: "box",
        name: Object.values(data.country)[0],
        boxpoints: "all"
    }];
    //console.log(cp)
    cp.push(cp1);
    console.log(cp)

d3.json(idb[2]).then((importedData) => {
    var data = importedData;
    var cp2 =[{
        x: Object.values(data.country),
        y: Object.values(data.price),
        type: "box",
        name: Object.values(data.country)[0],
        boxpoints: "all"
    }];
    //console.log(cp)
    cp.push(cp2);
    //console.log(cp)

d3.json(idb[1]).then((importedData) => {
    var data = importedData;
    var cp3 =[{
        x: Object.values(data.country),
        y: Object.values(data.price),
        type: "box",
        name: Object.values(data.country)[0],
        boxpoints: "all"
    }];
    //console.log(cp)
    cp.push(cp3);
    //console.log(cp)

d3.json(idb[3]).then((importedData) => {
    var data = importedData;
    var cp4 =[{
        x: Object.values(data.country),
        y: Object.values(data.price),
        type: "box",
        name: Object.values(data.country)[0],
        boxpoints: "all"
    }];
    //console.log(cp)
    cp.push(cp4);
   //console.log(cp)

d3.json(idb[5]).then((importedData) => {
    var data = importedData;
    var cp5 =[{
        x: Object.values(data.country),
        y: Object.values(data.price),
        type: "box",
        name: Object.values(data.country)[0],
        boxpoints: "all"
    }];
    //console.log(cp)
    cp.push(cp5);
    //console.log(cp)

d3.json(idb[0]).then((importedData) => {
    var data = importedData;
    var cp6 =[{
        x: Object.values(data.country),
        y: Object.values(data.price),
        type: "box",
        name: Object.values(data.country)[0],
        boxpoints: "all"
    }];
    //console.log(cp)
    cp.push(cp6);
    console.log(cp)
    //for (var i=1; i<8; i++){
    //console.log(cp[1][0]["x"])
    //console.log(cp[1][0]["y"])
      var layout = {
        title: "Price by Country",
        xaxis: { title: "Country" },
        yaxis: { title: "Price, $", range: [0, 200] }
      };
      Plotly.newPlot("IQRPrice1", [cp[0], cp[1][0], cp[2][0], cp[3][0]], layout);
      Plotly.newPlot("IQRPrice2", [cp[4][0], cp[5][0], cp[6][0]], layout);
      console.log(cp)
     
})
})
})
})
})
})
});