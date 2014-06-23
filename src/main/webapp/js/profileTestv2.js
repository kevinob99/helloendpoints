<!-- hide from old browsers

var baseRgb = d3.rgb(181,9,97);
var baseHcl = d3.hcl(baseRgb);
var baseLab = d3.lab(baseRgb);

var centerToOrigin = function(el) {
  var boundingBox = el.getBBox();
  return {
    x: -1 * Math.floor(boundingBox.width / 2),
    y: -1 * Math.floor(boundingBox.height / 2)
  };
};

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

/*
var leftcontainer = d3.select("#leftcontainer");
leftcontainer.style('background', baseHcl.darker(1));
leftcontainer.on('mouseover', function(d) {
	if (x <= 480) {
		d3.select(this).transition().duration(750).style('width', x + 'px');
	}
	else {
		d3.select(this).transition().duration(750).style('width', '480px');
	}
}).on('mouseout', function(d) {
	d3.select('#leftcontainer').transition().duration(750).style('width', '20px');
});
*/

var header = d3.select("header");
header.style('background', 'white');

var topNav = header.append("svg");

var logo = topNav.append("g").attr('class', 'logo').attr('width', navButtonWidth);

var course = logo.append("text").attr('class', 'course').attr('x', '10').attr('y', '32').text('Course');
var worthy = logo.append("text").attr('class', 'worthy').attr('x', '70').attr('y', '32').text('Worthy');

if (x <= 520) {
	course.attr('style', 'font-size:16px;text-anchor:start;fill:' + baseHcl.toString() + ';fill-opacity:1;');
	worthy.attr('x', '62').attr('style', 'font-family:Kozuka Mincho Pro L; font-size:16px;text-anchor:start;fill:' + baseHcl.toString() + ';fill-opacity:1;').text('Worthy');
}
else {
	course.attr('style', 'font-size:18px;text-anchor:start;fill:' + baseHcl.toString() + ';fill-opacity:1;');
	worthy.attr('style', 'font-family:Kozuka Mincho Pro L; font-size:18px;text-anchor:start;fill:' + baseHcl.toString() + ';fill-opacity:1;');
}

var bottomRect = topNav.append("rect").attr('x', '0').attr('y', '50').attr('width', x).attr('height', '10').attr('style', 'fill:' + baseHcl.toString());

var navCats = topNav.selectAll(".navCat").data(categories).enter().append("g").attr('class', '.navCat').attr('width', navButtonWidth).attr('height', '60').attr('x', function(d, i) { return (i + 1) * navButtonWidth; }).attr('y', '0');

var navRects = navCats.append("rect").attr('x', function(d, i) { return (i + 1) * navButtonWidth; }).attr('y', '0').attr('width', navButtonWidth).attr('height', '50').style('fill', 'white').on('mouseover', function(d){
        d3.select(this).transition().duration(750).style('fill', baseHcl.brighter(1.4)); }).on('mouseout', function(d){
        d3.select(this).transition().duration(500).style('fill', 'white'); });
		
var navLabels = navCats.append("text").attr('class', 'navLabel').attr('x', function(d, i) { return (i + 1) * navButtonWidth + navButtonWidth / 2; }).attr('y', '28').style("text-anchor", "middle").style("fill", baseHcl.toString()).attr("dy", ".25em").text(function(d) { return d; });

var mainContent = d3.select("#maincontent");
/*
var sections = mainContent.selectAll("div").data([0, 3, 6]).enter().append("div").attr("class", "section");

var cols = sections.selectAll(".col").data(function(d,i) {
	return [d+1, d+2, d+3];
}).enter().append("div").attr("class", "col span_1_of_3");

var gridSvgs = cols.selectAll("svg").data(function(d,i) {
	return [d];
}).enter().append("svg").attr('width', x / 4).attr('height', x * aspect).attr('viewBox', '0 0 178 100').attr('left', '0').attr('top', '0');

var txts = gridSvgs.selectAll("text").data(function(d,i) {
	return [d];
}).enter().append("text").attr('x', '89').attr('y', '50').text('Kiwi').style('font-family', 'Lato Light').style("font-weight", function(d,i) { return 'normal'; });

var rects = gridSvgs.append('rect').attr('x', '0').attr('y', '0').attr('width', '178').attr('height', '100').attr('style', 'fill:' + baseLab.toString() + ';opacity:0.1').on('mouseover', function(d){
        d3.select(this).transition().duration(1000).style({opacity:'0.7'}); }).on('mouseout', function(d){
        d3.select(this).transition().duration(500).style({opacity:'0.1'}); });
*/

var width = x - 12;
//width = 500;
//var centerX = width / 2;

if (width > 580) {
	width = x*.25*.9; //580;
	width60 = x*.6;
}
var centerX = width / 2;

var height = 515; //700;
height = y*.25*.9;
var radius = width / 5;
var cx = 0;
var cy = 0;
var centerY = 85 + (2*radius); //height / 2;
var thickness = 18;
var data = [
	{attribute: 'Trustworthiness', score: 99},
	{attribute: 'Reliability', score: 92},
	{attribute: 'Acting', score: 86},
	{attribute: 'Leadership', score: 77},
	{attribute: 'Math', score: 69},
	{attribute: 'English', score: 63},
	{attribute: 'History', score: 57},
	{attribute: 'Computer Science', score: 45},
	{attribute: 'Creative Writing', score: 39},
	{attribute: 'Biology', score: 33},
	{attribute: 'Finance', score: 21},
	{attribute: 'Graphic Design', score: 17}
];
var displayName = mainContent.append('div').style('width', x + 'px').style('height', '50px').style('margin-top', '0px').style('float', 'left'); //.style('margin-left', '2%')
var dispNameSVG = displayName.append('svg').style('background-color', '#E5E5E5');
//displayNameSVG.style('cursor', 'pointer').on('click', function()
dispNameSVG.append('text').attr('class', 'nameHeader').attr('fill', baseHcl.toString()).attr('x', '7').attr('y', '40').text('Jennifer Lawrence');
var skillWheel = mainContent.append('div').style('width', width + 'px').style('height', height + 'px').style('margin-left', '5%').style('margin-right', '5%').style('margin-top', '0px').style('float', 'right').style('display', 'none');
//var svg = mainContent.append('svg').attr('width', width/*x - 12*/).attr('height', height).style('margin-left', 'auto').attr('margin-right', 'auto').style('margin-top', '0').data(data);
var svg = skillWheel.append('svg').data(data);

var defs = svg.append('defs');
var r = 2*radius + thickness/2;

defs.append('path').attr('id', 'archPath1').attr('d', 'M ' + (cx - r) + ',' + cy + ' A' + r + ',' + r + ' 0 0,1 ' + (cx + r) + ',' + cy);

r = 2*radius - thickness;

defs.append('path').attr('id', 'archPath0').attr('d', 'M ' + (cx - r) + ',' + cy + ' A' + r + ',' + r + ' 0 0,1 ' + (cx + r) + ',' + cy);

defs.append('clipPath').attr('id', 'circleMask').append('circle').attr('cx', centerX).attr('cy', centerY).attr('r', radius).attr('maskUnits', 'objectBoundingBox');

defs.append('clipPath').attr('id', 'outerCircleMask').append('circle').attr('cx', centerX).attr('cy', centerY).attr('r', 2*radius).attr('maskUnits', 'objectBoundingBox');

var radialGrad = defs.append('radialGradient').attr('id', 'grad1').attr('cx', centerX).attr('cy', centerY).attr('r', width).attr('fx', centerX / 2).attr('fy', centerY);
radialGrad.append('stop').attr('offset', '60%').style('stop-color', 'white').style('stop-opacity', '1');
radialGrad.append('stop').attr('offset', '100%').style('stop-color', baseHcl.toString()).style('stop-opacity', '1');

//var rect = svg.append('rect').attr('width', width).attr('height', height).attr('x', '0').attr('y', '0').attr('fill', 'url(#grad1)');


var scoreBubble;
var scoreLabel;
var selectedIndex = 0;

//var name = svg.append('text').attr('class', 'nameHeader').attr('text-anchor', 'middle').attr('fill', baseHcl.toString()).attr('x', centerX).attr('y', '60').text('Jennifer Lawrence');
var name = svg.append('text').attr('class', 'nameHeader').attr('text-anchor', 'middle').attr('fill', baseHcl.toString()).attr('x', centerX).attr('y', '45').text('My Skills');
var profileContainer = svg.append('g')
	.attr('id', 'profileContainer')
	.attr("transform", "translate(" 
		+ centerX + ", " + centerY + ")");

var profileGroup = profileContainer.append('g').attr('id', 'profileGroup');

var outerCircle = profileGroup.append('circle')
	.attr('cx', cx).attr('cy', cy)
	.attr('r', 2*radius)
	.attr('stroke', baseHcl.brighter(0.5))
	.attr('stroke-width', thickness / 8)
	.attr('fill', baseHcl.brighter(1))
	.attr('fill-opacity', '0.05')
	.attr('stroke-opacity', '0.25');

var bars = profileGroup.selectAll('path')
	.data(data).enter().append('path')
	.attr('id', function(d) { return 'bar_' + dashify(d.attribute); })
	.attr('d', function(d,i) { 
		var dy = barHeight(d);
		var dx = barWidth(d);
		return 'M' + cx + ',' + (radius - thickness/2) + ' l' 
			+ dx/2 + ',' + dy + ' h' + (-1 * dx) + ' z';
	})
	.style('cursor', 'pointer')
	.style('fill', baseHcl.darker(0.5))
	.style('stroke-width', '0')
	.attr('transform', function(d,i) { 
		return 'rotate(' + (180 + (360/(data.length)) * (i - selectedIndex)) + ')';
	})
	.on('click', function(d,i) {
		SelectAttr(d, i);
	})
	.on('mouseover', function(d,i) { 
		
		ShowScore(d, i);
	})
	.on('mouseout', function(d) { 
		d3.select(this).style('fill', baseHcl.darker(0.5));
		HideScore(d);
	});

var innerCircle = profileGroup.append('circle').attr('cx', cx).attr('cy', cy).attr('r', radius + 1).attr('stroke', baseHcl.toString()).attr('stroke-width', thickness / 2).attr('fill-opacity', '0.0');

var attrLabels = profileGroup.selectAll('attrLabel').data(data).enter()
	.append('text')
	.attr('class', 'attrLabel')
	.attr('id', function(d) { return 'attrLabel_' + dashify(d.attribute); })
	.attr('text-anchor', 'middle')
	.attr('fill', baseHcl.darker(1))
	.attr('transform', function(d,i) { 
		return 'rotate(' + (360/(data.length)) * i + ',' + cx + ',' + cy + ')'; 
	})
	.on('mouseover', function(d,i) { ShowScore(d, i); })
	.on('mouseout', function(d,i) { HideScore(d); })
	.on('click', function(d,i) {SelectAttr(d, i); })
	.append('textPath')
		.attr('xlink:href', function(d,i) { 
			return '#archPath' + (i%2); 
		})
		.attr('startOffset', '50%')
		.text(function(d){ return d.attribute;});

var img = svg.append('image').attr('xlink:href', 'images/JenL2.jpg').attr('x', centerX - 129).attr('width', 0.685*360).attr('height', '360').attr('y', centerY - 139).attr('clip-path', 'url(#circleMask)');
//*******************************
//Kevin's Code Starts Here

var btnWidth = 300;
var appId,btnHolderWidth, btnHolderDisplay;
var app1 = mainContent.append('div').style('width', '0%').style('margin-top', '10px').attr('class', 'nameHeader').style('color', baseHcl.toString()).style('float', 'left').style('padding', '7px').attr('id', 'app1').style('display', 'none').style('margin-right', '1%'); //style('background-color', '#626262').
var app1Title = app1.append('div').style('height', '50px').attr('id', 'appTitle1').style('background-color', '#BDBDBD').style('margin', '10px').text('App1');
var app1Content = app1.append('div').style('background-color', '#626262').attr('id', 'app1Content');//add stuff here

var btnHolder = mainContent.append('div').style('width', '100%').style('float', 'left').attr('id', 'btnHolder'); //.style('background-color', '#676767')

var app2 = mainContent.append('div').style('width', '0%').style('margin-top', '10px').attr('class', 'nameHeader').style('color', baseHcl.toString()).style('float', 'left').style('padding', '7px').attr('id', 'app2').style('display', 'none').style('margin-left', '1%'); //style('background-color', '#626262').
var app2Title = app2.append('div').style('height', '50px').attr('id', 'appTitle2').style('background-color', '#BDBDBD').style('margin', '10px').text('App2');
var app2Content = app2.append('div').style('background-color', '#626262').attr('id', 'app2Content');//add stuff here
var btnTypeIdx, btnTypes, buttons, btnContent;

makeGrid();

var wrapper = d3.select("#wrapper");
var footerContainer = wrapper.append('div');
footerContainer.append('footer').attr('class', 'group');

d3.select(window).on('resize', Resize);

//Functions
function makeGrid(){
	btnTypes = ["Skills",
					"Competitions",
					"Projects",
					"Badges",
					"Exercises",
					"Media"];

	buttons = [];
	btnContent = [];
	for (btnTypeIdx = 0; btnTypeIdx < btnTypes.length; btnTypeIdx++)
	{
		buttons[btnTypeIdx] = btnHolder.append('div').style('width', width + 'px').style('height', width/1.618 + 'px').style('margin-top', '10px').style('float', 'left').style('margin-left', '2%').attr('id', 'button' + btnTypeIdx).style('background-color', '#AAAAAA').style('cursor', 'pointer'); 
		buttons[btnTypeIdx].append('div').attr('class', 'nameHeader').style('color', baseHcl.toString()).style('margin-right', '25px').style('margin', '10px').style('padding', '7px').text(btnTypes[btnTypeIdx]); // + "<br>");
		btnContent[btnTypeIdx] = buttons[btnTypeIdx].append('div').attr('height', '0').style('height', '0px').attr('id', 'btnContent' + btnTypeIdx);
		bCon = btnContent[btnTypeIdx];
		buttons[btnTypeIdx]
		.on('click', function(evt){
			buttonClicked(this.id);
			});
	}
}

function buttonClicked(id) {
	var idx = id.match(/(?:button)([^\s&]+)/);
	id = parseInt(idx[1]);
	//clickedBtn = d3.select('#button' + id);
	//clickedBtn.style('display', 'none');
	//btnHolder = d3.select('#btnHolder');
	
	//btnHolderWidth = btnHolder.style('width');
	//btnHolderWidth = btnHolderWidth.match(/([^\s&]+)(?:px)/);
	//btnHolderWidth = parseInt(btnHolderWidth[1]);
	/*
	var closeApp1 = app1Title.append('div').text('X').style('float', 'right').style('cursor', 'pointer').style('margin', '10px').style('display', 'block')
	.on('click', function(){
	closeApp(1);
	});
	var closeApp2 = app2Title.append('div').text('X').style('float', 'right').style('cursor', 'pointer').style('margin', '10px').style('display', 'block')
	.on('click', function(){
	closeApp(2);
	});
	*/
	
	btnHolderDisplay = btnHolder.style('display');
	if ((app1.style('display') == 'none') && (app2.style('display') == 'none')) //(btnHolderWidth > x*.7) 
	{
		appId = 1;
		btnHolder.attr('width', x/5).style('width', '49%'); //.style('background-color', '#626262');
		//app1Title.text('' + btnTypes[id]);
		showApp(); //d3.timer(showApp, 1000);
		app1Title.text('' + btnTypes[id]);
		
		var closeApp1 = app1Title.append('div').text('X').style('float', 'right').style('cursor', 'pointer').style('margin', '10px').style('display', 'block')
			.on('click', function(){
			closeApp(1);
		});
		
		app1Content.transition().duration(1000).style('height', '700px');
		//app1.append('div').style('margin-left', 'auto').style('margin-right', 'auto').text('' + btnTypes[id]);
	}
	else if ((app1.style('display') != 'none') && (app2.style('display') == 'none')) //(btnHolderWidth > x*.2)
	{
		appId = 2;
		//btnHolder.transition().duration(1000).style('display', 'none'); //.style('background-color', '#FFFFFF');
		btnHolder.style('display', 'none');/*.transition().duration(1000)*/ //.style('opacity', '0').remove();
		//app2Title.text('' + btnTypes[id]);
		showApp();//d3.timer(showApp, 1000);
		app2Title.text('' + btnTypes[id]);
		
		var closeApp2 = app2Title.append('div').text('X').style('float', 'right').style('cursor', 'pointer').style('margin', '10px').style('display', 'block')
			.on('click', function(){
			closeApp(2);
		});
		
		app2Content.transition().duration(500).style('height', '700px');
		//app2.append('text').style('margin-left', 'auto').style('margin-right', 'auto');
	}
	else if ((app1.style('display') == 'none') && (app2.style('display') != 'none'))
	{
		appId = 1;
		//btnHolder.transition().duration(1000).style('display', 'none');
		btnHolder.style('display', 'none'); //.transition().duration(1000).style('opacity', '0').remove();
		//app1Title.text('' + btnTypes[id]);
		showApp();//d3.timer(showApp, 1000);
		app1Title.text('' + btnTypes[id]);
		
		var closeApp1 = app1Title.append('div').text('X').style('float', 'right').style('cursor', 'pointer').style('margin', '10px').style('display', 'block')
			.on('click', function(){
			closeApp(1);
		});
		
		app2Content.transition().duration(500).style('height', '700px');
	}
}

function closeApp(idx) {
	var app = d3.select('#app' + idx);
	app.transition().duration(1000).style('width', '0%').style('height', '0px').style('opacity', '0');
	app.style('display', 'none'); //.transition().duration(500).style('height', '100%');
	
	//btnHolderDisplay = btnHolder.style('display');
	// btnHolderWidth = btnHolder.style('width');
	if (btnHolder.style('display') == 'none')
	{
		//makeGrid();
		//mainContent.append('#btnHolder');
		/*
		mainContent.append(function(){
			btnHolder.style('opacity', '1');
			return btnHolder[0][0];
		});
		*/
		btnHolder.style('display', 'block').style('opacity', '1').style('width', '49%');
	}
	else
	{
		btnHolder.style('width', '100%');
	}
}

function showApp() {
	var app = d3.select('#app' + appId);
	app.style('display', 'block').transition().duration(1000).style('width', '47%').style('opacity', '1'); //.transition().duration(500).style('height', '100%');
}
/* ********************************************************************/
// Kevin's Code Ends here
function dashify(str) {
	return str.replace(/\s+/g, '-');
}

function SelectAttr(d, i) {
	d3.select('#profileGroup').transition().duration(750)
		.attr('transform', 'rotate(' + ((-360/(data.length)) * i) 
		+ ')');
	//svg.transition().duration(750).style('margin-top', '250');
	scoreBubble.remove();
	scoreLabel.remove();
	selectedIndex = i;
	ShowScore(d,i);
}

function ShowScore(d, i) {
	var dx = centerX + (radius - thickness/2) * Math.sin((i - 
		selectedIndex)*(2*Math.PI/data.length));
	var dy = centerY - (radius - thickness/2) * Math.cos((i -
		selectedIndex)*(2*Math.PI/data.length));
	var color = baseHcl.brighter(0.5);
	
	d3.select('#bar_' + dashify(d.attribute)).style('fill', color);
	d3.select('#attrLabel_' + dashify(d.attribute)).style('fill', color);
	scoreBubble = svg.append('circle')
		.attr('class', 'scoreBubble')
		.attr('cx', dx).attr('cy', dy)
		.attr('r', thickness)
		.attr('fill', baseHcl.brighter(0.5))
		.attr('clip-path', 'url(#outerCircleMask)')
		.style('cursor', 'pointer');
	scoreLabel = svg.append('text').attr('class', 'scoreLabel')
		.attr('class', 'scoreBubble')
		.attr('x', dx).attr('dy', dy + thickness / 3)
		.style('fill', '#ffffff').style('text-anchor', 'middle')
		.text(d.score)
		.attr('clip-path', 'url(#outerCircleMask)')
		.style('cursor', 'pointer');
}

function HideScore(d) {
	scoreBubble.remove();
	scoreLabel.remove();
	d3.select('#bar_' + dashify(d.attribute)).style('fill', baseHcl.darker(0.5));
	d3.select('#attrLabel_' + dashify(d.attribute)).style('fill', baseHcl.darker(1));
}

function barHeight(d) {
	return (d.score/100) * (radius - thickness);
}

function barWidth(d) {
	return (d.score / 100) * ((radius + 100) / data.length);
}

function Resize() {
	x = w.innerWidth || e.clientWidth || g.clientWidth;
	navButtonWidth = x / (categories.length + 1);
	if (x <= 520) {
		course.attr('style', 'font-family:Kozuka Gothic Pro M; font-size:16px;text-anchor:start;fill:' + baseHcl.toString() + ';fill-opacity:1;');
		worthy.attr('x', '62').attr('style', 'font-family:Kozuka Mincho Pro L; font-size:16px;text-anchor:start;fill:' + baseHcl.toString() + ';fill-opacity:1;').text('Worthy');
	}
	else {
		course.attr('style', 'font-family:Kozuka Gothic Pro M; font-size:18px;text-anchor:start;fill:' + baseHcl.toString() + ';fill-opacity:1;');
		worthy.attr('x', '70').attr('style', 'font-family:Kozuka Mincho Pro L; font-size:18px;text-anchor:start;fill:' + baseHcl.toString() + ';fill-opacity:1;');
	}
	if (x <= 480) {
		//gridSvgs.attr('width', x).attr('height', x * aspect * 4);
	}
	else {
		//gridSvgs.attr('width', x / 4).attr('height', x * aspect);
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

/*
var gridSvgs = cols.selectAll("svg").data(function(d,i) {
	return [(i+1)*1, (i+1)*2, (i+1)*3, (i+1)*4];
}).enter().append("svg").attr('width', '100%').attr('height', '400px').attr('viewBox', '0 0 100 100').attr('left', '0').attr('top', '0');

var rects = gridSvgs.append('rect').attr('x', '0').attr('y', '0').attr('width', '100').attr('height', '100').attr('style', 'fill:rgb(0,0,22);fill-opacity:0.1');
*/

// end script hiding -->