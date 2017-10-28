import { Item } from './item';
import { ItemType } from './itemType';

export class IntermediateItem extends Item {
    constructor() {
        super();
        this._type = ItemType.Intermediate;
    }
}
