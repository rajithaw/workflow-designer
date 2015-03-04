/**
 * Created by Rajitha on 3/1/2015.
 */

define(["WorkflowDesignerConfig"], function (config) {
    "use strict";

    var itemWidth = config.itemNodeWidth,
        intermediateSize = config.intermediateSize,
        edgeWidth = config.edgeNodeWidth,
        magnitude = config.magnitude,
        offsetX = config.offsetX,

        getNodeWidth = function (id) {
            var result;

            switch (id) {
            case "start":
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
        var isNodeDragged = false;

        return {
            type: "rect.wd-background-section",
            attributes: {
                x: function (d) {
                    //var nodeWidth = getNodeWidth(d.topItem.id);
                    //var prevNodeWidth = getNodeWidth(d.prevTopItem.id);
                    //var nextNodeWidth = getNodeWidth(d.nextTopItem.id);

                    //var prevGap = (d.topItem.x * magnitude) - ((d.prevTopItem.x * magnitude) + prevNodeWidth) + offsetX;
                    //var nextGap = (d.nextTopItem.x * magnitude) - ((d.topItem.x * magnitude) + nodeWidth) + offsetX;

                    return (d.topItem.x * magnitude) + offsetX - (itemWidth / 2);
                },
                y: function () {
                    return 0;
                },
                width: function () {
                    return itemWidth;
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
                        d3.select(this).classed({
                            "transparent": false
                        });
                    }
                },
                "mouseout": function () {
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