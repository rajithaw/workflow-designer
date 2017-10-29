/* tslint:disable:no-unused-expression */

import { StartLevel } from '../../src/ts/model/startLevel';
import { LevelType } from '../../src/ts/model/levelType';
import { StartItem } from '../../src/ts/model/startItem';
import { WorkflowItem } from '../../src/ts/model/workflowItem';
import { expect } from 'chai';

describe('StartLevel', () => {

    it('should generate id automatically', () => {
        let level = new StartLevel();

        expect(level.id).to.exist;
    });

    it('should be type of start level', () => {
        let level = new StartLevel();

        expect(level.type).to.equal(LevelType.Start);
    });

    describe('addItem', () => {
        it('should be able to add a start item', () => {
            let item = new StartItem();
            let level = new StartLevel();

            level.addItem(item);

            expect(level.items.length).to.equal(1);
            expect(level.items[0]).to.equal(item);
        });

        it('should not be able to add more than one item', () => {
            let level = new StartLevel();

            level.addItem(new StartItem());

            expect(() => level.addItem(new StartItem())).to.throw();
        });

        it('should not be able to add anything other than start items', () => {
            let workflowItem = new WorkflowItem();
            let level = new StartLevel();

            expect(() => level.addItem(workflowItem)).to.throw();
        });
    });

    describe('removeItem', () => {
        it('shoud not be able to remove items', () => {
            let level = new StartLevel();

            expect(() => level.removeItem(new StartItem())).to.throw();
        });
    });
});
