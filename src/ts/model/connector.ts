import { Item } from './item';
import * as v4 from 'uuid/v4';

export class Connector {
    private id: string;

    constructor(private source: Item, private target: Item) {
        this.id = v4()
    }

    public get Id() {
        return this.id;
    }

    public GetSource(): Item {
        return this.source;
    }

    public GetTarget(): Item {
        return this.target;
    }

    public SetSource(source: Item) {
        this.source = source;
    }

    public SetTarget(target: Item) {
        this.target = target;
    }
}
