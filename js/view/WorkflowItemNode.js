
define([], function () {
    "use strict";

    return function WorkflowItemNode(width, height, intermediateSize, cornerRadius) {
        return {
            type: "rect",
            attributes: {
                "width": function(d) {
                    return d.id === -1 ? intermediateSize : width;
                },
                "height": function(d) {
                    return d.id === -1 ? intermediateSize : height;
                },
                "rx": function() {
                    return cornerRadius;
                },
                "ry": function() {
                    return cornerRadius;
                }
            },
            classes: {
                "workflow-item": function(d) {
                    return d.id !== -1;
                },
                "intermediate-item": function(d) {
                    return d.id === -1;
                }
            }
        };
    };
});