import { Level } from './level';
import { LevelType } from './levelType';
import { Item } from './item';
import { ItemType } from './itemType';

export class EndLevel extends Level {

    constructor() {
        super();
        this._type = LevelType.End;
    }

    public addItem(item: Item): void {
        if (item.type !== ItemType.End) {
            throw 'Cannot add items other than end items';
        }

        if (this._items.length > 0) {
            throw 'Cannot contain more than one end item';
        }

        super.addItem(item);
    }

    public removeItem(item: Item): void {
        throw 'Cannot remove items from the end level';
    }
}
