import { Item } from './item';
import { ItemType } from './itemType';

export class WorkflowItem extends Item {
    constructor(id?: number) {
        super();

        this.id = id;
        this.type = ItemType.Workflow;
    }
}
