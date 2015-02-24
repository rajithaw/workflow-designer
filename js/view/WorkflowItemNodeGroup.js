
define([], function () {
    "use strict";

    return function WorkflowItemNode(width, height, intermediateSize, magnitude, offset) {
        return {
            type: "g",
            attributes: {
                "width": function(d) {
                    return d.id === -1 ? intermediateSize : width;
                },
                "height": function(d) {
                    return d.id === -1 ? intermediateSize : height;
                },
                "transform": function(d) {
                    return "translate(" + (d.id === -1 ?
                        (d.x * magnitude) + offset - (intermediateSize / 2) :
                        (d.x * magnitude) + offset - (width / 2)) +
                        "," + (d.id === -1 ?
                        (d.y * magnitude) + offset - (intermediateSize / 2) :
                        (d.y * magnitude) + offset - (height / 2)) + ")";
                }
            }
        };
    };
});