/**
 * Created by Rajitha on 2/19/2015.
 */
define(["model/WorkflowItem"], function (WorkflowItem) {
    "use strict";

    return function IntermediateItem(level) {
        return new WorkflowItem("intermediate", "Intermediate", "Intermediate", -1, level);
    };
});