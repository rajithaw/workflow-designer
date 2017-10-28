import { Item } from './item';
import { ItemType } from './itemType';

export class WorkflowItem extends Item {
    constructor(id?: string) {
        super();

        this._id = id || this._id;
        this._type = ItemType.Workflow;
    }
}
