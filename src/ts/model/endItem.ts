import { Item } from './item';
import { ItemType } from './itemType';

export class EndItem extends Item {
    constructor() {
        super();
        this._type = ItemType.End;
        this._title = 'End';
    }
}
