/* tslint:disable:no-unused-expression */

import { EndItem } from '../../src/ts/model/endItem';
import { EndLevel } from '../../src/ts/model/endLevel';
import { LevelType } from '../../src/ts/model/levelType';
import { WorkflowItem } from '../../src/ts/model/workflowItem';

import { expect } from 'chai';

describe('EndLevel', () => {

    it('should generate id automatically', () => {
        const level = new EndLevel();

        expect(level.id).to.exist;
    });

    it('should be type of end level', () => {
        const level = new EndLevel();

        expect(level.type).to.equal(LevelType.End);
    });

    describe('addItem', () => {
        it('should be able to add an end item', () => {
            const item = new EndItem();
            const level = new EndLevel();

            level.addItem(item);

            expect(level.items.length).to.equal(1);
            expect(level.items[0]).to.equal(item);
        });

        it('should not be able to add more than one item', () => {
            const level = new EndLevel();

            level.addItem(new EndItem());

            expect(() => level.addItem(new EndItem())).to.throw();
        });

        it('should not be able to add anything other than end items', () => {
            const item = new WorkflowItem();
            const level = new EndLevel();

            expect(() => level.addItem(item)).to.throw();
        });
    });

    describe('removeItem', () => {
        it('shoud not be able to remove items', () => {
            const level = new EndLevel();

            expect(() => level.removeItem(new EndItem())).to.throw();
        });
    });
});
