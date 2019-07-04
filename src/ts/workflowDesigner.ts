import * as d3 from './d3/d3.bundle';
import { Workflow } from './model/workflow';
import { WorkflowItem } from './model/workflowItem';
import { WorkflowView } from './view/workflowView';

export class WorkflowDesigner {
    private svg: any;
    private workflow: Workflow;
    private workflowView: WorkflowView;
    private dispatch: any;

    public init(containerId: string) {
        const container = d3.select(`#${containerId}`);

        this.dispatch = d3.dispatch('workflowitemdragstart', 'workflowitemdrag', 'workflowitemdragend',
            'workflowitemdrop', 'workflowitemremoveclicked');
        this.svg = container.append('svg');

        this.workflow = new Workflow();
        this.workflowView = new WorkflowView(this.workflow, this.dispatch, this.svg);

        this.render();
    }

    public insertItem(level: number, title: string) {
        const item = new WorkflowItem();
        item.title = title;

        this.workflow.insertItemAfter(level, item);
        this.render();
    }

    public addItem(level: number, title: string) {
        const item = new WorkflowItem();
        item.title = title;

        this.workflow.addItem(level, item);
        this.render();
    }

    private render() {
        this.workflowView.render();
    }
}
