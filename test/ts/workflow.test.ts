import { Workflow } from '../../src/ts/model/workflow';
import { WorkflowItem } from '../../src/ts/model/workflowItem';
import { expect } from 'chai';

describe('Workflow', () => {
    it('should initially have a start and end level', () => {
        let workflow = new Workflow();

        let levels = workflow.getLevels();

        expect(levels.length).to.equal(2);
    });

    describe('insertItem', () => {
        it('should be able to insert a workflow item after a given level', () => {
            let workflow = new Workflow();

            workflow.insertItemAfter(0, new WorkflowItem());

            let levels = workflow.getLevels();
            let level1Items = levels[1].items;

            expect(levels.length).to.equal(3);
            expect(level1Items.length).to.equal(1);
        });

        it('should not be able to insert item after end level', () => {
            let workflow = new Workflow();

            expect(() => workflow.insertItemAfter(1, new WorkflowItem())).to.throw();
        });

        it('should adjust connectors when no previous intermediate connection', () => {
            let workflow = new Workflow();

            workflow.insertItemAfter(0, new WorkflowItem());

            let connectors = workflow.getConnectors();

            expect(connectors.length).to.equal(2);
        });

        it('should adjust connectors when previous intermediate connection existed', () => {
            let workflow = new Workflow();

            workflow.insertItemAfter(0, new WorkflowItem());
            workflow.addItem(1, new WorkflowItem());
            workflow.addItem(1, new WorkflowItem());

            workflow.insertItemAfter(1, new WorkflowItem());
            workflow.addItem(2, new WorkflowItem());

            let connectors = workflow.getConnectors();

            expect(connectors.length).to.equal(10);

            workflow.insertItemAfter(1, new WorkflowItem());

            expect(connectors.length).to.equal(10);
        });
    });

    describe('addItem', () => {
        it('should be able to add a workflow item to a given level', () => {
            let workflow = new Workflow();

            workflow.insertItemAfter(0, new WorkflowItem());

            workflow.addItem(1, new WorkflowItem());

            let levels = workflow.getLevels();
            let level1Items = levels[1].items;

            expect(levels.length).to.equal(3);
            expect(level1Items.length).to.equal(2);
        });

        it('should not be able to add an item to start level', () => {
            let workflow = new Workflow();

            expect(() => workflow.addItem(0, new WorkflowItem())).to.throw();
        });

        it('should not be able to add an item to end level', () => {
            let workflow = new Workflow();

            expect(() => workflow.addItem(1, new WorkflowItem())).to.throw();
        });

        it('should not be able to add an item to a non existing level', () => {
            let workflow = new Workflow();

            expect(() => workflow.addItem(2, new WorkflowItem())).to.throw();
        });

        it('should adjust connectors when item is added to a level with a single item', () => {
            let workflow = new Workflow();

            workflow.insertItemAfter(0, new WorkflowItem());

            let connectors = workflow.getConnectors();

            expect(connectors.length).to.equal(2);

            workflow.addItem(1, new WorkflowItem());

            expect(connectors.length).to.equal(4);
        });

        it('should adjust connectors when item is added to a level with a multiple items', () => {
            let workflow = new Workflow();

            workflow.insertItemAfter(0, new WorkflowItem());
            workflow.addItem(1, new WorkflowItem());

            workflow.insertItemAfter(1, new WorkflowItem());
            workflow.addItem(2, new WorkflowItem());

            workflow.insertItemAfter(2, new WorkflowItem());
            workflow.addItem(3, new WorkflowItem());

            let connectors = workflow.getConnectors();

            expect(connectors.length).to.equal(12);

            workflow.addItem(2, new WorkflowItem());

            expect(connectors.length).to.equal(14);
        });
    });

    describe('removeItem', () => {
        it('should be able to remove a workflow item from a given level', () => {
            let workflow = new Workflow();

            let item1 = new WorkflowItem();
            let item2 = new WorkflowItem();
            let item3 = new WorkflowItem();

            workflow.insertItemAfter(0, item1);
            workflow.addItem(1, item2);
            workflow.addItem(1, item3);

            workflow.removeItem(1, item3);

            let levels = workflow.getLevels();
            let level1Items = levels[1].items;

            expect(levels.length).to.equal(3);
            expect(level1Items.length).to.equal(2);
        });

        it('should remove the level when the last item is removed form the level', () => {
            let workflow = new Workflow();

            let item1 = new WorkflowItem();
            let item2 = new WorkflowItem();
            let item3 = new WorkflowItem();

            workflow.insertItemAfter(0, item1);
            workflow.addItem(1, item2);

            let levels = workflow.getLevels();
            let level1Items = levels[1].items;
            expect(levels.length).to.equal(3);
            expect(level1Items.length).to.equal(2);

            workflow.removeItem(1, item1);
            workflow.removeItem(1, item2);

            levels = workflow.getLevels();

            expect(levels.length).to.equal(2);
        });

        it('should not be able to remove items from start level', () => {
            let workflow = new Workflow();

            let startLevel = workflow.getLevels()[0];
            let startItem = startLevel.items[0];

            expect(() => workflow.removeItem(0, startItem)).to.throw();
        });

        it('should not be able to remove items from end level', () => {
            let workflow = new Workflow();

            let endLevel = workflow.getLevels()[1];
            let endItem = endLevel.items[0];

            expect(() => workflow.removeItem(0, endItem)).to.throw();
        });

        it('should adjust connectors when item is removed', () => {
            let workflow = new Workflow();
            let removedItem = new WorkflowItem();

            workflow.insertItemAfter(0, new WorkflowItem());
            workflow.addItem(1, new WorkflowItem());
            workflow.addItem(1, removedItem);

            let connectors = workflow.getConnectors();

            expect(connectors.length).to.equal(6);

            workflow.removeItem(1, removedItem);

            expect(connectors.length).to.equal(4);
        });

        it('should adjust connectors when level is removed', () => {
            let workflow = new Workflow();
            let removedItem1 = new WorkflowItem();
            let removedItem2 = new WorkflowItem();

            workflow.insertItemAfter(0, new WorkflowItem());
            workflow.addItem(1, new WorkflowItem());

            workflow.insertItemAfter(1, removedItem1);
            workflow.addItem(2, removedItem2);

            workflow.insertItemAfter(2, new WorkflowItem());
            workflow.addItem(3, new WorkflowItem());

            let connectors = workflow.getConnectors();

            expect(connectors.length).to.equal(12);

            workflow.removeItem(2, removedItem1);
            workflow.removeItem(2, removedItem2);

            connectors = workflow.getConnectors();

            expect(connectors.length).to.equal(8);
        });
    });

    describe('getLevels', () => {
        it('should retrieve non intermediate levels', () => {
            let workflow = new Workflow();

            workflow.insertItemAfter(0, new WorkflowItem());
            workflow.insertItemAfter(1, new WorkflowItem());

            let levels = workflow.getLevels();

            expect(levels.length).to.equal(4);
        });
    });

    describe('move items - scenario 1 - 2 workflow levels with 2 items in each level', () => {
        it('should be able to remove item from first level', () => {
            let workflow = new Workflow();
            let item11 = new WorkflowItem();
            let item12 = new WorkflowItem();
            let item21 = new WorkflowItem();
            let item22 = new WorkflowItem();

            workflow.insertItemAfter(0, item11);
            workflow.addItem(1, item12);
            workflow.insertItemAfter(1, item21);
            workflow.addItem(2, item22);

            workflow.removeItem(1, item12);

            expect(workflow.getAllLevels().length).to.equal(7);
            expect(workflow.getAllItems().length).to.equal(5);
            expect(workflow.getConnectors().length).to.equal(5);
        });

        it('should be able to move item from first level to next level', () => {
            let workflow = new Workflow();
            let item11 = new WorkflowItem();
            let item12 = new WorkflowItem();
            let item21 = new WorkflowItem();
            let item22 = new WorkflowItem();

            workflow.insertItemAfter(0, item11);
            workflow.addItem(1, item12);
            workflow.insertItemAfter(1, item21);
            workflow.addItem(2, item22);

            workflow.removeItem(1, item12);
            workflow.addItem(2, item12);

            expect(workflow.getAllLevels().length).to.equal(7);
            expect(workflow.getAllItems().length).to.equal(6);
            expect(workflow.getConnectors().length).to.equal(7);
        });

        xit('should be able to move item from first level to before next level', () => {
            let workflow = new Workflow();
            let item11 = new WorkflowItem();
            let item12 = new WorkflowItem();
            let item21 = new WorkflowItem();
            let item22 = new WorkflowItem();

            workflow.insertItemAfter(0, item11);
            workflow.addItem(1, item12);
            workflow.insertItemAfter(1, item21);
            workflow.addItem(2, item22);

            workflow.removeItem(1, item12);
            workflow.insertItemAfter(1, item12);

            expect(workflow.getAllLevels().length).to.equal(9);
            expect(workflow.getAllItems().length).to.equal(6);
            expect(workflow.getConnectors().length).to.equal(6);
        });

        it('should be able to move item from first level to after next level', () => {
            let workflow = new Workflow();
            let item11 = new WorkflowItem();
            let item12 = new WorkflowItem();
            let item21 = new WorkflowItem();
            let item22 = new WorkflowItem();

            workflow.insertItemAfter(0, item11);
            workflow.addItem(1, item12);
            workflow.insertItemAfter(1, item21);
            workflow.addItem(2, item22);

            workflow.removeItem(1, item12);
            workflow.insertItemAfter(2, item12);

            expect(workflow.getAllLevels().length).to.equal(9);
            expect(workflow.getAllItems().length).to.equal(6);
            expect(workflow.getConnectors().length).to.equal(6);
        });
    });
});
