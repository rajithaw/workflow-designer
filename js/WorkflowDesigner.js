function WorkflowDesigner(width, height, container, items){
    var itemsCollection = items;
    var svg = container.append("svg")
        .attr({
            width: width,
            height: height
        });

    var render = function() {
        var magnitude = 100,
            offset = 20,
            connectorData = [];

        // Render the nodes
        var itemNodes = svg.selectAll("circle")
            .data(itemsCollection.toArray());

        itemNodes.enter().append("circle");
        itemNodes.exit().remove();
        itemNodes.attr("r", 10)
            .attr("cx", function(d) { return (d.x * magnitude) + offset; })
            .attr("cy", function(d) { return (d.y * magnitude) + offset; });

        // work through all items higher than level 0
        itemNodes.filter(function(d) { return d.level > 0; })
            .each(function(d) {
                var previousLevel = itemsCollection[d.level -1];

                // Construct the connector data using the nodes to be connected
                for(var i = 0, j = previousLevelLength = previousLevel.length; i < previousLevelLength; i++) {
                    connectorData.push(new WorkflowItemConnector(previousLevel[i], d));
                }
            });

        // Render the connections
        var connectors = svg.selectAll("line")
            .data(connectorData);
        connectors.enter().append("line");
        connectors.exit().remove();

        connectors.attr("x1", function(d) { return (d.workflowItem1.x * magnitude) + offset; })
            .attr("y1", function(d) { return (d.workflowItem1.y * magnitude) + offset; })
            .attr("x2", function(d) { return (d.workflowItem2.x * magnitude) + offset; })
            .attr("y2", function(d) { return (d.workflowItem2.y * magnitude) + offset; })
            .attr("stroke", "black");
    };

    return {
        render: render
    };
}