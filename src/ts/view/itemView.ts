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

    public Render() {
        let items = this.workflow.GetAllItems();
        let itemBody = new ItemBody();

        let itemViews = this.canvas.selectAll(this.GetSelector()).data(items);
        itemViews = itemViews.enter().append('g').merge(itemViews).attrs(this.GetAttributes())
            .call(this.SetupDrag());
        itemViews.exit().remove();

        itemViews.select('rect').remove();
        itemViews.append('rect').attrs(itemBody.GetAttributes());
    }

    public GetSelector(): string {
        return 'g.wd-item-group';
    }

    public GetAttributes() {
        return {
            transform: (d: Item) => {
                let translateX = this.GetTranslateX(d);
                let translateY = this.GetTranslateY(d);

                return 'translate(' + translateX + ',' + translateY + ')';
            },
            width: (d: Item): number => {
                return ItemView.GetItemWidth(d.GetType());
            },
            height: (d: Item): number => {
                return ItemView.GetItemHeight(d.GetType());
            },
            class: (d: Item): string => {
                return this.GetClasses();
            }
        };
    }

    public GetClasses(): string {
        return 'wd-item-group';
    }

    public static GetItemWidth(itemType: ItemType) {
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

    public static GetItemHeight(itemType: ItemType) {
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

    public GetTranslateX(item: Item): number {
        let result = 0
        let itemLevel = item.GetLevel();
        let levels = this.workflow.GetAllLevels();
        let levelIndex = levels.findIndex(l => l === itemLevel);
        let itemSpacingX = 0;

        switch (item.GetType()) {
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

        result = this.levelView.GetWidthOfLevels(0, levelIndex - 1) + itemSpacingX;
        return result;
    }

    public GetTranslateY(item: Item): number {
        let result = 0
        let itemLevel = item.GetLevel();
        let items = itemLevel.GetItems();
        let itemIndex = items.findIndex(i => i === item);
        let itemHeight = ItemView.GetItemHeight(item.GetType());
        let itemSpacingY = 0;

        switch (item.GetType()) {
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

    public SetupDrag() {
        let _self = this;

        return d3.drag()
            // .on('start', this.DragStarted)
            // .on('drag', this.Dragged)
            // .on('end', this.DragEnded);
            .on('start', function (d: Item) {
                if (d.GetType() === ItemType.Workflow ) {
                    let itemGroup = d3.select(<any>this).classed('selected', true);

                    // Set the pointer events to none to get the mouse events firing on the background section
                    // while dragging the workflow item node above it
                    itemGroup.raise().style('pointer-events', 'none');

                    _self.dispatch.call('workflowitemdragstart', _self, { data: d, element: this });
                }
            })
            .on('drag', function (d: Item) {
                if (d.GetType() === ItemType.Workflow ) {
                    d3.select(<any>this).attrs({
                        transform: (i: Item) => {
                            let translateX = _self.GetTranslateX(i) + currentEvent.x;
                            let translateY = _self.GetTranslateY(i) + currentEvent.y;

                            return 'translate(' + currentEvent.x + ',' + currentEvent.y + ')';
                        }
                    });

                    _self.dispatch.call('workflowitemdrag', _self, { data: d, element: this });
                }
            })
            .on('end', function (d: Item) {
                if (d.GetType() === ItemType.Workflow ) {
                    let itemGroup = d3.select(<any>this).classed('selected', false);

                    // Reset the pointer events to the original value
                    itemGroup.style('pointer-events', 'auto');

                    _self.dispatch.call('workflowitemdragend', _self, { data: d, element: this });
                }
            });
    }
}
