/**
 * Data model of a workflow node connector.
 * Created by Rajitha on 2/15/2015.
 */

define([], function () {
    "use strict";

    return function WorkflowItemConnector(source, target) {
        return {
            source: source,
            target: target
        };
    };
});