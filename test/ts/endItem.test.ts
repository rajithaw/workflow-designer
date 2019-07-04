/* tslint:disable:no-unused-expression */

import { EndItem } from '../../src/ts/model/endItem';
import { ItemType } from '../../src/ts/model/itemType';

import { expect } from 'chai';

describe('EndItem', () => {
    it('should generate id automatically', () => {
        const item = new EndItem();

        expect(item.id).to.exist;
    });

    it('should be type of end item', () => {
        const item = new EndItem();

        expect(item.type).to.equal(ItemType.End);
    });
});
