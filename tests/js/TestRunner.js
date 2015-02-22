/**
 * Created by Rajitha on 2/21/2015.
 */
var assert,
    expect;

require.config({
    baseUrl: '/WorkflowDesigner/js',
    paths: {
        "d3": "../lib/d3/d3.min",
        "tests": "../tests",
        "mocha": "../tests/lib/mocha/mocha",
        "chai": "../tests/lib/chai/chai",
        "chai-shallow-deep-equal": "../tests/lib/chai-shallow-deep-equal/chai-shallow-deep-equal",
        "data": "../data"
    },
    shim: {
        mocha: {
            exports: 'mocha'
        }
    },
    urlArgs: 'bust=' + (new Date()).getTime()
});

define(["mocha", "chai", "chai-shallow-deep-equal"], function(mocha, chai, chaiShallowDeepEqual) {
    // Chai
    assert = chai.assert;
    expect = chai.expect;
    chai.use(chaiShallowDeepEqual);

    mocha.setup('bdd');

    require(["js/WorkflowItemsTests.js"], function(require) {
        if (navigator.userAgent.indexOf("PhantomJS") < 0) {
            mocha.checkLeaks();
            mocha.run();
        }
    });
});