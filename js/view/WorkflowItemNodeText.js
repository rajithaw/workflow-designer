/**
 * Created by Rajitha on 2/24/2015.
 */

define(["WorkflowDesignerConfig"], function (config) {
    "use strict";

    var itemWidth = config.itemNodeWidth,
        itemHeight = config.itemNodeHeight,
        edgeWidth = config.edgeNodeWidth,
        edgeHeight = config.edgeNodeHeight;

    return function WorkflowItemNodeText() {
        return {
            type: "text",
            attributes: {
                "x": function(d) {
                    //return (d.id === "start") || (d.id === "end") ? edgeWidth / 2 : itemWidth / 2;
                    return 0;
                },
                "y": function(d) {
                    return (d.id === "start") || (d.id === "end") ? edgeHeight / 2 : itemHeight / 2;
                }
            },
            classes: {
                "workflow-item-text": true,
                "workflow-item-text-hidden": function (d) {
                    return d.id === "intermediate";
                }
            },
            text: function(d) {
                var result;

                switch(d.id) {
                    case "start":
                        result = "<foreignObject><p>Start\nxxxx</p></foreignObject>";
                        break;
                    case "end":
                        result = "End";
                        break;
                    default:
                        result = "Name: " + d.name;
                }

                return result;
            },
            textLine: {
                type: "tspan",
                nameText: {
                    attributes: {
                        "x": 0
                    },
                    text: function (d) { return "Name: " + d.name; }
                },
                sequenceText: {
                    attributes: {
                        "x": 0,
                        "dy": 10
                    },
                    text: function (d) { return "Sequence: " + d.sequence; }
                }
            }
        };
    };
});