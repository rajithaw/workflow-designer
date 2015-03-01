/**
 * Created by Rajitha on 3/1/2015.
 */

define([], function () {
    "use strict";

    return function BackgroundSectionData(items) {
        var firstItem = items[0],
            level = firstItem.level,
            sequence = firstItem.sequence;

        return {
            "items": items,
            "level": level,
            "sequence": sequence,
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0
        };
    };
});