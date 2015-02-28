/**
 * Created by Rajitha on 2/24/2015.
 */

define(["d3", "WorkflowDesignerConfig"], function (d3, config) {
    "use strict";

    var itemWidth = config.itemNodeWidth,
        edgeWidth = config.edgeNodeWidth,
        magnitude = config.magnitude,
        offsetX = config.offsetX,
        offsetY = config.offsetY;

    return function WorkflowNodeConnector() {
        var diagonal = new d3.svg.diagonal()
            .source(function(d) {
                return {
                    "x": (d.source.y * magnitude) + offsetY,
                    "y": d.source.id === "intermediate" ? (d.source.x * magnitude) + offsetX : (d.source.x * magnitude) + offsetX + (itemWidth / 2)
                };
            })
            .target(function(d) {
                return {
                    "x": (d.target.y * magnitude) + offsetY,
                    "y": d.target.id === "intermediate" ? (d.target.x * magnitude) + offsetX : (d.target.x * magnitude) + offsetX - (itemWidth / 2)
                };
            })
            .projection(function(d) {
                return [d.y, d.x];
            });

        return {
            type: "path",
            attributes: {
                "d": diagonal
            },
            classes: {
                "connector": true,
                "workflow-item-connector-hidden": false
            }
        };
    };
});