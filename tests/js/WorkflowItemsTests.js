/**
 * Created by Rajitha on 11/8/2014.
 */

describe('workflow item collection', function () {
    "use strict";

    console.log("In Describe");

    // Load modules with requirejs before tests
    var WorkflowItemCollection,
        sampleWorkflows;

    before(function(done) {
        console.log("In Before");
        console.log(require);
        require(["model/WorkflowItemCollection", "data/sampleWorkflows"], function(collection, samples) {

            console.log("In Require");

            WorkflowItemCollection = collection;
            sampleWorkflows = samples;
            done(); // We can launch the tests!
        });
    });

    describe('creating a workflow item collection from json', function () {
        it('should create a workflow item collection from josn representing serial workflow items', function () {
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow1);

            // Assert
            expect(workflowItems.levelCount()).to.be.equal(4);
            expect(workflowItems.level(0)).to.have.length(1);
            expect(workflowItems.level(1)).to.have.length(1);
            expect(workflowItems.level(2)).to.have.length(1);
            expect(workflowItems.level(3)).to.have.length(1);
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({ id: 11, level: 0 });
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({ id: 21, level: 1 });
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({ id: 31, level: 2 });
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({ id: 41, level: 3 });
        });

        it('should create a workflow item collection from josn representing simple parallel workflow items', function () {
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow2);

            // Assert
            expect(workflowItems.levelCount()).to.be.equal(4);
            expect(workflowItems.level(0)).to.have.length(1);
            expect(workflowItems.level(1)).to.have.length(3);
            expect(workflowItems.level(2)).to.have.length(1);
            expect(workflowItems.level(3)).to.have.length(2);
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({ id: 11, level: 0 });
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({ id: 21, level: 1 });
            expect(workflowItems.get(1, 1)).to.shallowDeepEqual({ id: 22, level: 1 });
            expect(workflowItems.get(1, 2)).to.shallowDeepEqual({ id: 23, level: 1 });
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({ id: 31, level: 2 });
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({ id: 41, level: 3 });
            expect(workflowItems.get(3, 1)).to.shallowDeepEqual({ id: 42, level: 3 });
        });

        it('should create a workflow item collection from josn representing starting parallel workflow items', function () {
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow3);

            // Assert
            expect(workflowItems.levelCount()).to.be.equal(4);
            expect(workflowItems.level(0)).to.have.length(2);
            expect(workflowItems.level(1)).to.have.length(1);
            expect(workflowItems.level(2)).to.have.length(3);
            expect(workflowItems.level(3)).to.have.length(1);
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({ id: 11, level: 0 });
            expect(workflowItems.get(0, 1)).to.shallowDeepEqual({ id: 12, level: 0 });
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({ id: 21, level: 1 });
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({ id: 31, level: 2 });
            expect(workflowItems.get(2, 1)).to.shallowDeepEqual({ id: 32, level: 2 });
            expect(workflowItems.get(2, 2)).to.shallowDeepEqual({ id: 33, level: 2 });
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({ id: 41, level: 3 });
        });

        it('should create a workflow item collection from josn representing adjacent parallel workflow items', function () {
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow4);

            // Assert
            expect(workflowItems.levelCount()).to.be.equal(4);
            expect(workflowItems.level(0)).to.have.length(2);
            expect(workflowItems.level(1)).to.have.length(1);
            expect(workflowItems.level(2)).to.have.length(3);
            expect(workflowItems.level(3)).to.have.length(1);
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({ id: 11, level: 0 });
            expect(workflowItems.get(0, 1)).to.shallowDeepEqual({ id: 12, level: 0 });
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({ id: -1, level: 1 });
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({ id: 21, level: 2 });
            expect(workflowItems.get(2, 1)).to.shallowDeepEqual({ id: 22, level: 2 });
            expect(workflowItems.get(2, 2)).to.shallowDeepEqual({ id: 23, level: 2 });
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({ id: 31, level: 3 });
        });

        it('should create a workflow item collection from josn representing complex parallel workflow items', function () {
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow5);

            // Assert
            expect(workflowItems.levelCount()).to.be.equal(7);
            expect(workflowItems.level(0)).to.have.length(2);
            expect(workflowItems.level(1)).to.have.length(1);
            expect(workflowItems.level(2)).to.have.length(2);
            expect(workflowItems.level(3)).to.have.length(1);
            expect(workflowItems.level(4)).to.have.length(3);
            expect(workflowItems.level(5)).to.have.length(1);
            expect(workflowItems.level(6)).to.have.length(3);
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({ id: 11, level: 0 });
            expect(workflowItems.get(0, 1)).to.shallowDeepEqual({ id: 12, level: 0 });
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({ id: -1, level: 1 });
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({ id: 21, level: 2 });
            expect(workflowItems.get(2, 1)).to.shallowDeepEqual({ id: 22, level: 2 });
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({ id: -1, level: 3 });
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({ id: 31, level: 4 });
            expect(workflowItems.get(4, 1)).to.shallowDeepEqual({ id: 32, level: 4 });
            expect(workflowItems.get(4, 2)).to.shallowDeepEqual({ id: 33, level: 4 });
            expect(workflowItems.get(5, 0)).to.shallowDeepEqual({ id: -1, level: 5 });
            expect(workflowItems.get(6, 0)).to.shallowDeepEqual({ id: 41, level: 6 });
            expect(workflowItems.get(6, 1)).to.shallowDeepEqual({ id: 42, level: 6 });
            expect(workflowItems.get(6, 2)).to.shallowDeepEqual({ id: 43, level: 6 });
        });

        it('should create a workflow item collection from josn representing complex parallel workflow items with unsorted and non continuous sequence', function () {
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow6);

            // Assert
            expect(workflowItems.levelCount()).to.be.equal(7);
            expect(workflowItems.level(0)).to.have.length(2);
            expect(workflowItems.level(1)).to.have.length(1);
            expect(workflowItems.level(2)).to.have.length(3);
            expect(workflowItems.level(3)).to.have.length(1);
            expect(workflowItems.level(4)).to.have.length(2);
            expect(workflowItems.level(5)).to.have.length(1);
            expect(workflowItems.level(6)).to.have.length(3);
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({ id: 11, level: 0 });
            expect(workflowItems.get(0, 1)).to.shallowDeepEqual({ id: 12, level: 0 });
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({ id: -1, level: 1 });
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({ id: 21, level: 2 });
            expect(workflowItems.get(2, 1)).to.shallowDeepEqual({ id: 22, level: 2 });
            expect(workflowItems.get(2, 2)).to.shallowDeepEqual({ id: 23, level: 2 });
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({ id: -1, level: 3 });
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({ id: 31, level: 4 });
            expect(workflowItems.get(4, 1)).to.shallowDeepEqual({ id: 32, level: 4 });
            expect(workflowItems.get(5, 0)).to.shallowDeepEqual({ id: -1, level: 5 });
            expect(workflowItems.get(6, 0)).to.shallowDeepEqual({ id: 41, level: 6 });
            expect(workflowItems.get(6, 1)).to.shallowDeepEqual({ id: 42, level: 6 });
            expect(workflowItems.get(6, 2)).to.shallowDeepEqual({ id: 43, level: 6 });
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
                var workflowItems = new WorkflowItemCollection(sampleWorkflows.invalidWorkflow);
            }).to.throw(SyntaxError);
        });
    });

    describe('converting a workflow item collection to json', function(){
        it('should convert a serial workflow items collection to json', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow1);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.deep.equal(sampleWorkflows.sampleWorkflow1);
        });

        it('should convert a simple parallel workflow items collection to json', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow2);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.deep.equal(sampleWorkflows.sampleWorkflow2);
        });

        it('should convert a starting parallel workflow items collection to json', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow3);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.deep.equal(sampleWorkflows.sampleWorkflow3);
        });

        it('should convert an adjacent parallel workflow items collection to json', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow4);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.deep.equal(sampleWorkflows.sampleWorkflow4);
        });

        it('should convert a complex parallel workflow items collection to json', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow5);

            // Convert to json
            var actualJson = workflowItems.toJson();

            // Assert
            expect(actualJson).to.deep.equal(sampleWorkflows.sampleWorkflow5);
        });

        it('should convert a complex parallel workflow items collection with non continuous sequence to json', function(){
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow6);

            var expectedJson = sampleWorkflows.sampleWorkflow6.sort(WorkflowItemCollection.prototype.workflowItemsSequenceIdComparer);

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
        it('should convert a serial workflow item collection to array', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow1);

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
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow2);

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
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow3);

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
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow4);

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
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow5);

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
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow6);

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
            var workflowItems = new WorkflowItemCollection([]);

            // Convert to array
            var itemsArray = workflowItems.toArray();

            // Assert
            expect(itemsArray).to.have.length(0);
        });
    });

    describe('calculating the position of the workflow items', function(){
        it('should calculate the positions correctly for serial workflow items', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow1);

            // Assert
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({x:0, y:0});
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({x:6, y:0});
        });

        it('should calculate the positions correctly for simple parallel workflow items', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow2);

            // Assert
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({x:0, y:0});
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems.get(1, 1)).to.shallowDeepEqual({x:2, y:2});
            expect(workflowItems.get(1, 2)).to.shallowDeepEqual({x:2, y:4});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({x:6, y:0});
            expect(workflowItems.get(3, 1)).to.shallowDeepEqual({x:6, y:2});
        });

        it('should calculate the positions correctly for starting parallel workflow items', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow3);

            // Assert
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({x:0, y:0});
            expect(workflowItems.get(0, 1)).to.shallowDeepEqual({x:0, y:2});
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems.get(2, 1)).to.shallowDeepEqual({x:4, y:2});
            expect(workflowItems.get(2, 2)).to.shallowDeepEqual({x:4, y:4});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({x:6, y:0});
        });

        it('should calculate the positions correctly for adjacent parallel workflow items', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow4);

            // Assert
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({x:0, y:0});
            expect(workflowItems.get(0, 1)).to.shallowDeepEqual({x:0, y:2});
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({x:1, y:1});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems.get(2, 1)).to.shallowDeepEqual({x:2, y:2});
            expect(workflowItems.get(2, 2)).to.shallowDeepEqual({x:2, y:4});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({x:4, y:0});
        });

        it('should calculate the positions correctly for complex parallel workflow items', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow5);

            // Assert
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({x:0, y:0});
            expect(workflowItems.get(0, 1)).to.shallowDeepEqual({x:0, y:2});
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({x:1, y:1});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems.get(2, 1)).to.shallowDeepEqual({x:2, y:2});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({x:3, y:1});
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems.get(4, 1)).to.shallowDeepEqual({x:4, y:2});
            expect(workflowItems.get(4, 2)).to.shallowDeepEqual({x:4, y:4});
            expect(workflowItems.get(5, 0)).to.shallowDeepEqual({x:5, y:2});
            expect(workflowItems.get(6, 0)).to.shallowDeepEqual({x:6, y:0});
            expect(workflowItems.get(6, 1)).to.shallowDeepEqual({x:6, y:2});
            expect(workflowItems.get(6, 2)).to.shallowDeepEqual({x:6, y:4});
        });

        it('should calculate the positions correctly for complex parallel workflow items with unsorted and non continuous sequence', function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow6);

            // Assert
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({x:0, y:0});
            expect(workflowItems.get(0, 1)).to.shallowDeepEqual({x:0, y:2});
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({x:1, y:1});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({x:2, y:0});
            expect(workflowItems.get(2, 1)).to.shallowDeepEqual({x:2, y:2});
            expect(workflowItems.get(2, 2)).to.shallowDeepEqual({x:2, y:4});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({x:3, y:1});
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({x:4, y:0});
            expect(workflowItems.get(4, 1)).to.shallowDeepEqual({x:4, y:2});
            expect(workflowItems.get(5, 0)).to.shallowDeepEqual({x:5, y:1});
            expect(workflowItems.get(6, 0)).to.shallowDeepEqual({x:6, y:0});
            expect(workflowItems.get(6, 1)).to.shallowDeepEqual({x:6, y:2});
            expect(workflowItems.get(6, 2)).to.shallowDeepEqual({x:6, y:4});
        });
    });

    describe("removing items from the workflow collection", function(){
        it("should re-initialize the collection to a valid state after items are removed", function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow6);

            var itemsToRemove = [workflowItems.get(2, 0), workflowItems.get(2, 2), workflowItems.get(6, 2)]
            workflowItems.remove(itemsToRemove);

            // Assert
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({id:11, level:0, x:0, y:0});
            expect(workflowItems.get(0, 1)).to.shallowDeepEqual({id:12, level:0, x:0, y:2});
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({id:22, level:1, x:2, y:0});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({id:31, level:2, x:4, y:0});
            expect(workflowItems.get(2, 1)).to.shallowDeepEqual({id:32, level:2, x:4, y:2});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({id:-1, level:3, x:5, y:1});
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({id:41, level:4, x:6, y:0});
            expect(workflowItems.get(4, 1)).to.shallowDeepEqual({id:42, level:4, x:6, y:2});
        });
    });

    describe("adding items to the workflow collection", function(){
        it("should re-initialize the collection to a valid state after items are added", function(){
            // Create workflow item collection
            var workflowItems = new WorkflowItemCollection(sampleWorkflows.sampleWorkflow2);

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
            expect(workflowItems.get(0, 0)).to.shallowDeepEqual({id:11, level:0, x:0, y:0});
            expect(workflowItems.get(0, 1)).to.shallowDeepEqual({id:12, level:0, x:0, y:2});
            expect(workflowItems.get(1, 0)).to.shallowDeepEqual({id:-1, level:1, x:1, y:1});
            expect(workflowItems.get(2, 0)).to.shallowDeepEqual({id:21, level:2, x:2, y:0});
            expect(workflowItems.get(2, 1)).to.shallowDeepEqual({id:22, level:2, x:2, y:2});
            expect(workflowItems.get(2, 2)).to.shallowDeepEqual({id:23, level:2, x:2, y:4});
            expect(workflowItems.get(3, 0)).to.shallowDeepEqual({id:-1, level:3, x:3, y:2});
            expect(workflowItems.get(4, 0)).to.shallowDeepEqual({id:31, level:4, x:4, y:0});
            expect(workflowItems.get(4, 1)).to.shallowDeepEqual({id:32, level:4, x:4, y:2});
            expect(workflowItems.get(4, 2)).to.shallowDeepEqual({id:33, level:4, x:4, y:4});
            expect(workflowItems.get(5, 0)).to.shallowDeepEqual({id:-1, level:5, x:5, y:1});
            expect(workflowItems.get(6, 0)).to.shallowDeepEqual({id:41, level:6, x:6, y:0});
            expect(workflowItems.get(6, 1)).to.shallowDeepEqual({id:42, level:6, x:6, y:2});
        });
    });
});