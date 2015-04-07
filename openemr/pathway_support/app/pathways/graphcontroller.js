//Constants
ACTION_WIDTH = 120;
ACTION_HEIGHT = 40;

COLUMN_WIDTH = ACTION_WIDTH + 10;
ROW_HEIGHT = ACTION_HEIGHT + 20;

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

    $scope.paper = Raphael("graphtag", 20, 20),
        connections = [],
        shapes = [];

	$scope.paper.canvas.style.backgroundColor = '#F89';

    $scope.xMax = COLUMN_WIDTH; $scope.yMax = ROW_HEIGHT;

    xStart = 5;
    yStart = 2;

    //Assume the top layer is a pathway
    generatesequence($scope, $scope.paper, pathway, xStart, yStart, false);

    $scope.paper.setSize($scope.xMax, $scope.yMax);
}

function hoverin() {
	this.animate({"fill-opacity": 1}, 50);
}
function hoverout() {
	this.animate({"fill-opacity": 0.8}, 50);
}

function generatesequence($scope, paper, sequence, xStart, yStart, isLooped) {
	x = xStart;
	y = yStart;
	for (key in sequence) {
    	if (key == "action") {
    		var actionlist = sequence[key];
    		for (var action in actionlist) {
    			actionlist[action].selected = "";
    			generateaction($scope, paper, actionlist[action]);

	    		y += ROW_HEIGHT;
	    		if (y > $scope.yMax) {
	    			$scope.yMax = y;
		    	}

		    	if (shapes.length > 1) {
    				connections.push(paper.connection(shapes[shapes.length - 2], shapes[shapes.length - 1], "#000"));
    			}
    		}
    	}
    	else if (key == "iteration") {
	    	shapes.push(paper.rect(x, y, ACTION_WIDTH, ACTION_HEIGHT));

    		y += ROW_HEIGHT;
    		if (y > $scope.yMax) {	
    			$scope.yMax = y;
	    	}

		    if (shapes.length > 1) {
    			connections.push(paper.connection(shapes[shapes.length - 2], shapes[shapes.length - 1], "#000"));
    		}
    	}
	}
}

function generateaction($scope, paper, currentaction) {
	var fill_deselected = getFillFromActionState(currentaction["@state"], false);
	var fill_selected = getFillFromActionState(currentaction["@state"], true);

	var sh = paper.rect(x, y, ACTION_WIDTH, ACTION_HEIGHT)
		.attr({fill: fill_deselected, "fill-opacity": 0.8})
		.click(
			function() {
				$scope.selectaction(currentaction);
			}
		)
		.hover(hoverin, hoverout);

	actionText = paper.text(x + ACTION_WIDTH / 2, (y + ACTION_HEIGHT / 2) / 2, $scope.fixname(currentaction["@name"]))
		.click(
			function() {
				$scope.selectaction(currentaction);
			});

	sh.attr({text:actionText});

	shapes.push(sh);

	currentaction.select = function() {
		sh.animate({ "fill": fill_selected}, 200);
	}
	currentaction.deselect = function() {
		fill = getFillFromActionState(currentaction["@state"], false);
		sh.animate({ "fill": fill_deselected}, 200);
	}
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

	else {
		if (isselected) {
			return "#DDD";
		}
		else {
			return "#999"
		}
	}
}