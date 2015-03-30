/**
 * Data model for the BackgroundSection view element.
 * Created by Rajitha on 3/1/2015.
 */

define([], function () {
    "use strict";

    return function BackgroundSectionData(topItem, prevTopItem, nextTopItem) {
        var level = topItem.level,
            sequence = topItem.sequence;

        return {
            "topItem": topItem,
            "prevTopItem": prevTopItem,
            "nextTopItem": nextTopItem,
            "level": level,
            "sequence": sequence,
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0
        };
    };
});