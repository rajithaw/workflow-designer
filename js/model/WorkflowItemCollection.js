/**
 * Created by Rajitha on 11/8/2014.
 */

function WorkflowItemCollection(itemsJson) {
    var _self = this,
        workflowItemCollection = [],
        maxIndex = 0,
        itemLevels = 0,
        intermediateLevels = 0,
        itemsJson = itemsJson;

    // Comparer for sorting the the workflow items by sequence
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

    // Converts a json object into a workflow items collection
    var convertWorkflowItemsFromJson = function () {
        const ITEM_GAP_X = 2;
        const ITEM_GAP_Y = 2;

        var workflowItem,
            previousSequence,
            nextSequence,
            previousLevel,
            level = 0,
            index = 0;

        workflowItemCollection[0] = [];
        previousSequence = itemsJson[0].sequence;

        for (var i = 0, itemsLength = itemsJson.length; i < itemsLength; i++) {
            var itemJson = itemsJson[i];
            workflowItem = new WorkflowItem(itemJson.id, itemJson.name, itemJson.description, itemJson.sequence);

            // When the level is changed
            if (workflowItem.sequence != previousSequence) {
                level++;
                itemLevels++;
                workflowItemCollection[level] = [];
                index = 0;

                previousLevel = workflowItemCollection[level - 1];
                nextSequence = i + 1 < itemsLength ? itemsJson[i + 1].sequence : null;

                // When adjacent parallel items are detected
                if(previousLevel.length > 1 && nextSequence == workflowItem.sequence) {
                    // Add an intermediate item to separate adjacent parallel items
                    workflowItemCollection[level][index] = new IntermediateItem(level);

                    level++;
                    intermediateLevels++;
                    workflowItemCollection[level] = [];
                }
            }

            previousSequence = workflowItem.sequence;

            // Set workflow item properties and add to the collection
            workflowItem.level = level;
            workflowItem.x = previousLevel == null ? 0 : previousLevel[0].x + ITEM_GAP_X;
            workflowItem.y = index * ITEM_GAP_Y;

            workflowItemCollection[level][index] = workflowItem;
            index++;

            if(index > maxIndex) {
                maxIndex = index;
            }
        }

        // Adjust intermediate items position
        for(var i = 0, collectionLength = workflowItemCollection.length; i < collectionLength; i++) {
            var workflowItem = workflowItemCollection[i][0];

            if(workflowItem.id === -1) {
                var previousLevel = workflowItemCollection[i - 1];
                var nextLevel = workflowItemCollection[i + 1];
                var effectiveLevelLength = Math.min(previousLevel.length, nextLevel.length);

                workflowItem.x = previousLevel[0].x + (ITEM_GAP_X / 2);
                workflowItem.y = (effectiveLevelLength - 1) * ITEM_GAP_Y / 2;
            }
        }
    };

    // Retrieves the workflow item at the provided level and index
    var getItem = function(level, index) {
        return workflowItemCollection[level][index];
    };

    // Sets the workflow item at the provided level and index
    var setItem = function(level, index, value) {
        workflowItemCollection[level][index] = value;
    };

    // Retrieves all items in the provided level
    var getLevel = function(level) {
        return workflowItemCollection[level];
    };

    // Converts the workflow item collection into a flat array
    var toArray = function() {
        var items = [];

        for(var i = 0; i < workflowItemCollection.length; i++) {
            for(var j = 0; j < workflowItemCollection[i].length; j++) {
                var item = workflowItemCollection[i][j];

                items.push(item);
            }
        }

        return items;
    };

    // Converts the workflow items collection into a json object
    var toJson = function() {
        var items = [];

        for(var i = 0; i < workflowItemCollection.length; i++) {
            for(var j = 0; j < workflowItemCollection[i].length; j++) {
                var item = workflowItemCollection[i][j];

                if(item.id >= 0) {
                    items.push({
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        sequence: item.sequence
                    });
                }
            }
        };

        return items;
    };

    // Re initialize the collection after items have been added, removed or updated
    var reInitialize = function() {
        itemsJson = this.toJson();

        workflowItemCollection = [];
        maxIndex = 0;
        itemLevels = 0;
        intermediateLevels = 0;

        if(itemsJson.length > 0) {
            itemLevels++;

            itemsJson.sort(workflowItemsSequenceIdComparer);
            convertWorkflowItemsFromJson();
        }
    };

    // Returns the max index among all levels
    var getMaxIndex = function() {
        return maxIndex;
    };

    // Returns the number of actual levels without the intermediate levels
    var getItemLevels = function() {
        return itemLevels;
    };

    // Returns the number of intermediate levels
    var getIntermediateLevels = function() {
        return intermediateLevels;
    };

    // Returns the number of levels in the collection
    var getLevels = function() {
        return workflowItemCollection.length;
    };

    if(itemsJson.length > 0) {
        // Collection has at leat one level of items
        itemLevels++;

        itemsJson.sort(workflowItemsSequenceIdComparer);
        convertWorkflowItemsFromJson();
    }

    WorkflowItemCollection.prototype.workflowItemsSequenceIdComparer = workflowItemsSequenceIdComparer;

    return {
        get: getItem,
        set: setItem,
        level: getLevel,
        levelCount: getLevels,
        maxIndex: getMaxIndex,
        itemLevels: getItemLevels,
        intermediateLevels: getIntermediateLevels,
        reInitialize: reInitialize,
        toArray: toArray,
        toJson: toJson
    };
}