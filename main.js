/**
 * Created by Rajitha on 2/19/2015.
 */

require.config({
    paths: {
        d3: "lib/d3/d3.min"
    }
});

require(["js/WorkflowDesigner", "js/model/WorkflowItemCollection", "data/SampleWorkflows"], function (WorkflowDesigner, WorkflowItemCollection, SampleWorkflows) {
    "use strict";

    var workflowItems = new WorkflowItemCollection(SampleWorkflows.sampleWorkflow6),
        workflowDesigner = new WorkflowDesigner(1024, 768, d3.select("#display"), workflowItems);

    workflowDesigner.render();

    function deleteSelectedNodes() {
        workflowDesigner.delete();
    }

    return {
        deleteSelectedNodes: deleteSelectedNodes
    };
});