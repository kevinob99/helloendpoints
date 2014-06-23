<!-- hide from old browsers

//var baseRgb = d3.rgb(0,136,170);
var leftcontent, leftcontainer, leftContsvg, header, topNav, logo, course, worthy, bottomRect, navCats, navRects, navLabels, mainContent, colorPicker, graphBtn, graphBtnRect, slider;
var showingLeftNav = false;

var baseRgb = d3.rgb(Math.random() * 255,Math.random() * 255,Math.random() * 255);
var baseHcl = d3.hcl(baseRgb);
var baseLab = d3.lab(baseRgb);

var categories = ["Courses", "Contests", "Profile"];
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight|| e.clientHeight|| g.clientHeight,
	aspect = 0.140625,
	navButtonWidth = width / (categories.length + 1);
	
if (width <= 520) {
	navButtonWidth = 120;
}

d3.select(window).on('resize', Resize);

DrawPage();

function DrawGraph() {
	d3.select('.graphSvg').remove();
	var xMin = Number(document.getElementById('xMin').value);
	var xMax = Number(document.getElementById('xMax').value);
	var yMin = Number(document.getElementById('yMin').value);
	var yMax = Number(document.getElementById('yMax').value);
	var resolution = Number(document.getElementById('res').value);
	var func = document.getElementById('eq').value;
	var c = Number(document.getElementById('constval').value);
	var data = [];
	
	for (var x = xMin + 0.0; x < xMax; x = x + resolution) {
		var val = eval('Math.' + func);
		data.push(val);
	}
	
	// define dimensions of graph
    width = w.innerWidth || e.clientWidth || g.clientWidth;
    height = w.innerHeight|| e.clientHeight|| g.clientHeight;
	var m = [80, 80, 80, 120]; // margins
	var gWidth = width - 80 - m[1] - m[3]; // width
	var gHeight = height - 320 - m[0] - m[2]; // height
	var x = d3.scale.linear().domain([0, data.length]).range([0, gWidth]);
	var y = d3.scale.linear().domain([yMin, yMax]).range([gHeight, 0]);
		// automatically determining max range can work something like this
		// var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);
		
	// create a line function that can convert data[] into x and y points
	var line = d3.svg.line().x(function(d,i) { 
			return x(i); 
		}).y(function(d) { 
			return y(d); 
		})
		
	var graph = d3.select("#graph").append("svg").attr('class', 'graphSvg')
	      .attr("width", gWidth + m[1] + m[3])
	      .attr("height", gHeight + m[0] + m[2])
	    .append("g")
	      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

	var xAxis = d3.svg.axis().scale(d3.scale.linear().domain([xMin, xMax]).range([0, gWidth])).tickSize(-gHeight).tickSubdivide(true);
	graph.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + gHeight + ")")
	      .call(xAxis);

	var yAxisLeft = d3.svg.axis().scale(d3.scale.linear().domain([yMin, yMax]).range([gHeight, 0])).ticks(4).orient("left");
	// Add the y-axis to the left
	graph.append("g")
	      .attr("class", "y axis")
	      .attr("transform", "translate(-25,0)")
	      .call(yAxisLeft);

	// Add the line by appending an svg:path element with the data line we created above
	// do this AFTER the axes above so that the line is above the tick-lines
	graph.append("path").attr("d", line(data)).style('stroke', baseHcl.darker(0.5));
	
}

function Resize() {
	
	width = w.innerWidth || e.clientWidth || g.clientWidth;
	console.log('resizing, width = ' + width);
	navButtonWidth = width / (categories.length + 1);
	if (width <= 520) {
		course.attr('style', 'font-family:Kozuka Gothic Pro M; font-size:16px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;');
		worthy.attr('x', '62').attr('style', 'font-family:Kozuka Mincho Pro L; font-size:18px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;').text('Worthy');
	}
	else {
		course.attr('style', 'font-family:Kozuka Gothic Pro M; font-size:18px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;');
		worthy.attr('x', '69').attr('style', 'font-family:Kozuka Mincho Pro L; font-size:20px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;');
	}
	if (width <= 480) {
		//gridSvgs.attr('width', x).attr('height', width * aspect * 4);
	}
	else {
		//gridSvgs.attr('width', width / 4).attr('height', width * aspect);
		topNav.attr('width', width);
		navCats.attr('width', navButtonWidth).attr('x', function(d,i) { return (i + 1) * navButtonWidth; });
		navRects.attr('width', navButtonWidth).attr('x', function(d,i) { return (i + 1) * navButtonWidth; });
		bottomRect.attr('width', width);
		navLabels.attr('x', function(d,i) { return (i + 1) * navButtonWidth + navButtonWidth/2; });
	}
}

function showLeftNav(d) {
	showingLeftNav = true;
	var leftWidth = 520;
	if (width < 520) {
		leftWidth = x;		
	}

	d3.select('.leftcontainer').transition().duration(750).style('width', leftWidth + 'px');
	d3.select('#leftcontainer').transition().duration(750).style('width', leftWidth - 30 + 'px').each("end", function(){
		d3.select('.leftContent').style('display', 'inline');
	});
}

function hideLeftNav(d) {
	showingLeftNav = false;
	d3.select('.leftContent').style('display', 'none');
	d3.select('#leftcontainer').transition().duration(750).style('width', '30px');
	d3.select('#leftcontent').transition().duration(750).style('width', '0px');
}

function Redraw() {
	var color = document.getElementById('themeColor').value;
	console.log(color);
	baseHcl = d3.hcl(color)
	baseLab = d3.lab(color);
	console.log('baseHcl: ' + baseHcl.toString());
	Clear();
	DrawPage();
}

function Clear() {
	/*
	logo.remove();
	course.remove();
	worthy.remove();
	bottomRect.remove();
	navCats.remove();
	navRects.remove();
	navLabels.remove();
	*/
	topNav.remove();
	graphBtnRect.remove();
}

function DrawPage() {
	leftcontent = d3.select('#leftcontent').style('background', baseHcl.darker(0.5));
	leftcontainer = d3.select("#leftcontainer");
	leftcontainer.style('background', baseHcl.darker(1));
	/*
	leftcontainer.on('mouseover', function(d) {
		var leftWidth = 520;
		if (width < 520) {
			leftWidth = x;		
		}

		d3.select(this).transition().duration(750).style('width', leftWidth + 'px').each("end", function(){
			d3.select('.leftContent').style('display', 'inline');
		});
		d3.select('#leftcontent').transition().duration(750).style('width', leftWidth - 30 + 'px');
		d3.select('.leftSvg').transition().duration(750).attr('width', leftWidth - 30 + 'px');	
	});*/

	leftContsvg = d3.select('.leftContSvg').attr('width', '30').attr('height', '30').attr('viewBox', '0 0 100 100').style('float', 'right').attr('top', '20');
	leftContsvg.append("rect").attr('x', '0').attr('y', '0').attr('width', '100').attr('height', '100').attr('style', 'fill:' + baseHcl.toString());
	leftContsvg.append("rect").attr('x', '25').attr('y', '20').attr('width', '50').attr('height', '10').attr('style', 'fill:#ffffff');
	leftContsvg.append("rect").attr('x', '25').attr('y', '40').attr('width', '50').attr('height', '10').attr('style', 'fill:#ffffff');
	leftContsvg.append("rect").attr('x', '25').attr('y', '60').attr('width', '50').attr('height', '10').attr('style', 'fill:#ffffff');
	leftContsvg.on('click', function(d) {
		if (showingLeftNav) { 
			hideLeftNav(d);
		}
		else {
			showLeftNav(d);
		}
		/*
		d3.select('.leftContent').style('display', 'none');
		d3.select('#leftcontainer').transition().duration(750).style('width', '30px');
		d3.select('#leftcontent').transition().duration(750).style('width', '0px');
		d3.select('.leftSvg').transition().duration(750).attr('width', '0px');*/
	});

	header = d3.select("header");
	header.style('background', 'white');

	topNav = header.append("svg").attr('width', width);

	logo = topNav.append("g").attr('class', 'logo').attr('width', navButtonWidth);

	course = logo.append("text").attr('class', 'course').attr('x', '10').attr('y', '32').text('Course');
	worthy = logo.append("text").attr('class', 'worthy').attr('x', '69').attr('y', '32').text('Worthy');

	if (width <= 520) {
		course.attr('style', 'font-size:16px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;');
		worthy.attr('x', '61').attr('style', 'font-family:Kozuka Mincho Pro L; font-size:18px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;').text('Worthy');
	}
	else {
		course.attr('style', 'font-size:18px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;');
		worthy.attr('style', 'font-family:Kozuka Mincho Pro L; font-size:20px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;');
	}
	bottomRect = topNav.append("rect").attr('x', '0').attr('y', '50').attr('width', width).attr('height', '10').attr('style', 'fill:' + baseHcl.toString());

	navCats = topNav.selectAll(".navCat").data(categories).enter().append("g").attr('class', '.navCat').attr('width', navButtonWidth).attr('height', '60').attr('x', function(d, i) { return (i + 1) * navButtonWidth; }).attr('y', '0');

	navRects = navCats.append("rect").attr('x', function(d, i) { return (i + 1) * navButtonWidth; }).attr('y', '0').attr('width', navButtonWidth).attr('height', '50').style('fill', 'white').on('mouseover', function(d){
	        d3.select(this).transition().duration(750).style('fill', baseHcl.brighter(1.4));
			d3.select('#' + d + '_label').transition().duration(750).style('fill', 'white');
		}).on('mouseout', function(d){
	        d3.select(this).transition().duration(500).style('fill', 'white');
			d3.select('#' + d + '_label').transition().duration(750).style('fill', baseHcl.toString());
		});

	navLabels = navCats.append("text").attr('class', 'navLabel').attr('id', function(d,i){return d + "_label";}).attr('x', function(d, i) { return (i + 1) * navButtonWidth + navButtonWidth / 2; }).attr('y', '28').style("text-anchor", "middle").style("fill", baseHcl.toString()).attr("dy", ".25em").text(function(d) { return d; });

	mainContent = d3.select('#maincontent').style('left', '60px');

	colorPicker = d3.select('#themeColor').on('change', function(d) { Redraw(); });
	d3.select('#grapherTitle').style('color', baseHcl.darker(0.25));
	graphBtn = d3.select('#graphButton');
	graphBtnRect = graphBtn.append('rect').attr('width', '120').attr('y', '10').attr('height', '30').style('fill', baseHcl.toString());
	graphBtn.append('text').attr('x', '60').attr('y', '30').attr('class', 'course').attr('style', 'font-size:12px;text-anchor:middle;fill:#ffffff').text('Graph');
	graphBtn.on('click', function(d) { DrawGraph();});
	graphBtnRect.on('mouseover', function(d) { d3.select(this).style('fill', baseHcl.brighter(0.5));});
	graphBtnRect.on('mouseout', function(d) { d3.select(this).style('fill', baseHcl.toString());});

	slider = d3.select('#constval').on('input', function(d) { DrawGraph(); });
	slider.min = 0;
	slider.max = Math.PI;

	DrawGraph();	
}

/*
var gridSvgs = cols.selectAll("svg").data(function(d,i) {
	return [(i+1)*1, (i+1)*2, (i+1)*3, (i+1)*4];
}).enter().append("svg").attr('width', '100%').attr('height', '400px').attr('viewBox', '0 0 100 100').attr('left', '0').attr('top', '0');

var rects = gridSvgs.append('rect').attr('x', '0').attr('y', '0').attr('width', '100').attr('height', '100').attr('style', 'fill:rgb(0,0,22);fill-opacity:0.1');
*/

// end script hiding -->