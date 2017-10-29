/* tslint:disable:no-unused-expression */

import { WorkflowItem } from '../../src/ts/model/workflowItem';
import { ItemType } from '../../src/ts/model/itemType';
import { expect } from 'chai';

describe('EndItem', () => {
    it('should generate id automatically', () => {
        let item = new WorkflowItem();

        expect(item.id).to.exist;
    });

    it('should override auto generated if id is provided', () => {
        let itemId = '1234';
        let item = new WorkflowItem(itemId);

        expect(item.id).to.equal(itemId);
    });

    it('should be type of workflow item', () => {
        let item = new WorkflowItem();

        expect(item.type).to.equal(ItemType.Workflow);
    });
});
