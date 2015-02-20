/**
 * Created by Rajitha on 11/8/2014.
 */
define([], function () {
    "use strict";

    return function WorkflowItem(id, name, description, sequence, level) {
        return {
            id: id,
            name: name,
            description: description,
            sequence: sequence,
            level: level,
            selected: false
        };
    };
});