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
var h1 = 189;
var h2 = 355;
var chroma = 99;
var cNaught = 90;
var cDelta = 0;
var lightness = 66;
var color1 = d3.hcl(h1, chroma, lightness);
var color2 = d3.hcl(h2, chroma, lightness);

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

var width = (x - 12); //x - 12;
//width = 500;
//var centerX = width / 2;

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
dispNameSVG.append('text').attr('class', 'nameHeader').attr('fill', baseHcl.toString()).attr('x', '7').attr('y', '40').text('UserName');
//*******************************
//Kevin's Code Starts Here
var scoreBubble;
var scoreLabel;
var selectedIndex = 0;
var svg;
var skillsPreview = '1256 pts';
var compsPreview;
var projectsPreview;
var BadgesPreview;

var btnTypeIdx, btnTypes, buttons, btnContent;
//var btnHolder = mainContent.append('div').style('width', '100%').style('float', 'left').attr('id', 'btnHolder');
var appHolder = mainContent.append('div').style('position', 'absolute').style('top', '60px').style('left', '0px').style('z-index', 2).attr('id', 'appHolder');
var hexDiv = mainContent.append('div').style('position', 'absolute').style('top', '60px').style('left', '0px').style('z-index', 0).style('width', '100%').attr('id', 'hexDiv');
var hexHolder = hexDiv.append('svg').style('width', '100%').style('left', '0px').attr('id', 'hexHolder');
var btnTypes = [{title: "Skills", previewData: skillsPreview},
				{title: "Competitions", previewData: 0},
				{title: "Projects", previewData: 0},
				{title: "Badges", previewData: 0},
				{title: "Exercises", previewData: 0},
				{title: "Media", previewData: 0}
				];

var buttons = [];
var btnTitle = [];
var btnContent = [];
var appWidth = "47%";
var gridWidth = "100%";
var btnHeight, appHeight;

pWidth = width*.9;

if (pWidth > 580) {
	pWidth = x*.25*.9; //580;
	if (pWidth < 250)
	{
		pWidth = x*.5*.9;
	}

}
if (width < 1000)
{
	appWidth = "98%";
}

btnTitleHeight = 35;
btnContentHeight = pWidth/1.618 - 50;
btnHeight = btnTitleHeight + btnContentHeight;
appHeight = y - 150;
if (appHeight < 450) appHeight = 450;
var hexHolderWidth = hexHolder.property('offsetWidth'); //style('offsetWidth');
HexGrid(150,0,0,hexHolderWidth,600,hexHolder, 6);

var wrapper = d3.select("#wrapper");
var footerContainer = wrapper.append('div');
footerContainer.append('footer').attr('class', 'group');

d3.select(window).on('resize', Resize);

//Functions
function HexGrid(radius, left, top, right, bottom, element, margin, callingApp) {
	// Clear the HexGrid
	/*
	while (hexHolder.lastChild) 
	{
		hexHolder.removeChild(hexHolder.lastChild);
	}*/
	if (hexHolder[0][0].childNodes.length != 0)
	{
	nodeArray = d3.selectAll(hexHolder[0][0].childNodes);
	nodeArray.remove();
	}
	left = left - 3*radius;
	var centx = left;
	var centy = top; // + radius;
	var dy = radius * Math.sqrt(3) / 2 + margin/2;
	var dx = 3 * radius + margin;
	var offAmt = dx / 2;
	var color;
	var hoverColor = color1.toString();
	var offset = 0;
	var fullHex;
	var hexId = 0;
	var appClipped = false;
	var oX = 0;
	var oY = 0;
	//if (path) path.remove();

	if (callingApp != null)
	{
		callingApp = d3.select(callingApp);
		oL = callingApp.property('offsetLeft');
		oT = callingApp.property('offsetTop');
		oW = callingApp.property('offsetWidth');
		oH = callingApp.property('offsetHeight');
		// mR = hexHolder.property('offsetWidth');
		// mT = hexHolder.property('offsetTop');
		// mH = hexHolder.property('offsetHeight');
		oX = oL + oW;
		oY = oT + oH;
		
		if ( (oL + oW) < x*.7)
		{
			/*
			appClipPts = (oL + oW) + ',' + 0 + ' ' + mR + ',' + 0 + ' ' + mR + ',' + (mT + mH) + ' ' + 0 + ',' + (mT + mH) + ' ' + 0 + ',' + (oT + oH) + ' ' + (oL + oW) + ',' + (oT + oH);
			hexHolder.style('top', oT + 'px');
			var hexDefs = hexHolder.append('defs');
			var path = hexDefs.append('clipPath').attr('id', 'appClip').append('polygon').attr('points', appClipPts);
			hexHolder.attr('clip-path', 'url(#appClip)'); //.append('polygon').attr('points', appClipPts).attr('fill', color)
			*/
			centy = oT;
			appClipped = true;
		}
		else
		{
			hexHolder.style('top', oT + oH + 'px');
			centy = oT + oH;
		}
	
	}
	
	while ((hexId < btnTypes.length)) // && (centy < (bottom + radius))) //cy < (bottom + radius))
	{
		centx = left + dx;
		var off = offAmt*offset;
		while (centx < (right + radius)) {
			//color = colors(Math.random() * 20);
			//color = Math.random() > 0.5 ? color1.brighter(2) : color2.toString();
			color = baseHcl.toString();
			
			var hexagon = polygon(6, radius, centx + off, centy, element, appClipped, oX, appHeight);

			//fullHex = isHexFull(hexagon, element);
			if ((hexagon.attr('outOfBounds') == 'false') && (hexId < btnTypes.length))
			{
				hexagon.attr('fill', color).attr('id', 'hex' + hexId);
				var hexText = element.append('text').attr('class', 'nameHeader').style('fill', '#FFFFFF').text(btnTypes[hexId].title).attr('x', centx + off).attr('y', centy).attr('text-anchor', 'middle');
				hexagon.style('cursor', 'pointer')
				.on('mouseover', function(){
					d3.select(this).attr('fill', hoverColor);
				})
				.on('mouseout', function(){
					d3.select(this).attr('fill', color);
				})
				.on('mousedown', function(){
					buttonClicked(this.id);
				});
				hexId = hexId + 1;
				element.style('height', centy + radius + margin + 'px');
			}
			else
			{
				hexagon.attr('fill', '#BBBBBB');
			}
			hexagon.attr('fill-opacity', 0.9) //.attr('fill-opacity', 0.1)
			.attr('stroke-width', 0);
			centx += dx;
		}
		//centx = left + dx + off;
		centy += dy;
		offset = (offset + 1) % 2;
	}
	if (callingApp != null)
	{
		if ( (oL + oW) < x*.7)
		{
			mR = hexHolder.property('offsetWidth');
			mT = hexHolder.property('offsetTop');
			mH = hexHolder.property('offsetHeight');
			//appClipPts = (oL + oW) + ',' + 0 + ' ' + mR + ',' + 0 + ' ' + mR + ',' + (mT + mH) + ' ' + 0 + ',' + (mT + mH) + ' ' + 0 + ',' + (/*oT + oH*/appHeight) + ' ' + (oL + oW) + ',' + (/*oT + oH*/appHeight);
			hexHolder.style('top', oT + 'px');
			//var hexDefs = hexHolder.append('defs');
			//var path = hexDefs.append('clipPath').attr('id', 'appClip').append('polygon').attr('points', appClipPts);
			//hexHolder.attr('clip-path', 'url(#appClip)'); //.append('polygon').attr('points', appClipPts).attr('fill', color);
			//centy = oT;
			//appClipped = true;
		}
		else
		{
			hexHolder.style('top', oT + oH + 'px');
			//centy = oT + oH;
		}
	}
}


function polygon(n, r, cx, cy, element, appClipped, oX, oY) {
	var outOfBounds = 'false';
	var points = '';
	var dTheta = 2*Math.PI / n;
	var theta = 0;
	var deltaX = 0;
	var deltaY = 0;
	if (appClipped = true)
	{
		deltaX = oX;
		deltaY = oY;
	}
	for (var i = 0; i <= n; i++) {
		var px = cx + r * Math.cos(theta);
		var py = cy + r * Math.sin(theta);
		points += ' ' + pt(px,py);
		theta += dTheta;
		if ((px < 0)|| (px > element.property('offsetWidth')) || (py < 0) || ((px < deltaX) && (py < deltaY) && (appClipped == true))) // || (py > element.property('offsetHeight')))
		{
			outOfBounds = 'true';
		}
	}

	return element.append('polygon')
		.attr('points', points).attr('outOfBounds', outOfBounds);
}

function pt(px, py) {
	return px + ',' + py;
}

function makeGrid(){

	for (btnTypeIdx = 0; btnTypeIdx < btnTypes.length; btnTypeIdx++)
	{
		buttons[btnTypeIdx] = mainContent.append('div').style('width', pWidth + 'px').style('margin-top', '10px').style('float', 'left').style('margin-left', '2%').attr('id', 'button' + btnTypeIdx).style('background-color', '#AAAAAA').style('cursor', 'pointer'); 
		btnTitle[btnTypeIdx] = buttons[btnTypeIdx].append('div').style('height', btnTitleHeight + 'px').attr('class', 'nameHeader').style('color', baseHcl.toString()).style('margin-right', '25px').style('margin', '10px').style('padding', '4px').text(btnTypes[btnTypeIdx]); // + "<br>");
		btnContent[btnTypeIdx] = buttons[btnTypeIdx].append('div').style('height', btnContentHeight + 'px').style('background-color', '#BDBDBD').attr('id', 'btnContent' + btnTypeIdx);
		if ( (x < 600) || (y < 300) )
		{
			btnContent[btnTypeIdx].style('display', 'none');
		}
		bCon = btnContent[btnTypeIdx];
		buttons[btnTypeIdx]
		.on('click', function(evt){
			buttonClicked(this.id);
		});
	}
}

function buttonClicked(id) {
	var apps = d3.select(id);
	var idx = id.match(/(?:hex)([^\s&]+)/); //(/(?:button)([^\s&]+)/);
	id = parseInt(idx[1]);
	if (apps[0][0] == null)
	{	
		if (appHolder.property('offsetWidth') < .7*x)
		{
			appHolder.style('width', '47%');
		}
		else
		{
			appHolder.style('width', '100%');
		}
		apps = appHolder.append('div')/*mainContent.insert('div', '#hexDiv')*/.attr('id', 'app' + id).style('width', .4*x + 'px'/*appWidth*/).style('margin-top', '10px').attr('class', 'nameHeader').style('color', baseHcl.toString()).style('position', 'relative')/*.style('position', 'absolute')*/.style('box-shadow', '2px 2px 2px').style('float', 'left')/*.style('float', 'left')*/.style('padding', '7px').style('margin-left', '1%').style('border-style', 'solid').style('border-width', '2px').style('border-color', baseHcl.toString()).style('background-color', '#FFFFFF').style('z-index', 2);
		var appTitle = apps.append('div').style('height', '50px').attr('id', 'appTitle' + id).style('background-color', '#BDBDBD').text('' + btnTypes[id].title); //.style('margin', '10px')
		var closeAppBtn = appTitle.append('div').text('X').style('float', 'right').style('cursor', 'pointer').style('margin', '10px').style('display', 'block').attr('id', 'closeApp' + id)
		.on('click', function(evt){
			closeApps(this.id);
		});
		var appContent = apps.append('div').attr('id', 'appContent' + id).transition().duration(1000).style('height', appHeight + 'px'); //.style('background-color', '#626262')
		//convert this to a switch
		if ( btnTypes[id].title == 'Skills')
		{
			makeSkillWheel(id); //'#appContent' + id);
			//buttons[id].style('display', 'none');
		}
		else if (btnTypes[id].title == 'Competitions')
		{
			makeNewCompetition(id);
		}
		/*
		mainContent.append(function(){
			btnHolder.style('opacity', '1');
			return btnHolder[0][0];
		});
		*/
	}
	else
	{
		apps = mainContent.insert('#app' + id, '#button0');
	}
	HexGrid(150,0,0,hexHolderWidth,600,hexHolder, 6, '#app' + id);
}

function closeApps(id) {
	var idx = id.match(/(?:closeApp)([^\s&]+)/);
	idx = parseInt(idx[1]);
	var app = d3.select('#app' + idx);
	app.transition().duration(1000).style('width', '0%').style('height', '0px').style('opacity', '0');
	app.remove(); //style('display', 'none'); //.transition().duration(500).style('height', '100%');
	if (btnTypes[idx] == 'Skills')
	{
		buttons[idx].style('display', 'block');
	}
	
}

function showApp() {
	var app = d3.select('#app' + appId);
	app.style('display', 'block').transition().duration(1000).style('width', appWidth).style('opacity', '1'); //.transition().duration(500).style('height', '100%');
}

function makeSkillWheel(id){
	var wheelContainer = d3.select('#appContent' + id);
	var skillWheel = wheelContainer.append('div').attr('id', 'skillWheel');
	//var svg = mainContent.append('svg').attr('width', width/*x - 12*/).attr('height', height).style('margin-left', 'auto').attr('margin-right', 'auto').style('margin-top', '0').data(data);
	svg = skillWheel.append('svg').data(data);
	selectedIndex = 0;

	var defs = svg.append('defs');
	radius = x/15;
	var r = 2*radius + thickness/2;
	var appWidthDec = parseInt(appWidth);
	centerX = x/4; //appWidth*x/2; //
	centerY = appHeight/2; //y/3;

	defs.append('path').attr('id', 'archPath1').attr('d', 'M ' + (cx - r) + ',' + cy + ' A' + r + ',' + r + ' 0 0,1 ' + (cx + r) + ',' + cy);

	r = 2*radius - thickness;

	defs.append('path').attr('id', 'archPath0').attr('d', 'M ' + (cx - r) + ',' + cy + ' A' + r + ',' + r + ' 0 0,1 ' + (cx + r) + ',' + cy);

	defs.append('clipPath').attr('id', 'circleMask').append('circle').attr('cx', centerX).attr('cy', centerY).attr('r', radius).attr('maskUnits', 'objectBoundingBox');

	defs.append('clipPath').attr('id', 'outerCircleMask').append('circle').attr('cx', centerX).attr('cy', centerY).attr('r', 2*radius).attr('maskUnits', 'objectBoundingBox');

	var radialGrad = defs.append('radialGradient').attr('id', 'grad1').attr('cx', centerX).attr('cy', centerY).attr('r', width).attr('fx', centerX / 2).attr('fy', centerY);
	radialGrad.append('stop').attr('offset', '60%').style('stop-color', 'white').style('stop-opacity', '1');
	radialGrad.append('stop').attr('offset', '100%').style('stop-color', baseHcl.toString()).style('stop-opacity', '1');

	//var rect = svg.append('rect').attr('width', width).attr('height', height).attr('x', '0').attr('y', '0').attr('fill', 'url(#grad1)');


	//var scoreBubble;
	//var scoreLabel;
	//var selectedIndex = 0;

	//var name = svg.append('text').attr('class', 'nameHeader').attr('text-anchor', 'middle').attr('fill', baseHcl.toString()).attr('x', centerX).attr('y', '60').text('Jennifer Lawrence');
	//var name = svg.append('text').attr('class', 'nameHeader').attr('text-anchor', 'middle').attr('fill', baseHcl.toString()).attr('x', centerX).attr('y', '45').text('My Skills');
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
}

function makeNewCompetition(id){
	var competitionForm = d3.select('#appContent' + id);
	competitionForm.append('div').style('float', 'left').attr('class', 'nameHeader').style('color', baseHcl.toString()).style('font-size', '14px').html('Competition Name: ');
	competitionForm.append('input').style('float', 'left').attr('id', 'newCompName').style('font-size', '14px');
	competitionForm.append('div').attr('class', 'nameHeader').style('color', baseHcl.toString()).style('font-size', '14px').html('Description: ').style('float', 'none');
	competitionForm.append('textarea').style('float', 'left').attr('id', '#newCompDescription').style('width', 'inherit');
	
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
		.attr('clip-path', '#outerCircleMask)')
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