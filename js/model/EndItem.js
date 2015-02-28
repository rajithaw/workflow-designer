/**
 * Created by Rajitha on 2/28/2015.
 */

define(["model/WorkflowItem"], function (WorkflowItem) {
    "use strict";

    return function EndItem(level) {
        return new WorkflowItem("end", "End", "End", -1, level);
    };
});