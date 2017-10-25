import * as d3 from '../d3/d3.bundle';
import { Level } from '../model/level';

export class LevelData {
    private isMouseOver: boolean;

    constructor(private level: Level, private dispatch: any) {
        let _self = this;

        this.dispatch.on(`workflowitemdrag.${this.level.Id}`, function(eventArgs) {
            d3.select(`#level-${_self.level.Id}`).classed('transparent', !_self.IsMouseOver);
        });

        this.dispatch.on(`workflowitemdragend.${this.level.Id}`, function(eventArgs) {
            d3.select(`#level-${_self.level.Id}`).classed('transparent', true);

            this.dispatch.call('workflowitemdrop', _self, { data: { level: _self.level, item: eventArgs.data }})
        });
    }

    public GetLevel(): Level {
        return this.level;
    }

    get IsMouseOver(): boolean {
        return this.isMouseOver;
    }

    set IsMouseOver(value: boolean) {
        this.isMouseOver = value;
    }
}
