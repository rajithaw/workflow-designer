import * as d3 from '../d3/d3.bundle';
import { event as currentEvent } from 'd3-selection';
import { Item } from '../model/item';
import { ItemBody } from './itemBody';
import { ItemText } from './itemText';
import { ItemType } from '../model/itemType';
import { LevelView } from './levelView';
import { Workflow } from '../model/workflow';
import { WorkflowDesignerConfig as config } from '../workflowDesignerConfig';
import { WorkflowItemRemove } from './workflowItemRemove';

export class ItemView {

    private levelView: LevelView;

    constructor(private workflow: Workflow, private dispatch: any, private canvas: any) {
        this.levelView = new LevelView(workflow, dispatch, canvas);
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

    public render() {
        const items = this.workflow.getAllItems();
        const itemBody = new ItemBody();
        const itemText = new ItemText();
        const itemRemove = new WorkflowItemRemove();

        const itemViews = this.canvas.selectAll(this.getSelector()).data(items);
        const updated = itemViews.enter().append('g').merge(itemViews).attrs(this.getAttributes())
            .call(this.setupDrag());
        itemViews.exit().remove();

        // Remove all contents of the item groups
        updated.selectAll('*').remove();
        updated.append('rect').attrs(itemBody.getAttributes());
        updated.append('text').attrs(itemText.getAttributes()).text(itemText.setText);

        updated.append('rect').attrs(itemRemove.getAttributes()).on('mousedown', (d: Item) => {
            event.stopPropagation();
            this.dispatch.call('workflowitemremoveclicked', this, { data: d });
        });
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
                const translateX = this.getTranslateX(d);
                const translateY = this.getTranslateY(d);

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

    public getTranslateX(item: Item): number {
        let result = 0;
        const itemLevel = item.level;
        const levels = this.workflow.getAllLevels();
        const levelIndex = levels.findIndex(l => l === itemLevel);
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
        let result = 0;
        const itemLevel = item.level;
        const items = itemLevel.items;
        const itemIndex = items.findIndex(i => i === item);
        const itemHeight = ItemView.getItemHeight(item.type);
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
        const _self = this;

        return d3.drag()
            .on('start', function(d: Item) {
                if (d.type === ItemType.Workflow ) {
                    const itemGroup = d3.select(this as any).classed('selected', true);

                    // Set the pointer events to none to get the mouse events firing on the background section
                    // while dragging the workflow item node above it
                    itemGroup.raise().style('pointer-events', 'none');

                    _self.dispatch.call('workflowitemdragstart', _self, { data: d, element: this });
                }
            })
            .on('drag', function(d: Item) {
                if (d.type === ItemType.Workflow ) {
                    d3.select(this as any).attrs({
                        transform: (i: Item) => {
                            return 'translate(' + currentEvent.x + ',' + currentEvent.y + ')';
                        }
                    });

                    _self.dispatch.call('workflowitemdrag', _self, { data: d, element: this });
                }
            })
            .on('end', function(d: Item) {
                if (d.type === ItemType.Workflow ) {
                    const itemGroup = d3.select(this as any).classed('selected', false);

                    // Reset the pointer events to the original value
                    itemGroup.style('pointer-events', 'auto');

                    _self.dispatch.call('workflowitemdragend', _self, { data: d, element: this });
                }
            });
    }
}
