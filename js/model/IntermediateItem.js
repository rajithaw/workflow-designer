/**
 * Created by Rajitha on 2/19/2015.
 */
define(["js/model/WorkflowItem"], function(WorkflowItem) {
    return function IntermediateItem(level) {
        return new WorkflowItem(-1, "Intermediate", "Intermediate", -1, level);
    }
});