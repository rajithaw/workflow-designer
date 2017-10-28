import { Item } from './item';
import * as v4 from 'uuid/v4';

export class Connector {
    private _id: string;

    constructor(private _source: Item, private _target: Item) {
        this._id = v4()
    }

    public get id() {
        return this._id;
    }

    public get source(): Item {
        return this._source;
    }

    public set source(source: Item) {
        this._source = source;
    }

    public get target(): Item {
        return this._target;
    }

    public set target(target: Item) {
        this._target = target;
    }
}
