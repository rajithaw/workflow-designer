import { Item } from './item';
import { ItemType } from './itemType';
import { Level } from './level';
import { LevelType } from './levelType';

export class WorkflowLevel extends Level {

    constructor() {
        super();
        this._type = LevelType.Workflow;
    }

    public addItem(item: Item): void {
        if (item.type !== ItemType.Workflow) {
            throw Error('Cannot add items other than workflow items');
        }

        super.addItem(item);
    }

    public removeItem(item: Item): void {
        const itemIndex = this._items.findIndex(x => x === item);
        this.removeItemAtIndex(itemIndex);
    }

    public removeItemById(itemId: string): void {
        const itemIndex = this._items.findIndex(x => x.id === itemId);
        this.removeItemAtIndex(itemIndex);
    }

    private removeItemAtIndex(index: number) {
        if (index >= 0) {
            this._items.splice(index, 1);
        }
    }
}
