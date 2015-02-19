/**
 * Created by Rajitha on 2/19/2015.
 */

require(["js/WorkflowDesigner", "js/model/WorkflowItemCollection", "data/SampleWorkflows"], function(WorkflowDesigner, WorkflowItemCollection, SampleWorkflows){

    var workflowItems = WorkflowItemCollection(SampleWorkflows.sampleWorkflow6);

    var workflowDesigner = WorkflowDesigner(1024, 768, d3.select("#display"), workflowItems);
    workflowDesigner.render();

    function deleteSelectedNodes() {
        workflowDesigner.delete();
    }

    return {
        deleteSelectedNodes: deleteSelectedNodes
    }
});