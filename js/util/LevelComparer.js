/**
 * Comparer for sorting items by level
 * Created by Rajitha on 3/31/2015.
 */

define([], function () {
    "use strict";

    // sorts items in ascending order by level
    return function (item1, item2) {
        if (item1.level < item2.level) {
            return -1;
        }

        if (item1.level > item2.level) {
            return 1;
        }

        return 0;
    };
});