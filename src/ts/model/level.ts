import { LevelType } from './levelType';
import { Item } from './item';
import * as v4 from 'uuid/v4';

export abstract class Level {
    protected items: Item [];
    protected type: LevelType;
    protected id: string;

    constructor() {
        this.items = [];
        this.id = v4()
    }

    public abstract RemoveItem(item: Item): void;

    public get Id() {
        return this.id;
    }

    public AddItem(item: Item): void {
        item.SetLevel(this);
        this.items.push(item);
    }

    public GetType(): LevelType {
        return this.type;
    }

    public HasItems(): boolean {
        return this.items.length > 0;
    }

    public GetItems(): Item[] {
        return this.items;
    }
}
