import { LevelType } from './levelType';
import { Item } from './item';
import * as v4 from 'uuid/v4';

export abstract class Level {
    protected _items: Item [];
    protected _type: LevelType;
    protected _id: string;

    constructor() {
        this._items = [];
        this._id = v4();
    }

    public abstract removeItem(item: Item): void;

    public get id() {
        return this._id;
    }

    public addItem(item: Item): void {
        item.level = this;
        this._items.push(item);
    }

    public get type(): LevelType {
        return this._type;
    }

    public get hasItems(): boolean {
        return this._items.length > 0;
    }

    public get items(): Item[] {
        return this._items;
    }
}
