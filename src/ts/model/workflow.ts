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

        startLevel.AddItem(startItem);
        endLevel.AddItem(endItem);

        this.levels.push(startLevel);
        this.levels.push(new IntermediateLevel());
        this.levels.push(endLevel);

        this.connectors.push(new Connector(startItem, endItem));
    }

    public AddItem(level: number, item: Item) {
        this.AddItemToLevel(this.getLevel(level), item);
    }

    public AddItemToLevel(level: Level, item: Item) {
        this.AddItemInternal(level, item);
        this.AdjustConnectorsAfterItemAdd(level, item);
    }

    public InsertItemAfter(level: number, item: Item) {
        this.InsertItemAfterLevel(this.getLevel(level), item);
    }
    public InsertItemAfterLevel(level: Level, item: Item) {
        let workflowLevel = this.InsertWrokflowLevelAfter(level);
        this.AddItemInternal(workflowLevel, item);

        this.AdjustConnectorsAfterItemInsert(workflowLevel, item);
    }

    public RemoveItem(level: number, item: Item) {
        this.RemoveItemFromLevel(this.getLevel(level), item);
    }

    public RemoveItemFromLevel(level: Level, item: Item) {
        let levelToRemoveFrom = level;
        levelToRemoveFrom.RemoveItem(item);

        if (!levelToRemoveFrom.HasItems()) {
            // If last item, remove the level as well
            this.RemoveWorkflowLevel(level);
        } else {
            this.AdjustWorkflowAfterLevelItemsUpdate(level);
            this.AdjustConnectorsAfterItemRemove(level, item);
        }
    }

    public GetLevels(): Level[] {
        return this.levels.filter(l => l.GetType() !== LevelType.Intermediate);
    }

    public GetAllLevels(): Level[] {
        return this.levels;
    }

    public GetMaxLevel(): Level {
        let sortedLevels = this.levels.slice().sort((a: Level, b: Level) => {
            let aItemsCount = a.GetItems().length;
            let bItemsCount = b.GetItems().length;

            return bItemsCount - aItemsCount;   // sort descending
        });

        return sortedLevels[0];
    }

    public GetAllItems(): Item[] {
        let result: Item[] = [];

        this.levels.forEach(level => {
            result.push(...level.GetItems())
        })

        return result;
    }

    public GetConnectors(): Connector[] {
        return this.connectors;
    }

    public GetPreviousLevel(level: Level, previousCount = 1): Level {
        let levelIndex = this.GetLevelIndex(level);

        if (levelIndex < 0) {
            throw 'Level does not exist';
        }

        if (levelIndex - previousCount < 0) {
            throw 'Previous level does not exist';
        }

        return this.levels[levelIndex - previousCount];
    }

    public GetNextLevel(level: Level, nextCount = 1): Level {
        let levelIndex = this.GetLevelIndex(level);

        if (levelIndex < 0) {
            throw 'Level does not exist';
        }

        if (levelIndex + nextCount > this.levels.length - 1) {
            throw 'Next level does not exist';
        }

        return this.levels[levelIndex + nextCount];
    }

    private GetLevelIndex(level: Level): number {
        return this.levels.findIndex(l => l === level);
    }

    private AddItemInternal(level: Level, item: Item) {
        level.AddItem(item);

        this.AdjustWorkflowAfterLevelItemsUpdate(level);
    }

    private InsertWrokflowLevelAfter(level: Level) {
        let levelToInsertAfter = level;
        let internalLevel = this.GetLevelIndex(level);

        if (levelToInsertAfter.GetType() === LevelType.End) {
            throw 'Cannot insert level after the end level';
        }

        if (levelToInsertAfter.GetType() === LevelType.Intermediate) {
            throw 'Cannot insert level after an intermediate level';
        }

        let workflowLevel = new WorkflowLevel();

        // Insert intermediate level first because there is an intermediate level between any 2 levels
        this.levels.splice(internalLevel + 1, 0, new IntermediateLevel());
        this.levels.splice(internalLevel + 2, 0, workflowLevel);

        return workflowLevel;
    }

    private RemoveWorkflowLevel(level: Level) {
        if (level.GetType() === LevelType.Start
            || level.GetType() === LevelType.End) {
            throw 'Cannot remove start or end levels';
        }

        let levelIndex = this.GetLevelIndex(level);
        this.levels.splice(levelIndex, 2);   // Remove the specified level and the next intermediate level

        this.AdjustWorkflowAfterLevelRemove(levelIndex);
        this.AdjustConnectorsAfterLevelRemove(levelIndex);
    }

    private AdjustWorkflowAfterLevelItemsUpdate(updatedLevel: Level) {
        let levelItemsCount = updatedLevel.GetItems().length;
        let previousIntermediateLevel = this.GetPreviousLevel(updatedLevel);
        let nextIntermediateLevel = this.GetNextLevel(updatedLevel);

        if (levelItemsCount > 1) {
            let previousWorkflowLevel = this.GetPreviousLevel(updatedLevel, 2);
            let previousWorkflowLevelItemsCount = previousWorkflowLevel.GetItems().length;

            if (previousWorkflowLevelItemsCount > 1) {
                if (!previousIntermediateLevel.HasItems()) {
                    // If item added workflow level has more than one item and previous workflow level has more than one item
                    // then previous intermediate level should have an intermediate item
                    previousIntermediateLevel.AddItem(new IntermediateItem());
                }
            } else {
                // If previous workflow level has only one item then previous intermediate level should not have an intermediate item
                previousIntermediateLevel.RemoveItem(null);
            }

            let nextWorkflowLevel = this.GetNextLevel(updatedLevel, 2);
            let nextWorkflowLevelItemsCount = nextWorkflowLevel.GetItems().length;

            if (nextWorkflowLevelItemsCount > 1) {
                if (!nextIntermediateLevel.HasItems()) {
                    // If item added workflow level has more than one item and next workflow level has more than one item
                    // then next intermediate level should have an intermediate item
                    nextIntermediateLevel.AddItem(new IntermediateItem());
                }
            } else {
                // If next workflow level has only one item then next intermediate level should not have an intermediate item
                nextIntermediateLevel.RemoveItem(null);
            }
        } else {
            // If item added workflow level has only one item then next/previous intermediate levels should not have an intermediate item
            previousIntermediateLevel.RemoveItem(null);
            nextIntermediateLevel.RemoveItem(null);
        }
    }

    private AdjustWorkflowAfterLevelRemove(removedLevelIndex: number) {
        let currentLevelAtRemovedIndex = this.levels[removedLevelIndex];
        let levelItemsCount = currentLevelAtRemovedIndex.GetItems().length;
        let previousIntermediateLevel = this.GetPreviousLevel(currentLevelAtRemovedIndex);

        if (levelItemsCount > 1) {
            let previousLevel = this.GetPreviousLevel(currentLevelAtRemovedIndex, 2);
            let previousLevelItemsCount = previousLevel.GetItems().length;

            if (previousLevelItemsCount > 1) {
                // If workflow level at removed index and previous workflow level has more than one item
                // then there should be an intermediate item
                if (!previousIntermediateLevel.HasItems()) {
                    previousIntermediateLevel.AddItem(new IntermediateItem());
                }
            } else {
                // If previous workflow level has only one item then previous intermediate leve should not have an intermediate item
                previousIntermediateLevel.RemoveItem(null);
            }
        } else {
            // If workflow level at removed index has only one item then previous intermediate level should not have an intermediate item
            previousIntermediateLevel.RemoveItem(null);
        }

        // NOTE: Level removal does not affect the next next level connections
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

    private getLevelById(id: string) {
        return this.levels.find(l => l.Id === id);
    }

    private AdjustConnectorsAfterItemInsert(level: Level, item: Item) {
        let previousLevel = this.GetPreviousLevel(level, 2);
        let previousLevelItems = previousLevel.GetItems();
        let previousLevelConnectors = this.connectors.filter(c => c.GetSource().GetLevel() === previousLevel);
        let nextLevel = this.GetNextLevel(level, 2);
        let nextLevelItems = nextLevel.GetItems();
        let nextLevelConnectors = this.connectors.filter(c => c.GetTarget().GetLevel() === nextLevel);

        previousLevelConnectors.forEach(connector => {
            connector.SetTarget(item);
        });

        if (previousLevelItems.length > 1 && nextLevelItems.length > 1) {
            nextLevelConnectors.forEach(connector => {
                connector.SetSource(item);
            });
        } else {
            nextLevelItems.forEach(nextLevelItem => {
                let connector = new Connector(item, nextLevelItem);
                this.connectors.push(connector);
            });
        }
    }

    private AdjustConnectorsAfterItemAdd(level: Level, item: Item) {
        let currentLevel = level;
        let currentLevelItems = currentLevel.GetItems();
        let previousLevel = this.GetPreviousLevel(level, 2);
        let previousIntermediateLevel = this.GetPreviousLevel(level);
        let nextLevel = this.GetNextLevel(level, 2);
        let nextIntermediateLevel = this.GetNextLevel(level);

        if (previousIntermediateLevel.HasItems()) {
            let intermediateItem = previousIntermediateLevel.GetItems()[0];     // Intermediate levels only have one item
            let previousLevelItems = previousLevel.GetItems();
            let previousLevelConnectors = this.connectors.filter(c => c.GetSource().GetLevel() === previousLevel);

            if (currentLevelItems.length === 2) {   // Previous intermediate level has been newly added
                previousLevelConnectors.forEach(previousLevelConnector => {
                    previousLevelConnector.SetTarget(intermediateItem);
                });

                currentLevelItems.forEach(currentLevelItem => {
                    this.connectors.push(new Connector(intermediateItem, currentLevelItem));
                });
            }

            if (currentLevelItems.length > 2) {   // Previous intermediate level already exists
                this.connectors.push(new Connector(intermediateItem, item));
            }
        } else {
            // Current level has multiple items
            // If there is no intermediate level then the previous level has only one item
            let previousLevelItem = previousLevel.GetItems()[0];
            this.connectors.push(new Connector(previousLevelItem, item));
        }

        if (nextIntermediateLevel.HasItems()) {
            let intermediateItem = nextIntermediateLevel.GetItems()[0];     // Intermediate levels only have one item
            let nextLevelItems = nextLevel.GetItems();
            let nextLevelConnectors = this.connectors.filter(c => c.GetTarget().GetLevel() === nextLevel);

            if (currentLevelItems.length === 2) {   // Next intermediate level has been newly added
                nextLevelConnectors.forEach(nextLevelConnector => {
                    nextLevelConnector.SetSource(intermediateItem);
                });

                currentLevelItems.forEach(currentLevelItem => {
                    this.connectors.push(new Connector(currentLevelItem, intermediateItem));
                });
            }

            if (currentLevelItems.length > 2) {   // Next intermediate level already exists
                this.connectors.push(new Connector(item, intermediateItem));
            }
        } else {
            // Current level has multiple item
            // If there is no intermediate level then the next level has only one item
            let nextLevelItem = nextLevel.GetItems()[0];
            this.connectors.push(new Connector(item, nextLevelItem));
        }
    }

    private AdjustConnectorsAfterLevelRemove(removedLevelIndex: number) {
        let currentLevelAtRemovedIndex = this.levels[removedLevelIndex];
        let currentLevelItems = currentLevelAtRemovedIndex.GetItems();
        let currentLevelConnectors = this.connectors.filter(c => c.GetTarget().GetLevel() === currentLevelAtRemovedIndex);
        let previousIntermediateLevel = this.GetPreviousLevel(currentLevelAtRemovedIndex);
        let previousLevel = this.GetPreviousLevel(currentLevelAtRemovedIndex, 2);
        let previousLevelItems = previousLevel.GetItems();
        let previousLevelConnectors = this.connectors.filter(c => c.GetSource().GetLevel() === previousLevel);

        if (previousIntermediateLevel.HasItems()) {
            let intermediateItem = previousIntermediateLevel.GetItems()[0];

            previousLevelConnectors.forEach(previousLevelConnector => {
                previousLevelConnector.SetTarget(intermediateItem);
            });

            currentLevelConnectors.forEach(currentLevelConnector => {
                currentLevelConnector.SetSource(intermediateItem);
            });
        } else {
            // At least one level has only one item. remove the connector attachted to that item
            // and adjust the connectors of the other level items

            if (currentLevelItems.length === 1) {
                let currentLevelItem = currentLevelItems[0];
                let levelItemConnectorIndex = this.connectors.findIndex(c => c.GetTarget() === currentLevelItem);
                this.connectors.splice(levelItemConnectorIndex, 1);

                previousLevelConnectors.forEach(previousLevelConnector => {
                    previousLevelConnector.SetTarget(currentLevelItem);
                });
            } else {
                let previousLevelItem = previousLevelItems[0];
                let levelItemConnectorIndex = this.connectors.findIndex(c => c.GetSource() === previousLevelItem);
                this.connectors.splice(levelItemConnectorIndex, 1);

                currentLevelConnectors.forEach(currentLevelConnector => {
                    currentLevelConnector.SetSource(previousLevelItem);
                });
            }
        }
    }

    private AdjustConnectorsAfterItemRemove(level: Level, item: Item) {
        let currentLevel = level;
        let levelItems = currentLevel.GetItems();

        if (levelItems.length === 1) {
            // Remove all current level connectors
            this.connectors = this.connectors.filter(c =>
                (c.GetSource().GetLevel() !== currentLevel && c.GetTarget().GetLevel() !== currentLevel));

            let levelItem = levelItems[0];
            let previousLevel = this.GetPreviousLevel(level, 2);
            let previousLevelConnectors = this.connectors.filter(c => c.GetSource().GetLevel() === previousLevel);
            let nextLevel = this.GetNextLevel(level, 2);
            let nextLevelConnectors = this.connectors.filter(c => c.GetTarget().GetLevel() === nextLevel);

            if (previousLevelConnectors.length > 0) {
                // Intermediate levels might have been removed. re-adjust all previous level connectors
                previousLevelConnectors.forEach(previousLevelConnector => {
                    previousLevelConnector.SetTarget(levelItem);
                });
            } else {
                let previousLevelItems = previousLevel.GetItems();

                previousLevelItems.forEach(i => {
                    this.connectors.push(new Connector(i, levelItem));
                })
            }

            if (nextLevelConnectors.length > 0) {
                // Intermediate levels might have been removed. re-adjust all next level connectors
                nextLevelConnectors.forEach(nextLevelConnector => {
                    nextLevelConnector.SetSource(levelItem);
                });
            } else {
                let nextLevelItems = nextLevel.GetItems();

                nextLevelItems.forEach(i => {
                    this.connectors.push(new Connector(levelItem, i));
                })
            }
        } else {
            let sourceConnectorIndex = this.connectors.findIndex(c => c.GetSource() === item);
            this.connectors.splice(sourceConnectorIndex, 1);

            let targetConnectorIndex = this.connectors.findIndex(c => c.GetTarget() === item);
            this.connectors.splice(targetConnectorIndex, 1);
        }
    }
}
