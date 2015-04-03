//Constants
ROW_SIZE = 50;
COLUMN_SIZE = 30;

var app
if (app == null)
    app = angular.module('popupApp', ['ngRoute']);


app.controller('graphcontroller', function($scope) {
    console.log("Starting graph controller");
    r = Raphael("graphtag", 640, 400),
        connections = [],
        shapes = [  r.ellipse(190, 100, 30, 20),
                    r.rect(290, 80, 60, 40, 10),
                    r.rect(290, 180, 60, 40, 2),
                    r.ellipse(450, 100, 20, 20),
                    r.ellipse(350, 100, 20, 20)
                ];

    connections.push(r.connection(shapes[0], shapes[1], "#000"));
    //r.text("hello world");
});