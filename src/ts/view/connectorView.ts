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

    public render() {
        let connectors = this.workflow.getConnectors();
        let connectorViews = this.canvas.selectAll(this.getSelector()).data(this.getConnectorData(connectors));

        connectorViews.enter().append('path').merge(connectorViews).attrs(this.getAttributes());
        connectorViews.exit().remove();
    }

    public getConnectorData(connectors: Connector[]): ConnectorData[] {
        let result = [];

        connectors.forEach((connector) => {
            result.push(new ConnectorData(connector, this.dispatch));
        });

        return result;
    }

    public getSelector(): string {
        return 'path.wd-connector';
    }

    public getAttributes() {
        return {
            id: (d: ConnectorData) => {
                return `connector-${d.connector.id}`;
            },
            d: d3.linkHorizontal().source((d: any) => {
                    return [this.getSourceX((<ConnectorData>d).connector.source),
                        this.getConnectorY((<ConnectorData>d).connector.source)];
                }).target((d: any) => {
                    return [this.getTargetX((<ConnectorData>d).connector.target),
                        this.getConnectorY((<ConnectorData>d).connector.target)];
                }),
            class: (d: ConnectorData): string => {
                return this.getClasses(d);
            }
        };
    }

    private getClasses(d: ConnectorData) {
        return 'wd-connector';
    }

    private getSourceX(source: Item) {
        let itemX = this.itemView.getTranslateX(source);
        let itemWidth = ItemView.getItemWidth(source.type);

        return itemX + itemWidth;
    }

    private getTargetX(target: Item) {
        let itemX = this.itemView.getTranslateX(target);
        let itemWidth = ItemView.getItemWidth(target.type);

        return itemX;
    }

    private getConnectorY(item: Item) {
        let itemY = this.itemView.getTranslateY(item);
        let itemHeight = ItemView.getItemHeight(item.type);

        return itemY + (itemHeight / 2);
    }
}
