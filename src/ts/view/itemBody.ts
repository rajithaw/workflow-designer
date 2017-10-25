import { Item } from '../model/item';
import { ItemType } from '../model/itemType';
import { ItemView } from './itemView';
import { WorkflowDesignerConfig as config } from '../workflowDesignerConfig';

export class ItemBody {
    public GetSelector(): string {
        return 'rect.wd-item';
    }

    public GetAttributes() {
        return {
            width: (d: Item): number => {
                return ItemView.GetItemWidth(d.GetType());
            },
            height: (d: Item): number => {
                return ItemView.GetItemHeight(d.GetType());
            },
            rx: (d: Item): number => {
                return this.GetItemRadius(d.GetType());
            },
            ry: (d: Item): number => {
                return this.GetItemRadius(d.GetType());
            },
            class: (d: Item): string => {
                return this.GetClasses(d);
            }
        };
    }

    private GetClasses(item: Item) {
        let result = 'wd-' + ItemType[item.GetType()].toLocaleLowerCase() + '-item wd-item';

        return result;
    }

    private GetItemRadius(itemType: ItemType) {
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
