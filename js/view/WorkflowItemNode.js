/**
 * Created by Rajitha on 2/24/2015.
 */

define(["WorkflowDesignerConfig"], function (config) {
    "use strict";

    var itemWidth = config.itemNodeWidth,
        itemHeight = config.itemNodeHeight,
        intermediateSize = config.intermediateSize,
        edgeWidth = config.edgeNodeWidth,
        edgeHeight = config.edgeNodeHeight,
        itemRadius = config.itemNodeRadius,
        intermediateRadius = config.intermediateNodeRadius,
        edgeRadius = config.edgeNodeRadius;

    return function WorkflowItemNode() {
        return {
            type: "rect",
            attributes: {
                "width": function(d) {
                    var result;

                    switch(d.id) {
                        case "intermediate":
                            result = intermediateSize;
                            break;
                        case "start":
                        case "end":
                            result = edgeWidth;
                            break;
                        default:
                            result = itemWidth;
                    }

                    return result;
                },
                "height": function(d) {
                    var result;

                    switch(d.id) {
                        case "intermediate":
                            result = intermediateSize;
                            break;
                        case "start":
                        case "end":
                            result = edgeHeight;
                            break;
                        default:
                            result = itemHeight;
                    }

                    return result;
                },
                "rx": function(d) {
                    var result;

                    switch(d.id) {
                        case "intermediate":
                            result = intermediateRadius;
                            break;
                        case "start":
                        case "end":
                            result = edgeRadius;
                            break;
                        default:
                            result = itemRadius;
                    }

                    return result;
                },
                "ry": function(d) {
                    var result;

                    switch(d.id) {
                        case "intermediate":
                            result = intermediateRadius;
                            break;
                        case "start":
                        case "end":
                            result = edgeRadius;
                            break;
                        default:
                            result = itemRadius;
                    }

                    return result;
                }
            },
            classes: {
                "workflow-item": function(d) {
                    return (d.id !== "start") && (d.id !== "end") && (d.id !== "intermediate");
                },
                "intermediate-item": function(d) {
                    return d.id === "intermediate";
                },
                "edge-item": function(d) {
                    return (d.id === "start") || (d.id === "end");
                },
                "selected": function(d) {
                    return d.selected;
                }
            },
            events: {
                "click": function (d) {
                    if((d.id !== "start") && (d.id !== "end") && (d.id !== "intermediate")) {
                        d.selected = !d.selected;
                        d3.select(this).classed("selected", d.selected);
                    }
                }
            }
        };
    };
});