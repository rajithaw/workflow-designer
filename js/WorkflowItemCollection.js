/**
 * Created by Rajitha on 11/8/2014.
 */

function WorkflowItemCollection(workflowItemsJson) {
    var result = [];
    var workflowItems = JSON.parse(workflowItemsJson);

    if(workflowItems.length > 0) {
        var convertWorkflowItemsFromJson = function () {
            var workflowItem,
                previousSequence = 0,
                level = 0,
                index = 0;

            previousSequence = workflowItems[0].sequence;

            for (var i = 0; i < workflowItems.length; i++) {
                workflowItem = workflowItems[i];

                if (workflowItem.sequence != previousSequence) {
                    level++;
                    index = 0;
                }

                if (!result[level]) {
                    result[level] = [];
                }

                workflowItem.level = level;
                previousSequence = workflowItem.sequence;
                result[level][index] = workflowItem;
                index++;
            }
        };

        var workflowItemsSequenceIdComparer = function (item1, item2) {
            if (item1.sequence < item2.sequence) {
                return -1;
            }

            if (item1.sequence > item2.sequence) {
                return 1;
            }

            if (item1.id < item2.id) {
                return -1;
            }

            if (item1.id > item2.id) {
                return 1;
            }

            return 0;
        };

        workflowItems.sort(workflowItemsSequenceIdComparer);
        convertWorkflowItemsFromJson();
    }

    result.toJson = function() {
        var items = [];

        for(var i = 0; i < result.length; i++) {
            for(var j = 0; j < result[i].length; j++) {
                var item = result[i][j];

                items.push({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    sequence: item.sequence
                });
            }
        }

        return JSON.stringify(items);
    };

    return result;
}

