import * as d3 from '../d3/d3.bundle';
import { event as currentEvent } from 'd3-selection';
import { Workflow } from '../model/workflow';
import { Item } from '../model/item';
import { ItemType } from '../model/itemType';
import { LevelView } from './levelView';
import { ItemBody } from './itemBody';
import { WorkflowDesignerConfig as config } from '../workflowDesignerConfig';

export class ItemView {

    private levelView: LevelView;

    constructor(private workflow: Workflow, private dispatch: any, private canvas: any) {
        this.levelView = new LevelView(workflow, dispatch, canvas);
    }

    public render() {
        let items = this.workflow.getAllItems();
        let itemBody = new ItemBody();

        let itemViews = this.canvas.selectAll(this.getSelector()).data(items);
        let updated = itemViews.enter().append('g').merge(itemViews).attrs(this.getAttributes())
            .call(this.setupDrag());
        itemViews.exit().remove();

        updated.select(itemBody.getSelector()).remove();
        updated.append('rect').attrs(itemBody.getAttributes());
    }

    public getSelector(): string {
        return 'g.wd-item-group';
    }

    public getAttributes() {
        return {
            id: (d: Item) => {
                return `item-${d.id}`;
            },
            transform: (d: Item) => {
                let translateX = this.getTranslateX(d);
                let translateY = this.getTranslateY(d);

                return 'translate(' + translateX + ',' + translateY + ')';
            },
            width: (d: Item): number => {
                return ItemView.getItemWidth(d.type);
            },
            height: (d: Item): number => {
                return ItemView.getItemHeight(d.type);
            },
            class: (d: Item): string => {
                return this.getClasses();
            }
        };
    }

    public getClasses(): string {
        return 'wd-item-group';
    }

    public static getItemWidth(itemType: ItemType) {
        switch (itemType) {
            case ItemType.Start:
                return config.startItemWidth;
            case ItemType.Workflow:
                return config.workflowItemWidth;
            case ItemType.Intermediate:
                return config.intermediateItemWidth;
            case ItemType.End:
                return config.endItemWidth;
            default:
                return 0;
        }
    }

    public static getItemHeight(itemType: ItemType) {
        switch (itemType) {
            case ItemType.Start:
                return config.startItemHeight;
            case ItemType.Workflow:
                return config.workflowItemHeight;
            case ItemType.Intermediate:
                return config.intermediateItemHeight;
            case ItemType.End:
                return config.endItemHeight;
            default:
                return 0;
        }
    }

    public getTranslateX(item: Item): number {
        let result = 0
        let itemLevel = item.level;
        let levels = this.workflow.getAllLevels();
        let levelIndex = levels.findIndex(l => l === itemLevel);
        let itemSpacingX = 0;

        switch (item.type) {
            case ItemType.Start:
                itemSpacingX = config.startLevelItemSpacingX;
                break;
            case ItemType.Workflow:
                itemSpacingX = config.workflowLevelItemSpacingX;
                break;
            case ItemType.Intermediate:
                itemSpacingX = config.intermediateLevelItemSpacingX;
                break;
            case ItemType.End:
                itemSpacingX = config.endLevelItemSpacingX;
                break;
        }

        result = this.levelView.getWidthOfLevels(0, levelIndex - 1) + itemSpacingX;
        return result;
    }

    public getTranslateY(item: Item): number {
        let result = 0
        let itemLevel = item.level;
        let items = itemLevel.items;
        let itemIndex = items.findIndex(i => i === item);
        let itemHeight = ItemView.getItemHeight(item.type);
        let itemSpacingY = 0;

        switch (item.type) {
            case ItemType.Start:
                itemSpacingY = config.startLevelItemSpacingY;
                break;
            case ItemType.Workflow:
                itemSpacingY = config.workflowLevelItemSpacingY;
                break;
            case ItemType.Intermediate:
                itemSpacingY = config.intermediateLevelItemSpacingY;
                break;
            case ItemType.End:
                itemSpacingY = config.endLevelItemSpacingY;
                break;
        }

        result = ((itemHeight + (itemSpacingY * 2)) * itemIndex) + itemSpacingY;
        return result;
    }

    public setupDrag() {
        let _self = this;

        return d3.drag()
            .on('start', function (d: Item) {
                if (d.type === ItemType.Workflow ) {
                    let itemGroup = d3.select(<any>this).classed('selected', true);

                    // Set the pointer events to none to get the mouse events firing on the background section
                    // while dragging the workflow item node above it
                    itemGroup.raise().style('pointer-events', 'none');

                    _self.dispatch.call('workflowitemdragstart', _self, { data: d, element: this });
                }
            })
            .on('drag', function (d: Item) {
                if (d.type === ItemType.Workflow ) {
                    d3.select(<any>this).attrs({
                        transform: (i: Item) => {
                            let translateX = _self.getTranslateX(i) + currentEvent.x;
                            let translateY = _self.getTranslateY(i) + currentEvent.y;

                            return 'translate(' + currentEvent.x + ',' + currentEvent.y + ')';
                        }
                    });

                    _self.dispatch.call('workflowitemdrag', _self, { data: d, element: this });
                }
            })
            .on('end', function (d: Item) {
                if (d.type === ItemType.Workflow ) {
                    let itemGroup = d3.select(<any>this).classed('selected', false);

                    // Reset the pointer events to the original value
                    itemGroup.style('pointer-events', 'auto');

                    _self.dispatch.call('workflowitemdragend', _self, { data: d, element: this });
                }
            });
    }
}
