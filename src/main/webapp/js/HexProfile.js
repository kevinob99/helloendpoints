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

var displayName = mainContent.append('div').style('width', '100%').style('height', '50px').style('float', 'left').style('background-color', '#BBBBBB');
displayName.append('text').attr('class', 'nameHeader').attr('fill', baseHcl.toString()).text('UserName').style('line-height', '50px');

//Skill Wheel Vars
var width = (x - 12);
var centerX = width / 2;
var radius = width / 5;
var cx = 0;
var cy = 0;
var centerY = 85 + (2*radius); //height / 2;
var thickness = 18;
var scoreBubble;
var scoreLabel;
var selectedIndex = 0;
var svg;
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

// Other Globals
var skillsPreview = '1256 pts';
var compsPreview;
var projectsPreview;
var badgesPreview;
var exercisesPreview;
var mediaPreview;
var appTypes = [{title: "Skills", previewData: skillsPreview, isOpen: 0},
				{title: "Competitions", previewData: 0, isOpen: 0},
				{title: "Projects", previewData: 0, isOpen: 0},
				{title: "Badges", previewData: 0, isOpen: 0},
				{title: "Exercises", previewData: 0, isOpen: 0},
				{title: "Media", previewData: 0, isOpen: 0}
				];

//var appWidth = "47%";
var gridWidth = "100%";
var hexHolderWidth, appHeight, hexRadius, hexBuffer, hexLeft, hextTextSize, hexTextOffset;
/*
if (width < 1000)
{
	appWidth = "98%";
}
*/

appHeight = y - 150;
if (appHeight < 450) appHeight = 450;

hexRadius = 150;
hexBuffer = 6;
hexLeft = 0;
hexTextSize = 28;
hexTextOffset = 10;

//var appHolder = mainContent.append('div').style('position', 'absolute').style('top', '60px').style('left', '0px').style('z-index', 2).attr('id', 'appHolder');
var backgroundHolder = mainContent.append('div').style('position', 'absolute').style('left', '0px').style('top', '60px').style('width', '100%').style('z-index', 0);
var backgroundSVG = backgroundHolder.append('svg').style('position', 'absolute').style('left', '0px').style('top', '0px').style('width', '100%');
var hexDiv = mainContent.append('div').style('position', 'absolute').style('top', '60px').style('left', '0px').style('z-index', 0).style('width', '100%').attr('id', 'hexDiv');
var hexHolder = hexDiv.append('svg').style('width', '100%').style('left', '0px').attr('id', 'hexHolder');

hexHolderWidth = hexHolder.property('offsetWidth');
if (hexHolderWidth < 800) //(3*(hexRadius + hexBuffer)) - 12)
{
	hexRadius = (hexHolderWidth/3.5) - hexBuffer; // - hexBuffer;
	hexLeft = -.5*hexRadius;
	hexTextSize = 18;
	hexTextOffset = 6;
}

//mainContent.style('backgroundImage', "url(backgroundPhoto.jpg)");

var backgroundImg = backgroundSVG.append('image').attr('xlink:href', 'backgroundPhoto.jpg').attr('preserveAspectRatio', 'none').attr('x', 0).attr('width', x).attr('y', 0).attr('height', y - 50); //.attr('xlink:href', 'backgroundPhoto.jpg'); //.attr('x', 0).attr('width', x).attr('y', 50).attr('height', y - 50); //.attr('height', '360')

HexGrid(hexRadius,hexLeft,0,hexHolderWidth,600,hexHolder, hexBuffer);
mainContent.append('div').attr('id', 'placeholder-div').style('position', 'absolute').style('top', '1000px');
gapi.hangout.render('placeholder-div', { 'render': 'createhangout' });

/*
var wrapper = d3.select("#wrapper");
var footerContainer = wrapper.append('div');
footerContainer.append('footer').attr('class', 'group');
*/
//Functions
  
function HexGrid(radius, left, top, right, bottom, element, margin, callingApp) {
	// Clear the HexGrid
	if (hexHolder[0][0].childNodes.length != 0)
	{
	nodeArray = d3.selectAll(hexHolder[0][0].childNodes);
	nodeArray.remove();
	}
	//Vars
	left = left - 3*radius;
	var centx = left;
	var centy = 0; //top; 
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

	if (callingApp != null)
	{
		callingApp = d3.select(callingApp);
		oL = callingApp.property('offsetLeft');
		oT = callingApp.property('offsetTop');
		oW = callingApp.property('offsetWidth');
		oH = callingApp.property('offsetHeight');
		oX = oL + oW;
		oY = oT + oH;
		
		if ( (oL + oW) < x*.7)
		{
			hexDiv.style('top', oT - 10 + 'px'); //hexHolder.style('top', oT + oH + 'px');//centy = oT;
			appClipped = true;
		}
		else
		{
			hexDiv.style('top', oT + appHeight + 65 + 'px'); //hexHolder.style('top', oT + oH + 'px');
		}
	
	}
	var loopCounter = 0;
	var numApps = findNumApps();
	while ((hexId < appTypes.length ) && (loopCounter++ < 500))
	{
		centx = left + dx;
		var off = offAmt*offset;
		while (centx < (right + radius)) {
			color = baseHcl.toString();
			
			var hexagon = polygon(6, radius, centx + off, centy, element, appClipped, oX, appHeight);
			tester = appTypes[hexId];
			//tester1 = appTypes[hexId].isOpen;
			if ((hexagon.attr('outOfBounds') == 'false') && (hexId < appTypes.length) ) //numApps) )
			{

				hexagon.attr('fill', color).attr('id', 'hex' + hexId);
				var hexText = element.append('text').attr('class', 'nameHeader').style('font-size', hexTextSize + 'pt').style('fill', '#FFFFFF').text(appTypes[hexId].title).attr('x', centx + off).attr('y', centy + hexTextOffset).attr('text-anchor', 'middle');
				hexagon.style('cursor', 'pointer')
				.on('mouseover', function(){
					d3.select(this).attr('fill', hoverColor);
				})
				.on('mouseout', function(){
					d3.select(this).attr('fill', color);
				})
				.on('mousedown', function(){
					d3.select(this).attr('fill', hoverColor);
					buttonClicked(this.id);
				});
				element.style('height', centy + radius + margin + 'px');
				
				hexagon.attr('fill-opacity', .9);
				hexId = hexId + 1;
			}
			else
			{
				hexagon.attr('fill', '#BBBBBB');
				hexagon.attr('fill-opacity', 0);
			}
			hexagon.attr('fill-opacity', 0.9) 
			.attr('stroke-width', 0);
			centx += dx;
		}
		centy += dy;
		offset = (offset + 1) % 2;
	}
}

function checkHexId(hexId){
	for (var i = hexId; i < appTypes.length; i++)
	{
		if (appTypes[i].isOpen == 0)
		{
			return i;
		}
	}
	return false;
}

function findNumApps(){
	var k = 0;
	for (var j = 0; j < appTypes.length; j++)
	{
		if (appTypes[j].isOpen == 0)
		{
			k = k + 1;
		}
	}
	return k;
}

function polygon(n, r, cx, cy, element, appClipped, oX, oY) {
	var outOfBounds = 'false';
	var points = '';
	var dTheta = 2*Math.PI / n;
	var theta = 0;
	var deltaX = 0;
	var deltaY = 0;
	if (appClipped == true)
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

function buttonClicked(id) {
	var appLeft = x*.01; //0; //
	var appTop = 60;
	var appWidth = x; //*.47;
	if (width < 1000)
	{
		appWidth = x*.96;
	}
	var apps = d3.select(id);
	var idx = id.match(/(?:hex)([^\s&]+)/);
	id = parseInt(idx[1]);
	if (apps[0][0] == null)
	{	
		lastApp = d3.select(mainContent[0][0].lastChild);
		
		if (lastApp[0][0].id != 'hexDiv') //if there are other apps open
		{
			lastAppLeft = lastApp.property('offsetLeft');
			lastAppRight = lastApp.property('offsetWidth') + lastAppLeft;
			lastAppTop = lastApp.property('offsetTop');
			lastAppBottom = lastApp.property('offsetHeight') + lastAppTop;
			if (lastAppRight < x*.6)
			{
				appLeft = x*.53;
				appTop = lastAppTop;
			}
			else
			{
				appTop = lastAppBottom + 10;
			}
		}
		
		apps = mainContent.append('div').attr('id', 'app' + id).style('width', '97%'/*appWidth + 'px'*/).attr('class', 'nameHeader')
			.style('color', baseHcl.toString()).style('position', 'absolute').style('box-shadow', '2px 2px 2px').style('left', '1%'/*appLeft + 'px'*/)
			.style('top', appTop + 'px').style('padding', '7px').style('border-style', 'solid').style('border-width', '2px')
			.style('border-color', baseHcl.toString()).style('background-color', '#FFFFFF').style('z-index', 2).style('opacity', '0');
		var appTitle = apps.append('div').style('height', '50px').attr('id', 'appTitle' + id).style('background-color', '#BDBDBD').text('' + appTypes[id].title); //.style('margin', '10px')
		var closeAppBtn = appTitle.append('div').text('X').style('float', 'right').style('cursor', 'pointer').style('margin', '10px').style('display', 'block').attr('id', 'closeApp' + id)
		.on('click', function(evt){
			closeApps(this.id);
		});
		var appContent = apps.append('div').attr('id', 'appContent' + id).transition().duration(1000).style('height', appHeight + 'px'); //.style('background-color', '#626262')
		//convert this to a switch
		if ( appTypes[id].title == 'Skills')
		{
			//makeSkillWheel(id); 
		}
		else if (appTypes[id].title == 'Competitions')
		{
			//makeNewCompetition(id);
		}
	}
	else
	{
		apps = mainContent.insert('#app' + id, '#button0');
	}
	/*var hexagonToKeep = */hex2AppAnimation(id, appTop - 50, appLeft, appWidth, (appHeight + 50));
	appTypes[id].isOpen = 1;
	//hexagonToKeep.transition().delay(2000).duration(1000).style('opacity','0').remove();
	apps.transition().delay(2000).duration(1000).style('opacity','1');
	//hexHolder.style('display', 'none'); //style('opacity', '0'); //hexHolder.transition().delay(1000).duration(500).style('opacity', '0');
	/*
	setTimeout(function(){
	HexGrid(150,0,0,hexHolderWidth,600,hexHolder, 6, '#app' + id);
	}, 1000); //1500
	hexHolder.transition().delay(2000).duration(1000).style('opacity', '1');
	*/
}

function hex2AppAnimation(id, appTop, appLeft, appWidth, appHeight){
	var hexagonToRemove, hexagonToKeep, transitionHexSVG, transitionHex, transitionHexPoints, transitionHexColor, newPoints;
	var hexHolderLength = hexHolder[0][0].childNodes.length;
	var appRight = appLeft + appWidth;
	var appBottom = appTop + appHeight;
	var appHalfHeight = appTop + (appBottom - appTop)*.5;
	
	appLeft = 0; //x*.01;
	appRight = x*.99;
	appTop = 0;
	appBottom = y - appTop;
	/*
	for (var i = 0; i < hexHolderLength - 1; i++)//while ((hexHolder[0][0].lastChild.id != ('hex' + id)) && (hexHolder[0][0].firstChild.id != ('hex' + id))) //
	{
		hexagonToRemove = d3.select(hexHolder[0][0].childNodes[i]); //('#hex' + i );
		
		if (hexagonToRemove[0][0].id != ('hex' + id))
		{
			hexagonToRemove.transition().duration(1000).style('opacity', '0').remove(); //.remove();
		}
		else
		{
			hexagonToKeep = hexagonToRemove;
		}
		
	}
	*/
	var hexagonToKeep = d3.select('#hex' + id);
	transitionHexPoints = hexagonToKeep.attr('points');
	transitionHexColor = hexagonToKeep.attr('fill');
	var transitionHexDiv = mainContent.append('div').style('position', 'absolute').style('top', '0px').style('left', '0px').style('width', '100%').style('height', '100%').style('z-index', 10);
	transitionHexSVG = transitionHexDiv.append('svg'); //mainContent.append('svg');
	transitionHex = transitionHexSVG.append('polygon').attr('points', transitionHexPoints).attr('fill', transitionHexColor).style('z-index', 3);
	//hexagonToKeep.remove();
	hexHolder.transition().duration(250).style('opacity', '0').style('display', 'none');
	
	newPoints = appLeft + ',' + appTop + ' ' + appRight + ',' + appTop + ' ' + appRight + ',' + appHalfHeight + ' ' + appRight + ',' + appBottom
				+ ' ' + appLeft + ',' + appBottom + ' ' + appLeft + ',' + appHalfHeight;
	transitionHex.transition().duration(2000).attr('points', newPoints); //hexagonToKeep.transition().duration(2000).attr('points', newPoints);
	transitionHexSVG.transition().delay(2000).duration(1000).style('opacity','0').remove();
	//return transitionHexSVG; //hexagonToKeep;
}

function closeApps(id){
	var idx = id.match(/(?:closeApp)([^\s&]+)/);
	idx = parseInt(idx[1]);
	var app = d3.select('#app' + idx);
	app.remove();
	hexHolder.transition().duration(250).style('opacity', '1').style('display', 'block');
}



// end script hiding -->