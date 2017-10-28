(function(){
    'use strict';

    System.import('../dist/workflow-designer.js').then(function(m) {
        var wd = new m.WorkflowDesigner();
        wd.Init('display');

        wd.InsertItem(0, 'item11');
        wd.AddItem(1, 'item12');

        wd.InsertItem(1, 'item21');
        wd.AddItem(2, 'item22');

        wd.InsertItem(2, 'item31');
        wd.AddItem(3, 'item32');
    }).catch(function(err){ 
        console.error(err); 
    });
}());

