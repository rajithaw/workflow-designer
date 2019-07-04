/* tslint:disable:no-unused-expression */

import { ItemType } from '../../src/ts/model/itemType';
import { WorkflowItem } from '../../src/ts/model/workflowItem';

import { expect } from 'chai';

describe('EndItem', () => {
    it('should generate id automatically', () => {
        const item = new WorkflowItem();

        expect(item.id).to.exist;
    });

    it('should override auto generated if id is provided', () => {
        const itemId = '1234';
        const item = new WorkflowItem(itemId);

        expect(item.id).to.equal(itemId);
    });

    it('should be type of workflow item', () => {
        const item = new WorkflowItem();

        expect(item.type).to.equal(ItemType.Workflow);
    });
});
