/**
 * Created by Rajitha on 2/28/2015.
 */

define(["model/WorkflowItem"], function (WorkflowItem) {
    "use strict";

    return function StartItem() {
        var startItem = new WorkflowItem("start", "Start", "Start", -1, 0);
        startItem.x = 0;
        startItem.y = 0;

        return startItem;
    };
});