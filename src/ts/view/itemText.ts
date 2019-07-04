import { Item } from '../model/item';
import { ItemType } from '../model/itemType';

export class ItemText {
    public getSelector(): string {
        return 'text.wd-item-text';
    }

    public getAttributes() {
        return {
            x: (d: Item): number => {
                return 0;
            },
            y: (d: Item): number => {
                return 10;
            },
            class: (d: Item): string => {
                return this.getClasses(d);
            }
        };
    }

    public setText(d: Item): string {
        return d.title;
    }

    private getClasses(item: Item) {
        const result = 'wd-' + ItemType[item.type].toLocaleLowerCase() + '-item-text wd-item-text';

        return result;
    }
}
