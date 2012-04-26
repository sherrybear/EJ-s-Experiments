TO = false
$(window).resize(->
#    if TO isnt false
#       clearTimeout(TO);
#    TO = setTimeout(showInfo(data), 150); #200 is time in miliseconds
#    showInfo(data)
    resize_chart()
)
getDate = (d) ->
    new Date(d.date)

#data = [{"date":"3/1/2012","visits":"20760","rowNumber":1},{"date":"3/2/2012","visits":"21826","rowNumber":2},{"date":"3/3/2012","visits":"14803","rowNumber":3},{"date":"3/4/2012","visits":"17294","rowNumber":4},{"date":"3/5/2012","visits":"23413","rowNumber":5},{"date":"3/6/2012","visits":"46197","rowNumber":6},{"date":"3/7/2012","visits":"41570","rowNumber":7},{"date":"3/8/2012","visits":"22849","rowNumber":8},{"date":"3/9/2012","visits":"17116","rowNumber":9},{"date":"3/10/2012","visits":"14184","rowNumber":10},{"date":"3/11/2012","visits":"17041","rowNumber":11},{"date":"3/12/2012","visits":"157041","rowNumber":12},{"date":"3/13/2012","visits":"90960","rowNumber":13},{"date":"3/14/2012","visits":"68152","rowNumber":14},{"date":"3/15/2012","visits":"58755","rowNumber":15},{"date":"3/16/2012","visits":"38828","rowNumber":16},{"date":"3/17/2012","visits":"25920","rowNumber":17},{"date":"3/18/2012","visits":"30541","rowNumber":18},{"date":"3/19/2012","visits":"45527","rowNumber":19},{"date":"3/20/2012","visits":"45265","rowNumber":20},{"date":"3/21/2012","visits":"41184","rowNumber":21},{"date":"3/22/2012","visits":"35744","rowNumber":22},{"date":"3/23/2012","visits":"28168","rowNumber":23},{"date":"3/24/2012","visits":"21478","rowNumber":24},{"date":"3/25/2012","visits":"38353","rowNumber":25},{"date":"3/26/2012","visits":"48506","rowNumber":26},{"date":"3/27/2012","visits":"40889","rowNumber":27},{"date":"3/28/2012","visits":"44318","rowNumber":28},{"date":"3/29/2012","visits":"41338","rowNumber":29},{"date":"3/30/2012","visits":"27662","rowNumber":30},{"date":"3/31/2012","visits":"21708","rowNumber":31}]            
data = date_data;

day_ndata = []
week = []
ndata = []
fill = []
dates = []
visits = []
#
#   Manipulate that data into something usable
#

for x in data
    dates.push(new Date(x.date))
    visits.push(x.visits)    
    ndata.push(new Date(x.visits))
    day_ndata.push(new Date(x.visits))
    
minDate = dates[0]
maxDate = dates[dates.length-1]
#console.log "data =>", data


###    
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
###


###
        END DATA STUFF
###
makeBars = (ndata) ->
    
    w = $('#graphsvg').width();
    h = $('#graphsvg').height();

    barheight = d3.scale.linear().domain([0, d3.max(visits)]).range([0, h-40]);
    

    x = d3.time.scale().domain( [minDate, maxDate] ).range([0, w])
    xaxis = d3.svg.axis().scale(x).orient('top')  
    
    
    chart = d3.select("#graphsvg")
    bars = chart.selectAll(".bars")
    .data(ndata)
    
    bars.enter()
    .insert("svg:rect")
           .attr("class", (d,i)->
#               console.log d,i
            )
           .attr("height",(d,i) -> barheight(d.visits) )
           .attr("width" ,(d,i) -> 3 )
           .attr("transform", (d,i)->
               console.log d,i
               "translate(#{x(new Date(d.date))}, #{(h-16)-barheight(d.visits)})" 
           )
           .attr("class","bars")
           .attr("fill", ->
               fill || "#F4184B"
           )
           
       x_svg = chart.insert("svg:g")
               .attr("transform", "translate(0, "+(h+5)+")")
               .attr("style", "font-size: 10px; font-family: sans-serif;")
               .call(xaxis)
    
showInfo = (ndata) ->
  
    #    console.log(week)    

    #    ndata = week;
    w = $('#graphsvg').width();
    h = $('#graphsvg').height();
    
    makeBars(data)
    
resize_chart = (data)->
    
    w = $('#graphsvg').width();
    h = $('#graphsvg').height();
    
    barheight = d3.scale.linear().domain([0, d3.max(ndata)]).range([0, h-40]);
    
    makeBars(ndata)
    
    chart = d3.select("#graphsvg")
    bars = chart.selectAll(".bars").data(ndata) # YARRR PROBLEMS BE HURR
    console.log ndata
    x = d3.time.scale().domain( [minDate, maxDate] ).range([0, w])
    xaxis = d3.svg.axis().scale(x).orient('top')

    bars.transition().duration(1000)
        .attr("height",(d,i) -> barheight(d.visits) )
        .attr("width" ,(d,i) -> 3 )
        .attr("transform", (d,i)->
#            console.log d,i
            "translate(#{x(new Date(d.date))}, #{(h-16)-barheight(d.visits)})" 
        )
        .attr("class","bars")
        .attr("fill", ->
            fill || "#F4184B"
        )     

    bars.exit().remove()
        
    x_svg = chart.insert("svg:g")
            .attr("transform", "translate(0, "+(h+5)+")")
            .attr("style", "font-size: 10px; font-family: sans-serif;")
            .call(xaxis)
#            .exit().remove()
        
            
$('#big').click(->
    $('#graph').width("100%")
    resize_chart(date_data)
)
$('#small').click(->
    $('#graph').width(200)
    resize_chart(date_data)
)
    
showInfo(data)