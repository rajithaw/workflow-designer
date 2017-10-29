/* tslint:disable:no-unused-expression */

import { WorkflowLevel } from '../../src/ts/model/workflowLevel';
import { LevelType } from '../../src/ts/model/levelType';
import { WorkflowItem } from '../../src/ts/model/workflowItem';
import { IntermediateItem } from '../../src/ts/model/intermediateItem';
import { expect } from 'chai';

describe('WorkflowLevel', () => {

    it('should generate id automatically', () => {
        let level = new WorkflowLevel();

        expect(level.id).to.exist;
    });

    it('should be type of workflow level', () => {
        let level = new WorkflowLevel();

        expect(level.type).to.equal(LevelType.Workflow);
    });

    describe('addItem', () => {
        it('should be able to add workflow items', () => {
            let level = new WorkflowLevel();

            level.addItem(new WorkflowItem());
            level.addItem(new WorkflowItem());

            expect(level.items.length).to.equal(2);
        });

        it('should not be able to add anything other than workflow items', () => {
            let item = new IntermediateItem();
            let level = new WorkflowLevel();

            expect(() => level.addItem(item)).to.throw();
        });
    });

    describe('removeItem', () => {
        it('shoud be able to remove items', () => {
            let level = new WorkflowLevel();
            let itemToRemove = new WorkflowItem();

            level.addItem(itemToRemove);
            level.addItem(new WorkflowItem());

            expect(level.items.length).to.equal(2);

            level.removeItem(itemToRemove);

            expect(level.items.length).to.equal(1);
        });

        it('shoud not remove if no matching item found', () => {
            let level = new WorkflowLevel();

            level.addItem(new WorkflowItem());
            level.addItem(new WorkflowItem());

            expect(level.items.length).to.equal(2);

            level.removeItem(new WorkflowItem());

            expect(level.items.length).to.equal(2);
        });
    });

    describe('removeItemById', () => {
        it('shoud be able to remove items by id', () => {
            let level = new WorkflowLevel();
            let itemToRemove = new WorkflowItem();

            level.addItem(itemToRemove);
            level.addItem(new WorkflowItem());

            expect(level.items.length).to.equal(2);

            level.removeItemById(itemToRemove.id);

            expect(level.items.length).to.equal(1);
        });
    });

    describe('hasItems', () => {
        it('should return true when level has items', () => {
            let level = new WorkflowLevel();

            level.addItem(new WorkflowItem());

            expect(level.hasItems).to.be.true
        });

        it('should return false when level does not have items', () => {
            let level = new WorkflowLevel();

            expect(level.hasItems).to.be.false;
        });
    })
});
