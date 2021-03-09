
function DemoTable(id) {
    //read json
    d3.json("samples.json").then((data)=> {
        
      // get demo info by id
        var demoinfo = data.metadata.filter(meta => meta.id.toString() === id)[0];

    // reference id in html
        var demotable = d3.select("#sample-metadata");

        //Reset table
        demotable.html("");

        //This was someone else's code block from Stack, I'm not really sure
        Object.entries(demoinfo).forEach((key) => {   
            demotable.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");  
    })
});
};

function MakePlot(id){
    //d3 to read in json data
    d3.json("samples.json").then((data)=>{

        
    var samples = data.samples.filter(s => s.id.toString() == id)[0];
    //Slice of 10
    var samplevalues = samples.sample_values.slice(0,10).reverse();

    var otuids = samples.otu_ids.slice(0,10).reverse().map(o => "OTU " + o);

    var otulabels = samples.otu_labels.slice(0,10).reverse();


    var trace = [{
        type: 'bar',
        x: samplevalues,
        y: otuids,
        text: otulabels,
        orientation: 'h'
    }];

    

    var layout = {
        title: "Top 10 OTU",
        type: "linear",
        autorange: true,
    };
    
    Plotly.newPlot('bar', trace, layout)



    var trace2 = [{
        x: otuids,
        y: samplevalues,
        mode: "markers",
        marker:{
            size: samplevalues,
            colorscale: "Rainbow"
        },
        text: otulabels
    }];

    var layout2 = {
        xaxis:{title: "OTU ID"},
        height: 600,
        width: 1300
    };

    Plotly.newPlot("bubble", trace2, layout2);

});
};



function initializePage() {
    //Selecting the dataset to populate the dropdown
    var dropdown = d3.select("#selDataset");

    // d3 to read in json data
    d3.json("samples.json").then((data)=> {
        
        // dynamically populate the dropdown
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // Two functions finalize the process with a plot and table update to the page
        MakePlot(data.names[0]);
        DemoTable(data.names[0]);
    });
};


//Reset Table and Plot to fresh ID
function optionChanged(id) {
    MakePlot(id);
    DemoTable(id);
};

//Initialize upon open
initializePage();





