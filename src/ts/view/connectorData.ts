import * as d3 from '../d3/d3.bundle';
import { Connector } from '../model/connector';

export class ConnectorData {

    constructor(private _connector: Connector, private dispatch: any) {
        const _self = this;

        this.dispatch.on(`workflowitemdragstart.${this._connector.id}`, eventArgs => {
            const item = eventArgs.data;
            const sourceItem = _self._connector.source;
            const targetItem = _self._connector.target;

            if (item === sourceItem || item === targetItem) {
                d3.select(`#connector-${_self._connector.id}`).classed('wd-transparent', true);
            }
        });

        this.dispatch.on(`workflowitemdragend.${this._connector.id}`, eventArgs => {
            const item = eventArgs.data;
            const sourceItem = _self._connector.source;
            const targetItem = _self._connector.target;

            if (item === sourceItem || item === targetItem) {
                d3.select(`#connector-${_self._connector.id}`).classed('wd-transparent', false);
            }
        });
    }

    public get connector(): Connector {
        return this._connector;
    }
}
