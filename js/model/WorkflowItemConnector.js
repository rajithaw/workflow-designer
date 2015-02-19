/**
 * Created by Rajitha on 2/15/2015.
 */
define([], function() {
    return function WorkflowItemConnector(source, target) {
        return {
            source: source,
            target: target
        }
    }
});