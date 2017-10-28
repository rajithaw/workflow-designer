import { Level } from './level';
import { LevelType } from './levelType';
import { Item } from './item';

export class WorkflowLevel extends Level {

    constructor() {
        super();
        this.type = LevelType.Workflow;
    }

    public RemoveItem(item: Item): void {
        let itemIndex = this.items.findIndex(x => x === item);
        this.items.splice(itemIndex, 1);
    }

    public RemoveItemById(itemId: number): void {
        let itemIndex = this.items.findIndex(x => x.id === itemId);
        this.items.splice(itemIndex, 1);
    }
}
