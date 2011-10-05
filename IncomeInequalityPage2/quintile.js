

function make_quintile(x, y, w, h)
{

	var cwidth = w;
	var cheight = h;
	var barwidth = 10;
	var barmargin = 3;
	var rightmargin = 20;
	var leftmargin = 50;
	var topmargin = 10;
	var ticks = 11;
	var width = cwidth - (leftmargin + rightmargin);
    var height = cheight - (topmargin);
	
    var chart = d3.select("#graph")
    .append("svg:g")
        .attr("class", "quintile")
        .attr("transform", "translate(" + [x,y] + ")");

    chart.append("svg:rect")
    .attr("class", "background_rect")
    .attr("width", cwidth)
    .attr("height", cheight);

    //TODO: put all the rules etc here


    quintile.reverse();


    console.log(quintile);
    var data_max = d3.max(quintile, function(d)
    {
        return d3.max(d3.values(d));
    });
    console.log(data_max);

    //make an array for each quantile, store all of them in an array:
    //[
    //  [0, 1, 2...]
    //  [8, 12, 4..]
    //  ...
    // ]
    var keys = d3.keys(quintile[0]);
    var qs = []
    keys.forEach(function(d) { qs.push([]) });
    qs.pop(); //we don't want an array for years;
    //console.log(qs);

    quintile.forEach(function(d,i)
    {
        //console.log(d);
        qs[0].push(d['Top 5 percent']);
        qs[1].push(d['Highest fifth']);
        qs[2].push(d['Second fifth']);
        qs[3].push(d['Third fifth']);
        qs[4].push(d['Fourth fifth']);
        qs[5].push(d['Lowest fifth']);
    });
    console.log(qs);



    var x = d3.scale.linear()
        .domain([0, qs[0].length])
        .range([0, w]);

    var y = d3.scale.linear()
        .domain([0, data_max])
        .range([height, 0]);



    var line = d3.svg.line()
        .x(function(d, i) { return x(i) })
        .y(function(d, i) { return y(d)})
        //.interpolate("linear")
        //.interpolate("monotone")
        .interpolate("basis")

    var line_color = d3.scale.linear()
        .domain([0, qs.length])
        .interpolate(d3.interpolateRgb)
        .range(["#000000", "#aaaaaa"]);

    var lines = chart.selectAll("g.qline")
        .data(qs)
        .enter().append("svg:g")
            .append("svg:path")
            .attr("class", "qline")
            .attr("stroke", function(d,i) { return line_color(i); })
            .attr("stroke-width", 6)
            .attr("fill", "none")
            .attr("d", line);


}
