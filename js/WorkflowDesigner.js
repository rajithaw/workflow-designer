define(function (require, exports, module) {
    "use strict";

    var d3 = require("d3"),
        WorkflowItem = require("model/WorkflowItem"),
        WorkflowItemConnector = require("model/WorkflowItemConnector"),
        WorkflowItemNode = require("view/WorkflowItemNode"),
        WorkflowItemNodeGroup = require("view/WorkflowItemNodeGroup"),
        WorkflowNodeConnector = require("view/WorkflowNodeConnector"),
        WorkflowItemNodeText = require("view/WorkflowItemNodeText");

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

            // Find the connector elements of the provided workflow item
            findConnectors = function (itemData) {
                var previousLevel,
                    nextLevel;

                if (itemData.level > 0) {
                    previousLevel = itemsCollection.level(itemData.level - 1);
                }

                if (itemData.level < itemsCollection.levelCount() - 1) {
                    nextLevel = itemsCollection.level(itemData.level + 1);
                }

                return d3.selectAll("path")
                    .filter(function (d) {
                        return ((previousLevel && previousLevel.indexOf(d.source) > -1) && (d.target === itemData)) ||
                            ((nextLevel && nextLevel.indexOf(d.target) > -1) && (d.source === itemData));
                    });
            },

            // Render the nodes
            renderItemNodes = function () {
                var itemNodes,
                    nodeText,
                    itemNodeGroups,
                    itemNode,
                    itemNodeGroup,
                    itemNodeText;

                itemNode = new WorkflowItemNode(itemWidth, itemHeight, intermediateSize, itemNodeRadius);
                itemNodeGroup = new WorkflowItemNodeGroup(itemWidth, itemHeight, intermediateSize, magnitude, offset);
                itemNodeText = new WorkflowItemNodeText(itemWidth, itemHeight);

                itemNodeGroups = svg.selectAll(itemNodeGroup.type)
                    .data(itemsCollection.toArray());

                itemNodeGroups.enter().append(itemNodeGroup.type);
                itemNodeGroups.exit().remove();
                itemNodeGroups.attr(itemNodeGroup.attributes);


                itemNodeGroups.select(itemNode.type).remove();
                itemNodeGroups.select("text").remove();

                // Call the drag with the proper execution context
                itemNodeGroups.call(itemNodeGroup.drag.call(this));

                // Add node drag start event listener
                itemNodeGroup.on("nodedragstart", function(d) {
                    var connectors = findConnectors(d);

                    // Hide the connectors
                    connectors.classed("workflow-item-connector-hidden", true);
                });

                // Add node drag end event listener
                itemNodeGroup.on("nodedragend", function(d) {
                    render();
                });

                itemNodes = itemNodeGroups.append(itemNode.type)
                    .attr(itemNode.attributes)
                    .classed(itemNode.classes);

                nodeText = itemNodeGroups.append(itemNodeText.type)
                    .attr(itemNodeText.attributes)
                    .classed(itemNodeText.classes);

                // Append the name text
                nodeText.append(itemNodeText.textLine.type)
                    .attr(itemNodeText.textLine.nameText.attributes)
                    .text(itemNodeText.textLine.nameText.text);

                // Append the sequence text
                nodeText.append(itemNodeText.textLine.type)
                    .attr(itemNodeText.textLine.sequenceText.attributes)
                    .text(itemNodeText.textLine.sequenceText.text);

                itemNodes.on(itemNode.events);

                return itemNodeGroups;
            },

            // Render the connectors
            renderItemConnectors = function (itemNodes) {
                var connectorData = [],
                    connectors,
                    previousLevelLength,
                    itemNodeConnector,
                    i;

                itemNodeConnector = new WorkflowNodeConnector(itemWidth, magnitude, offset);

                // work through all items higher than level 0
                itemNodes.filter(function (d) { return d.level > 0; })
                    .each(function (d) {
                        var previousLevel = itemsCollection.level(d.level - 1);

                        // Construct the connector data using the nodes to be connected
                        for (i = 0, previousLevelLength = previousLevel.length; i < previousLevelLength; i++) {
                            connectorData.push(new WorkflowItemConnector(previousLevel[i], d));
                        }
                    });

                // Render the connections
                connectors = svg.selectAll(itemNodeConnector.type)
                    .data(connectorData);
                connectors.enter().append(itemNodeConnector.type);
                connectors.exit().remove();

                connectors.attr(itemNodeConnector.attributes)
                    .classed(itemNodeConnector.classes);
            },

            render = function () {
                var itemNodes = renderItemNodes();

                renderItemConnectors(itemNodes);
            };

        d3.select(window).on("keydown", onKeyDown);

        return {
            render: render,
            delete: deleteSelected,
            insert: insert
        };
    };
});