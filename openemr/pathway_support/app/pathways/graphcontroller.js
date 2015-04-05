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

    $scope.$watch('selectedpathway', function(newValue, oldValue) {
        if (newValue !== oldValue) {
        	$scope.generategraph(newValue);
        }
    });
});

function generategraph($scope, pathway) {
    paper = Raphael("graphtag", 20, 20),
        connections = [],
        shapes = [];

	paper.canvas.style.backgroundColor = '#F89';

    $scope.xMax = COLUMN_WIDTH; $scope.yMax = ROW_HEIGHT;

    xStart = 5;
    yStart = 2;

    console.log(pathway);

    //Assume the top layer is a pathway
    generatesequence($scope, paper, pathway, xStart, yStart, false);

    paper.setSize($scope.xMax, $scope.yMax);
    connections.push(paper.connection(shapes[0], shapes[1], "#000"));
}

function generatesequence($scope, paper, sequence, xStart, yStart, isLooped) {
	x = xStart;
	y = yStart;
	for (key in sequence) {
    	if (key == "action") {
    		for (action in sequence[key]) {
		    	sh = paper.rect(x, y, ACTION_WIDTH, ACTION_HEIGHT).attr({fill: "#fde"});

				actionText = paper.text(x + ACTION_WIDTH / 2, (y + ACTION_HEIGHT / 2) / 2, sequence[key][action]["@name"]);
				
	 			sh.attr({text:actionText});

	 			shapes.push(sh);

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