function WorkflowDesigner(width, height, container, items){
    var itemsCollection = items;
    var svg = container.append("svg")
        .attr({
            width: width,
            height: height
        });

    var render = function() {
        var item;

        for(var i = 0; i < itemsCollection.length; i++)
        {
            for(var j = 0; j < itemsCollection[i].length; j++)
            {
                item = itemsCollection[i][j];

                svg.append("rect")
                    .attr({
                        x: (item.x * 100) + 20,
                        y: (item.y * 100) + 20,
                        rx: 5,
                        ry: 5,
                        width: 10,
                        height: 10
                    })
            }
        }
    };

    return {
        render: render
    };
}