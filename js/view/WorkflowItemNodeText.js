/**
 * Text of the workflow node.
 * Created by Rajitha on 2/24/2015.
 */

define(["js/WorkflowDesignerConfig"], function (config) {
    "use strict";

    var itemWidth = config.itemNodeWidth,
        itemHeight = config.itemNodeHeight,
        edgeWidth = config.edgeNodeWidth,
        edgeHeight = config.edgeNodeHeight;

    return function WorkflowItemNodeText() {
        return {
            type: "text",
            attributes: {
                "x": function (d) {
                    //return (d.id === "start") || (d.id === "end") ? edgeWidth / 2 : itemWidth / 2;
                    return 0;
                },
                "y": function (d) {
                    return (d.id === "start") || (d.id === "end") ? edgeHeight / 2 : itemHeight / 2;
                }
            },
            classes: {
                "wd-item-text": function (d) {
                    return d.id !== "intermediate" || d.id !== "start" || d.id !== "end";
                },
                "wd-edge-item-text": function (d) {
                    return d.id === "start" || d.id === "end";
                },
                "wd-hidden": function (d) {
                    return d.id === "intermediate";
                }
            },
            addText: function (nodeText) {
                nodeText.each(function (d) {
                    var text = d3.select(this),
                        mainText = text.append("tspan").attr({
                            "x": 0
                        });

                    switch (d.id) {
                        case "start":
                            mainText.text("Start");
                            break;
                        case "end":
                            mainText.text("End");
                            break;
                        default:
                            mainText.text(function (d) { return "Name: " + d.name; });
                            text.append("tspan").attr({
                                "x": 0,
                                "dy": 10
                            })
                            .text(function (d) { return "Sequence: " + d.sequence; });
                            break;
                    }
                });
            }
        };
    };
});