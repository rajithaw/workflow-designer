import { Workflow } from '../model/workflow';
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
