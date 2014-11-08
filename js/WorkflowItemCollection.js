/**
 * Created by Rajitha on 11/8/2014.
 */

// getLevels() returns the number of levels
// *getLevel(level) returns an array of workflow items in the provided level
// getItem(level, index) returns the workflow item at the provided level and index

function WorkflowItemCollection(workflowItemsJson) {
    var workflowItemsCollection = [];
    var workflowItems = JSON.parse(workflowItemsJson);

    workflowItems.sort(workflowItemsSequenceComparer);

    var convertWorkflowItemsFromJson = function() {
        var workflowItem,
            previousSequence = 0,
            level = 0,
            index = 0;

        previousSequence = workflowItems[0].sequence;

        for (var i = 0; i < workflowItems.length; i++) {
            workflowItem = workflowItems[i];

            if(workflowItem.sequence == previousSequence) {
                workflowItemsCollection[level][index] = workflowItems[i];
                index++;
            }
            else {
                level++;
                index = 0;
            }

            previousSequence = workflowItem.sequence;
        }
    };

    var workflowItemsSequenceComparer = function(item1, item2) {
        if (item1.sequence < item2.sequence) {
            return -1;
        }

        if (item1.sequence > item2.sequence) {
            return 1;
        }

        return 0;
    };
}

