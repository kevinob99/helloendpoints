<!-- hide from old browsers

//var baseRgb = d3.rgb(0,136,170);
var baseRgb = d3.rgb(Math.random() * 255,Math.random() * 255,Math.random() * 255);
var baseHcl = d3.hcl(baseRgb);
var baseLab = d3.lab(baseRgb);

var categories = ["Courses", "Contests", "Profile"];
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight,
	aspect = 0.140625,
	navButtonWidth = x / (categories.length + 1);
	
if (x <= 520) {
	navButtonWidth = 120;
}

d3.select(window).on('resize', Resize);


var leftcontent = d3.select('#leftcontent').style('background', baseHcl.darker(0.5));
//var leftsvg = leftcontent.append('svg').attr('class', 'leftSvg').attr('width', '0').attr('height', '100').attr('viewBox', '0 0 178 100').attr('left', '0').attr('top', '0');
//leftsvg.append("rect").attr('x', '10').attr('y', '10').attr('width', '40').attr('height', '10').attr('style', 'fill:' + baseHcl.darker(0.3));



var leftcontainer = d3.select("#leftcontainer");
leftcontainer.style('background', baseHcl.darker(1));
leftcontainer.on('mouseover', function(d) {
	var leftWidth = 520;
	if (x < 520) {
		leftWidth = x;		
	}

	d3.select(this).transition().duration(750).style('width', leftWidth + 'px').each("end", function(){
		d3.select('.leftContent').style('display', 'inline');
	});
	d3.select('#leftcontent').transition().duration(750).style('width', leftWidth - 30 + 'px');
	d3.select('.leftSvg').transition().duration(750).attr('width', leftWidth - 30 + 'px');
	
}).on('mouseout', function(d) {
	d3.select('.leftContent').style('display', 'none');
	d3.select('#leftcontainer').transition().duration(750).style('width', '30px');
	d3.select('#leftcontent').transition().duration(750).style('width', '0px');
	d3.select('.leftSvg').transition().duration(750).attr('width', '0px');
});

var leftContsvg = d3.select('.leftContSvg').attr('width', '30').attr('height', '30').attr('viewBox', '0 0 100 100').style('float', 'right').attr('top', '20');
leftContsvg.append("rect").attr('x', '0').attr('y', '0').attr('width', '100').attr('height', '100').attr('style', 'fill:' + baseHcl.toString());
leftContsvg.append("rect").attr('x', '25').attr('y', '20').attr('width', '50').attr('height', '10').attr('style', 'fill:#ffffff');
leftContsvg.append("rect").attr('x', '25').attr('y', '40').attr('width', '50').attr('height', '10').attr('style', 'fill:#ffffff');
leftContsvg.append("rect").attr('x', '25').attr('y', '60').attr('width', '50').attr('height', '10').attr('style', 'fill:#ffffff');

var header = d3.select("header");
header.style('background', 'white');

var topNav = header.append("svg");

var logo = topNav.append("g").attr('class', 'logo').attr('width', navButtonWidth);

var course = logo.append("text").attr('class', 'course').attr('x', '10').attr('y', '32').text('Course');
var worthy = logo.append("text").attr('class', 'worthy').attr('x', '69').attr('y', '32').text('Worthy');

if (x <= 520) {
	course.attr('style', 'font-size:16px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;');
	worthy.attr('x', '61').attr('style', 'font-family:Kozuka Mincho Pro L; font-size:18px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;').text('Worthy');
}
else {
	course.attr('style', 'font-size:18px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;');
	worthy.attr('style', 'font-family:Kozuka Mincho Pro L; font-size:20px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;');
}

var bottomRect = topNav.append("rect").attr('x', '0').attr('y', '50').attr('width', x).attr('height', '10').attr('style', 'fill:' + baseHcl.toString());

var navCats = topNav.selectAll(".navCat").data(categories).enter().append("g").attr('class', '.navCat').attr('width', navButtonWidth).attr('height', '60').attr('x', function(d, i) { return (i + 1) * navButtonWidth; }).attr('y', '0');

var navRects = navCats.append("rect").attr('x', function(d, i) { return (i + 1) * navButtonWidth; }).attr('y', '0').attr('width', navButtonWidth).attr('height', '50').style('fill', 'white').on('mouseover', function(d){
        d3.select(this).transition().duration(750).style('fill', baseHcl.brighter(1.4));
		d3.select('#' + d + '_label').transition().duration(750).style('fill', 'white');
	}).on('mouseout', function(d){
        d3.select(this).transition().duration(500).style('fill', 'white');
		d3.select('#' + d + '_label').transition().duration(750).style('fill', baseHcl.toString());
	});

var navLabels = navCats.append("text").attr('class', 'navLabel').attr('id', function(d,i){return d + "_label";}).attr('x', function(d, i) { return (i + 1) * navButtonWidth + navButtonWidth / 2; }).attr('y', '28').style("text-anchor", "middle").style("fill", baseHcl.toString()).attr("dy", ".25em").text(function(d) { return d; });

var mainContent = d3.select("#maincontent");

var sections = mainContent.selectAll("div").data([0, 4, 8, 12]).enter().append("div").attr("class", "section");

var cols = sections.selectAll(".col").data(function(d,i) {
	return [d+1, d+2, d+3, d+4];
}).enter().append("div").attr("class", "col span_1_of_4");

var gridSvgs = cols.selectAll("svg").data(function(d,i) {
	return [d];
}).enter().append("svg").attr('class', '.gridSvg').attr('width', x / 4).attr('height', x * aspect).attr('viewBox', '0 0 178 100').attr('left', '0').attr('top', '0');

var imgs = gridSvgs.selectAll("image").data(function(d,i) {
	return [d];
}).enter().append("image").attr("xlink:href", function(d,i) { return "images\\" + d + ".jpg"; }).attr('x', '0').attr('y', '0').attr('width', '178').attr('height', '100');

var rects = gridSvgs.selectAll("rect").data(function(d,i) {
	return [d];
}).enter().append('rect').attr('x', '0').attr('y', '0').attr('width', '178').attr('height', '100').attr('style', 'fill:' + baseLab.toString() + ';opacity:0.1').on('mouseover', function(d,i){
        d3.select(this).transition().duration(1000).style({opacity:'0.8'});
		d3.select('#description' + d).transition().duration(4000).style({opacity:'100'});
}).on('mouseout', function(d){
        d3.select(this).transition().duration(500).style({opacity:'0.1'});
		d3.select('#description' + d).transition().duration(1000).style({opacity:'0'});
});

var descriptions = gridSvgs.selectAll("text").data(function(d,i) {
	return [d];
}).enter().append('text').attr('class', 'description').attr('id', function(d,i){return 'description' + d;}).style('opacity', '0').text(function(d){ return "This is awesome video #" + d;}).attr('x', '89').attr('y', '50').style("text-anchor", "middle").style("fill", 'white').attr("dy", "0.25em");
		

function Resize() {
	x = w.innerWidth || e.clientWidth || g.clientWidth;
	navButtonWidth = x / (categories.length + 1);
	if (x <= 520) {
		course.attr('style', 'font-family:Kozuka Gothic Pro M; font-size:16px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;');
		worthy.attr('x', '62').attr('style', 'font-family:Kozuka Mincho Pro L; font-size:18px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;').text('Worthy');
	}
	else {
		course.attr('style', 'font-family:Kozuka Gothic Pro M; font-size:18px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;');
		worthy.attr('x', '69').attr('style', 'font-family:Kozuka Mincho Pro L; font-size:20px;text-anchor:start;fill:' + baseHcl.darker(0.5) + ';fill-opacity:1;');
	}
	if (x <= 480) {
		gridSvgs.attr('width', x).attr('height', x * aspect * 4);
	}
	else {
		gridSvgs.attr('width', x / 4).attr('height', x * aspect);
		navCats.attr('width', navButtonWidth).attr('x', function(d,i) { return (i + 1) * navButtonWidth; });
		navRects.attr('width', navButtonWidth).attr('x', function(d,i) { return (i + 1) * navButtonWidth; });
		bottomRect.attr('width', x);
		navLabels.attr('x', function(d,i) { return (i + 1) * navButtonWidth + navButtonWidth/2; });
	}
}

function showLeftNav(d) {
	if (x <= 480) {
		d3.select('#leftcontainer').transition().duration(1000).style('width', x + 'px');
	}
	else {
		d3.select('#leftcontainer').transition().duration(1000).style('width', '480px');
	}
}

function hideLeftNav(d) {
	d3.select('#leftcontainer').transition().duration(1000).style('width', '20px');
}

function ReColor() {
	var baseRgb = d3.rgb(Math.random() * 255,Math.random() * 255,Math.random() * 255);
	var baseHcl = d3.hcl(baseRgb);
	var baseLab = d3.lab(baseRgb);
	Draw();
}

/*
var gridSvgs = cols.selectAll("svg").data(function(d,i) {
	return [(i+1)*1, (i+1)*2, (i+1)*3, (i+1)*4];
}).enter().append("svg").attr('width', '100%').attr('height', '400px').attr('viewBox', '0 0 100 100').attr('left', '0').attr('top', '0');

var rects = gridSvgs.append('rect').attr('x', '0').attr('y', '0').attr('width', '100').attr('height', '100').attr('style', 'fill:rgb(0,0,22);fill-opacity:0.1');
*/

// end script hiding -->