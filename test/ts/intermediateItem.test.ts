/* tslint:disable:no-unused-expression */

import { IntermediateItem } from '../../src/ts/model/intermediateItem';
import { ItemType } from '../../src/ts/model/itemType';
import { expect } from 'chai';

describe('EndItem', () => {
    it('should generate id automatically', () => {
        let item = new IntermediateItem();

        expect(item.id).to.exist;
    });

    it('should be type of intermediate item', () => {
        let item = new IntermediateItem();

        expect(item.type).to.equal(ItemType.Intermediate);
    });
});
