import * as d3 from '../d3/d3.bundle';
import { Workflow } from '../model/workflow';
import { Level } from '../model/level';
import { LevelData } from './levelData';
import { LevelType } from '../model/levelType';
import { ItemView } from './itemView';
import { WorkflowDesignerConfig as config } from '../workflowDesignerConfig';

export class LevelView {

    constructor(private workflow: Workflow, private dispatch: any, private canvas: any) {
    }

    public Render() {
        let levels = this.workflow.GetAllLevels();
        let levelViews = this.canvas.selectAll(this.GetSelector()).data(this.GetLevelData(levels));

        levelViews.enter().append('rect').merge(levelViews).attrs(this.GetAttributes())
            .on('mouseenter', function (d: LevelData) {
                d.IsMouseOver = true;
            })
            .on('mouseleave', function (d: LevelData) {
                d.IsMouseOver = false;
            });
        levelViews.exit().remove();
    }

    public GetLevelData(levels: Level[]): LevelData[] {
        let result = [];

        levels.forEach((level) => {
            result.push(new LevelData(level, this.dispatch));
        });

        return result;
    }

    public GetSelector(): string {
        return 'rect.wd-background-section';
    }

    public GetAttributes() {
        return {
            id: (d: LevelData) => {
                return `level-${d.GetLevel().Id}`;
            },
            x: (d: LevelData): number => {
                let result = 0
                let levels = this.workflow.GetAllLevels();
                let levelIndex = levels.findIndex(l => l === d.GetLevel());

                return this.GetWidthOfLevels(0, levelIndex - 1);
            },
            y: (d: LevelData): number => {
                return 0;
            },
            width: (d: LevelData): number => {
                return this.GetLevelWidth(d.GetLevel());
            },
            height: (d: LevelData): number => {
                return this.GetMaxLevelHeight();
            },
            class: (d: LevelData): string => {
                return this.GetClasses(d);
            }
        };
    }

    public GetClasses(d: LevelData): string {
        return 'wd-background-section transparent';
    }

    public GetTotalWidth(): number {
        let result = 0;
        let levels = this.workflow.GetAllLevels();

        levels.forEach(level => {
            result += this.GetLevelWidth(level);
        });

        return result;
    }

    public GetMaxLevelHeight(): number {
        let result = 0;
        let maxLevel = this.workflow.GetMaxLevel();

        result = this.GetLevelHeight(maxLevel);
        return result;
    }

    public GetWidthOfLevels (startIndex: number, endIndex: number): number {
        let result = 0;
        let levels = this.workflow.GetAllLevels();

        for (let i = startIndex; i <= endIndex; i++) {
            result += this.GetLevelWidth(levels[i]);
        }

        return result;
    }

    private GetLevelWidth (level: Level): number {
        let result = 0;
        let items = level.GetItems();
        let itemWidth = 0;
        let itemSpacingX = 0;

        if (items.length > 0) {
            itemWidth = ItemView.GetItemWidth(items[0].GetType());
        }

        switch (level.GetType()) {
            case LevelType.Start:
                itemSpacingX = config.startLevelItemSpacingX;
                break;
            case LevelType.Workflow:
                itemSpacingX = config.workflowLevelItemSpacingX;
                break;
            case LevelType.Intermediate:
                itemSpacingX = config.intermediateLevelItemSpacingX;
                break;
            case LevelType.End:
                itemSpacingX = config.endLevelItemSpacingX;
                break;
        }

        result = itemWidth + (itemSpacingX * 2);
        return result;
    }

    private GetLevelHeight(level: Level): number {
        let result = 0;
        let items = level.GetItems();
        let itemSpacingY = 0;
        let totalItemHeight = 0;
        let totalItemSpacing = 0;
        let topBottomSpacing = 0;

        switch (level.GetType()) {
            case LevelType.Start:
                itemSpacingY = config.startLevelItemSpacingY;
                break;
            case LevelType.Workflow:
                itemSpacingY = config.workflowLevelItemSpacingY;
                break;
            case LevelType.Intermediate:
                itemSpacingY = config.intermediateLevelItemSpacingY;
                break;
            case LevelType.End:
                itemSpacingY = config.endLevelItemSpacingY;
                break;
        }

        topBottomSpacing = itemSpacingY * 2;

        if (items.length > 0) {
            totalItemHeight = ItemView.GetItemHeight(items[0].GetType()) * items.length;
            totalItemSpacing = itemSpacingY * (items.length - 1) * 2;
        }

        result = totalItemHeight + totalItemSpacing + topBottomSpacing;
        return result;
    }
}
