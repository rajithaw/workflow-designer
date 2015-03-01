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
                var getSourceX = function() {
                        return (d.source.y * magnitude) + offsetY;
                    },

                    getSourcey = function() {
                        var result;

                        switch(d.source.id) {
                            case "intermediate":
                                result = (d.source.x * magnitude) + offsetX;
                                break;
                            case "start":
                            case "end":
                                result = (d.source.x * magnitude) + offsetX + (edgeWidth / 2);
                                break;
                            default:
                                result = (d.source.x * magnitude) + offsetX + (itemWidth / 2);
                        }

                        return result;
                    };

                return {
                    "x": getSourceX(),
                    "y": getSourcey()
                };
            })
            .target(function(d) {
                var getTargetX = function() {
                        return (d.target.y * magnitude) + offsetY;
                    },

                    getTargetY = function() {
                        var result;

                        switch(d.target.id) {
                            case "intermediate":
                                result = (d.target.x * magnitude) + offsetX;
                                break;
                            case "start":
                            case "end":
                                result = (d.target.x * magnitude) + offsetX - (edgeWidth / 2);
                                break;
                            default:
                                result = (d.target.x * magnitude) + offsetX - (itemWidth / 2);
                        }

                        return result;
                    };

                return {
                    "x": getTargetX(),
                    "y": getTargetY()
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
                "wd-connector": true,
                "wd-hidden": false
            }
        };
    };
});