var TO, data, dates, day_ndata, fill, getDate, makeBars, maxDate, minDate, ndata, resize_chart, showInfo, visits, week, x, _i, _len;

TO = false;

$(window).resize(function() {
  return resize_chart();
});

getDate = function(d) {
  return new Date(d.date);
};

data = date_data;

day_ndata = [];

week = [];

ndata = [];

fill = [];

dates = [];

visits = [];

for (_i = 0, _len = data.length; _i < _len; _i++) {
  x = data[_i];
  dates.push(new Date(x.date));
  visits.push(x.visits);
  ndata.push(new Date(x.visits));
  day_ndata.push(new Date(x.visits));
}

minDate = dates[0];

maxDate = dates[dates.length - 1];

/*    
week[0] = day_ndata.slice(0,7)
week[1] = day_ndata.slice(7,14)
week[2] = day_ndata.slice(14,21)
week[3] = day_ndata.slice(21,28)
week[4] = day_ndata.slice(28,31)    

# Create averages of each week
week[0] = d3.mean(week[0])
week[1] = d3.mean(week[1])
week[2] = d3.mean(week[2])
week[3] = d3.mean(week[3])
week[4] = d3.mean(week[4])
*/

/*
        END DATA STUFF
*/

makeBars = function(ndata) {
  var barheight, bars, chart, h, w, x_svg, xaxis;
  w = $('#graphsvg').width();
  h = $('#graphsvg').height();
  barheight = d3.scale.linear().domain([0, d3.max(visits)]).range([0, h - 40]);
  x = d3.time.scale().domain([minDate, maxDate]).range([0, w]);
  xaxis = d3.svg.axis().scale(x).orient('top');
  chart = d3.select("#graphsvg");
  bars = chart.selectAll(".bars").data(ndata);
  bars.enter().insert("svg:rect").attr("class", function(d, i) {}).attr("height", function(d, i) {
    return barheight(d.visits);
  }).attr("width", function(d, i) {
    return 3;
  }).attr("transform", function(d, i) {
    console.log(d, i);
    return "translate(" + (x(new Date(d.date))) + ", " + ((h - 16) - barheight(d.visits)) + ")";
  }).attr("class", "bars").attr("fill", function() {
    return fill || "#F4184B";
  });
  return x_svg = chart.insert("svg:g").attr("transform", "translate(0, " + (h + 5) + ")").attr("style", "font-size: 10px; font-family: sans-serif;").call(xaxis);
};

showInfo = function(ndata) {
  var h, w;
  w = $('#graphsvg').width();
  h = $('#graphsvg').height();
  return makeBars(data);
};

resize_chart = function(data) {
  var barheight, bars, chart, h, w, x_svg, xaxis;
  w = $('#graphsvg').width();
  h = $('#graphsvg').height();
  barheight = d3.scale.linear().domain([0, d3.max(ndata)]).range([0, h - 40]);
  makeBars(ndata);
  chart = d3.select("#graphsvg");
  bars = chart.selectAll(".bars").data(ndata);
  console.log(ndata);
  x = d3.time.scale().domain([minDate, maxDate]).range([0, w]);
  xaxis = d3.svg.axis().scale(x).orient('top');
  bars.transition().duration(1000).attr("height", function(d, i) {
    return barheight(d.visits);
  }).attr("width", function(d, i) {
    return 3;
  }).attr("transform", function(d, i) {
    return "translate(" + (x(new Date(d.date))) + ", " + ((h - 16) - barheight(d.visits)) + ")";
  }).attr("class", "bars").attr("fill", function() {
    return fill || "#F4184B";
  });
  bars.exit().remove();
  return x_svg = chart.insert("svg:g").attr("transform", "translate(0, " + (h + 5) + ")").attr("style", "font-size: 10px; font-family: sans-serif;").call(xaxis);
};

$('#big').click(function() {
  $('#graph').width("100%");
  return resize_chart(date_data);
});

$('#small').click(function() {
  $('#graph').width(200);
  return resize_chart(date_data);
});

showInfo(data);
