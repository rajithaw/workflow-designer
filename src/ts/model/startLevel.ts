import { Item } from './item';
import { ItemType } from './itemType';
import { Level } from './level';
import { LevelType } from './levelType';

export class StartLevel extends Level {

    constructor() {
        super();
        this._type = LevelType.Start;
    }

    public addItem(item: Item): void {
        if (item.type !== ItemType.Start) {
            throw Error('Cannot add items other than start items');
        }

        if (this._items.length > 0) {
            throw Error('Cannot contain more than one start item');
        }

        super.addItem(item);
    }

    public removeItem(item: Item): void {
        throw Error('Cannot remove items from the start level');
    }
}
