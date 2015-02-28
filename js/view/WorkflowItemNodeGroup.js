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
        magnitude = config.magnitude,
        offsetX = config.offsetX,
        offsetY = config.offsetY;

    return function WorkflowItemNodeGroup() {
        var dragStarted = false,
            dragStartThreshold = 0,
            dispatch = d3.dispatch(workflowItemNodeGroup, "nodedragstart", "nodedragend"),

            dragmove = function () {
                var nodeGroup = d3.select(this),
                    nodeGroupData = nodeGroup.datum();

                // Make sure the drag start event is fired only once for a set of drag moves
                if((nodeGroupData.id !== "intermediate") && (nodeGroupData.id !== "start") &&
                    (nodeGroupData.id !== "end") && (dragStarted === false) &&
                    (Math.abs(d3.event.dx) > dragStartThreshold || Math.abs(d3.event.dy) > dragStartThreshold)) {
                    dragStarted = true;
                    dispatch.nodedragstart(nodeGroupData);
                }

                if(dragStarted === true) {
                    nodeGroup.attr("transform", "translate(" + d3.event.x + "," + d3.event.y + ")");
                }
            },

            dragend = function () {
                var nodeGroupData = d3.select(this).datum();

                // Make sure the drag end event is fired only if drag start is initiated
                if((dragStarted === true) && (nodeGroupData.id !== "intermediate") &&
                    (nodeGroupData.id !== "start") && (nodeGroupData.id !== "end")) {
                    dragStarted = false;
                    dispatch.nodedragend(nodeGroupData);
                }
            },

            workflowItemNodeGroup = {
                type: "g",
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
                    "transform": function(d) {
                        var widthAdjusment,
                            heightAdjusment;

                        switch(d.id) {
                            case "intermediate":
                                widthAdjusment = (intermediateSize / 2);
                                heightAdjusment = (intermediateSize / 2);
                                break;
                            case "start":
                            case "end":
                                widthAdjusment = (edgeWidth / 2);
                                heightAdjusment = (edgeHeight / 2);
                                break;
                            default:
                                widthAdjusment = (itemWidth / 2);
                                heightAdjusment = (itemHeight / 2);
                        }

                        return "translate(" + ((d.x * magnitude) + offsetX - widthAdjusment) +
                            "," + ((d.y * magnitude) + offsetY - heightAdjusment) + ")";
                    }
                },
                "drag": function () {
                    return d3.behavior.drag()
                        .origin(function () {
                            return {
                                x: d3.transform(d3.select(this).attr("transform")).translate[0],
                                y: d3.transform(d3.select(this).attr("transform")).translate[1]
                            };
                        })
                        .on("drag", dragmove)
                        .on("dragend", dragend);
                }
            };

        d3.rebind(workflowItemNodeGroup, dispatch, "on");

        return workflowItemNodeGroup;
    };
});