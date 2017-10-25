import { Item } from './item';
import { ItemType } from './itemType';

export class EndItem extends Item {
    constructor() {
        super();
        this.type = ItemType.End;
        this.title = 'End';
    }
}
