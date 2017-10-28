import { Level } from './level';
import { LevelType } from './levelType';
import { Item } from './item';
import { ItemType } from './itemType';

export class EndLevel extends Level {

    constructor() {
        super();
        this.type = LevelType.End;
    }

    public AddItem(item: Item): void {
        if (item.GetType() !== ItemType.End) {
            throw 'Cannot add items other than end items';
        }

        if (this.items.length > 0) {
            throw 'Cannot contain more than one end item';
        }

        super.AddItem(item);
    }

    public RemoveItem(item: Item): void {
        throw 'Cannot remove items from the end level';
    }
}
