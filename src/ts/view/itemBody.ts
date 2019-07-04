import { Item } from '../model/item';
import { ItemType } from '../model/itemType';
import { ItemView } from './itemView';
import { WorkflowDesignerConfig as config } from '../workflowDesignerConfig';

export class ItemBody {
    public getSelector(): string {
        return 'rect.wd-item';
    }

    public getAttributes() {
        return {
            width: (d: Item): number => {
                return ItemView.getItemWidth(d.type);
            },
            height: (d: Item): number => {
                return ItemView.getItemHeight(d.type);
            },
            rx: (d: Item): number => {
                return this.getItemRadius(d.type);
            },
            ry: (d: Item): number => {
                return this.getItemRadius(d.type);
            },
            class: (d: Item): string => {
                return this.getClasses(d);
            }
        };
    }

    private getClasses(item: Item) {
        const result = 'wd-' + ItemType[item.type].toLocaleLowerCase() + '-item wd-item';

        return result;
    }

    private getItemRadius(itemType: ItemType) {
        switch (itemType) {
            case ItemType.Start:
                return config.startItemRadius;
            case ItemType.Workflow:
                return config.workflowItemRadius;
            case ItemType.Intermediate:
                return config.intermediateItemRadius;
            case ItemType.End:
                return config.endItemRadius;
            default:
                return 0;
        }
    }
}
