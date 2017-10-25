import * as d3 from '../d3/d3.bundle';
import { Connector } from '../model/connector';

export class ConnectorData {

    constructor(private connector: Connector, private dispatch: any) {
        let _self = this;

        this.dispatch.on(`workflowitemdragstart.${this.connector.Id}`, function(eventArgs) {
            let item = eventArgs.data;
            let sourceItem = _self.connector.GetSource();
            let targetItem = _self.connector.GetTarget();

            if (item === sourceItem || item === targetItem) {
                d3.select(`#connector-${_self.connector.Id}`).classed('transparent', true);
            }
        });

        this.dispatch.on(`workflowitemdragend.${this.connector.Id}`, function(eventArgs) {
            let item = eventArgs.data;
            let sourceItem = _self.connector.GetSource();
            let targetItem = _self.connector.GetTarget();

            if (item === sourceItem || item === targetItem) {
                d3.select(`#connector-${_self.connector.Id}`).classed('transparent', false);
            }
        });
    }

    public GetConnector(): Connector {
        return this.connector;
    }
}
