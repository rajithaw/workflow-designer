/**
 * The background area which gets highlighted when a workflow node is dragged over.
 * Indicates that the workflow node can be dropped onto the area.
 * Created by Rajitha on 3/1/2015.
 */

define(["js/WorkflowDesignerConfig"], function (config) {
    "use strict";

    var itemWidth = config.itemNodeWidth,
        intermediateSize = config.intermediateSize,
        edgeWidth = config.edgeNodeWidth,
        magnitude = config.magnitude,
        offsetX = config.offsetX,

        // Get the node width based on the type of the node
        getNodeWidth = function (id) {
            var result;

            switch (id) {
            case "start":
            case "end":
                result = edgeWidth;
                break;
            case "intermediate":
                result = intermediateSize;
                break;
            default:
                result = itemWidth;
            }

            return result;
        };

    return function BackgroundSection() {
        // Flag to set when a node is bing dragged
        var isNodeDragged = false;

        return {
            type: "rect.wd-background-section",
            attributes: {
                x: function (d) {
                    var nodeWidth = getNodeWidth(d.topItem.id),
                        prevNodeWidth = d.prevTopItem !== null ? getNodeWidth(d.prevTopItem.id) : 0,
                        prevNodeX = d.prevTopItem !== null ? d.prevTopItem.x : 0,
                        // Gap between the current node and the previous node.
                        // x, y coordinates of the node map tho the center of the node
                        prevGap = ((d.topItem.x - prevNodeX) * magnitude) - (prevNodeWidth / 2) - (nodeWidth / 2);

                    // Background section should start from the middle of the gap
                    return (d.topItem.x * magnitude) - (nodeWidth / 2) - (prevGap / 2) + offsetX;
                },
                y: function () {
                    return 0;
                },
                width: function (d) {
                    var nodeWidth = getNodeWidth(d.topItem.id),
                        prevNodeWidth = d.prevTopItem !== null ? getNodeWidth(d.prevTopItem.id) : 0,
                        nextNodeWidth = d.nextTopItem !== null ? getNodeWidth(d.nextTopItem.id) : 0,
                        prevNodeX = d.prevTopItem !== null ? d.prevTopItem.x : 0,
                        nextNodeX = d.nextTopItem !== null ? d.nextTopItem.x : 0,
                        // Gap between the current node and the previous node.
                        // x, y coordinates of the node map tho the center of the node
                        prevGap = ((d.topItem.x - prevNodeX) * magnitude) - (prevNodeWidth / 2) - (nodeWidth / 2),
                        // Gap between the current node and the next node.
                        // x, y coordinates of the node map tho the center of the node. If there is no next node, nextGap is 0
                        nextGap = nextNodeX === 0 ? 0 : ((nextNodeX - d.topItem.x) * magnitude) - (nextNodeWidth / 2) - (nodeWidth / 2);

                    // Background section will start in the middle of previous gap and end in the middle of the next gap
                    return nodeWidth + (prevGap / 2) + (nextGap / 2);
                },
                height: function () {
                    return 800;
                }
            },
            classes: {
                "wd-background-section" : true,
                "transparent" : true
            },
            events: {
                "mouseover": function () {
                    if (isNodeDragged === true) {
                        // When a node is being dragged over the background section set the proper styles
                        d3.select(this).classed({
                            "transparent": false
                        });
                    }
                },
                "mouseout": function () {
                    // When a node is dragged out of the background section set the proper styles
                    d3.select(this).classed({
                        "transparent": true
                    });
                }
            },
            nodeDragStart: function (d) {
                isNodeDragged = true;
            },
            nodeDragEnd: function (d) {
                isNodeDragged = false;
            }
        };
    };
});