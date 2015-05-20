/**
 * require.js main entry point
 * Created by Rajitha on 2/19/2015.
 */

define(["js/WorkflowDesigner", "js/model/WorkflowItemCollection"], function (WorkflowDesigner, WorkflowItemCollection) {
    "use strict";

    var workflowItems,
        workflowDesigner;

    function createWorkflowDesigner(element, workflow) {
        workflowItems = new WorkflowItemCollection(workflow);
        workflowDesigner = new WorkflowDesigner(1200, 800, d3.select(element), workflowItems);

        workflowDesigner.render();
    }

    function deleteSelectedNodes() {
        workflowDesigner.delete();
    }

    function addNode(sequence) {
        workflowDesigner.insert(sequence);
    }

    return {
        deleteSelectedNodes: deleteSelectedNodes,
        addNode: addNode,
        createWorkflowDesigner: createWorkflowDesigner
    };
});