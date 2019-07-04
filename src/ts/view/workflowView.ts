import { Workflow } from '../model/workflow';
import { Item } from '../model/item';
import { Level } from '../model/level';
import { LevelType } from '../model/levelType';
import { LevelView } from './levelView';
import { ItemView } from './itemView';
import { ConnectorView } from './connectorView';

export class WorkflowView {

    private levelView: LevelView;
    private itemView: ItemView;
    private connectorView: ConnectorView;

    constructor(private workflow: Workflow, private dispatch: any, private canvas: any) {
        this.levelView = new LevelView(this.workflow, this.dispatch, this.canvas);
        this.connectorView = new ConnectorView(this.workflow, this.dispatch, this.canvas);
        this.itemView = new ItemView(this.workflow, this.dispatch, this.canvas);

        this.dispatch.on('workflowitemdrop.workflow', eventArgs => {
            const droppedItem: Item = eventArgs.data.item;
            const droppedLevel: Level = eventArgs.data.level;

            // If dropped on a different level update the workflow
            if (droppedItem.level !== droppedLevel) {
                // Cannot drop on start or end levels
                if (droppedLevel.type !== LevelType.Start && droppedLevel.type !== LevelType.End) {
                    workflow.removeItemFromLevel(droppedItem.level, droppedItem);

                    if (droppedLevel.type === LevelType.Workflow) {
                        workflow.addItemToLevel(droppedLevel, droppedItem);
                    }

                    if (droppedLevel.type === LevelType.Intermediate) {
                        const previousLevel = workflow.getPreviousLevel(droppedLevel);
                        workflow.insertItemAfterLevel(previousLevel, droppedItem);
                    }
                }
            }

            this.render();
        });

        this.dispatch.on('workflowitemremoveclicked.workflow', eventArgs => {
            this.workflow.removeItemFromLevel(eventArgs.data.level, eventArgs.data);
            this.render();
        });
    }

    public render() {
        this.levelView.render();
        this.connectorView.render();
        this.itemView.render();

        this.canvas.attrs(this.getAttributes());
    }

    public getAttributes() {
        return {
            width: () => {
                return this.levelView.getTotalWidth();
            },
            height: () => {
                return this.levelView.getMaxLevelHeight();
            }
        };
    }
}
