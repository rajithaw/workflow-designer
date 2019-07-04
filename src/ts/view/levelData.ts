import * as d3 from '../d3/d3.bundle';
import { Level } from '../model/level';

export class LevelData {
    private _isMouseOver: boolean;

    constructor(private _level: Level, private dispatch: any) {
        const _self = this;

        this.dispatch.on(`workflowitemdrag.${this._level.id}`, () => {
            d3.select(`#level-${_self._level.id}`).classed('wd-transparent', !_self.isMouseOver);
        });

        this.dispatch.on(`workflowitemdragend.${this._level.id}`, (eventArgs) => {
            d3.select(`#level-${_self._level.id}`).classed('wd-transparent', true);

            if (_self.isMouseOver) {
                this.dispatch.call('workflowitemdrop', _self, { data: { level: _self._level, item: eventArgs.data }});
            }
        });
    }

    public get level(): Level {
        return this._level;
    }

    public get isMouseOver(): boolean {
        return this._isMouseOver;
    }

    public set isMouseOver(value: boolean) {
        this._isMouseOver = value;
    }
}
