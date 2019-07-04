/* tslint:disable:no-unused-expression */

import { ItemType } from '../../src/ts/model/itemType';
import { StartItem } from '../../src/ts/model/startItem';

import { expect } from 'chai';

describe('EndItem', () => {
    it('should generate id automatically', () => {
        const item = new StartItem();

        expect(item.id).to.exist;
    });

    it('should be type of start item', () => {
        const item = new StartItem();

        expect(item.type).to.equal(ItemType.Start);
    });
});
