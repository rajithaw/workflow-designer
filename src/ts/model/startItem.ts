import { Item } from './item';
import { ItemType } from './itemType';

export class StartItem extends Item {
    constructor() {
        super();
        this._type = ItemType.Start;
        this._title = 'Start';
    }
}
