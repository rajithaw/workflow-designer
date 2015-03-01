/**
 * Created by Rajitha on 3/1/2015.
 */

define(["WorkflowDesignerConfig"], function (config) {
    "use strict";

    var itemWidth = config.itemNodeWidth,
        intermediateSize = config.intermediateSize,
        edgeWidth = config.edgeNodeWidth,
        magnitude = config.magnitude,
        offsetX = config.offsetX;

    return function BackgroundSection() {
        var isNodeDragged = false;

        return {
            type: "rect.wd-background-section",
            attributes: {
                x: function(d) {
                    debugger;
                    return (d.items[0].x * magnitude) + offsetX - (itemWidth / 2);
                },
                y: function() {
                    return 0;
                },
                width: function() {
                    return itemWidth;
                },
                height: function() {
                    return 800;
                }
            },
            classes: {
                "wd-background-section" : true,
                "transparent" : true
            },
            events: {
                "mouseenter": function() {
                    //if(isNodeDragged === true) {
                        d3.select(this).classed({
                            "transparent": false
                        });
                    //}
                },
                "mouseleave": function() {
                    d3.select(this).classed({
                        "transparent": true
                    });
                },
                "nodedragstart": function() {
                    isNodeDragged = true;
                },
                "nodedragend": function() {
                    isNodeDragged = false;
                }
            }
        };
    };
});