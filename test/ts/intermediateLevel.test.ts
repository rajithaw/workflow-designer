/* tslint:disable:no-unused-expression */

import { IntermediateItem } from '../../src/ts/model/intermediateItem';
import { IntermediateLevel } from '../../src/ts/model/intermediateLevel';
import { LevelType } from '../../src/ts/model/levelType';
import { WorkflowItem } from '../../src/ts/model/workflowItem';

import { expect } from 'chai';

describe('StartLevel', () => {

    it('should generate id automatically', () => {
        const level = new IntermediateLevel();

        expect(level.id).to.exist;
    });

    it('should be type of intermediate level', () => {
        const level = new IntermediateLevel();

        expect(level.type).to.equal(LevelType.Intermediate);
    });

    describe('addItem', () => {
        it('should be able to add an intermediate item', () => {
            const item = new IntermediateItem();
            const level = new IntermediateLevel();

            level.addItem(item);

            expect(level.items.length).to.equal(1);
            expect(level.items[0]).to.equal(item);
        });

        it('should not be able to add more than one item', () => {
            const level = new IntermediateLevel();

            level.addItem(new IntermediateItem());

            expect(() => level.addItem(new IntermediateItem())).to.throw();
        });

        it('should not be able to add anything other than intermediate items', () => {
            const workflowItem = new WorkflowItem();
            const level = new IntermediateLevel();

            expect(() => level.addItem(workflowItem)).to.throw();
        });
    });

    describe('removeItem', () => {
        it('shoud be able to remove items', () => {
            const level = new IntermediateLevel();

            level.addItem(new IntermediateItem());

            expect(level.items.length).to.equal(1);

            level.removeItem(null);

            expect(level.items.length).to.equal(0);
        });
    });
});
