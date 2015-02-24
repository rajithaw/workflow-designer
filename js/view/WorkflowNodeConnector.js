/**
 * Created by Rajitha on 2/24/2015.
 */

define(["d3"], function (d3) {
    "use strict";

    return function WorkflowNodeConnector(width, magnitude, offset) {
        var diagonal = new d3.svg.diagonal()
            .source(function(d) {
                return {
                    "x": (d.source.y * magnitude) + offset,
                    "y": d.source.id === -1 ? (d.source.x * magnitude) + offset : (d.source.x * magnitude) + offset + (width / 2)
                };
            })
            .target(function(d) {
                return {
                    "x": (d.target.y * magnitude) + offset,
                    "y": d.target.id === -1 ? (d.target.x * magnitude) + offset : (d.target.x * magnitude) + offset - (width / 2)
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
                connector: true
            }
        };
    };
});