/**
 * Created by Rajitha on 2/24/2015.
 */

define([], function () {
    "use strict";

    return function WorkflowItemNodeGroup(width, height, intermediateSize, magnitude, offset) {
        var dispatch = d3.dispatch(workflowItemNodeGroup, "nodedragstart", "nodedragend"),

            dragmove = function() {
                var nodeGroup = d3.select(this);

                if(nodeGroup.datum().id > 0) {
                    nodeGroup.attr("transform", "translate(" + d3.event.x + "," + d3.event.y + ")");
                }
            },

            dragstart = function() {
                var nodeGroupData = d3.select(this).datum();

                if(nodeGroupData.id > 0) {
                    dispatch.nodedragstart(nodeGroupData);
                }
            },

            dragend = function() {
                var nodeGroupData = d3.select(this).datum();

                if(nodeGroupData.id > 0) {
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
                        .on("dragstart", dragstart)
                        .on("drag", dragmove)
                        .on("dragend", dragend);
                }
            };

        d3.rebind(workflowItemNodeGroup, dispatch, "on");

        return workflowItemNodeGroup;
    };
});