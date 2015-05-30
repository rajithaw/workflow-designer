/**
 * Tests exercising the WorkflowItemCollection
 * Created by Rajitha on 11/8/2014.
 */

describe('workflow item collection', function () {
    "use strict";

    // Load modules with requirejs before tests
    var WorkflowItemCollection,
        sampleWorkflows;

    before(function(done) {
        require(["model/WorkflowItemCollection", "data/SampleWorkflows"], function(collection, samples) {
            WorkflowItemCollection = collection;
            sampleWorkflows = samples;
            done(); // We can launch the tests!
        });
    });

    describe('creating a workflow item collection from json', function () {
        it('should create the start and end workflow items', function () {
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[5].data);

            // Assert
            expect(workflowItems.levelCount()).to.be.equal(9);
            expect(workflowItems.level(0)).to.have.length(1);
            expect(workflowItems.level(8)).to.have.length(1);
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({ id: "start", level: 0 });
            expect(workflowItems.get(8, 0)).to.shallowDeepEqual({ id: "end", level: 8 });
        });

        it('should create a workflow item collection from josn representing serial workflow items', function () {
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[0].data);

            // Assert
            expect(workflowItems.itemLevelCount()).to.be.equal(4);
            expect(workflowItems.intermediateLevelCount()).to.be.equal(0);
            expect(workflowItems.level(1)).to.have.length(1);
            expect(workflowItems.level(2)).to.have.length(1);
            expect(workflowItems.level(3)).to.have.length(1);
            expect(workflowItems.level(4)).to.have.length(1);
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({ id: 11, level: 1 });
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({ id: 21, level: 2 });
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({ id: 31, level: 3 });
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({ id: 41, level: 4 });
        });

        it('should create a workflow item collection from josn representing simple parallel workflow items', function () {
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[1].data);

            // Assert
            expect(workflowItems.itemLevelCount()).to.be.equal(4);
            expect(workflowItems.intermediateLevelCount()).to.be.equal(0);
            expect(workflowItems.level(1)).to.have.length(1);
            expect(workflowItems.level(2)).to.have.length(3);
            expect(workflowItems.level(3)).to.have.length(1);
            expect(workflowItems.level(4)).to.have.length(2);
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({ id: 11, level: 1 });
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({ id: 21, level: 2 });
            expect(workflowItems.get(2, 1)).to.shallowDeepEqual({ id: 22, level: 2 });
            expect(workflowItems.get(2, 2)).to.shallowDeepEqual({ id: 23, level: 2 });
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({ id: 31, level: 3 });
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({ id: 41, level: 4 });
            expect(workflowItems.get(4, 1)).to.shallowDeepEqual({ id: 42, level: 4 });
        });

        it('should create a workflow item collection from josn representing starting parallel workflow items', function () {
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[2].data);

            // Assert
            expect(workflowItems.itemLevelCount()).to.be.equal(4);
            expect(workflowItems.intermediateLevelCount()).to.be.equal(0);
            expect(workflowItems.level(1)).to.have.length(2);
            expect(workflowItems.level(2)).to.have.length(1);
            expect(workflowItems.level(3)).to.have.length(3);
            expect(workflowItems.level(4)).to.have.length(1);
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({ id: 11, level: 1 });
            expect(workflowItems.get(1, 1)).to.shallowDeepEqual({ id: 12, level: 1 });
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({ id: 21, level: 2 });
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({ id: 31, level: 3 });
            expect(workflowItems.get(3, 1)).to.shallowDeepEqual({ id: 32, level: 3 });
            expect(workflowItems.get(3, 2)).to.shallowDeepEqual({ id: 33, level: 3 });
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({ id: 41, level: 4 });
        });

        it('should create a workflow item collection from josn representing adjacent parallel workflow items', function () {
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[3].data);

            // Assert
            expect(workflowItems.itemLevelCount()).to.be.equal(3);
            expect(workflowItems.intermediateLevelCount()).to.be.equal(1);
            expect(workflowItems.level(1)).to.have.length(2);
            expect(workflowItems.level(2)).to.have.length(1);
            expect(workflowItems.level(3)).to.have.length(3);
            expect(workflowItems.level(4)).to.have.length(1);
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({ id: 11, level: 1 });
            expect(workflowItems.get(1, 1)).to.shallowDeepEqual({ id: 12, level: 1 });
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({ id: "intermediate", level: 2 });
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({ id: 21, level: 3 });
            expect(workflowItems.get(3, 1)).to.shallowDeepEqual({ id: 22, level: 3 });
            expect(workflowItems.get(3, 2)).to.shallowDeepEqual({ id: 23, level: 3 });
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({ id: 31, level: 4 });
        });

        it('should create a workflow item collection from josn representing complex parallel workflow items', function () {
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[4].data);

            // Assert
            expect(workflowItems.itemLevelCount()).to.be.equal(4);
            expect(workflowItems.intermediateLevelCount()).to.be.equal(3);
            expect(workflowItems.level(1)).to.have.length(2);
            expect(workflowItems.level(2)).to.have.length(1);
            expect(workflowItems.level(3)).to.have.length(2);
            expect(workflowItems.level(4)).to.have.length(1);
            expect(workflowItems.level(5)).to.have.length(3);
            expect(workflowItems.level(6)).to.have.length(1);
            expect(workflowItems.level(7)).to.have.length(3);
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({ id: 11, level: 1 });
            expect(workflowItems.get(1, 1)).to.shallowDeepEqual({ id: 12, level: 1 });
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({ id: "intermediate", level: 2 });
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({ id: 21, level: 3 });
            expect(workflowItems.get(3, 1)).to.shallowDeepEqual({ id: 22, level: 3 });
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({ id: "intermediate", level: 4 });
            expect(workflowItems.get(5, 0)).to.shallowDeepEqual({ id: 31, level: 5 });
            expect(workflowItems.get(5, 1)).to.shallowDeepEqual({ id: 32, level: 5 });
            expect(workflowItems.get(5, 2)).to.shallowDeepEqual({ id: 33, level: 5 });
            expect(workflowItems.get(6, 0)).to.shallowDeepEqual({ id: "intermediate", level: 6 });
            expect(workflowItems.get(7, 0)).to.shallowDeepEqual({ id: 41, level: 7 });
            expect(workflowItems.get(7, 1)).to.shallowDeepEqual({ id: 42, level: 7 });
            expect(workflowItems.get(7, 2)).to.shallowDeepEqual({ id: 43, level: 7 });
        });

        it('should create a workflow item collection from josn representing complex parallel workflow items with unsorted and non continuous sequence', function () {
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[5].data);

            // Assert
            expect(workflowItems.itemLevelCount()).to.be.equal(4);
            expect(workflowItems.intermediateLevelCount()).to.be.equal(3);
            expect(workflowItems.level(1)).to.have.length(2);
            expect(workflowItems.level(2)).to.have.length(1);
            expect(workflowItems.level(3)).to.have.length(3);
            expect(workflowItems.level(4)).to.have.length(1);
            expect(workflowItems.level(5)).to.have.length(2);
            expect(workflowItems.level(6)).to.have.length(1);
            expect(workflowItems.level(7)).to.have.length(3);
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({ id: 11, level: 1 });
            expect(workflowItems.get(1, 1)).to.shallowDeepEqual({ id: 12, level: 1 });
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({ id: "intermediate", level: 2 });
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({ id: 21, level: 3 });
            expect(workflowItems.get(3, 1)).to.shallowDeepEqual({ id: 22, level: 3 });
            expect(workflowItems.get(3, 2)).to.shallowDeepEqual({ id: 23, level: 3 });
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({ id: "intermediate", level: 4 });
            expect(workflowItems.get(5, 0)).to.shallowDeepEqual({ id: 31, level: 5 });
            expect(workflowItems.get(5, 1)).to.shallowDeepEqual({ id: 32, level: 5 });
            expect(workflowItems.get(6, 0)).to.shallowDeepEqual({ id: "intermediate", level: 6 });
            expect(workflowItems.get(7, 0)).to.shallowDeepEqual({ id: 41, level: 7 });
            expect(workflowItems.get(7, 1)).to.shallowDeepEqual({ id: 42, level: 7 });
            expect(workflowItems.get(7, 2)).to.shallowDeepEqual({ id: 43, level: 7 });
        });

        it('should create a workflow item collection with empty array', function () {
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection([]);

            // Assert
            expect(workflowItems.levelCount()).to.be.equal(0);
        });

        it('should throw an error for non array', function () {
            expect(function() {
                var workflowItems = new WorkflowItemCollection("abcd");
            }).to.throw(TypeError);
        });

        it('should throw an error for an invalid items array', function () {
            expect(function() {
                var workflowItems = new WorkflowItemCollection(sampleWorkflows[6].data);
            }).to.throw("Invalid items json");
        });
    });

    describe('converting a workflow item collection to json', function(){
        it('should convert a serial workflow items collection to json', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[0].data);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.deep.equal(sampleWorkflows[0].data);
        });

        it('should convert a simple parallel workflow items collection to json', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[1].data);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.deep.equal(sampleWorkflows[1].data);
        });

        it('should convert a starting parallel workflow items collection to json', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[2].data);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.deep.equal(sampleWorkflows[2].data);
        });

        it('should convert an adjacent parallel workflow items collection to json', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[3].data);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.deep.equal(sampleWorkflows[3].data);
        });

        it('should convert a complex parallel workflow items collection to json', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[4].data);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.deep.equal(sampleWorkflows[4].data);
        });

        it('should convert a complex parallel workflow items collection with non continuous sequence to json', function(){
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[5].data);

            var expectedJson = sampleWorkflows[5].data.sort(WorkflowItemCollection.prototype.workflowItemsSequenceIdComparer);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.deep.equal(expectedJson);
        });

        it('should convert an empty workflow items collection to json', function(){
            var workflowItems = new WorkflowItemCollection([]);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.deep.equal([]);
        });
    });

    describe('converting workflow item collection to an array', function(){
        it('should convert the start and end workflow items to the first and last elements', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[5].data);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(15);
            expect(itemsArray[0]).to.be.shallowDeepEqual({id:"start", level:0});
            expect(itemsArray[14]).to.be.shallowDeepEqual({id:"end", level:8});
        });

        it('should convert a serial workflow item collection to array', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[0].data);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(6);
            expect(itemsArray[1]).to.be.shallowDeepEqual({id:11, level:1});
            expect(itemsArray[2]).to.be.shallowDeepEqual({id:21, level:2});
            expect(itemsArray[3]).to.be.shallowDeepEqual({id:31, level:3});
            expect(itemsArray[4]).to.be.shallowDeepEqual({id:41, level:4});
        });

        it('should convert a simple parallel workflow items collection to array', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[1].data);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(9);
            expect(itemsArray[1]).to.be.shallowDeepEqual({id:11, level:1});
            expect(itemsArray[2]).to.be.shallowDeepEqual({id:21, level:2});
            expect(itemsArray[3]).to.be.shallowDeepEqual({id:22, level:2});
            expect(itemsArray[4]).to.be.shallowDeepEqual({id:23, level:2});
            expect(itemsArray[5]).to.be.shallowDeepEqual({id:31, level:3});
            expect(itemsArray[6]).to.be.shallowDeepEqual({id:41, level:4});
            expect(itemsArray[7]).to.be.shallowDeepEqual({id:42, level:4});
        });

        it('should convert a starting parallel workflow items collection to array', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[2].data);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(9);
            expect(itemsArray[1]).to.shallowDeepEqual({id:11, level:1});
            expect(itemsArray[2]).to.shallowDeepEqual({id:12, level:1});
            expect(itemsArray[3]).to.shallowDeepEqual({id:21, level:2});
            expect(itemsArray[4]).to.shallowDeepEqual({id:31, level:3});
            expect(itemsArray[5]).to.shallowDeepEqual({id:32, level:3});
            expect(itemsArray[6]).to.shallowDeepEqual({id:33, level:3});
            expect(itemsArray[7]).to.shallowDeepEqual({id:41, level:4});
        });

        it('should convert an adjacent parallel workflow items collection to array', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[3].data);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(9);
            expect(itemsArray[1]).to.shallowDeepEqual({id:11, level:1});
            expect(itemsArray[2]).to.shallowDeepEqual({id:12, level:1});
            expect(itemsArray[3]).to.shallowDeepEqual({id:"intermediate", level:2});
            expect(itemsArray[4]).to.shallowDeepEqual({id:21, level:3});
            expect(itemsArray[5]).to.shallowDeepEqual({id:22, level:3});
            expect(itemsArray[6]).to.shallowDeepEqual({id:23, level:3});
            expect(itemsArray[7]).to.shallowDeepEqual({id:31, level:4});
        });

        it('should convert a complex parallel workflow items collection to array', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[4].data);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(15);
            expect(itemsArray[1]).to.shallowDeepEqual({id:11, level:1});
            expect(itemsArray[2]).to.shallowDeepEqual({id:12, level:1});
            expect(itemsArray[3]).to.shallowDeepEqual({id:"intermediate", level:2});
            expect(itemsArray[4]).to.shallowDeepEqual({id:21, level:3});
            expect(itemsArray[5]).to.shallowDeepEqual({id:22, level:3});
            expect(itemsArray[6]).to.shallowDeepEqual({id:"intermediate", level:4});
            expect(itemsArray[7]).to.shallowDeepEqual({id:31, level:5});
            expect(itemsArray[8]).to.shallowDeepEqual({id:32, level:5});
            expect(itemsArray[9]).to.shallowDeepEqual({id:33, level:5});
            expect(itemsArray[10]).to.shallowDeepEqual({id:"intermediate", level:6});
            expect(itemsArray[11]).to.shallowDeepEqual({id:41, level:7});
            expect(itemsArray[12]).to.shallowDeepEqual({id:42, level:7});
            expect(itemsArray[13]).to.shallowDeepEqual({id:43, level:7});
        });

        it('should convert a complex parallel workflow items collection with non continuous sequence to array', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[5].data);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(15);
            expect(itemsArray[1]).to.shallowDeepEqual({id:11, level:1});
            expect(itemsArray[2]).to.shallowDeepEqual({id:12, level:1});
            expect(itemsArray[3]).to.shallowDeepEqual({id:"intermediate", level:2});
            expect(itemsArray[4]).to.shallowDeepEqual({id:21, level:3});
            expect(itemsArray[5]).to.shallowDeepEqual({id:22, level:3});
            expect(itemsArray[6]).to.shallowDeepEqual({id:23, level:3});
            expect(itemsArray[7]).to.shallowDeepEqual({id:"intermediate", level:4});
            expect(itemsArray[8]).to.shallowDeepEqual({id:31, level:5});
            expect(itemsArray[9]).to.shallowDeepEqual({id:32, level:5});
            expect(itemsArray[10]).to.shallowDeepEqual({id:"intermediate", level:6});
            expect(itemsArray[11]).to.shallowDeepEqual({id:41, level:7});
            expect(itemsArray[12]).to.shallowDeepEqual({id:42, level:7});
            expect(itemsArray[13]).to.shallowDeepEqual({id:43, level:7});
        });

        it('should convert an empty workflow items collection to array', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection([]);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(0);
        });
    });

    describe('calculating the position of the workflow items', function(){
        it('should calculate the positions of the start and end workflow items', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[5].data);

            // Assert
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({id:"start", x:0, y:0});
            expect(workflowItems.get(8, 0)).to.shallowDeepEqual({id:"end", x:10, y:0});
        });

        it('should calculate the positions correctly for serial workflow items', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[0].data);

            // Assert
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({x:6, y:0});
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({x:8, y:0});
        });

        it('should calculate the positions correctly for simple parallel workflow items', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[1].data);

            // Assert
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems.get(2, 1)).to.shallowDeepEqual({x:4, y:2});
            expect(workflowItems.get(2, 2)).to.shallowDeepEqual({x:4, y:4});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({x:6, y:0});
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({x:8, y:0});
            expect(workflowItems.get(4, 1)).to.shallowDeepEqual({x:8, y:2});
        });

        it('should calculate the positions correctly for starting parallel workflow items', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[2].data);

            // Assert
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems.get(1, 1)).to.shallowDeepEqual({x:2, y:2});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({x:6, y:0});
            expect(workflowItems.get(3, 1)).to.shallowDeepEqual({x:6, y:2});
            expect(workflowItems.get(3, 2)).to.shallowDeepEqual({x:6, y:4});
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({x:8, y:0});
        });

        it('should calculate the positions correctly for adjacent parallel workflow items', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[3].data);

            // Assert
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems.get(1, 1)).to.shallowDeepEqual({x:2, y:2});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({x:3, y:1});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems.get(3, 1)).to.shallowDeepEqual({x:4, y:2});
            expect(workflowItems.get(3, 2)).to.shallowDeepEqual({x:4, y:4});
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({x:6, y:0});
        });

        it('should calculate the positions correctly for complex parallel workflow items', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[4].data);

            // Assert
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems.get(1, 1)).to.shallowDeepEqual({x:2, y:2});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({x:3, y:1});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems.get(3, 1)).to.shallowDeepEqual({x:4, y:2});
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({x:5, y:1});
            expect(workflowItems.get(5, 0)).to.shallowDeepEqual({x:6, y:0});
            expect(workflowItems.get(5, 1)).to.shallowDeepEqual({x:6, y:2});
            expect(workflowItems.get(5, 2)).to.shallowDeepEqual({x:6, y:4});
            expect(workflowItems.get(6, 0)).to.shallowDeepEqual({x:7, y:2});
            expect(workflowItems.get(7, 0)).to.shallowDeepEqual({x:8, y:0});
            expect(workflowItems.get(7, 1)).to.shallowDeepEqual({x:8, y:2});
            expect(workflowItems.get(7, 2)).to.shallowDeepEqual({x:8, y:4});
        });

        it('should calculate the positions correctly for complex parallel workflow items with unsorted and non continuous sequence', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[5].data);

            // Assert
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems.get(1, 1)).to.shallowDeepEqual({x:2, y:2});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({x:3, y:1});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems.get(3, 1)).to.shallowDeepEqual({x:4, y:2});
            expect(workflowItems.get(3, 2)).to.shallowDeepEqual({x:4, y:4});
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({x:5, y:1});
            expect(workflowItems.get(5, 0)).to.shallowDeepEqual({x:6, y:0});
            expect(workflowItems.get(5, 1)).to.shallowDeepEqual({x:6, y:2});
            expect(workflowItems.get(6, 0)).to.shallowDeepEqual({x:7, y:1});
            expect(workflowItems.get(7, 0)).to.shallowDeepEqual({x:8, y:0});
            expect(workflowItems.get(7, 1)).to.shallowDeepEqual({x:8, y:2});
            expect(workflowItems.get(7, 2)).to.shallowDeepEqual({x:8, y:4});
        });
    });

    describe("removing items from the workflow collection", function(){
        it("should re-initialize the collection to a valid state after items are removed", function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[5].data);

            var itemsToRemove = [workflowItems.get(3, 0), workflowItems.get(3, 2), workflowItems.get(7, 2)];
            workflowItems.remove(itemsToRemove);

            // Assert
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({id:11, level:1, x:2, y:0});
            expect(workflowItems.get(1, 1)).to.shallowDeepEqual({id:12, level:1, x:2, y:2});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({id:22, level:2, x:4, y:0});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({id:31, level:3, x:6, y:0});
            expect(workflowItems.get(3, 1)).to.shallowDeepEqual({id:32, level:3, x:6, y:2});
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({id:"intermediate", level:4, x:7, y:1});
            expect(workflowItems.get(5, 0)).to.shallowDeepEqual({id:41, level:5, x:8, y:0});
            expect(workflowItems.get(5, 1)).to.shallowDeepEqual({id:42, level:5, x:8, y:2});
        });
    });

    describe("adding items to the workflow collection", function(){
        it("should re-initialize the collection to a valid state after items are added", function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows[1].data);

            var itemsToAdd = [{
                "id": 12,
                "name": "Item12",
                "description": "Description12",
                "sequence": 1
            },
            {
                "id": 32,
                "name": "Item32",
                "description": "Description32",
                "sequence": 3
            },
            {
                "id": 33,
                "name": "Item33",
                "description": "Description33",
                "sequence": 3
            }];

            workflowItems.add(itemsToAdd);

            // Assert
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({id:11, level:1, x:2, y:0});
            expect(workflowItems.get(1, 1)).to.shallowDeepEqual({id:12, level:1, x:2, y:2});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({id:"intermediate", level:2, x:3, y:1});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({id:21, level:3, x:4, y:0});
            expect(workflowItems.get(3, 1)).to.shallowDeepEqual({id:22, level:3, x:4, y:2});
            expect(workflowItems.get(3, 2)).to.shallowDeepEqual({id:23, level:3, x:4, y:4});
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({id:"intermediate", level:4, x:5, y:2});
            expect(workflowItems.get(5, 0)).to.shallowDeepEqual({id:31, level:5, x:6, y:0});
            expect(workflowItems.get(5, 1)).to.shallowDeepEqual({id:32, level:5, x:6, y:2});
            expect(workflowItems.get(5, 2)).to.shallowDeepEqual({id:33, level:5, x:6, y:4});
            expect(workflowItems.get(6, 0)).to.shallowDeepEqual({id:"intermediate", level:6, x:7, y:1});
            expect(workflowItems.get(7, 0)).to.shallowDeepEqual({id:41, level:7, x:8, y:0});
            expect(workflowItems.get(7, 1)).to.shallowDeepEqual({id:42, level:7, x:8, y:2});
        });
    });
});