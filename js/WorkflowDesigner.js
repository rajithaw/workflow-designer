define(["d3", "js/model/WorkflowItemConnector"], function (d3, WorkflowItemConnector) {
    "use strict";

    return function WorkflowDesigner(width, height, container, items) {
        var itemsCollection = items,
            magnitude = 100,
            offset = 20,
            itemWidth = 40,
            itemHeight = 20,
            intermediateSize = 10,
            itemNodeRadius = 5,

            svg = container.append("svg")
                .attr({
                    width: width,
                    height: height
                }),

            onKeyDown = function () {
                if (d3.event.keyCode === 46) {
                    // Delete pressed
                    deleteSelected();
                }
            },

            deleteSelected = function () {
                itemsCollection.remove(d3.selectAll(".selected").data());
                render();
            },

            // Get the diagonal definitions between the nodes
            getDiagonalDefinition = function () {
                return new d3.svg.diagonal()
                    .source(function (d) {
                        return {
                            "x": (d.source.y * magnitude) + offset,
                            "y": d.source.id === -1 ? (d.source.x * magnitude) + offset : (d.source.x * magnitude) + offset + (itemWidth / 2)
                        };
                    })
                    .target(function (d) {
                        return {
                            "x": (d.target.y * magnitude) + offset,
                            "y": d.target.id === -1 ? (d.target.x * magnitude) + offset : (d.target.x * magnitude) + offset - (itemWidth / 2)
                        };
                    })
                    .projection(function (d) {
                        return [d.y, d.x];
                    });
            },

            // Render the nodes
            renderItemNodes = function () {
                var itemNodes = svg.selectAll("rect")
                    .data(itemsCollection.toArray());

                itemNodes.enter().append("rect");
                itemNodes.exit().remove();
                itemNodes
                    .attr("width", function (d) {
                        return d.id === -1 ? intermediateSize : itemWidth;
                    })
                    .attr("height", function (d) {
                        return d.id === -1 ? intermediateSize : itemHeight;
                    })
                    .attr("rx", function () {
                        return itemNodeRadius;
                    })
                    .attr("ry", function () {
                        return itemNodeRadius;
                    })
                    .attr("x", function (d) {
                        return d.id === -1
                            ? (d.x * magnitude) + offset - (intermediateSize / 2)
                            : (d.x * magnitude) + offset - (itemWidth / 2);
                    })
                    .attr("y", function (d) {
                        return d.id === -1
                            ? (d.y * magnitude) + offset - (intermediateSize / 2)
                            : (d.y * magnitude) + offset - (itemHeight / 2);
                    })
                    .classed("workflow-item", function (d) {
                        return d.id !== -1;
                    })
                    .classed("intermediate-item", function (d) {
                        return d.id === -1;
                    });

                itemNodes.on("click", function (d) {
                    d.selected = !d.selected;
                    d3.select(this).classed("selected", d.selected);
                });

                return itemNodes;
            },

            // Render the connectors
            renderItemConnectors = function (itemNodes, diagonal) {
                var connectorData = [],
                    connectors,
                    previousLevelLength,
                    i;

                // work through all items higher than level 0
                itemNodes.filter(function (d) {
                    return d.level > 0;
                }).each(function (d) {
                    var previousLevel = itemsCollection.level(d.level - 1);

                    // Construct the connector data using the nodes to be connected
                    for (i = 0, previousLevelLength = previousLevel.length; i < previousLevelLength; i++) {
                        connectorData.push(new WorkflowItemConnector(previousLevel[i], d));
                    }
                });

                // Render the connections
                connectors = svg.selectAll("path")
                    .data(connectorData);
                connectors.enter().append("path");
                connectors.exit().remove();

                connectors.attr("d", diagonal)
                    .classed("connector", true);
            },

            render = function () {
                var diagonal = getDiagonalDefinition(),
                    itemNodes = renderItemNodes();

                renderItemConnectors(itemNodes, diagonal);
            };

        d3.select(window).on("keydown", onKeyDown);

        return {
            render: render,
            delete: deleteSelected
        };
    };
});