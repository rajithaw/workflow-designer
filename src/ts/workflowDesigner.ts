import * as d3 from './d3/d3.bundle';
import { Workflow } from './model/workflow';
import { WorkflowItem } from './model/workflowItem';
import { WorkflowView } from './view/workflowView';
import { LevelView } from './view/levelView';
import { ItemView } from './view/itemView';
import { ItemBody } from './view/itemBody';
import { ConnectorView } from './view/connectorView';

export class WorkflowDesigner {
    private svg: any;
    private workflow: Workflow;
    private workflowView: WorkflowView;
    private dispatch: any;

    public init(containerId: string) {
        let container = d3.select(`#${containerId}`);

        this.dispatch = d3.dispatch('workflowitemdragstart', 'workflowitemdrag', 'workflowitemdragend', 'workflowitemdrop');
        this.svg = container.append('svg');

        this.workflow = new Workflow();
        this.workflowView = new WorkflowView(this.workflow, this.dispatch, this.svg);

        this.render();
    }

    public insertItem(level: number, title: string) {
        let item = new WorkflowItem();
        item.title = title;

        this.workflow.insertItemAfter(level, item);
        this.render();
    }

    public addItem(level: number, title: string) {
        let item = new WorkflowItem();
        item.title = title;

        this.workflow.addItem(level, item);
        this.render();
    }

    private render() {
        this.workflowView.render();
    }
}
