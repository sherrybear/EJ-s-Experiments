

function make_ceo(x, y, w, h)
{
	$('#graph').tipsy;
	var data = [];
	
	for (var i=0; i < ceo_pay.length; i++) {
		//data[i] = parseFloat(ceo_pay[i].Ratio);
		data[i] = ceo_pay[i].Ratio;
	};
    console.log(data.length);
    console.log(ceo_pay.length);
	
	console.log(data);
	
	var cwidth = w;
	var width = cwidth - (leftmargin + rightmargin);
	var cheight = h;
	var barwidth = 10;
	var barmargin = 3;
	var rightmargin = 20;
	var leftmargin = 50;
	var topmargin = 10;
	var ticks = 11;
	
	
    var chart = d3.select("#graph")
        .append("svg:g")
            .attr("class", "ceo")
            .attr("transform", "translate(" + [x,y] + ")");

        chart.append("svg:rect")
        .attr("class", "background_rect")
		.attr("width", cwidth)
		.attr("height", cheight);
	
    var data_max = d3.max(ceo_pay, function(d) { return d.Ratio; });
    console.log(data_max);

	 var barheight = d3.scale.linear()
	     .domain([0, data_max ])
	     .range([0, cheight-50]);
	
	 var barwidthscale = d3.scale.linear()
	     .domain([0, ceo_pay.length])
		
		
    y = d3.scale.ordinal()
		.domain(d3.range(ceo_pay.length))
		.rangeBands([leftmargin, cwidth-rightmargin], 0.3);	    
	
		// Create axis lines
		chart.selectAll("line.axisline")
			.data(barheight.ticks(ticks))
		.enter().append("svg:line")
			.attr("class", "axisline")
			.attr("y1", function(d, i) { return ((cheight - topmargin) - barheight(d)); })
			.attr("y2", function(d, i) { return ((cheight - topmargin) - barheight(d)); })
			.attr("x1", leftmargin)
			.attr("x2", cwidth)
			.attr("stroke", "#999");
			
		// Create axis labels
		 chart.selectAll("text.rule")
		     .data(barheight.ticks(ticks))
		   .enter().append("svg:text")
		     .attr("class", "rule")
		     .attr("x", 5)
	//	     .attr("y", barheight)
			 .attr("y", function(d, i) { return ((cheight - topmargin) - barheight(d))+4; })
		     .attr("dx", 12)
			 .attr("dy", -5)
		     .attr("text-anchor", "left")
				.on("mousedown", function(d,i){ color_bars_over(d)})
				.attr("cursor", "pointer")
		     .text(String);
		
         function bar_color(d)
         {
            	//if(ceo_pay[i].Date < 1990) {
            	if(d.Date < 1990) {
					return '#7D7D7D';
				}
                //else if(ceo_pay[i].Date < 2000) {
                else if(d.Date < 2000) {
					return '#484848';
				}
                else
                {
                    return '#000000';
                }
         }
		// Create bars
		 chart.selectAll("rect")
	        .data(ceo_pay)
	      .enter().append("svg:rect")
            .attr("class", "ceo_bar")
	        .attr("x", function(d, i) { return y(i);})
			.attr("y", function(d, i) { return ((cheight - topmargin) - barheight(d.Ratio)); })
	        .attr("width", y.rangeBand())
			.attr("stroke", "none")
			.attr("fill", function(d, i){ 
			    return bar_color(d,i);
/*				if(ceo_pay[i].Date >= 2000) {
                    return 'blue';
				}
*/				
			})
			.attr("id", function(d,i){ return "bar"+i; })
			.attr("height", function(d,i) { return barheight(d.Ratio);})
			.append("svg:title")
				.text(function(d,i){
					//return "Date: "+ceo_pay[i].Date+" Ratio: "+ceo_pay[i].Ratio;
					return "Date: "+d.Date+" Ratio: "+d.Ratio;
				});
	
	
	function color_bars_over(number) {
		 var bars = d3.selectAll("rect.ceo_bar").transition()
	        .duration(700)
		/*	.attr("fill", function(d, i){ 
				
				if(ceo_pay[i].Ratio < number) {
					return '#484848';
				}
				if(ceo_pay[i].Ratio >= number) {
					return 'blue';
				}
				
			});	*/
			
			.attr("fill", function(d,i){
                i -= 1;
				//if(ceo_pay[i].Ratio < number) {
				if(d.Ratio < number) {
					return bar_color(d,i);
				}
                //else if(ceo_pay[i].Ratio >= number) {
                else if(d.Ratio >= number) {
					return "#FF0000";
				}
			});

	}

}
