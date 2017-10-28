import { Level } from './level';
import { LevelType } from './levelType';
import { Item } from './item';
import { ItemType } from './itemType';

export class StartLevel extends Level {

    constructor() {
        super();
        this.type = LevelType.Start;
    }

    public AddItem(item: Item): void {
        if (item.GetType() !== ItemType.Start) {
            throw 'Cannot add items other than start items';
        }

        if (this.items.length > 0) {
            throw 'Cannot contain more than one start item';
        }

        super.AddItem(item);
    }

    public RemoveItem(item: Item): void {
        throw 'Cannot remove items from the start level';
    }
}
