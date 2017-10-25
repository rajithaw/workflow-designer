import { Level } from './level';
import { LevelType } from './levelType';
import { Item } from './item';
import { ItemType } from './itemType';

export class IntermediateLevel extends Level {

    constructor() {
        super();
        this.type = LevelType.Intermediate;
    }

    public AddItem(item: Item): void {
        if (item.GetType() !== ItemType.Intermediate) {
            throw 'Cannot add items other than intermediate items';
        }

        if (this.items.length > 0) {
            throw 'Cannot contain more than one intermediate item';
        }

        super.AddItem(item);
    }

    public RemoveItem(itemId: number): void {
        this.items.pop();
    }
}
