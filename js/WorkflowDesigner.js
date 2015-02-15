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
            connectorData = [],
            itemWidth = 40,
            itemHeight = 20,
            intermediateSize = 10;

        // Render the nodes
        var itemNodes = svg.selectAll("rect")
            .data(itemsCollection.toArray());

        itemNodes.enter().append("rect");
        itemNodes.exit().remove();
        itemNodes.attr("width", function(d){ return d.id === -1 ? intermediateSize : itemWidth })
            .attr("height", function(d) { return d.id === -1 ? intermediateSize : itemHeight })
            .attr("rx", function(d) { return 5; })
            .attr("ry", function(d) { return 5; })
            .attr("fill", function(d) { return d.id === -1 ? "black" : "blue" })
            .attr("x", function(d) {
                return d.id === -1
                    ? (d.x * magnitude) + offset - (intermediateSize / 2)
                    : (d.x * magnitude) + offset - (itemWidth / 2);
            })
            .attr("y", function(d) {
                return d.id === -1
                    ? (d.y * magnitude) + offset - (intermediateSize / 2)
                    : (d.y * magnitude) + offset - (itemHeight / 2);
            });

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

        connectors
            .attr("x1", function(d) {
                return d.workflowItem1.id === -1
                    ? (d.workflowItem1.x * magnitude) + offset
                    : (d.workflowItem1.x * magnitude) + offset + (itemWidth / 2);
            })
            .attr("y1", function(d) { return (d.workflowItem1.y * magnitude) + offset; })
            .attr("x2", function(d) {
                return d.workflowItem2.id === -1
                    ? (d.workflowItem2.x * magnitude) + offset
                    : (d.workflowItem2.x * magnitude) + offset - (itemWidth / 2);
            })
            .attr("y2", function(d) { return (d.workflowItem2.y * magnitude) + offset; })
            .attr("stroke", "black");
    };

    return {
        render: render
    };
}