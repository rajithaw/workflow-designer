/**
 * Data model representing the workflow items collection
 * Created by Rajitha on 11/8/2014.
 */

define(function (require, exports, module) {
    "use strict";

    var WorkflowItem = require("model/WorkflowItem"),
        StartItem = require("model/StartItem"),
        EndItem = require("model/EndItem"),
        IntermediateItem = require("model/IntermediateItem"),
        sequenceIdComparer = require("util/SequenceIdComparer"),
        levelComparer = require("util/LevelComparer");

    return function workflowItemCollection(workflowItemsJson) {
        var itemCollection = [],
            maxIndex = 0,
            itemLevels = 0,
            intermediateLevels = 0,
            itemGapX = 2,
            itemGapY = 2,
            itemsJson = workflowItemsJson,

            // Adjust intermediate item positions
            adjustIntermediateItems = function () {
                var workflowItem,
                    previousLevel,
                    nextLevel,
                    effectiveLevelLength,
                    collectionLength,
                    i;

                for (i = 0, collectionLength = itemCollection.length; i < collectionLength; i++) {
                    workflowItem = itemCollection[i][0];

                    if (workflowItem.id === "intermediate") {
                        previousLevel = itemCollection[i - 1];
                        nextLevel = itemCollection[i + 1];
                        effectiveLevelLength = Math.min(previousLevel.length, nextLevel.length);

                        workflowItem.x = previousLevel[0].x + (itemGapX / 2);
                        workflowItem.y = (effectiveLevelLength - 1) * itemGapY / 2;
                    }
                }
            },

            // Converts a json object into a workflow items collection
            convertWorkflowItemsFromJson = function () {
                var itemJson,
                    workflowItem,
                    endItem,
                    previousSequence,
                    nextSequence,
                    previousLevel,
                    level = 0,
                    index = 0,
                    itemsLength,
                    i;

                // Add the start item at level 0
                itemCollection[0] = [new StartItem()];

                previousSequence = itemCollection[0][0].sequence;

                for (i = 0, itemsLength = itemsJson.length; i < itemsLength; i++) {
                    itemJson = itemsJson[i];

                    // Id and Sequence has to be defined for a workflow item
                    if((!itemJson.id && itemJson.id !== 0) || (!itemJson.sequence && itemJson.sequence !== 0)) {
                        throw new Error("Invalid items json");
                    }

                    // When the level is changed
                    if (itemJson.sequence !== previousSequence) {
                        level++;
                        itemLevels++;
                        itemCollection[level] = [];
                        index = 0;

                        previousLevel = itemCollection[level - 1];
                        nextSequence = i + 1 < itemsLength ? itemsJson[i + 1].sequence : null;

                        // When adjacent parallel items are detected
                        if (previousLevel.length > 1 && nextSequence === itemJson.sequence) {
                            // Add an intermediate item to separate adjacent parallel items
                            itemCollection[level][index] = new IntermediateItem(level);

                            level++;
                            intermediateLevels++;
                            itemCollection[level] = [];
                        }
                    }

                    previousSequence = itemJson.sequence;

                    // Set workflow item properties and add to the collection
                    workflowItem = new WorkflowItem(itemJson.id, itemJson.name, itemJson.description, itemJson.sequence, level);
                    workflowItem.x = previousLevel[0].x + itemGapX;
                    workflowItem.y = index * itemGapY;

                    itemCollection[level][index] = workflowItem;
                    index++;

                    if (index > maxIndex) {
                        maxIndex = index;
                    }
                }

                // Add the end item
                level++;
                endItem = new EndItem(level);
                endItem.x = itemCollection[level - 1][0].x + itemGapX;
                endItem.y = 0;
                itemCollection[level] = [endItem];

                adjustIntermediateItems(itemGapX, itemGapY);
            },

            // Retrieves the workflow item at the provided level and index
            getItem = function (level, index) {
                return itemCollection[level][index];
            },

            // Sets the workflow item at the provided level and index
            setItem = function (level, index, value) {
                itemCollection[level][index] = value;
            },

            // Retrieves all items in the provided level
            getLevel = function (level) {
                return itemCollection[level];
            },

            // Converts the workflow item collection into a flat array
            toArray = function () {
                var item,
                    items = [],
                    i,
                    j;

                for (i = 0; i < itemCollection.length; i++) {
                    for (j = 0; j < itemCollection[i].length; j++) {
                        item = itemCollection[i][j];

                        items.push(item);
                    }
                }

                return items;
            },

            // Converts the workflow items collection into a json object
            toJson = function () {
                var item,
                    items = [],
                    i,
                    j;

                for (i = 0; i < itemCollection.length; i++) {
                    for (j = 0; j < itemCollection[i].length; j++) {
                        item = itemCollection[i][j];

                        if (item.id >= 0) {
                            items.push({
                                id: item.id,
                                name: item.name,
                                description: item.description,
                                sequence: item.sequence
                            });
                        }
                    }
                }

                return items;
            },

            // Re-initialize the collection after items have been added, removed or updated
            reInitialize = function () {
                itemsJson = toJson();

                itemCollection = [];
                maxIndex = 0;
                itemLevels = 0;
                intermediateLevels = 0;

                if (itemsJson.length > 0) {
                    itemsJson.sort(sequenceIdComparer);
                    convertWorkflowItemsFromJson();
                }
            },

            // Returns the max index among all levels
            getMaxIndex = function () {
                return maxIndex;
            },

            // Returns the number of actual levels without the intermediate levels
            getItemLevels = function () {
                return itemLevels;
            },

            // Returns the number of intermediate levels
            getIntermediateLevels = function () {
                return intermediateLevels;
            },

            // Returns the number of levels in the collection
            getLevels = function () {
                return itemCollection.length;
            },

            // Removes the provided item/items from the workflow collection
            remove = function (items) {
                if (items instanceof Array) {
                    removeItems(items);
                } else {
                    removeItems([items]);
                }
            },

            // Removes the provided items from the workflow collection
            removeItems = function (items) {
                var itemLevel,
                    itemIndex,
                    item,
                    i;

                for (i = 0; i < items.length; i++) {
                    item = items[i];

                    itemLevel = itemCollection[item.level];
                    itemIndex = itemCollection[item.level].indexOf(item);

                    itemLevel.splice(itemIndex, 1);
                }

                reInitialize();
            },

            // Adds the provided item/items to the workflow collection based on item sequence
            add = function (items) {
                if ((items instanceof Array) === false) {
                    items = [items];
                }

                addItems(items);
            },

            // Adds the provided items to the workflow collection based on each item sequence
            addItems = function (items) {
                itemCollection[itemCollection.length] = items;

                reInitialize();
            },

            // Inserts the provided item/items to the workflow collection based on item level
            insert = function (items) {
                if ((items instanceof Array) === false) {
                    items = [items];
                }

                insertItems(items);
            },

            // Inserts the provided items to the workflow collection based on each item level
            insertItems = function (items) {
                var i, j,
                    newItem,
                    newLevels = [],
                    levelsDictionary = {},
                    collectionLength,
                    levelLength,
                    sequenceOffset = 0,
                    workflowItem;

                // Sort items by level
                items.sort(levelComparer);

                // Construct the list of unique levels to be added
                for (i = 0; i < items.length; i++) {
                    newItem = items[i];

                    if(!levelsDictionary[newItem.level]) {
                        levelsDictionary[newItem.level] = [];
                    }

                    // Unique levels
                    if(newLevels.indexOf(newItem.level) < 0) {
                        newLevels.push(newItem.level);
                    }

                    // Levels with items
                    levelsDictionary[newItem.level].push(newItem);
                }

                for (i = newLevels[0], collectionLength = itemCollection.length; i < collectionLength; i++) {
                    if(newLevels.indexOf(i) >= 0) {
                        sequenceOffset++;
                    }

                    // Adjust the old item sequences
                    for (j = 0, levelLength = itemCollection[i].length; j < levelLength; j++) {
                        workflowItem = itemCollection[i][j];
                        if(workflowItem.sequence >= 0) {
                            workflowItem.sequence += sequenceOffset;
                        }
                    }

                    // Set the new item sequences
                    if(levelsDictionary[i]) {
                        for (j = 0, levelLength = levelsDictionary[i].length; j < levelLength; j++) {
                            workflowItem = levelsDictionary[i][j];
                            workflowItem.sequence = previousSequence;
                        }
                    }
                }

                addItems(items);
            };

        if (itemsJson.length > 0) {
            itemsJson.sort(sequenceIdComparer);
            convertWorkflowItemsFromJson();
        }

        return {
            get: getItem,
            set: setItem,
            add: add,
            insert: insert,
            remove: remove,
            level: getLevel,
            levelCount: getLevels,
            maxIndex: getMaxIndex,
            itemLevelCount: getItemLevels,
            intermediateLevelCount: getIntermediateLevels,
            reInitialize: reInitialize,
            toArray: toArray,
            toJson: toJson
        };
    };
});