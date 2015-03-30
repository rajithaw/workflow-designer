/**
 * require.js main entry point
 * Created by Rajitha on 2/19/2015.
 */

var main;

require(["WorkflowDesigner", "model/WorkflowItemCollection", "data/SampleWorkflows"], function (WorkflowDesigner, WorkflowItemCollection, sampleWorkflows) {
    "use strict";

    var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow6),
        workflowDesigner = new WorkflowDesigner(1200, 800, d3.select("#display"), workflowItems);

    workflowDesigner.render();

    function deleteSelectedNodes() {
        workflowDesigner.delete();
    }

    function addNode(sequence) {
        workflowDesigner.insert(sequence);
    }

    main = {};
    main.deleteSelectedNodes = deleteSelectedNodes;
    main.addNode = addNode;
});