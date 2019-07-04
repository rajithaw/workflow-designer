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

    public render() {
        const levels = this.workflow.getAllLevels();
        const levelViews = this.canvas.selectAll(this.getSelector()).data(this.getLevelData(levels));

        levelViews.enter().append('rect').merge(levelViews).attrs(this.getAttributes())
            .on('mouseenter', (d: LevelData) => {
                d.isMouseOver = true;
            })
            .on('mouseleave', (d: LevelData) => {
                d.isMouseOver = false;
            });
        levelViews.exit().remove();
    }

    public getLevelData(levels: Level[]): LevelData[] {
        const result = [];

        levels.forEach((level) => {
            result.push(new LevelData(level, this.dispatch));
        });

        return result;
    }

    public getSelector(): string {
        return 'rect.wd-background-section';
    }

    public getAttributes() {
        return {
            id: (d: LevelData) => {
                return `level-${d.level.id}`;
            },
            x: (d: LevelData): number => {
                const levels = this.workflow.getAllLevels();
                const levelIndex = levels.findIndex(l => l === d.level);

                return this.getWidthOfLevels(0, levelIndex - 1);
            },
            y: (d: LevelData): number => {
                return 0;
            },
            width: (d: LevelData): number => {
                return this.getLevelWidth(d.level);
            },
            height: (d: LevelData): number => {
                return this.getMaxLevelHeight();
            },
            class: (d: LevelData): string => {
                return this.getClasses(d);
            }
        };
    }

    public getClasses(d: LevelData): string {
        return 'wd-background-section wd-transparent';
    }

    public getTotalWidth(): number {
        let result = 0;
        const levels = this.workflow.getAllLevels();

        levels.forEach(level => {
            result += this.getLevelWidth(level);
        });

        return result;
    }

    public getMaxLevelHeight(): number {
        let result = 0;
        const maxLevel = this.workflow.getMaxLevel();

        result = this.getLevelHeight(maxLevel);
        return result;
    }

    public getWidthOfLevels (startIndex: number, endIndex: number): number {
        let result = 0;
        const levels = this.workflow.getAllLevels();

        for (let i = startIndex; i <= endIndex; i++) {
            result += this.getLevelWidth(levels[i]);
        }

        return result;
    }

    private getLevelWidth (level: Level): number {
        let result = 0;
        const items = level.items;
        let itemWidth = 0;
        let itemSpacingX = 0;

        if (items.length > 0) {
            itemWidth = ItemView.getItemWidth(items[0].type);
        }

        switch (level.type) {
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

    private getLevelHeight(level: Level): number {
        let result = 0;
        const items = level.items;
        let itemSpacingY = 0;
        let totalItemHeight = 0;
        let totalItemSpacing = 0;
        let topBottomSpacing = 0;

        switch (level.type) {
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
            totalItemHeight = ItemView.getItemHeight(items[0].type) * items.length;
            totalItemSpacing = itemSpacingY * (items.length - 1) * 2;
        }

        result = totalItemHeight + totalItemSpacing + topBottomSpacing;
        return result;
    }
}
