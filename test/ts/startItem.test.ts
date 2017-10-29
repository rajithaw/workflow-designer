/* tslint:disable:no-unused-expression */

import { StartItem } from '../../src/ts/model/startItem';
import { ItemType } from '../../src/ts/model/itemType';
import { expect } from 'chai';

describe('EndItem', () => {
    it('should generate id automatically', () => {
        let item = new StartItem();

        expect(item.id).to.exist;
    });

    it('should be type of start item', () => {
        let item = new StartItem();

        expect(item.type).to.equal(ItemType.Start);
    });
});
