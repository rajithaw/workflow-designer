import { Item } from './item';
import { ItemType } from './itemType';

export class StartItem extends Item {
    constructor() {
        super();
        this.type = ItemType.Start;
        this.title = 'Start';
    }
}
