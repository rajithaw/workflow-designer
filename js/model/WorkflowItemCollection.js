/**
 * Created by Rajitha on 11/8/2014.
 */

function WorkflowItemCollection(itemsJson) {
    var _self = this,
        workflowItemCollection = [],
        maxIndex = 0,
        properLevels = 0,
        intermediateLevels = 0;

    itemsJson = JSON.parse(itemsJson);

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

    if(itemsJson.length > 0) {
        var convertWorkflowItemsFromJson = function () {
            const ITEM_GAP_X = 2;
            const ITEM_GAP_Y = 2;

            var workflowItem,
                intermediateItem,
                previousSequence,
                nextSequence,
                previousLevel,
                level = 0,
                index = 0;

            workflowItemCollection[0] = [];
            previousSequence = itemsJson[0].sequence;

            for (var i = 0, itemsLength = itemsJson.length; i < itemsLength; i++) {
                workflowItem = itemsJson[i];

                if (workflowItem.sequence != previousSequence) {
                    level++;
                    properLevels++;
                    workflowItemCollection[level] = [];
                    index = 0;

                    previousLevel = workflowItemCollection[level - 1];
                    nextSequence = i + 1 < itemsLength ? itemsJson[i + 1].sequence : null;

                    if(previousLevel.length > 1 && nextSequence == workflowItem.sequence) {
                        // Add an intermediate item to separate adjacent parallel items
                        intermediateItem = {
                            id: -1,
                            name: "Intermediate",
                            description: "Intermediate",
                            sequence: -1,
                            level: level
                            //x: previousLevel[0].x + (ITEM_GAP_X / 2),
                            //y: (previousLevel.length - 1) * ITEM_GAP_Y / 2
                        };

                        workflowItemCollection[level][index] = intermediateItem;

                        level++;
                        intermediateLevels++;
                        workflowItemCollection[level] = [];
                    }
                }

                previousSequence = workflowItem.sequence;

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
                    var effectiveLevelLength = Math.min(previousLevel.length, nextLevel.length)

                    workflowItem.x = previousLevel[0].x + (ITEM_GAP_X / 2);
                    workflowItem.y = (effectiveLevelLength - 1) * ITEM_GAP_Y / 2;
                }
            }
        };

        itemsJson.sort(workflowItemsSequenceIdComparer);
        convertWorkflowItemsFromJson();
    }

    workflowItemCollection.toArray = function() {
        var items = [];

        for(var i = 0; i < workflowItemCollection.length; i++) {
            for(var j = 0; j < workflowItemCollection[i].length; j++) {
                var item = workflowItemCollection[i][j];

                items.push(item);
            }
        }

        return items;
    };

    workflowItemCollection.toJson = function() {
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

        workflowItemCollection.getMaxIndex = function() {
            return maxIndex;
        };

        workflowItemCollection.getProperLevels = function() {
            return properLevels;
        };

        workflowItemCollection.getIntermediateLevels = function() {
            return intermediateLevels;
        };

        return JSON.stringify(items);
    };

    //workflowItems.toJson = function() {
    //    var items = toArray1();
    //
    //    for(var i = 0; i < items.length; i++) {
    //        var item = items[i];
    //
    //        if(item.id >= 0) {
    //            items.push({
    //                id: item.id,
    //                name: item.name,
    //                description: item.description,
    //                sequence: item.sequence
    //            });
    //        }
    //    }
    //
    //    return JSON.stringify(items);
    //};

    WorkflowItemCollection.prototype.workflowItemsSequenceIdComparer = workflowItemsSequenceIdComparer;
    return workflowItemCollection;
}

