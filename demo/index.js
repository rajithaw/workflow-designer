(function(){
    'use strict';

    System.import('../dist/workflow-designer.js').then(function(m) {
        var wd = new m.WorkflowDesigner();
        wd.init('display');

        wd.insertItem(0, 'item11');
        wd.addItem(1, 'item12');

        wd.insertItem(1, 'item21');
        wd.addItem(2, 'item22');

        wd.insertItem(2, 'item31');
        wd.addItem(3, 'item32');
    }).catch(function(err){ 
        console.error(err); 
    });
}());

