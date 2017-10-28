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
            let droppedItem: Item = eventArgs.data.item;
            let droppedLevel: Level = eventArgs.data.level;

            // If dropped on a different level update the workflow
            if (droppedItem.GetLevel() !== droppedLevel) {
                // Cannot drop on start or end levels
                if (droppedLevel.GetType() !== LevelType.Start && droppedLevel.GetType() !== LevelType.End) {
                    workflow.RemoveItemFromLevel(droppedItem.GetLevel(), droppedItem);

                    if (droppedLevel.GetType() === LevelType.Workflow) {
                        workflow.AddItemToLevel(droppedLevel, droppedItem);
                    }

                    if (droppedLevel.GetType() === LevelType.Intermediate) {
                        let previousLevel = workflow.GetPreviousLevel(droppedLevel);
                        workflow.InsertItemAfterLevel(previousLevel, droppedItem);
                    }
                }
            }

            this.Render();
        })
    }

    public Render() {
        this.levelView.Render();
        this.connectorView.Render();
        this.itemView.Render();

        this.canvas.attrs(this.GetAttributes());
    }

    public GetAttributes() {
        return {
            width: () => {
                let result = 0;
                return this.levelView.GetTotalWidth();
            },
            height: () => {
                return this.levelView.GetMaxLevelHeight();
            }
        }
    }
}
