/*  UMI SYAM 
*   Web Advanced JS - Fall 2015: 
*   Project 1: Data-driven Web Application
*   Data Visualization using D3 Scatterplot and Pie Charts
*/

var app = app || {};

app.main = (function() {
    console.log('Your code starts here!');

    //GLOBAL VARS
    /*------------------1. DRAW SCATTERPLOT-------------------*/
    var margin = {top: 60, right: 300, bottom: 290, left: 300};
    var width  = window.innerWidth - margin.left - margin.right;
    var height = window.innerHeight - margin.top - margin.bottom;

    function drawScatterplot(dataset){
        var padding = 20;
        //using log() instead of linear() to spread out the range even more
        var xScale = d3.scale.log()
                       .domain([ 
                            d3.min(dataset, function(d, i){ 
                                return d.ig_hashtags;
                            }),
                            d3.max(dataset, function(d, i){
                                return d.ig_hashtags;
                            })
                        ])
                       // .range([0, width]);                  
                       // Give extra padding because some numbers are too close to the axis
                       .range([padding, width - padding * 2]); 

        var yScale = d3.scale.linear()
                       .domain([
                            d3.min(dataset, function(d, i){
                                return d.yelp_search; 
                            }),
                            d3.max(dataset, function(d, i){
                                return d.yelp_search;
                            })
                        ])
                       // .range([height, 0]);                  
                       .range([height - padding, padding]);

        var formatValue = d3.format("2s");

        //Create axes
        var xAxis = d3.svg.axis()
                          .scale(xScale)
                          .orient("bottom")
                          .tickFormat(function(d) { return formatValue(d).replace('M', 'mill'); });

        var yAxis = d3.svg.axis()
                          .scale(yScale)
                          .orient("left");   

        //Select SVG id="chart1"
        var svg = d3.select("#chart1")
                    .attr("width", window.innerWidth)
                    .attr("height", window.innerHeight);

        //Grouping
        var chart = svg.append("g")
                       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //Append axes
        chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "x axis")
            .call(xAxis)
            .append("text")
            .attr("x", width)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("Number of hashtags on Instagram");

        chart.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 12)
            .style("text-anchor", "end")
            .text("Yelp Search Result in New York, NY");;

        //Draw grid
        var numberOfTicks = 11;

        var yAxisGrid = yAxis.ticks(numberOfTicks)
            .tickSize(width, 0)
            .tickFormat("")
            .orient("right");

        var xAxisGrid = xAxis.ticks(numberOfTicks)
            .tickSize(-height, 0)
            .tickFormat("")
            .orient("top");

        chart.append("g")
            .classed('y', true)
            .classed('grid', true)
            .call(yAxisGrid);

        chart.append("g")
            .classed('x', true)
            .classed('grid', true)
            .call(xAxisGrid);
        
        //Create the bubbles
        chart.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("r", function(d) {
                return (Math.sqrt(d.yelp_search/3) - 10);
            })
            // .attr("r", "35")
            .classed('circle', true)

            // Interaction
            .on("mouseover", function(d, i) {
                d3.select(this)
                    .style("stroke-width", 0)
                    .style("fill-opacity", 0.7)
                    .style("fill", function(d){
                        if (d.term === "pizza") { return "url(#bg-pizza-bw)"; } else 
                        if (d.term === "sushi") { return "url(#bg-sushi-bw)"; } else 
                        if (d.term === "bacon") { return "url(#bg-bacon-bw)"; } else 
                        if (d.term === "steak") { return "url(#bg-steak-bw)"; } else 
                        if (d.term === "burger") { return "url(#bg-burger-bw)"; } else 
                        if (d.term === "tacos") { return "url(#bg-tacos-bw)"; } else 
                        if (d.term === "donuts") { return "url(#bg-donuts-bw)"; } else 
                        if (d.term === "ramen") { return "url(#bg-ramen-bw)"; } else 
                        if (d.term === "curry") { return "url(#bg-curry-bw)"; } else 
                        if (d.term === "hotdog") { return "url(#bg-hotdog-bw)"; } else 
                        if (d.term === "cake") { return "url(#bg-cake-bw)"; } else 
                        if (d.term === "pasta") { return "url(#bg-pasta-bw)"; } else 
                        if (d.term === "salad") { return "url(#bg-salad-bw)"; } else 
                        if (d.term === "pancakes") { return "url(#bg-pancakes-bw)"; } else 
                        if (d.term === "icecream") { return "url(#bg-icecream-bw)"; } else 
                        if (d.term === "fries") { return "url(#bg-fries-bw)"; } else 
                        {return "rgb(255,255,0,0.5)"}
                    });

                // Tooltip
                var tooltipX = parseFloat(d3.select(this).attr("cx")) - 35;
                var tooltipY = parseFloat(d3.select(this).attr("cy")) - 10;

                chart.append("text")
                    .attr("x", tooltipX)
                    .attr("y", tooltipY)
                    .text("#" + d.term)
                    .attr("id", "tooltip")
                    .append("tspan")
                    .attr("x", tooltipX)
                    .attr("dy", 20)
                    .text(d.yelp_search + " result")
                    .append("tspan")
                    .attr("x", tooltipX)
                    .attr("dy", 20)
                    .text(d.ig_hashtags);

            })
            .on("mouseout", function(d) {
                    d3.select(this)
                        .style("stroke-width", 0.5)
                        .style("fill", function(d){
                            if (d.term === "pizza") { return "url(#bg-pizza)"; } else 
                            if (d.term === "sushi") { return "url(#bg-sushi)"; } else 
                            if (d.term === "bacon") { return "url(#bg-bacon)"; } else 
                            if (d.term === "steak") { return "url(#bg-steak)"; } else 
                            if (d.term === "burger") { return "url(#bg-burger)"; } else 
                            if (d.term === "tacos") { return "url(#bg-tacos)"; } else 
                            if (d.term === "donuts") { return "url(#bg-donuts)"; } else 
                            if (d.term === "ramen") { return "url(#bg-ramen)"; } else 
                            if (d.term === "curry") { return "url(#bg-curry)"; } else 
                            if (d.term === "hotdog") { return "url(#bg-hotdog)"; } else 
                            if (d.term === "cake") { return "url(#bg-cake)"; } else 
                            if (d.term === "pasta") { return "url(#bg-pasta)"; } else 
                            if (d.term === "salad") { return "url(#bg-salad)"; } else 
                            if (d.term === "pancakes") { return "url(#bg-pancakes)"; } else 
                            if (d.term === "icecream") { return "url(#bg-icecream)"; } else 
                            if (d.term === "fries") { return "url(#bg-fries)"; } else 
                            {return "rgb(255,255,0,0.5)"}
                        })
                        .style("fill-opacity", 1);
                    
                    //Remove tooltip
                    d3.select("#tooltip").remove();                                  
            })    

            // Initial state
            .attr("cx", function(d, i){
                return xScale(d.ig_hashtags)
            })
            .attr("cy", height)
            .style("opacity", 0)
            
            // Transition
            .transition()
            // .ease("bounce")
            .each(function() {
              d3.selectAll(".circle").transition()
                .delay(function(d, i) {
                    return i * 150;
                  })
                .attr("fill", "hsl(360, 100%, 50%)")
            })
            .duration(1500)
            
            // Final state
            .attr("cx", function(d, i){
                return xScale(d.ig_hashtags);
            })
            .attr("cy", function(d, i){
                return yScale(d.yelp_search)
            })
            .style("opacity", 1)
            .style("fill", function(d){
                if (d.term === "pizza") { return "url(#bg-pizza)"; } else 
                if (d.term === "sushi") { return "url(#bg-sushi)"; } else 
                if (d.term === "bacon") { return "url(#bg-bacon)"; } else 
                if (d.term === "steak") { return "url(#bg-steak)"; } else 
                if (d.term === "burger") { return "url(#bg-burger)"; } else 
                if (d.term === "tacos") { return "url(#bg-tacos)"; } else 
                if (d.term === "donuts") { return "url(#bg-donuts)"; } else 
                if (d.term === "ramen") { return "url(#bg-ramen)"; } else 
                if (d.term === "curry") { return "url(#bg-curry)"; } else 
                if (d.term === "hotdog") { return "url(#bg-hotdog)"; } else 
                if (d.term === "cake") { return "url(#bg-cake)"; } else 
                if (d.term === "pasta") { return "url(#bg-pasta)"; } else 
                if (d.term === "salad") { return "url(#bg-salad)"; } else 
                if (d.term === "pancakes") { return "url(#bg-pancakes)"; } else 
                if (d.term === "icecream") { return "url(#bg-icecream)"; } else 
                if (d.term === "fries") { return "url(#bg-fries)"; } else 
                {return "rgb(255,255,0,0.5)"}
            })
            .style("fill-opacity", 1)
            .style("stroke", "black")
            .style("stroke-width", 0.5)
            .style("stroke-dasharray", "5 2")
            .style("stroke-opacity", 1);  

    } //END OF drawChart()

    /*------------------2. DRAW PIE CHARTS-------------------*/
    var widthPie = 400;
    var heightPie = 400;
    var radius = Math.min(widthPie, heightPie) / 2;
    var donutWidth = 95;
    var colorPie = d3.scale.category20b(); //we'll override this with patterns anyway

    /*------------------2a. Instagram Pie-------------------*/
    function drawPieInstagram(dataset){
        var svg = d3.select('#pieInsta')
                      .attr('width', widthPie)
                      .attr('height', heightPie)
                      .append('g')
                      .attr('transform', 'translate(' + (widthPie / 2) + ',' + (heightPie / 2) + ')');

        var arc = d3.svg.arc()
                      .innerRadius(radius - donutWidth)
                      .outerRadius(radius);

        var pieInsta = d3.layout.pie()
                          .value(function(d) { return d.ig_hashtags; })
                          .sort(null); 

        var path = svg.selectAll('path')
                .data(pieInsta(dataset))
                .enter()
                .append('path')
                .attr('d', arc)
                .style("fill-opacity", 0.2)
                .style('fill', function(d, i) { 
                    if (i === 0) { return "url(#icon-pizza)"; } else 
                    if (i === 1) { return "url(#icon-sushi)"; } else 
                    if (i === 2) { return "url(#icon-bacon)"; } else 
                    if (i === 3) { return "url(#icon-steak)"; } else 
                    if (i === 4) { return "url(#icon-burger)"; } else 
                    if (i === 5) { return "url(#icon-tacos)"; } else 
                    if (i === 6) { return "url(#icon-donuts)"; } else 
                    if (i === 7) { return "url(#icon-ramen)"; } else 
                    if (i === 8) { return "url(#icon-curry)"; } else 
                    if (i === 9) { return "url(#icon-hotdog)"; } else 
                    if (i === 10) { return "url(#icon-cake)"; } else 
                    if (i === 11) { return "url(#icon-pasta)"; } else 
                    if (i === 12) { return "url(#icon-salad)"; } else 
                    if (i === 13) { return "url(#icon-pancakes)"; } else 
                    if (i === 14) { return "url(#icon-icecream)"; } else 
                    if (i === 15) { return "url(#icon-fries)"; } else 
                    {
                        return colorPie(i); 
                    }
                });
        
        var tooltip = d3.select('#pie1')                               
                          .append('div')                                                
                          .attr('class', 'tooltipPie');    

        tooltip.append('div').attr('class', 'term');
        tooltip.append('div').attr('class', 'ig_hashtags');                                      
        tooltip.append('div').attr('class', 'percent');     

        path.on('mouseover', function(d) {      
            d3.select(this).style("fill-opacity", 1);

            var total = d3.sum(dataset.map(function(d) {                
              return d.ig_hashtags;                                           
            }));                                                        
            
            var percent = Math.round(1000 * d.data.ig_hashtags/ total) / 10; 
            tooltip.select('.term').html('#'+d.data.term);                
            tooltip.select('.ig_hashtags').html(d.data.ig_hashtags);                
            tooltip.select('.percent').html(percent + '%');             
            tooltip.style('display', 'block'); 
            //hide the logo when mouseover
            d3.select('#logoInsta').style('display', 'none');   
        });                                                           

        path.on('mouseout', function() { 
            d3.select(this).style("fill-opacity", 0.2);                             
            tooltip.style('display', 'none'); 
            d3.select('#logoInsta').style('display', 'block');                             
        });
    }

    /*------------------2b. Yelp Pie-------------------*/
    function drawPieYelp(dataset){
        var svg = d3.select('#pieYelp')
                      .attr('width', widthPie)
                      .attr('height', heightPie)
                      .append('g')
                      .attr('transform', 'translate(' + (widthPie / 2) + ',' + (heightPie / 2) + ')');

        var arc = d3.svg.arc()
                      .innerRadius(radius - donutWidth)
                      .outerRadius(radius);

        var pieYelp = d3.layout.pie()
                          .value(function(d) { return d.yelp_search; })
                          .sort(null); 

        var path = svg.selectAll('path')
                .data(pieYelp(dataset))
                .enter()
                .append('path')
                .attr('d', arc)
                .style("fill-opacity", 0.2)
                .style('fill', function(d, i) { 
                    if (i === 0) { return "url(#icon-pizza)"; } else 
                    if (i === 1) { return "url(#icon-sushi)"; } else 
                    if (i === 2) { return "url(#icon-bacon)"; } else 
                    if (i === 3) { return "url(#icon-steak)"; } else 
                    if (i === 4) { return "url(#icon-burger)"; } else 
                    if (i === 5) { return "url(#icon-tacos)"; } else 
                    if (i === 6) { return "url(#icon-donuts)"; } else 
                    if (i === 7) { return "url(#icon-ramen)"; } else 
                    if (i === 8) { return "url(#icon-curry)"; } else 
                    if (i === 9) { return "url(#icon-hotdog)"; } else 
                    if (i === 10) { return "url(#icon-cake)"; } else 
                    if (i === 11) { return "url(#icon-pasta)"; } else 
                    if (i === 12) { return "url(#icon-salad)"; } else 
                    if (i === 13) { return "url(#icon-pancakes)"; } else 
                    if (i === 14) { return "url(#icon-icecream)"; } else 
                    if (i === 15) { return "url(#icon-fries)"; } else 
                    {
                        return colorPie(i); 
                    }
                });
        
        var tooltip = d3.select('#pie2')                               
                          .append('div')                                                
                          .attr('class', 'tooltipPie');                                    
                      
        tooltip.append('div').attr('class', 'term');
        tooltip.append('div').attr('class', 'yelp_search');                                      
        tooltip.append('div').attr('class', 'percent');         

        path.on('mouseover', function(d) {  
            d3.select(this).style("fill-opacity", 1);

            var total = d3.sum(dataset.map(function(d) {                
              return d.yelp_search;                                           
            }));                                                        
            console.log(d);
            var percent = Math.round(1000 * d.data.yelp_search/ total) / 10; 
            tooltip.select('.term').html('"'+d.data.term+'"');  
            tooltip.select('.yelp_search').html(d.data.yelp_search + ' results');                
            tooltip.select('.percent').html(percent + '%');             
            tooltip.style('display', 'block');     
            //hide the logo when mouseover
            d3.select('#logoYelp').style('display', 'none');                       
        });                                                           

        path.on('mouseout', function() {  
            d3.select(this).style("fill-opacity", 0.2);                            
            tooltip.style('display', 'none');    
            d3.select('#logoYelp').style('display', 'block');                         
        });
    }

    /*------------------THE MAIN FUNCTION-------------------*/
    var init = function(){
        console.log('Initializing app.');

        d3.json("data/top10.json", function(error, data) {
            if (error){
                console.log(error);  // Error?    
            }else{
                console.log(data);
                drawScatterplot(data);   
                drawPieInstagram(data);
                drawPieYelp(data);
            }
        });  
    };

    return {
        init: init
    };

})();

window.addEventListener('DOMContentLoaded', app.main.init);