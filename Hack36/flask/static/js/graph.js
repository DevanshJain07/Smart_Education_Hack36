function createGraph(dataFile, chart, equation){
        var margin = { top: 5, right: 5, bottom: 15, left: 15 },
        width = 340 - margin.left - margin.right,
        height = 340 - margin.top - margin.bottom;

    var svg = d3.select(chart).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var xAxis = d3.axisBottom()
        .scale(x);

    var yAxis = d3.axisLeft()
        .scale(y);

    d3.csv(dataFile, types, function (error, data) {

        y.domain(d3.extent(data, function (d) { return d.y }));
        x.domain(d3.extent(data, function (d) { return d.x }));

        // see below for an explanation of the calcLinear function
        var lg = calcLinear(data, "x", "y", d3.min(data, function (d) { return d.x }), d3.min(data, function (d) { return d.x }), equation);

        svg.append("line")
            .attr("class", "regression")
            .attr("x1", x(lg.ptA.x))
            .attr("y1", y(lg.ptA.y))
            .attr("x2", x(lg.ptB.x))
            .attr("y2", y(lg.ptB.y));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.selectAll(".point")
            .data(data)
            .enter().append("circle")
            .attr("class", "point")
            .attr("r", 3)
            .attr("cy", function (d) { return y(d.y); })
            .attr("cx", function (d) { return x(d.x); });

    });
}

function types(d) {
    d.x = +d.x;
    d.y = +d.y;

    return d;
}


function calcLinear(data, x, y, minX, minY, equation) {

    var n = data.length;

    // Get just the points
    var pts = [];
    data.forEach(function (d, i) {
        var obj = {};
        obj.x = d[x];
        obj.y = d[y];
        obj.mult = obj.x * obj.y;
        pts.push(obj);
    });

    var sum = 0;
    var xSum = 0;
    var ySum = 0;
    var sumSq = 0;
    pts.forEach(function (pt) {
        sum = sum + pt.mult;
        xSum = xSum + pt.x;
        ySum = ySum + pt.y;
        sumSq = sumSq + (pt.x * pt.x);
    });
    var a = sum * n;
    var b = xSum * ySum;
    var c = sumSq * n;
    var d = xSum * xSum;

    var m = (a - b) / (c - d);

    // Let e equal the sum of all y-values
    var e = ySum;

    // Let f equal the slope times the sum of all x-values
    var f = m * xSum;

    var b = (e - f) / n;

    document.getElementsByClassName(equation)[0].innerHTML = "y = " + m.toFixed(5) + "x + " + b.toFixed(5);
    document.getElementsByClassName(equation)[1].innerHTML = "x = ( y - " + b.toFixed(5) + " ) / " + m.toFixed(5);

    return {
        ptA: {
            x: minX,
            y: m * minX + b
        },
        ptB: {
            y: minY,
            x: (minY - b) / m
        }
    }

}