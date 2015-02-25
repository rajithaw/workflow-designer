/**
 * Created by Rajitha on 2/24/2015.
 */

define([], function () {
    "use strict";

    return function WorkflowItemNodeText(nodeWidth, nodeHeight) {
        return {
            type: "text",
            attributes: {
                "x": function() {
                    return nodeWidth / 2;
                },
                "y": function() {
                    return nodeHeight / 2;
                }
            },
            classes: {
                "workflow-item-text": true,
                "workflow-item-text-hidden": function (d) {
                    return d.id === -1;
                }
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