import { Item } from '../model/item';
import { ItemType } from '../model/itemType';
import { ItemView } from './itemView';

import { WorkflowDesignerConfig as config } from '../workflowDesignerConfig';

export class WorkflowItemRemove {
    public getSelector(): string {
        return 'rect.wd-workflow-item-remove'
    }

    public getAttributes() {
        return {
            x: (d: Item): number => {
                return ItemView.getItemWidth(d.type) - config.workflowItemRemoveWidth;
            },
            y: (d: Item): number => {
                return 0;
            },
            width: (d: Item): number => {
                return config.workflowItemRemoveWidth;
            },
            height: (d: Item): number => {
                return config.workflowItemRemoveHeight;
            },
            rx: (d: Item): number => {
                return config.workflowItemRemoveRadius;
            },
            ry: (d: Item): number => {
                return config.workflowItemRemoveRadius;
            },
            class: (d: Item): string => {
                return this.getClasses(d);
            }
        };
    }

    private getClasses(item: Item) {
        let result = 'wd-workflow-item-remove';

        if (item.type !== ItemType.Workflow) {
            result += ' wd-hidden';
        }

        return result;
    }
}
