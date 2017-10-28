import { ItemType } from './itemType';
import { Level } from './level';
import * as v4 from 'uuid/v4';

export abstract class Item {
    protected _id: string;
    protected _type: ItemType;
    protected _level: Level;
    protected _title: string;

    constructor() {
        this._id = v4();
    }

    public get id() {
        return this._id;
    }

    public get level(): Level {
        return this._level;
    }

    public set level(level: Level) {
        this._level = level;
    }

    public get type(): ItemType {
        return this._type;
    }

    public get title() {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }
}
