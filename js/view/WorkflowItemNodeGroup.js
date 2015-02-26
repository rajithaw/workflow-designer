/**
 * Created by Rajitha on 2/24/2015.
 */

define([], function () {
    "use strict";

    return function WorkflowItemNodeGroup(width, height, intermediateSize, magnitude, offset) {
        var dragStarted = false,
            dragStartThreshold = 0,
            dispatch = d3.dispatch(workflowItemNodeGroup, "nodedragstart", "nodedragend"),

            dragmove = function () {
                var nodeGroup = d3.select(this),
                    nodeGroupData = nodeGroup.datum();

                // Make sure the drag start event is fired only once for a set of drag moves
                if((nodeGroupData.id > 0) && (dragStarted === false) &&
                    (Math.abs(d3.event.dx) > dragStartThreshold || Math.abs(d3.event.dy) > dragStartThreshold)) {
                    dragStarted = true;
                    dispatch.nodedragstart(nodeGroupData);
                }

                nodeGroup.attr("transform", "translate(" + d3.event.x + "," + d3.event.y + ")");
            },

            dragend = function () {
                var nodeGroupData = d3.select(this).datum();

                // Make sure the drag end event is fired only if drag start is initiated
                if((dragStarted === true) && (nodeGroupData.id > 0)) {
                    dragStarted = false;
                    dispatch.nodedragend(nodeGroupData);
                }
            },

            workflowItemNodeGroup = {
                type: "g",
                attributes: {
                    "width": function(d) {
                        return d.id === -1 ? intermediateSize : width;
                    },
                    "height": function(d) {
                        return d.id === -1 ? intermediateSize : height;
                    },
                    "transform": function(d) {
                        return "translate(" + (d.id === -1 ?
                            (d.x * magnitude) + offset - (intermediateSize / 2) :
                            (d.x * magnitude) + offset - (width / 2)) +
                            "," + (d.id === -1 ?
                            (d.y * magnitude) + offset - (intermediateSize / 2) :
                            (d.y * magnitude) + offset - (height / 2)) + ")";
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