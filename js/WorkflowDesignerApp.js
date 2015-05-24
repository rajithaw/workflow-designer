/**
 * require.js main entry point
 * Created by Rajitha on 2/19/2015.
 */

define(["WorkflowDesigner", "model/WorkflowItemCollection"], function (WorkflowDesigner, WorkflowItemCollection) {
    "use strict";

    return function WorkflowDesignerApp() {
        var container,
            workflowItems,
            workflowDesigner;

        function createWorkflowDesigner(element, workflow) {
            container = d3.select(element);

            workflowItems = new WorkflowItemCollection(workflow);
            workflowDesigner = new WorkflowDesigner(1200, 800, container, workflowItems);

            workflowDesigner.render();
        }

        function loadWorkflow(workflow) {
            workflowItems = new WorkflowItemCollection(workflow);

            container.select("svg").remove();
            workflowDesigner = new WorkflowDesigner(1200, 800, container, workflowItems);

            workflowDesigner.render();
        }

        function deleteSelectedNodes() {
            workflowDesigner.delete();
        }

        function addNode(sequence) {
            workflowDesigner.add(sequence);
        }

        function insertNode(level) {
            workflowDesigner.insert(level);
        }

        return {
            deleteSelectedNodes: deleteSelectedNodes,
            addNode: addNode,
            insertNode: insertNode,
            createWorkflowDesigner: createWorkflowDesigner,
            loadWorkflow: loadWorkflow
        };
    }
});