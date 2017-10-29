import { Level } from './level';
import { StartLevel } from './startLevel';
import { EndLevel } from './endLevel';
import { IntermediateLevel } from './intermediateLevel';
import { WorkflowLevel } from './workflowLevel';
import { LevelType } from './levelType';
import { Item } from './item';
import { StartItem } from './startItem';
import { EndItem } from './endItem';
import { IntermediateItem } from './intermediateItem';
import { Connector } from './connector';

export class Workflow {
    private levels: Level [];
    private connectors: Connector [];

    constructor() {
        this.levels = [];
        this.connectors = [];

        // Initially workflow consists of a start level and an end level with an empty intermediate level in between
        let startLevel = new StartLevel();
        let endLevel = new EndLevel();
        let startItem = new StartItem();
        let endItem = new EndItem();

        startLevel.addItem(startItem);
        endLevel.addItem(endItem);

        this.levels.push(startLevel);
        this.levels.push(new IntermediateLevel());
        this.levels.push(endLevel);

        this.connectors.push(new Connector(startItem, endItem));
    }

    public addItem(level: number, item: Item) {
        this.addItemToLevel(this.getLevel(level), item);
    }

    public addItemToLevel(level: Level, item: Item) {
        this.addItemInternal(level, item);
        this.adjustConnectorsAfterItemAdd(level, item);
    }

    public insertItemAfter(level: number, item: Item) {
        this.insertItemAfterLevel(this.getLevel(level), item);
    }
    public insertItemAfterLevel(level: Level, item: Item) {
        let workflowLevel = this.insertWrokflowLevelAfter(level);
        this.addItemInternal(workflowLevel, item);

        this.adjustConnectorsAfterItemInsert(workflowLevel, item);
    }

    public removeItem(level: number, item: Item) {
        this.removeItemFromLevel(this.getLevel(level), item);
    }

    public removeItemFromLevel(level: Level, item: Item) {
        level.removeItem(item);

        if (level.hasItems) {
            this.adjustWorkflowAfterLevelItemsUpdate(level);
            this.adjustConnectorsAfterItemRemove(level, item);
        } else {
            // If last item, remove the level as well
            this.removeWorkflowLevel(level);
        }
    }

    public getLevels(): Level[] {
        return this.levels.filter(l => l.type !== LevelType.Intermediate);
    }

    public getAllLevels(): Level[] {
        return this.levels;
    }

    public getMaxLevel(): Level {
        let sortedLevels = this.levels.slice().sort((a: Level, b: Level) => {
            let aItemsCount = a.items.length;
            let bItemsCount = b.items.length;

            return bItemsCount - aItemsCount;   // sort descending
        });

        return sortedLevels[0];
    }

    public getAllItems(): Item[] {
        let result: Item[] = [];

        this.levels.forEach(level => {
            result.push(...level.items)
        })

        return result;
    }

    public getConnectors(): Connector[] {
        return this.connectors;
    }

    public getPreviousLevel(level: Level, previousCount = 1): Level {
        let levelIndex = this.getLevelIndex(level);

        if (levelIndex < 0) {
            throw 'Level does not exist';
        }

        if (levelIndex - previousCount < 0) {
            throw 'Previous level does not exist';
        }

        return this.levels[levelIndex - previousCount];
    }

    public getNextLevel(level: Level, nextCount = 1): Level {
        let levelIndex = this.getLevelIndex(level);

        if (levelIndex < 0) {
            throw 'Level does not exist';
        }

        if (levelIndex + nextCount > this.levels.length - 1) {
            throw 'Next level does not exist';
        }

        return this.levels[levelIndex + nextCount];
    }

    private getLevelIndex(level: Level): number {
        return this.levels.findIndex(l => l === level);
    }

    // There is an intermediate level between any 2 observable levels.
    // Therefore the observed level value is difreent from the internal level value
    private getInternalLevelValue(level: number) {
        return level * 2;
    }

    // Gets the observable level
    private getLevel(level: number) {
        let internalLevel = this.getInternalLevelValue(level);

        if (this.levels.length < internalLevel) {
            throw 'Level does not exist';
        }

        return this.levels[internalLevel];
    }

    private addItemInternal(level: Level, item: Item) {
        level.addItem(item);

        this.adjustWorkflowAfterLevelItemsUpdate(level);
    }

    private insertWrokflowLevelAfter(level: Level) {
        let internalLevel = this.getLevelIndex(level);

        if (level.type === LevelType.End) {
            throw 'Cannot insert level after the end level';
        }

        if (level.type === LevelType.Intermediate) {
            throw 'Cannot insert level after an intermediate level';
        }

        let workflowLevel = new WorkflowLevel();

        // Insert intermediate level first because there is an intermediate level between any 2 levels
        this.levels.splice(internalLevel + 1, 0, new IntermediateLevel());
        this.levels.splice(internalLevel + 2, 0, workflowLevel);

        return workflowLevel;
    }

    private removeWorkflowLevel(level: Level) {
        if (level.type === LevelType.Start
            || level.type === LevelType.End) {
            throw 'Cannot remove start or end levels';
        }

        let levelIndex = this.getLevelIndex(level);
        this.levels.splice(levelIndex, 2);   // Remove the specified level and the next intermediate level

        this.adjustWorkflowAfterLevelRemove(levelIndex);
        this.adjustConnectorsAfterLevelRemove(levelIndex);
    }

    private adjustWorkflowAfterLevelItemsUpdate(updatedLevel: Level) {
        let levelItemsCount = updatedLevel.items.length;
        let previousIntermediateLevel = this.getPreviousLevel(updatedLevel);
        let nextIntermediateLevel = this.getNextLevel(updatedLevel);

        if (levelItemsCount > 1) {
            let previousWorkflowLevel = this.getPreviousLevel(updatedLevel, 2);
            let previousWorkflowLevelItemsCount = previousWorkflowLevel.items.length;

            if (previousWorkflowLevelItemsCount > 1) {
                if (!previousIntermediateLevel.hasItems) {
                    // If item added workflow level has more than one item and previous workflow level has more than one item
                    // then previous intermediate level should have an intermediate item
                    previousIntermediateLevel.addItem(new IntermediateItem());
                }
            } else {
                // If previous workflow level has only one item then previous intermediate level should not have an intermediate item
                previousIntermediateLevel.removeItem(null);
            }

            let nextWorkflowLevel = this.getNextLevel(updatedLevel, 2);
            let nextWorkflowLevelItemsCount = nextWorkflowLevel.items.length;

            if (nextWorkflowLevelItemsCount > 1) {
                if (!nextIntermediateLevel.hasItems) {
                    // If item added workflow level has more than one item and next workflow level has more than one item
                    // then next intermediate level should have an intermediate item
                    nextIntermediateLevel.addItem(new IntermediateItem());
                }
            } else {
                // If next workflow level has only one item then next intermediate level should not have an intermediate item
                nextIntermediateLevel.removeItem(null);
            }
        } else {
            // If item added workflow level has only one item then next/previous intermediate levels should not have an intermediate item
            previousIntermediateLevel.removeItem(null);
            nextIntermediateLevel.removeItem(null);
        }
    }

    private adjustWorkflowAfterLevelRemove(removedLevelIndex: number) {
        let currentLevelAtRemovedIndex = this.levels[removedLevelIndex];
        let levelItemsCount = currentLevelAtRemovedIndex.items.length;
        let previousIntermediateLevel = this.getPreviousLevel(currentLevelAtRemovedIndex);

        if (levelItemsCount > 1) {
            let previousLevel = this.getPreviousLevel(currentLevelAtRemovedIndex, 2);
            let previousLevelItemsCount = previousLevel.items.length;

            if (previousLevelItemsCount > 1) {
                // If workflow level at removed index and previous workflow level has more than one item
                // then there should be an intermediate item
                if (!previousIntermediateLevel.hasItems) {
                    previousIntermediateLevel.addItem(new IntermediateItem());
                }
            } else {
                // If previous workflow level has only one item then previous intermediate leve should not have an intermediate item
                previousIntermediateLevel.removeItem(null);
            }
        } else {
            // If workflow level at removed index has only one item then previous intermediate level should not have an intermediate item
            previousIntermediateLevel.removeItem(null);
        }

        // NOTE: Level removal does not affect the next next level connections
    }

    private adjustConnectorsAfterItemInsert(level: Level, item: Item) {
        let previousLevel = this.getPreviousLevel(level, 2);
        let previousLevelItems = previousLevel.items;
        let previousLevelConnectors = this.connectors.filter(c => c.source.level === previousLevel);
        let nextLevel = this.getNextLevel(level, 2);
        let nextLevelItems = nextLevel.items;
        let nextLevelConnectors = this.connectors.filter(c => c.target.level === nextLevel);

        previousLevelConnectors.forEach(connector => {
            connector.target = item;
        });

        if (previousLevelItems.length > 1 && nextLevelItems.length > 1) {
            nextLevelConnectors.forEach(connector => {
                connector.source = item;
            });
        } else {
            nextLevelItems.forEach(nextLevelItem => {
                let connector = new Connector(item, nextLevelItem);
                this.connectors.push(connector);
            });
        }
    }

    private adjustConnectorsAfterItemAdd(level: Level, item: Item) {
        let levelItems = level.items;
        let previousLevel = this.getPreviousLevel(level, 2);
        let previousIntermediateLevel = this.getPreviousLevel(level);
        let nextLevel = this.getNextLevel(level, 2);
        let nextIntermediateLevel = this.getNextLevel(level);

        if (previousIntermediateLevel.hasItems) {
            let intermediateItem = previousIntermediateLevel.items[0];     // Intermediate levels only have one item
            let previousLevelItems = previousLevel.items;
            let previousLevelConnectors = this.connectors.filter(c => c.source.level === previousLevel);

            if (levelItems.length === 2) {   // Previous intermediate level has been newly added
                previousLevelConnectors.forEach(previousLevelConnector => {
                    previousLevelConnector.target = intermediateItem;
                });

                levelItems.forEach(currentLevelItem => {
                    this.connectors.push(new Connector(intermediateItem, currentLevelItem));
                });
            }

            if (levelItems.length > 2) {   // Previous intermediate level already exists
                this.connectors.push(new Connector(intermediateItem, item));
            }
        } else {
            // Current level has multiple items
            // If there is no intermediate level then the previous level has only one item
            let previousLevelItem = previousLevel.items[0];
            this.connectors.push(new Connector(previousLevelItem, item));
        }

        if (nextIntermediateLevel.hasItems) {
            let intermediateItem = nextIntermediateLevel.items[0];     // Intermediate levels only have one item
            let nextLevelItems = nextLevel.items;
            let nextLevelConnectors = this.connectors.filter(c => c.target.level === nextLevel);

            if (levelItems.length === 2) {   // Next intermediate level has been newly added
                nextLevelConnectors.forEach(nextLevelConnector => {
                    nextLevelConnector.source = intermediateItem;
                });

                levelItems.forEach(currentLevelItem => {
                    this.connectors.push(new Connector(currentLevelItem, intermediateItem));
                });
            }

            if (levelItems.length > 2) {   // Next intermediate level already exists
                this.connectors.push(new Connector(item, intermediateItem));
            }
        } else {
            // Current level has multiple item
            // If there is no intermediate level then the next level has only one item
            let nextLevelItem = nextLevel.items[0];
            this.connectors.push(new Connector(item, nextLevelItem));
        }
    }

    private adjustConnectorsAfterLevelRemove(removedLevelIndex: number) {
        let currentLevelAtRemovedIndex = this.levels[removedLevelIndex];
        let currentLevelItems = currentLevelAtRemovedIndex.items;
        let currentLevelConnectors = this.connectors.filter(c => c.target.level === currentLevelAtRemovedIndex);
        let previousIntermediateLevel = this.getPreviousLevel(currentLevelAtRemovedIndex);
        let previousLevel = this.getPreviousLevel(currentLevelAtRemovedIndex, 2);
        let previousLevelItems = previousLevel.items;
        let previousLevelConnectors = this.connectors.filter(c => c.source.level === previousLevel);

        if (previousIntermediateLevel.hasItems) {
            let intermediateItem = previousIntermediateLevel.items[0];

            previousLevelConnectors.forEach(previousLevelConnector => {
                previousLevelConnector.target = intermediateItem;
            });

            currentLevelConnectors.forEach(currentLevelConnector => {
                currentLevelConnector.source = intermediateItem;
            });
        } else {
            // At least one level has only one item. remove the connector attachted to that item
            // and adjust the connectors of the other level items

            if (currentLevelItems.length === 1) {
                let currentLevelItem = currentLevelItems[0];
                let levelItemConnectorIndex = this.connectors.findIndex(c => c.target === currentLevelItem);
                this.connectors.splice(levelItemConnectorIndex, 1);

                previousLevelConnectors.forEach(previousLevelConnector => {
                    previousLevelConnector.target = currentLevelItem;
                });
            } else {
                let previousLevelItem = previousLevelItems[0];
                let levelItemConnectorIndex = this.connectors.findIndex(c => c.source === previousLevelItem);
                this.connectors.splice(levelItemConnectorIndex, 1);

                currentLevelConnectors.forEach(currentLevelConnector => {
                    currentLevelConnector.source = previousLevelItem;
                });
            }
        }
    }

    private adjustConnectorsAfterItemRemove(level: Level, item: Item) {
        let levelItems = level.items;

        if (levelItems.length === 1) {
            // Remove all current level connectors
            this.connectors = this.connectors.filter(c =>
                (c.source.level !== level && c.target.level !== level));

            let levelItem = levelItems[0];
            let previousLevel = this.getPreviousLevel(level, 2);
            let previousLevelConnectors = this.connectors.filter(c => c.source.level === previousLevel);
            let nextLevel = this.getNextLevel(level, 2);
            let nextLevelConnectors = this.connectors.filter(c => c.target.level === nextLevel);

            if (previousLevelConnectors.length > 0) {
                // Intermediate levels might have been removed. re-adjust all previous level connectors
                previousLevelConnectors.forEach(previousLevelConnector => {
                    previousLevelConnector.target = levelItem;
                });
            } else {
                let previousLevelItems = previousLevel.items;

                previousLevelItems.forEach(i => {
                    this.connectors.push(new Connector(i, levelItem));
                })
            }

            if (nextLevelConnectors.length > 0) {
                // Intermediate levels might have been removed. re-adjust all next level connectors
                nextLevelConnectors.forEach(nextLevelConnector => {
                    nextLevelConnector.source = levelItem;
                });
            } else {
                let nextLevelItems = nextLevel.items;

                nextLevelItems.forEach(i => {
                    this.connectors.push(new Connector(levelItem, i));
                })
            }
        } else {
            let sourceConnectorIndex = this.connectors.findIndex(c => c.source === item);
            this.connectors.splice(sourceConnectorIndex, 1);

            let targetConnectorIndex = this.connectors.findIndex(c => c.target === item);
            this.connectors.splice(targetConnectorIndex, 1);
        }
    }
}
