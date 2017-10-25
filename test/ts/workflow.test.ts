import { Workflow } from '../../src/ts/model/workflow';
import { WorkflowItem } from '../../src/ts/model/workflowItem';
import { expect } from 'chai';

describe('Workflow', () => {
    it('should initially have a start and end level', () => {
        let workflow = new Workflow();

        let levels = workflow.GetLevels();

        expect(levels.length).to.equal(2);
    });

    describe('InsertItem', () => {
        it('should be able to insert a workflow item after a given level', () => {
            let workflow = new Workflow();

            workflow.InsertItemAfter(0, new WorkflowItem());

            let levels = workflow.GetLevels();
            let level1Items = levels[1].GetItems();

            expect(levels.length).to.equal(3);
            expect(level1Items.length).to.equal(1);
        });

        it('should not be able to insert item after end level', () => {
            let workflow = new Workflow();

            expect(() => workflow.InsertItemAfter(1, new WorkflowItem())).to.throw();
        });

        it('should adjust connectors when no previous intermediate connection', () => {
            let workflow = new Workflow();

            workflow.InsertItemAfter(0, new WorkflowItem());

            let connectors = workflow.GetConnectors();

            expect(connectors.length).to.equal(2);
        });

        it('should adjust connectors when previous intermediate connection existed', () => {
            let workflow = new Workflow();

            workflow.InsertItemAfter(0, new WorkflowItem());
            workflow.AddItem(1, new WorkflowItem());
            workflow.AddItem(1, new WorkflowItem());

            workflow.InsertItemAfter(1, new WorkflowItem());
            workflow.AddItem(2, new WorkflowItem());

            let connectors = workflow.GetConnectors();

            expect(connectors.length).to.equal(10);

            workflow.InsertItemAfter(1, new WorkflowItem());

            expect(connectors.length).to.equal(10);
        });
    });

    describe('AddItem', () => {
        it('should be able to add a workflow item to a given level', () => {
            let workflow = new Workflow();

            workflow.InsertItemAfter(0, new WorkflowItem());

            workflow.AddItem(1, new WorkflowItem());

            let levels = workflow.GetLevels();
            let level1Items = levels[1].GetItems();

            expect(levels.length).to.equal(3);
            expect(level1Items.length).equal(2);
        });

        it('should not be able to add an item to start level', () => {
            let workflow = new Workflow();

            expect(() => workflow.AddItem(0, new WorkflowItem())).to.throw();
        });

        it('should not be able to add an item to end level', () => {
            let workflow = new Workflow();

            expect(() => workflow.AddItem(1, new WorkflowItem())).to.throw();
        });

        it('should not be able to add an item to a non existing level', () => {
            let workflow = new Workflow();

            expect(() => workflow.AddItem(2, new WorkflowItem())).to.throw();
        })

        it('should adjust connectors when item is added to a level with a single item', () => {
            let workflow = new Workflow();

            workflow.InsertItemAfter(0, new WorkflowItem());

            let connectors = workflow.GetConnectors();

            expect(connectors.length).to.equal(2);

            workflow.AddItem(1, new WorkflowItem());

            expect(connectors.length).to.equal(4);
        });

        it('should adjust connectors when item is added to a level with a multiple items', () => {
            let workflow = new Workflow();

            workflow.InsertItemAfter(0, new WorkflowItem());
            workflow.AddItem(1, new WorkflowItem());

            workflow.InsertItemAfter(1, new WorkflowItem());
            workflow.AddItem(2, new WorkflowItem());

            workflow.InsertItemAfter(2, new WorkflowItem());
            workflow.AddItem(3, new WorkflowItem());

            let connectors = workflow.GetConnectors();

            expect(connectors.length).to.equal(12);

            workflow.AddItem(2, new WorkflowItem());

            expect(connectors.length).to.equal(14);
        });
    });

    describe('RemoveItem', () => {
        it('should be able to remove a workflow item from a given level', () => {
            let workflow = new Workflow();

            let item1 = new WorkflowItem(1);
            let item2 = new WorkflowItem(2);
            let item3 = new WorkflowItem(3);

            workflow.InsertItemAfter(0, item1);
            workflow.AddItem(1, item2);
            workflow.AddItem(1, item3);

            workflow.RemoveItem(1, item3);

            let levels = workflow.GetLevels();
            let level1Items = levels[1].GetItems();

            expect(levels.length).to.equal(3);
            expect(level1Items.length).equal(2);
        });

        it('should remove the level when the last item is removed form the level', () => {
            let workflow = new Workflow();

            let item1 = new WorkflowItem(1);
            let item2 = new WorkflowItem(2);
            let item3 = new WorkflowItem(3);

            workflow.InsertItemAfter(0, item1);
            workflow.AddItem(1, item2);

            let levels = workflow.GetLevels();
            let level1Items = levels[1].GetItems();
            expect(levels.length).to.equal(3);
            expect(level1Items.length).equal(2);

            workflow.RemoveItem(1, item1);
            workflow.RemoveItem(1, item2);

            levels = workflow.GetLevels();

            expect(levels.length).to.equal(2);
        });

        it('should not be able to remove items from start level', () => {
            let workflow = new Workflow();

            let startLevel = workflow.GetLevels()[0];
            let startItem = startLevel.GetItems()[0];

            expect(() => workflow.RemoveItem(0, startItem)).to.throw();
        });

        it('should not be able to remove items from end level', () => {
            let workflow = new Workflow();

            let endLevel = workflow.GetLevels()[1];
            let endItem = endLevel.GetItems()[0];

            expect(() => workflow.RemoveItem(0, endItem)).to.throw();
        });

        it('should adjust connectors when item is removed', () => {
            let workflow = new Workflow();
            let removedItem = new WorkflowItem();

            workflow.InsertItemAfter(0, new WorkflowItem());
            workflow.AddItem(1, new WorkflowItem());
            workflow.AddItem(1, removedItem);

            let connectors = workflow.GetConnectors();

            expect(connectors.length).to.equal(6);

            workflow.RemoveItem(1, removedItem);

            expect(connectors.length).to.equal(4);
        });

        it('should adjust connectors when level is removed', () => {
            let workflow = new Workflow();
            let removedItem1 = new WorkflowItem();
            let removedItem2 = new WorkflowItem();

            workflow.InsertItemAfter(0, new WorkflowItem());
            workflow.AddItem(1, new WorkflowItem());

            workflow.InsertItemAfter(1, removedItem1);
            workflow.AddItem(2, removedItem2);

            workflow.InsertItemAfter(2, new WorkflowItem());
            workflow.AddItem(3, new WorkflowItem());

            let connectors = workflow.GetConnectors();

            expect(connectors.length).to.equal(12);

            workflow.RemoveItem(2, removedItem1);
            workflow.RemoveItem(2, removedItem2);

            connectors = workflow.GetConnectors();

            expect(connectors.length).to.equal(8);
        });
    });

    describe('GetLevels', () => {
        it('should retrieve non intermediate levels', () => {
            let workflow = new Workflow();

            workflow.InsertItemAfter(0, new WorkflowItem());
            workflow.InsertItemAfter(1, new WorkflowItem());

            let levels = workflow.GetLevels();

            expect(levels.length).to.equal(4);
        });
    });
});
