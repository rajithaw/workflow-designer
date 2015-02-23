/**
 * Created by Rajitha on 2/23/2015.
 */

require.config({
    paths: {
        "d3": "../lib/d3/d3.min",
        "data": "../data"
    },
    urlArgs: "bust=" + (new Date()).getTime()
});