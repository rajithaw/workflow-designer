/**
 * Created by Rajitha on 2/24/2015.
 */

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
            },
            events: {
                "click": function (d) {
                    d.selected = !d.selected;
                    d3.select(this).classed("selected", d.selected);
                }
            }
        };
    };
});