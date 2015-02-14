function WorkflowDesigner(width, height, container, items){
    var itemsCollection = items;
    var svg = container.append("svg")
        .attr({
            width: width,
            height: height
        });

    var render = function() {
        svg.selectAll("circle")
            .data(itemsCollection.toArray())
            .enter().append("circle")
            .attr("r", 10)
            .attr("cx", function(d) { return (d.x * 100) + 20; })
            .attr("cy", function(d) { return (d.y * 100) + 20; })
            .exit().remove();
    };

    return {
        render: render
    };
}