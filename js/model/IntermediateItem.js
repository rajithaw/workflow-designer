/**
 * Created by Rajitha on 2/19/2015.
 */
define(["model/WorkflowItem"], function (WorkflowItem) {
    "use strict";

    return function IntermediateItem(level) {
        return new WorkflowItem(-1, "Intermediate", "Intermediate", -1, level);
    };
});