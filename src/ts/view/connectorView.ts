import * as d3 from '../d3/d3.bundle';
import { Workflow } from '../model/workflow';
import { Item } from '../model/item';
import { ItemView } from './itemView';
import { Connector } from '../model/connector';
import { ConnectorData } from './connectorData';

export class ConnectorView {
    private itemView: ItemView;

    constructor(private workflow: Workflow, private dispatch: any, private canvas: any) {
        this.itemView = new ItemView(workflow, dispatch, canvas);
    }

    public Render() {
        let connectors = this.workflow.GetConnectors();
        let connectorViews = this.canvas.selectAll(this.GetSelector()).data(this.GetConnectorData(connectors));

        connectorViews.enter().append('path').merge(connectorViews).attrs(this.GetAttributes());
        connectorViews.exit().remove();
    }

    public GetConnectorData(connectors: Connector[]): ConnectorData[] {
        let result = [];

        connectors.forEach((connector) => {
            result.push(new ConnectorData(connector, this.dispatch));
        });

        return result;
    }

    public GetSelector(): string {
        return 'path.wd-connector';
    }

    public GetAttributes() {
        return {
            id: (d: ConnectorData) => {
                return `connector-${d.GetConnector().Id}`;
            },
            d: d3.linkHorizontal().source((d) => {
                    return [this.GetSourceX((<any>d).GetConnector().source), this.GetConnectorY((<any>d).GetConnector().source)];
                }).target((d) => {
                    return [this.GetTargetX((<any>d).GetConnector().target), this.GetConnectorY((<any>d).GetConnector().target)];
                }),
            class: (d: ConnectorData): string => {
                return this.GetClasses(d);
            }
        }
    }

    private GetClasses(d: ConnectorData) {
        return 'wd-connector';
    }

    private GetSourceX(source) {
        let itemX = this.itemView.GetTranslateX(source);
        let itemWidth = ItemView.GetItemWidth(source.GetType());

        return itemX + itemWidth;
    }

    private GetTargetX(target) {
        let itemX = this.itemView.GetTranslateX(target);
        let itemWidth = ItemView.GetItemWidth(target.GetType());

        return itemX;
    }

    private GetConnectorY(item) {
        let itemY = this.itemView.GetTranslateY(item);
        let itemHeight = ItemView.GetItemHeight(item.GetType());

        return itemY + (itemHeight / 2);
    }
}
