var margin = {top: 20, right: 40, bottom: 30, left: 40};
var width = 1100 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var t = 1000;


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

//load data from json
d3.json("data/casette.json")
    .then((data) => {
        main(data);
    });


function main(data) {

    //center of each house
    var x=0;
    var y=150;

    //draw each house at a distance of 100
    for(let i = 0; i<data.length; i++) {
        draw(data[i],i,x,y);
        x+=100;
    }

    //mouseover all windows
   d3.selectAll('.window')
        .on("mouseover", function () {
          d3.selectAll('.window').style("fill","#8fc8c7").select("text").style("fill", "#000");})
        .on('mouseout', function(d) {
            d3.selectAll(".window").style('fill', "#eeeeee");
        });

    //mouseover all rects
    d3.selectAll('.rect')
        .on("mouseover", function () {
        d3.selectAll('.rect').style("fill","#ffab91").select("text").style("fill", "#000")})
        .on('mouseout', function(d) {
            d3.selectAll(".rect").style('fill', "#ffccbc");
        });

    //mouseover all chimneys
    d3.selectAll('.chimney')
        .on("mouseover", function () {
            d3.selectAll('.chimney').style("fill","#5d4037")})
        .on('mouseout', function(d) {
            d3.selectAll(".chimney").style('fill', "#3e2723");
        });

    //mouseover all roofs
    d3.selectAll('.roof')
        .on("mouseover", function () {
            d3.selectAll('.roof').style("fill","#795548")})
        .on('mouseout', function(d) {
            d3.selectAll(".roof").style('fill', "#8d6e63");
        });

    //order by chimney height
    d3.selectAll('.chimney').on("click", function () {
        orderByChimneyHeight();
    });

    //order by roof height
    d3.selectAll('.roof').on("click", function () {
        orderByRoofHeight();
    })


    //order by house height
    d3.selectAll('.window').on("click", function () {
        orderByHouseHeight();
    })

    //order by house width
    d3.selectAll('.rect').on("click", function () {
        orderByHouseWidth();
    })

}

function orderByChimneyHeight(){
    var chimneys = d3.selectAll(".chimney").selectAll("__data__")._parents;

    var chimney_heights = []
    var notOrderedData = []
    for (let i = 0; i < chimneys.length; i++) {
        notOrderedData.push(chimneys[i].__data__)
        chimney_heights.push(chimneys[i].__data__.chimney_height)
    }
    chimney_heights.sort(d3.ascending);

    var position =[];
    for (let i = 0; i < chimney_heights.length; i++) {
        for (let j = 0; j < notOrderedData.length; j++) {
            if(notOrderedData[i].chimney_height === chimney_heights[j]){
                position[i]=j;
            }
        }
    }

    move(position);
}

function orderByRoofHeight(){
    var roofs = d3.selectAll(".roof").selectAll("__data__")._parents;

    var roof_heights = []
    var notOrderedData = []
    for (let i = 0; i < roofs.length; i++) {
        notOrderedData.push(roofs[i].__data__)
        roof_heights.push(roofs[i].__data__.roof_height)
    }
    roof_heights.sort(d3.descending);

    var position =[];
    for (let i = 0; i < roof_heights.length; i++) {
        for (let j = 0; j < notOrderedData.length; j++) {
            if(notOrderedData[i].roof_height === roof_heights[j]){
                position[i]=j;
            }
        }
    }

    move(position);
}

function orderByHouseHeight(){
    var homes = d3.selectAll(".rect").selectAll("__data__")._parents;

    var house_heights = []
    var notOrderedData = []
    for (let i = 0; i < homes.length; i++) {
        notOrderedData.push(homes[i].__data__)
        house_heights.push(homes[i].__data__.height)
    }
    house_heights.sort(d3.ascending);

    var position =[];
    for (let i = 0; i < house_heights.length; i++) {
        for (let j = 0; j < notOrderedData.length; j++) {
            if(notOrderedData[i].height === house_heights[j]){
                position[i]=j;
            }
        }
    }

    move(position);
}

function orderByHouseWidth(){
    var homes = d3.selectAll(".rect").selectAll("__data__")._parents;

    var house_widths = []
    var notOrderedData = []
    for (let i = 0; i < homes.length; i++) {
        notOrderedData.push(homes[i].__data__)
        house_widths.push(homes[i].__data__.width)
    }
    house_widths.sort(d3.ascending);

    var position =[];
    for (let i = 0; i < house_widths.length; i++) {
        for (let j = 0; j < notOrderedData.length; j++) {
            if(notOrderedData[i].width === house_widths[j]){
                position[i]=j;
            }
        }
    }

    move(position);
}

//move objects
function move(position){
    for(let i=0; i <position.length;i++){
        d3.selectAll("#casetta"+i).selectAll(".casetta").transition().duration(t)
            .attr("transform" , "translate(" + (-(i*100) + (position[i]*100)) + ",0)");
    }

}

//draw houses
function draw(data,i,x,y) {
    var casetta = svg.append("g")

    casetta.selectAll("casetta.rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class" , "casetta rect")
        .attr("x", function () {
            return x
        })
        .attr("y", function () {
            return y
        })
        .attr("width", function (d) {
            return d.width
        })
        .attr("height", function (d) {
            return d.height
        })
        .attr("fill", "#ffccbc")
        .append("title")
        .text(function() { return "click here to order houses by width" });

    casetta.selectAll("casetta.chimney")
        .data(data)
        .enter()
        .append("rect")
        .attr("class","casetta chimney")
        .attr("x", function (d) {
            return x+d.width*8/10
        })
        .attr("y", function (d) {
            return y - d.chimney_height
        })
        .attr("width", function (d) {
            return d.width/10
        })
        .attr("height", function (d) {
            return d.chimney_height
        })
        .attr("fill", "#3e2723");

    casetta.selectAll("casetta.roof")
        .data(data)
        .enter()
        .append("polyline")
        .attr("class","casetta roof")
        .attr("points", function (d) {
            var path = "";
            var x2 = x + d.width;
            var x1 = (x2+x)/2;
            path += x + ',' + y + ',' + x1 + ',' + d.roof_height + ',' + x2 + ',' + y;
            return path;
        })
        .attr("fill", "#8d6e63");

    casetta.selectAll("casetta.window")
        .data(data)
        .enter()
        .append("rect")
        .attr("class","casetta window")
        .attr("x", function (d) {
            return x+d.width/10
        })
        .attr("y", function () {
            return y+10
        })
        .attr("width", function (d) {
            return d.width/6
        })
        .attr("height", function (d) {
            return d.height/5
        })
        .attr("fill", "#eeeeee")
        .append("title")
        .text(function() { return "click here to order houses by height" });

    casetta.selectAll("casetta.door")
        .data(data)
        .enter()
        .append("rect")
        .attr("class","casetta door")
        .attr("x", function (d) {
            return x+d.width/3
        })
        .attr("y", function (d) {
            return y+d.height *2/3
        })
        .attr("width", function (d) {
            return d.width/3
        })
        .attr("height", function (d) {
            return d.height/3
        })
        .attr("fill", "#bf360c")

    casetta.attr("id" ,"casetta"+ i);
}


