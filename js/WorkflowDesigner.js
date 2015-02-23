define(["d3", "model/WorkflowItem", "model/WorkflowItemConnector"], function (d3, WorkflowItem, WorkflowItemConnector) {
    "use strict";

    return function WorkflowDesigner(width, height, container, items) {
        var itemsCollection = items,
            magnitude = 100,
            offset = 60,
            itemWidth = 80,
            itemHeight = 40,
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

            insert = function (sequence) {
                itemsCollection.add(new WorkflowItem(0, "", "", sequence));
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
                var itemNodes,
                    nodeText,
                    itemNodeGroups = svg.selectAll("g")
                    .data(itemsCollection.toArray());

                itemNodeGroups.enter().append("g");
                itemNodeGroups.exit().remove();
                itemNodeGroups
                    .attr("width", function (d) {
                        return d.id === -1 ? intermediateSize : itemWidth;
                    })
                    .attr("height", function (d) {
                        return d.id === -1 ? intermediateSize : itemHeight;
                    })
                    .attr("transform", function(d) {
                        return "translate(" + (d.id === -1 ?
                            (d.x * magnitude) + offset - (intermediateSize / 2) :
                            (d.x * magnitude) + offset - (itemWidth / 2)) +
                            "," + (d.id === -1 ?
                            (d.y * magnitude) + offset - (intermediateSize / 2) :
                            (d.y * magnitude) + offset - (itemHeight / 2)) + ")";
                    });

                itemNodeGroups.select("rect").remove();
                itemNodeGroups.select("text").remove();

                itemNodes = itemNodeGroups.append("rect")
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
                    .classed("workflow-item", function (d) {
                        return d.id !== -1;
                    })
                    .classed("intermediate-item", function (d) {
                        return d.id === -1;
                    });

                nodeText = itemNodeGroups.append("text")
                    .attr("x", function() { return itemWidth / 2; })
                    .attr("y", function() { return itemHeight / 2; })
                    .style("fill","yellow")
                    .style("font-family", "sans-serif")
                    .style("font-size", 10)
                    .style("display", function (d) { return d.id === -1 ? "none" : "block"; });

                // Append the name text
                nodeText.append("tspan")
                    .attr("x", 0)
                    .text(function (d) { return "Name: " + d.name; });

                // Append the sequence text
                nodeText.append("tspan")
                    .attr("x", 0)
                    .attr("dy", 10)
                    .text(function (d) { return "Sequence: " + d.sequence; });

                itemNodes.on("click", function (d) {
                    d.selected = !d.selected;
                    d3.select(this).classed("selected", d.selected);
                });

                return itemNodeGroups;
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
            delete: deleteSelected,
            insert: insert
        };
    };
});