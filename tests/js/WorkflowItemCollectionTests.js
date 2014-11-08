/**
 * Created by Rajitha on 11/8/2014.
 */

describe('workflow item collection', function(){
    describe('creating a workflow item collection from json', function(){
        it('should create a workflow item collection from josn representing serial workflow items', function(){
            var workflowItemsJson = "";
            var workflowItemCollection = new WorkflowItemCollection(workflowItemsJson);

            assert.equal(workflowItemCollection.length, 4);
            assert.equal(workflowItemCollection[0].length, 1);
            assert.equal(workflowItemCollection[1].length, 1);
            assert.equal(workflowItemCollection[2].length, 1);
            assert.equal(workflowItemCollection[3].length, 1);
            assert.equal(workflowItemCollection[0][0], {id:11, name:"Item11", description:"Description11", level:0});
            assert.equal(workflowItemCollection[1][0], {id:21, name:"Item21", description:"Description21", level:1});
            assert.equal(workflowItemCollection[2][0], {id:31, name:"Item31", description:"Description31", level:2});
            assert.equal(workflowItemCollection[3][0], {id:41, name:"Item41", description:"Description41", level:3});
        })

        it('should create a workflow item collection from josn representing simple parallel workflow items', function(){

        })

        it('should create a workflow item collection from josn representing starting parallel workflow items', function(){

        })

        it('should create a workflow item collection from josn representing adjacent parallel workflow items', function(){

        })

        it('should create a workflow item collection from josn representing complex parallel workflow items', function(){

        })

        it('should create a workflow item collection from josn representing simple parallel workflow items with non continuous sequence', function(){

        })
    })
})