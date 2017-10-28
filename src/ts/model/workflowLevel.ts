import { Level } from './level';
import { LevelType } from './levelType';
import { Item } from './item';

export class WorkflowLevel extends Level {

    constructor() {
        super();
        this._type = LevelType.Workflow;
    }

    public removeItem(item: Item): void {
        let itemIndex = this._items.findIndex(x => x === item);
        this._items.splice(itemIndex, 1);
    }

    public RemoveItemById(itemId: string): void {
        let itemIndex = this._items.findIndex(x => x.id === itemId);
        this._items.splice(itemIndex, 1);
    }
}
