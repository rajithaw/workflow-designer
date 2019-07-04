import * as d3 from '../d3/d3.bundle';
import { Connector } from '../model/connector';
import { ConnectorData } from './connectorData';
import { Item } from '../model/item';
import { ItemView } from './itemView';
import { Workflow } from '../model/workflow';

export class ConnectorView {
    private itemView: ItemView;

    constructor(private workflow: Workflow, private dispatch: any, private canvas: any) {
        this.itemView = new ItemView(workflow, dispatch, canvas);
    }

    public render() {
        const connectors = this.workflow.getConnectors();
        const connectorViews = this.canvas.selectAll(this.getSelector()).data(this.getConnectorData(connectors));

        connectorViews.enter().append('path').merge(connectorViews).attrs(this.getAttributes());
        connectorViews.exit().remove();
    }

    public getConnectorData(connectors: Connector[]): ConnectorData[] {
        const result = [];

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
                    return [this.getSourceX((d as ConnectorData).connector.source),
                        this.getConnectorY((d as ConnectorData).connector.source)];
                }).target((d: any) => {
                    return [this.getTargetX((d as ConnectorData).connector.target),
                        this.getConnectorY((d as ConnectorData).connector.target)];
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
        const itemX = this.itemView.getTranslateX(source);
        const itemWidth = ItemView.getItemWidth(source.type);

        return itemX + itemWidth;
    }

    private getTargetX(target: Item) {
        const itemX = this.itemView.getTranslateX(target);

        return itemX;
    }

    private getConnectorY(item: Item) {
        const itemY = this.itemView.getTranslateY(item);
        const itemHeight = ItemView.getItemHeight(item.type);

        return itemY + (itemHeight / 2);
    }
}
