//Constants
ACTION_WIDTH = 120;
ACTION_HEIGHT = 40;

COLUMN_WIDTH = ACTION_WIDTH + 100;
ROW_HEIGHT = ACTION_HEIGHT + 30;

var app
if (app == null)
    app = angular.module('popupApp', ['ngRoute']);


app.controller('graphcontroller', function($scope) {
    console.log("Starting graph controller");

    $scope.generategraph = function(pathway) { generategraph($scope, pathway); }

    //Generate the graph only when the selected pathway changes
    $scope.$watch('selectedpathway', function(newValue, oldValue) {
        if (newValue !== oldValue) {
        	$scope.generategraph($scope.getselectedpathway());
        }
    });

    $scope.hideaction = function() { $scope.selectedaction.deselect(); $scope.selectedaction = null; }
    $scope.selectaction = function(action) {
    	console.log("Selected action:");
    	console.log(action);
    	if ($scope.selectedaction) {
	    	$scope.selectedaction.deselect();	
    	}
    	$scope.selectedaction = action;
    	$scope.selectedaction.select();
    	$scope.$digest();
    }

    $scope.getselectedpathway = function() { return $scope.selectedpathway;};

    $scope.closegraphscreen = function() { closegraphscreen($scope); };
});

function closegraphscreen($scope) {
	if ($scope.selectedaction) {
		$scope.selectedaction.deselect;
		$scope.selectedaction = null;
	}
	$scope.openpathwayselect();
}

function generategraph($scope, pathway) {
	console.log(pathway);
	//Clear the paper if it already exists
    if ($scope.paper) {
    	console.log("clearing paper");
		$('#graphtag').html("");
	}

    $scope.paper = Raphael("graphtag", 20, 20);
        //connections = [];
        //shapes = [];

    shapes = $scope.paper.set();
    textboxes = $scope.paper.set();
    connections = $scope.paper.set();

	$scope.paper.canvas.style.backgroundColor = '#F89';

    $scope.xMax = COLUMN_WIDTH; $scope.yMax = ROW_HEIGHT;

    var xStart = 15;
    var yStart = 15;

    //Assume the top layer is a pathway
    generatesequence($scope, $scope.paper, {"children": pathway.children}, xStart, yStart, false, []);


    var tx = ($scope.xMax / 3) - xStart;
	//console.log(paper.canvas);
	shapes.transform("t" + tx + ",0");
	connections.transform("t" + tx + ",0");
	textboxes.transform("t" + tx + ",0");

    $scope.paper.setSize($scope.xMax, $scope.yMax);
}

function hoverin() {
	this.animate({"fill-opacity": 1}, 50);
}
function hoverout() {
	this.animate({"fill-opacity": 0.8}, 50);
}

function generatesequence($scope, paper, sequence, xStart, yStart, isLooped, parentindices) {
	var x = xStart;
	var y = yStart;

	var result = [parentindices, yStart];
	for (key in sequence)
	{
		if (key == "children") {
			for (child in sequence['children']) {
		    	for (childkey in sequence['children'][child])
				{
		    		result = generatepart($scope, paper, childkey, sequence['children'][child][childkey], x, y, parentindices);
		    		parentindices = result[0];
		    		y = result[1];
		    	}
		    }
		}
		else {
			result = generatepart($scope, paper, key, sequence[key], x, y, parentindices);
		}
	}
	return result;
}

function generatepart($scope, paper, partname, part, xStart, yStart, parentindices) {
	/*console.log("-------------------------------------")
	console.log("Generating part " + partname);
	console.log("location " + xStart + "," + yStart);
	console.log(part);

	pstring = "[";
	for ( x in parentindices) {
		pstring += parentindices[x] + ",";
	}
	pstring += "]"
	console.log("parents " + pstring);
	console.log("------------------------------------");
	*/

	var x = xStart;
	var y = yStart;

	if (partname == "action") {
		//console.log("action: ");
		//console.log(sequence['children'][child][key]);

		var action = part;
		//action.selected = "";
		generateaction($scope, paper, action, x, y);

		y += ROW_HEIGHT;
		if (y > $scope.yMax) {
			$scope.yMax = y;
    	}

    	if (shapes.length > 1) {
    		//console.log(parentindices);
    		for (i in parentindices) {
    			console.log("Connection between " + parentindices[i] + " and " + shapes.length - 1);
				connections.push(paper.connection(shapes[parentindices[i]], shapes[shapes.length - 1], "#000"));
			}
		}
		//Set the parent index to be this shape, for the next shape that will be added
		return [[shapes.length - 1], y];
	}
	else if (partname == "iteration") {
		var iteration = part;
		return generatesequence($scope, paper, iteration, x, y, true, parentindices);
	}
	else if (partname == "branch") {
		var branch = part;
		return generatebranch($scope, paper, branch, x, y, parentindices);
	}
	else if (partname == "sequence") {
		var sequence = part;
		return generatesequence($scope, paper, sequence, x, y, false, parentindices);
	}
	else {
		console.log("not a recognized part: " + partname);
		return [parentindices, yStart];
	}
}

function generatebranch($scope, paper, branch, xStart, yStart, parentindices) {
	var branchindices = [];
	var numchildren = branch["children"].length;

	var x = xStart; var y = yStart;

	//
	//Generate the root of the branch
	//
	generatebranchparent($scope, paper, branch, x, y, parentindices);

	if (shapes.length > 1) {
		//console.log(parentindices);
		for (i in parentindices) {
			//console.log("Connection between " + parentindices[i] + " and " + shapes.length - 1);
			connections.push(paper.connection(shapes[parentindices[i]], shapes[shapes.length - 1], "#000"));
		}
	}

	parentindices = [shapes.length - 1]

	y += ROW_HEIGHT;
	if (y > $scope.yMax) {
		$scope.yMax = y;
    }

    var yMaxBranch = y;

    //
    //Generate the child nodes of the branch
    //
	for (child in branch["children"]) {
		//console.log("child:");
		//console.log(child);

		var xb = x - ((COLUMN_WIDTH / 2) * (numchildren - 1));
		xb += (COLUMN_WIDTH * child);

		result = generatesequence($scope, paper, branch["children"][child], xb, y, false, parentindices);

		if (yMaxBranch < result[1])
			yMaxBranch = result[1];

		//Restore the parent index to be the parent of the branch
		branchindices.push(shapes.length - 1);

		if ($scope.xMax < xb + (COLUMN_WIDTH * child) + COLUMN_WIDTH) {
			$scope.xMax = xb + (COLUMN_WIDTH * child) + COLUMN_WIDTH;
		}
	}

	//Return the total amount of x translation
	return [branchindices, yMaxBranch];
}

function generateaction($scope, paper, currentaction, x, y) {
	var fill_deselected = getFillFromActionState(currentaction["state"], false);
	var fill_selected = getFillFromActionState(currentaction["state"], true);

	var sh = paper.rect(x, y, ACTION_WIDTH, ACTION_HEIGHT)
		.attr({fill: fill_deselected, "fill-opacity": 0.8})
		.click(
			function() {
				$scope.selectaction(currentaction);
			}
		)
		.hover(hoverin, hoverout);

	actionText = paper.text(x + ACTION_WIDTH / 2, (y + ACTION_HEIGHT / 2) / 2 - 5, fixnamewidth($scope.fixname(currentaction["name"])))
		.click(
			function() {
				$scope.selectaction(currentaction);
			});

	shapes.push(sh);
	textboxes.push(actionText);

	currentaction.select = function() {
		sh.animate({ "fill": fill_selected}, 200);
	}
	currentaction.deselect = function() {
		sh.animate({ "fill": fill_deselected}, 200);
	}
}

function generatebranchparent($scope, paper, currentbranch, x, y) {
	//var fill_deselected = getFillFromActionState(currentaction["state"], false);
	//var fill_selected = getFillFromActionState(currentaction["state"], true);

	var branch = paper.ellipse(x + ACTION_WIDTH / 2, y + ACTION_HEIGHT / 2, ACTION_WIDTH / 2, ACTION_HEIGHT / 2)
		.attr({fill: "#fff", "fill-opacity": 0.8})
		.click(
			function() {
				//$scope.selectaction(currentaction);
			}
		)
		.hover(hoverin, hoverout);

	branchText = paper.text(x + ACTION_WIDTH / 2, (y + ACTION_HEIGHT / 2) / 2, "branch")
		.click(
			function() {
				$scope.selectaction(currentaction);
			});

	shapes.push(branch);
	textboxes.push(branchText);
}

function getFillFromActionState(state, isselected) {
	if (state == "READY") {
		if (isselected) {
			return "#6F6";
		}
		else {
			return "#2B2";
		}
	}
	else if (state == "NONE") {
		if (isselected) {
			return "#FFF";
		}
		else {
			return "#AAA"
		}
	}
	else if (state == "BLOCKED") {
		if (isselected) {
			return "#FF0000";
		}
		else {
			return "#CC0000"
		}
	}
	else if (state == "AVAILABLE") {
		if (isselected) {
			return "#990099";
		}
		else {
			return "#7A007A"
		}
	}
	else if (state == "RUN") {
		if (isselected) {
			return "#FF0066";
		}
		else {
			return "#CC0052"
		}
	}
	else if (state == "SUSPEND") {
		if (isselected) {
			return "#FFFF00";
		}
		else {
			return "#CCCC00"
		}
	}
	else if (state == "PENDING") {
		if (isselected) {
			return "#FF3300";
		}
		else {
			return "#CC2900"
		}
	}
	else if (state == "DONE") {
		if (isselected) {
			return "#66CCFF";
		}
		else {
			return "#52A3CC"
		}
	}
	else if (state == "SATISFIED") {
		if (isselected) {
			return "#CCFF33";
		}
		else {
			return "#A3CC29"
		}
	}

	else {
		if (isselected) {
			return "#DDD";
		}
		else {
			return "#999"
		}
	}
}


function fixnamewidth(name)
{
    parts = name.split(" ");

    newname = "";
    currentline = parts[0];
    for (var i = 1; i < parts.length; i++)
    {
        if (currentline.length + parts[i].length > 23) {
        	newname += currentline + "\n";
        	currentline = parts[i];
        }
        else {
        	currentline += " " + parts[i];
    	}
    }

    return newname + currentline;
}
