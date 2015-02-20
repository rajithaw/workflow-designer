/**
 * Created by Rajitha on 2/19/2015.
 */

define([], function () {
    "use strict";

    // Comparer for sorting the the workflow items by sequence
    return function (item1, item2) {
        if (item1.sequence < item2.sequence) {
            return -1;
        }

        if (item1.sequence > item2.sequence) {
            return 1;
        }

        if (item1.id < item2.id) {
            return -1;
        }

        if (item1.id > item2.id) {
            return 1;
        }

        return 0;
    };
});