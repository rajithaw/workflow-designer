/**
 * Created by Rajitha on 11/8/2014.
 */

describe('workflow item collection', function(){
    describe('creating a workflow item collection from json', function(){
        it('should create a workflow item collection from josn representing serial workflow items', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflow1);

            // Assert
            expect(workflowItems).to.have.length(4);
            expect(workflowItems.level(0)).to.have.length(1);
            expect(workflowItems.level(1)).to.have.length(1);
            expect(workflowItems.level(2)).to.have.length(1);
            expect(workflowItems.level(3)).to.have.length(1);
            expect(workflowItems.get(0,0)).to.shallowDeepEqual({id:11, level:0});
            expect(workflowItems.get(1,0)).to.shallowDeepEqual({id:21, level:1});
            expect(workflowItems.get(2,0)).to.shallowDeepEqual({id:31, level:2});
            expect(workflowItems.get(3,0)).to.shallowDeepEqual({id:41, level:3});
        });

        it('should create a workflow item collection from josn representing simple parallel workflow items', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow2);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Assert
            expect(workflowItems).to.have.length(4);
            expect(workflowItems[0]).to.have.length(1);
            expect(workflowItems[1]).to.have.length(3);
            expect(workflowItems[2]).to.have.length(1);
            expect(workflowItems[3]).to.have.length(2);
            expect(workflowItems[0][0]).to.shallowDeepEqual({id:11, level:0});
            expect(workflowItems[1][0]).to.shallowDeepEqual({id:21, level:1});
            expect(workflowItems[1][1]).to.shallowDeepEqual({id:22, level:1});
            expect(workflowItems[1][2]).to.shallowDeepEqual({id:23, level:1});
            expect(workflowItems[2][0]).to.shallowDeepEqual({id:31, level:2});
            expect(workflowItems[3][0]).to.shallowDeepEqual({id:41, level:3});
            expect(workflowItems[3][1]).to.shallowDeepEqual({id:42, level:3});
        });

        it('should create a workflow item collection from josn representing starting parallel workflow items', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow3);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Assert
            expect(workflowItems).to.have.length(4);
            expect(workflowItems[0]).to.have.length(2);
            expect(workflowItems[1]).to.have.length(1);
            expect(workflowItems[2]).to.have.length(3);
            expect(workflowItems[3]).to.have.length(1);
            expect(workflowItems[0][0]).to.shallowDeepEqual({id:11, level:0});
            expect(workflowItems[0][1]).to.shallowDeepEqual({id:12, level:0});
            expect(workflowItems[1][0]).to.shallowDeepEqual({id:21, level:1});
            expect(workflowItems[2][0]).to.shallowDeepEqual({id:31, level:2});
            expect(workflowItems[2][1]).to.shallowDeepEqual({id:32, level:2});
            expect(workflowItems[2][2]).to.shallowDeepEqual({id:33, level:2});
            expect(workflowItems[3][0]).to.shallowDeepEqual({id:41, level:3});
        });

        it('should create a workflow item collection from josn representing adjacent parallel workflow items', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow4);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Assert
            expect(workflowItems).to.have.length(4);
            expect(workflowItems[0]).to.have.length(2);
            expect(workflowItems[1]).to.have.length(1);
            expect(workflowItems[2]).to.have.length(3);
            expect(workflowItems[3]).to.have.length(1);
            expect(workflowItems[0][0]).to.shallowDeepEqual({id:11, level:0});
            expect(workflowItems[0][1]).to.shallowDeepEqual({id:12, level:0});
            expect(workflowItems[1][0]).to.shallowDeepEqual({id:-1, level:1});
            expect(workflowItems[2][0]).to.shallowDeepEqual({id:21, level:2});
            expect(workflowItems[2][1]).to.shallowDeepEqual({id:22, level:2});
            expect(workflowItems[2][2]).to.shallowDeepEqual({id:23, level:2});
            expect(workflowItems[3][0]).to.shallowDeepEqual({id:31, level:3});
        });

        it('should create a workflow item collection from josn representing complex parallel workflow items', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow5);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Assert
            expect(workflowItems).to.have.length(7);
            expect(workflowItems[0]).to.have.length(2);
            expect(workflowItems[1]).to.have.length(1);
            expect(workflowItems[2]).to.have.length(2);
            expect(workflowItems[3]).to.have.length(1);
            expect(workflowItems[4]).to.have.length(3);
            expect(workflowItems[5]).to.have.length(1);
            expect(workflowItems[6]).to.have.length(3);
            expect(workflowItems[0][0]).to.shallowDeepEqual({id:11, level:0});
            expect(workflowItems[0][1]).to.shallowDeepEqual({id:12, level:0});
            expect(workflowItems[1][0]).to.shallowDeepEqual({id:-1, level:1});
            expect(workflowItems[2][0]).to.shallowDeepEqual({id:21, level:2});
            expect(workflowItems[2][1]).to.shallowDeepEqual({id:22, level:2});
            expect(workflowItems[3][0]).to.shallowDeepEqual({id:-1, level:3});
            expect(workflowItems[4][0]).to.shallowDeepEqual({id:31, level:4});
            expect(workflowItems[4][1]).to.shallowDeepEqual({id:32, level:4});
            expect(workflowItems[4][2]).to.shallowDeepEqual({id:33, level:4});
            expect(workflowItems[5][0]).to.shallowDeepEqual({id:-1, level:5});
            expect(workflowItems[6][0]).to.shallowDeepEqual({id:41, level:6});
            expect(workflowItems[6][1]).to.shallowDeepEqual({id:42, level:6});
            expect(workflowItems[6][2]).to.shallowDeepEqual({id:43, level:6});
        });

        it('should create a workflow item collection from josn representing complex parallel workflow items with unsorted and non continuous sequence', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow6);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Assert
            expect(workflowItems).to.have.length(7);
            expect(workflowItems[0]).to.have.length(2);
            expect(workflowItems[1]).to.have.length(1);
            expect(workflowItems[2]).to.have.length(3);
            expect(workflowItems[3]).to.have.length(1);
            expect(workflowItems[4]).to.have.length(2);
            expect(workflowItems[5]).to.have.length(1);
            expect(workflowItems[6]).to.have.length(3);
            expect(workflowItems[0][0]).to.shallowDeepEqual({id:11, level:0});
            expect(workflowItems[0][1]).to.shallowDeepEqual({id:12, level:0});
            expect(workflowItems[1][0]).to.shallowDeepEqual({id:-1, level:1});
            expect(workflowItems[2][0]).to.shallowDeepEqual({id:21, level:2});
            expect(workflowItems[2][1]).to.shallowDeepEqual({id:22, level:2});
            expect(workflowItems[2][2]).to.shallowDeepEqual({id:23, level:2});
            expect(workflowItems[3][0]).to.shallowDeepEqual({id:-1, level:3});
            expect(workflowItems[4][0]).to.shallowDeepEqual({id:31, level:4});
            expect(workflowItems[4][1]).to.shallowDeepEqual({id:32, level:4});
            expect(workflowItems[5][0]).to.shallowDeepEqual({id:-1, level:5});
            expect(workflowItems[6][0]).to.shallowDeepEqual({id:41, level:6});
            expect(workflowItems[6][1]).to.shallowDeepEqual({id:42, level:6});
            expect(workflowItems[6][2]).to.shallowDeepEqual({id:43, level:6});
        });

        it('should create a workflow item collection with empty array', function() {
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify([]);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Assert
            expect(workflowItems).to.have.length(0);
        });

        it('should throw an error for invalid json', function() {
            expect(function() {
                var workflowItems = new WorkflowItemCollection("abcd");
            }).to.throw(SyntaxError);
        });

        it('should throw an error for empty json string', function() {
            expect(function() {
                var workflowItems = new WorkflowItemCollection("");
            }).to.throw(SyntaxError);
        });
    });

    describe('converting a workflow item collection to json', function(){
        it('should convert a serial workflow items collection to json', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow1);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            expect(workflowItems.toJson()).to.be.equal(JSON.stringify(sampleWorkflow1));
        });

        it('should convert a simple parallel workflow items collection to json', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow2);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.be.equal(workflowItemsJson);
        });

        it('should convert a starting parallel workflow items collection to json', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow3);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.be.equal(workflowItemsJson);
        });

        it('should convert an adjacent parallel workflow items collection to json', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow4);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.be.equal(workflowItemsJson);
        });

        it('should convert a complex parallel workflow items collection to json', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow5);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.be.equal(workflowItemsJson);
        });

        it('should convert a complex parallel workflow items collection with non continuous sequence to json', function(){
            var workflowItemsJson = JSON.stringify(sampleWorkflow6);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            var expectedJson = JSON.stringify(sampleWorkflow6.sort(WorkflowItemCollection.prototype.workflowItemsSequenceIdComparer));

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.be.equal(expectedJson);
        });

        it('should convert an empty workflow items collection to json', function(){
            var workflowItemsJson = JSON.stringify([]);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.be.equal(JSON.stringify([]));
        });
    });

    describe('converting workflow item collection to an array', function(){
        it('should convert a serial workflow item collection to array', function(){
            // Create workflow item collection
            var itemsJson = JSON.stringify(sampleWorkflow1);
            var workflowItems = new WorkflowItemCollection(itemsJson);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(4);
            expect(itemsArray[0]).to.be.shallowDeepEqual({id:11, level:0});
            expect(itemsArray[1]).to.be.shallowDeepEqual({id:21, level:1});
            expect(itemsArray[2]).to.be.shallowDeepEqual({id:31, level:2});
            expect(itemsArray[3]).to.be.shallowDeepEqual({id:41, level:3});
        });

        it('should convert a simple parallel workflow items collection to array', function(){
            // Create workflow item collection
            var itemsJson = JSON.stringify(sampleWorkflow2);
            var workflowItems = new WorkflowItemCollection(itemsJson);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(7);
            expect(itemsArray[0]).to.be.shallowDeepEqual({id:11, level:0});
            expect(itemsArray[1]).to.be.shallowDeepEqual({id:21, level:1});
            expect(itemsArray[2]).to.be.shallowDeepEqual({id:22, level:1});
            expect(itemsArray[3]).to.be.shallowDeepEqual({id:23, level:1});
            expect(itemsArray[4]).to.be.shallowDeepEqual({id:31, level:2});
            expect(itemsArray[5]).to.be.shallowDeepEqual({id:41, level:3});
            expect(itemsArray[6]).to.be.shallowDeepEqual({id:42, level:3});
        });

        it('should convert a starting parallel workflow items collection to array', function(){
            // Create workflow item collection
            var itemsJson = JSON.stringify(sampleWorkflow3);
            var workflowItems = new WorkflowItemCollection(itemsJson);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(7);
            expect(itemsArray[0]).to.shallowDeepEqual({id:11, level:0});
            expect(itemsArray[1]).to.shallowDeepEqual({id:12, level:0});
            expect(itemsArray[2]).to.shallowDeepEqual({id:21, level:1});
            expect(itemsArray[3]).to.shallowDeepEqual({id:31, level:2});
            expect(itemsArray[4]).to.shallowDeepEqual({id:32, level:2});
            expect(itemsArray[5]).to.shallowDeepEqual({id:33, level:2});
            expect(itemsArray[6]).to.shallowDeepEqual({id:41, level:3});
        });

        it('should convert an adjacent parallel workflow items collection to array', function(){
            // Create workflow item collection
            var itemsJson = JSON.stringify(sampleWorkflow4);
            var workflowItems = new WorkflowItemCollection(itemsJson);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(7);
            expect(itemsArray[0]).to.shallowDeepEqual({id:11, level:0});
            expect(itemsArray[1]).to.shallowDeepEqual({id:12, level:0});
            expect(itemsArray[2]).to.shallowDeepEqual({id:-1, level:1});
            expect(itemsArray[3]).to.shallowDeepEqual({id:21, level:2});
            expect(itemsArray[4]).to.shallowDeepEqual({id:22, level:2});
            expect(itemsArray[5]).to.shallowDeepEqual({id:23, level:2});
            expect(itemsArray[6]).to.shallowDeepEqual({id:31, level:3});
        });

        it('should convert a complex parallel workflow items collection to array', function(){
            // Create workflow item collection
            var itemsJson = JSON.stringify(sampleWorkflow5);
            var workflowItems = new WorkflowItemCollection(itemsJson);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(13);
            expect(itemsArray[0]).to.shallowDeepEqual({id:11, level:0});
            expect(itemsArray[1]).to.shallowDeepEqual({id:12, level:0});
            expect(itemsArray[2]).to.shallowDeepEqual({id:-1, level:1});
            expect(itemsArray[3]).to.shallowDeepEqual({id:21, level:2});
            expect(itemsArray[4]).to.shallowDeepEqual({id:22, level:2});
            expect(itemsArray[5]).to.shallowDeepEqual({id:-1, level:3});
            expect(itemsArray[6]).to.shallowDeepEqual({id:31, level:4});
            expect(itemsArray[7]).to.shallowDeepEqual({id:32, level:4});
            expect(itemsArray[8]).to.shallowDeepEqual({id:33, level:4});
            expect(itemsArray[9]).to.shallowDeepEqual({id:-1, level:5});
            expect(itemsArray[10]).to.shallowDeepEqual({id:41, level:6});
            expect(itemsArray[11]).to.shallowDeepEqual({id:42, level:6});
            expect(itemsArray[12]).to.shallowDeepEqual({id:43, level:6});
        });

        it('should convert a complex parallel workflow items collection with non continuous sequence to array', function(){
            // Create workflow item collection
            var itemsJson = JSON.stringify(sampleWorkflow6);
            var workflowItems = new WorkflowItemCollection(itemsJson);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(13);
            expect(itemsArray[0]).to.shallowDeepEqual({id:11, level:0});
            expect(itemsArray[1]).to.shallowDeepEqual({id:12, level:0});
            expect(itemsArray[2]).to.shallowDeepEqual({id:-1, level:1});
            expect(itemsArray[3]).to.shallowDeepEqual({id:21, level:2});
            expect(itemsArray[4]).to.shallowDeepEqual({id:22, level:2});
            expect(itemsArray[5]).to.shallowDeepEqual({id:23, level:2});
            expect(itemsArray[6]).to.shallowDeepEqual({id:-1, level:3});
            expect(itemsArray[7]).to.shallowDeepEqual({id:31, level:4});
            expect(itemsArray[8]).to.shallowDeepEqual({id:32, level:4});
            expect(itemsArray[9]).to.shallowDeepEqual({id:-1, level:5});
            expect(itemsArray[10]).to.shallowDeepEqual({id:41, level:6});
            expect(itemsArray[11]).to.shallowDeepEqual({id:42, level:6});
            expect(itemsArray[12]).to.shallowDeepEqual({id:43, level:6});
        });

        it('should convert an empty workflow items collection to array', function(){
            // Create workflow item collection
            var itemsJson = JSON.stringify([]);
            var workflowItems = new WorkflowItemCollection(itemsJson);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(0);
        });
    });

    describe('calculating the position of the workflow items', function(){
        it('should calculate the positions correctly for serial workflow items', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow1);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Assert
            expect(workflowItems[0][0]).to.shallowDeepEqual({x:0, y:0});
            expect(workflowItems[1][0]).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems[2][0]).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems[3][0]).to.shallowDeepEqual({x:6, y:0});
        });

        it('should calculate the positions correctly for simple parallel workflow items', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow2);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Assert
            expect(workflowItems[0][0]).to.shallowDeepEqual({x:0, y:0});
            expect(workflowItems[1][0]).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems[1][1]).to.shallowDeepEqual({x:2, y:2});
            expect(workflowItems[1][2]).to.shallowDeepEqual({x:2, y:4});
            expect(workflowItems[2][0]).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems[3][0]).to.shallowDeepEqual({x:6, y:0});
            expect(workflowItems[3][1]).to.shallowDeepEqual({x:6, y:2});
        });

        it('should calculate the positions correctly for starting parallel workflow items', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow3);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Assert
            expect(workflowItems[0][0]).to.shallowDeepEqual({x:0, y:0});
            expect(workflowItems[0][1]).to.shallowDeepEqual({x:0, y:2});
            expect(workflowItems[1][0]).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems[2][0]).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems[2][1]).to.shallowDeepEqual({x:4, y:2});
            expect(workflowItems[2][2]).to.shallowDeepEqual({x:4, y:4});
            expect(workflowItems[3][0]).to.shallowDeepEqual({x:6, y:0});
        });

        it('should calculate the positions correctly for adjacent parallel workflow items', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow4);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Assert
            expect(workflowItems[0][0]).to.shallowDeepEqual({x:0, y:0});
            expect(workflowItems[0][1]).to.shallowDeepEqual({x:0, y:2});
            expect(workflowItems[1][0]).to.shallowDeepEqual({x:1, y:1});
            expect(workflowItems[2][0]).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems[2][1]).to.shallowDeepEqual({x:2, y:2});
            expect(workflowItems[2][2]).to.shallowDeepEqual({x:2, y:4});
            expect(workflowItems[3][0]).to.shallowDeepEqual({x:4, y:0});
        });

        it('should calculate the positions correctly for complex parallel workflow items', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow5);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Assert
            expect(workflowItems[0][0]).to.shallowDeepEqual({x:0, y:0});
            expect(workflowItems[0][1]).to.shallowDeepEqual({x:0, y:2});
            expect(workflowItems[1][0]).to.shallowDeepEqual({x:1, y:1});
            expect(workflowItems[2][0]).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems[2][1]).to.shallowDeepEqual({x:2, y:2});
            expect(workflowItems[3][0]).to.shallowDeepEqual({x:3, y:1});
            expect(workflowItems[4][0]).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems[4][1]).to.shallowDeepEqual({x:4, y:2});
            expect(workflowItems[4][2]).to.shallowDeepEqual({x:4, y:4});
            expect(workflowItems[5][0]).to.shallowDeepEqual({x:5, y:2});
            expect(workflowItems[6][0]).to.shallowDeepEqual({x:6, y:0});
            expect(workflowItems[6][1]).to.shallowDeepEqual({x:6, y:2});
            expect(workflowItems[6][2]).to.shallowDeepEqual({x:6, y:4});
        });

        it('should calculate the positions correctly for complex parallel workflow items with unsorted and non continuous sequence', function(){
            // Create workflow item collection
            var workflowItemsJson = JSON.stringify(sampleWorkflow6);
            var workflowItems = new WorkflowItemCollection(workflowItemsJson);

            // Assert
            expect(workflowItems[0][0]).to.shallowDeepEqual({x:0, y:0});
            expect(workflowItems[0][1]).to.shallowDeepEqual({x:0, y:2});
            expect(workflowItems[1][0]).to.shallowDeepEqual({x:1, y:1});
            expect(workflowItems[2][0]).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems[2][1]).to.shallowDeepEqual({x:2, y:2});
            expect(workflowItems[2][2]).to.shallowDeepEqual({x:2, y:4});
            expect(workflowItems[3][0]).to.shallowDeepEqual({x:3, y:1});
            expect(workflowItems[4][0]).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems[4][1]).to.shallowDeepEqual({x:4, y:2});
            expect(workflowItems[5][0]).to.shallowDeepEqual({x:5, y:1});
            expect(workflowItems[6][0]).to.shallowDeepEqual({x:6, y:0});
            expect(workflowItems[6][1]).to.shallowDeepEqual({x:6, y:2});
            expect(workflowItems[6][2]).to.shallowDeepEqual({x:6, y:4});
        });
    });
});