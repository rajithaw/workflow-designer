import { ItemType } from './itemType';
import { Level } from './level';

export abstract class Item {
    public id: number;
    protected type: ItemType;
    protected level: Level;
    protected title: string;

    public GetLevel(): Level {
        return this.level;
    }

    public SetLevel(level: Level) {
        this.level = level;
    }

    public GetType(): ItemType {
        return this.type;
    }

    public SetTitle(title: string) {
        this.title = title;
    }
}
