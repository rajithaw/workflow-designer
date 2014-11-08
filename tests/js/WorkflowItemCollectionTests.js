/**
 * Created by Rajitha on 11/8/2014.
 */

describe('workflow item collection', function(){
    describe('creating a workflow item collection from json', function(){
        it('should create a workflow item collection from josn representing serial workflow items', function(){
            var workflowItemsJson = JSON.stringify(sampleWorkflow1);
            var workflowItemCollection = new WorkflowItemCollection(workflowItemsJson);

            expect(workflowItemCollection).to.have.length(4);
            expect(workflowItemCollection[0]).to.have.length(1);
            expect(workflowItemCollection[1]).to.have.length(1);
            expect(workflowItemCollection[2]).to.have.length(1);
            expect(workflowItemCollection[3]).to.have.length(1);
            expect(workflowItemCollection[0][0]).to.shallowDeepEqual({id:11, name:"Item11", description:"Description11", level:0});
            expect(workflowItemCollection[1][0]).to.shallowDeepEqual({id:21, name:"Item21", description:"Description21", level:1});
            expect(workflowItemCollection[2][0]).to.shallowDeepEqual({id:31, name:"Item31", description:"Description31", level:2});
            expect(workflowItemCollection[3][0]).to.shallowDeepEqual({id:41, name:"Item41", description:"Description41", level:3});
        });

        it('should create a workflow item collection from josn representing simple parallel workflow items', function(){
            var workflowItemsJson = JSON.stringify(sampleWorkflow2);
            var workflowItemCollection = new WorkflowItemCollection(workflowItemsJson);

            expect(workflowItemCollection).to.have.length(4);
            expect(workflowItemCollection[0]).to.have.length(1);
            expect(workflowItemCollection[1]).to.have.length(3);
            expect(workflowItemCollection[2]).to.have.length(1);
            expect(workflowItemCollection[3]).to.have.length(2);
            expect(workflowItemCollection[0][0]).to.shallowDeepEqual({id:11, name:"Item11", description:"Description11", level:0});
            expect(workflowItemCollection[1][0]).to.shallowDeepEqual({id:21, name:"Item21", description:"Description21", level:1});
            expect(workflowItemCollection[1][1]).to.shallowDeepEqual({id:22, name:"Item22", description:"Description22", level:1});
            expect(workflowItemCollection[1][2]).to.shallowDeepEqual({id:23, name:"Item23", description:"Description23", level:1});
            expect(workflowItemCollection[2][0]).to.shallowDeepEqual({id:31, name:"Item31", description:"Description31", level:2});
            expect(workflowItemCollection[3][0]).to.shallowDeepEqual({id:41, name:"Item41", description:"Description41", level:3});
            expect(workflowItemCollection[3][1]).to.shallowDeepEqual({id:42, name:"Item42", description:"Description42", level:3});
        });

        it('should create a workflow item collection from josn representing starting parallel workflow items', function(){
            var workflowItemsJson = JSON.stringify(sampleWorkflow3);
            var workflowItemCollection = new WorkflowItemCollection(workflowItemsJson);

            expect(workflowItemCollection).to.have.length(4);
            expect(workflowItemCollection[0]).to.have.length(2);
            expect(workflowItemCollection[1]).to.have.length(1);
            expect(workflowItemCollection[2]).to.have.length(3);
            expect(workflowItemCollection[3]).to.have.length(1);
            expect(workflowItemCollection[0][0]).to.shallowDeepEqual({id:11, name:"Item11", description:"Description11", level:0});
            expect(workflowItemCollection[0][1]).to.shallowDeepEqual({id:12, name:"Item12", description:"Description12", level:0});
            expect(workflowItemCollection[1][0]).to.shallowDeepEqual({id:21, name:"Item21", description:"Description21", level:1});
            expect(workflowItemCollection[2][0]).to.shallowDeepEqual({id:31, name:"Item31", description:"Description31", level:2});
            expect(workflowItemCollection[2][1]).to.shallowDeepEqual({id:32, name:"Item32", description:"Description32", level:2});
            expect(workflowItemCollection[2][2]).to.shallowDeepEqual({id:33, name:"Item33", description:"Description33", level:2});
            expect(workflowItemCollection[3][0]).to.shallowDeepEqual({id:41, name:"Item41", description:"Description41", level:3});
        });

        it('should create a workflow item collection from josn representing adjacent parallel workflow items', function(){
            var workflowItemsJson = JSON.stringify(sampleWorkflow4);
            var workflowItemCollection = new WorkflowItemCollection(workflowItemsJson);

            expect(workflowItemCollection).to.have.length(3);
            expect(workflowItemCollection[0]).to.have.length(2);
            expect(workflowItemCollection[1]).to.have.length(3);
            expect(workflowItemCollection[2]).to.have.length(1);
            expect(workflowItemCollection[0][0]).to.shallowDeepEqual({id:11, name:"Item11", description:"Description11", level:0});
            expect(workflowItemCollection[0][1]).to.shallowDeepEqual({id:12, name:"Item12", description:"Description12", level:0});
            expect(workflowItemCollection[1][0]).to.shallowDeepEqual({id:21, name:"Item21", description:"Description21", level:1});
            expect(workflowItemCollection[1][1]).to.shallowDeepEqual({id:22, name:"Item22", description:"Description22", level:1});
            expect(workflowItemCollection[1][2]).to.shallowDeepEqual({id:23, name:"Item23", description:"Description23", level:1});
            expect(workflowItemCollection[2][0]).to.shallowDeepEqual({id:31, name:"Item31", description:"Description31", level:2});
        });

        it('should create a workflow item collection from josn representing complex parallel workflow items', function(){
            var workflowItemsJson = JSON.stringify(sampleWorkflow5);
            var workflowItemCollection = new WorkflowItemCollection(workflowItemsJson);

            expect(workflowItemCollection).to.have.length(4);
            expect(workflowItemCollection[0]).to.have.length(2);
            expect(workflowItemCollection[1]).to.have.length(2);
            expect(workflowItemCollection[2]).to.have.length(3);
            expect(workflowItemCollection[3]).to.have.length(3);
            expect(workflowItemCollection[0][0]).to.shallowDeepEqual({id:11, name:"Item11", description:"Description11", level:0});
            expect(workflowItemCollection[0][1]).to.shallowDeepEqual({id:12, name:"Item12", description:"Description12", level:0});
            expect(workflowItemCollection[1][0]).to.shallowDeepEqual({id:21, name:"Item21", description:"Description21", level:1});
            expect(workflowItemCollection[1][1]).to.shallowDeepEqual({id:22, name:"Item22", description:"Description22", level:1});
            expect(workflowItemCollection[2][0]).to.shallowDeepEqual({id:31, name:"Item31", description:"Description31", level:2});
            expect(workflowItemCollection[2][1]).to.shallowDeepEqual({id:32, name:"Item32", description:"Description32", level:2});
            expect(workflowItemCollection[2][2]).to.shallowDeepEqual({id:33, name:"Item33", description:"Description33", level:2});
            expect(workflowItemCollection[3][0]).to.shallowDeepEqual({id:41, name:"Item41", description:"Description41", level:3});
            expect(workflowItemCollection[3][1]).to.shallowDeepEqual({id:42, name:"Item42", description:"Description42", level:3});
            expect(workflowItemCollection[3][2]).to.shallowDeepEqual({id:43, name:"Item43", description:"Description43", level:3});
        });

        it('should create a workflow item collection from josn representing complex parallel workflow items with unsorted and non continuous sequence', function(){
            var workflowItemsJson = JSON.stringify(sampleWorkflow6);
            var workflowItemCollection = new WorkflowItemCollection(workflowItemsJson);

            expect(workflowItemCollection).to.have.length(4);
            expect(workflowItemCollection[0]).to.have.length(2);
            expect(workflowItemCollection[1]).to.have.length(3);
            expect(workflowItemCollection[2]).to.have.length(2);
            expect(workflowItemCollection[3]).to.have.length(3);
            expect(workflowItemCollection[0][0]).to.shallowDeepEqual({id:11, name:"Item11", description:"Description11", level:0});
            expect(workflowItemCollection[0][1]).to.shallowDeepEqual({id:12, name:"Item12", description:"Description12", level:0});
            expect(workflowItemCollection[1][0]).to.shallowDeepEqual({id:21, name:"Item21", description:"Description21", level:1});
            expect(workflowItemCollection[1][1]).to.shallowDeepEqual({id:22, name:"Item22", description:"Description22", level:1});
            expect(workflowItemCollection[1][2]).to.shallowDeepEqual({id:23, name:"Item23", description:"Description23", level:1});
            expect(workflowItemCollection[2][0]).to.shallowDeepEqual({id:31, name:"Item31", description:"Description31", level:2});
            expect(workflowItemCollection[2][1]).to.shallowDeepEqual({id:32, name:"Item32", description:"Description32", level:2});
            expect(workflowItemCollection[3][0]).to.shallowDeepEqual({id:41, name:"Item41", description:"Description41", level:3});
            expect(workflowItemCollection[3][1]).to.shallowDeepEqual({id:42, name:"Item42", description:"Description42", level:3});
            expect(workflowItemCollection[3][2]).to.shallowDeepEqual({id:43, name:"Item43", description:"Description43", level:3});
        });

        it('should create a workflow item collection with empty array', function() {
            var workflowItemsJson = JSON.stringify([]);
            var workflowItemCollection = new WorkflowItemCollection(workflowItemsJson);

            expect(workflowItemCollection).to.have.length(0);
        });

        it('should throw an error for invalid json', function() {
            expect(function() {
                var workflowItemCollection = new WorkflowItemCollection("abcd");
            }).to.throw(SyntaxError);
        });

        it('should throw an error for empty json string', function() {
            expect(function() {
                var workflowItemCollection = new WorkflowItemCollection("");
            }).to.throw(SyntaxError);
        });
    });

    describe('converting a workflow item collection to json', function(){
        it('should convert a serial workflow items collection to json', function(){
            var workflowItemsJson = JSON.stringify(sampleWorkflow1);
            var workflowItemCollection = new WorkflowItemCollection(workflowItemsJson);

            expect(workflowItemCollection.toJson()).to.be.equal(JSON.stringify(sampleWorkflow1));
        });

        it('should convert a simple parallel workflow items collection to json', function(){
            var workflowItemsJson = JSON.stringify(sampleWorkflow2);
            var workflowItemCollection = new WorkflowItemCollection(workflowItemsJson);

            expect(workflowItemCollection.toJson()).to.be.equal(JSON.stringify(sampleWorkflow2));
        });

        it('should convert a starting parallel workflow items collection to json', function(){
            var workflowItemsJson = JSON.stringify(sampleWorkflow3);
            var workflowItemCollection = new WorkflowItemCollection(workflowItemsJson);

            expect(workflowItemCollection.toJson()).to.be.equal(JSON.stringify(sampleWorkflow3));
        });

        it('should convert an adjacent parallel workflow items collection to json', function(){
            var workflowItemsJson = JSON.stringify(sampleWorkflow4);
            var workflowItemCollection = new WorkflowItemCollection(workflowItemsJson);

            expect(workflowItemCollection.toJson()).to.be.equal(JSON.stringify(sampleWorkflow4));
        });

        it('should convert a complex parallel workflow items collection to json', function(){
            var workflowItemsJson = JSON.stringify(sampleWorkflow5);
            var workflowItemCollection = new WorkflowItemCollection(workflowItemsJson);

            expect(workflowItemCollection.toJson()).to.be.equal(JSON.stringify(sampleWorkflow5));
        });

        it('should convert a complex parallel workflow items collection with non continuous sequence to json', function(){
            var workflowItemsJson = JSON.stringify(sampleWorkflow6);
            var workflowItemCollection = new WorkflowItemCollection(workflowItemsJson);

            var workflowItemsSequenceIdComparer = function (item1, item2) {
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

            expect(workflowItemCollection.toJson()).to.be.equal(JSON.stringify(sampleWorkflow6.sort(workflowItemsSequenceIdComparer)));
        });

        it('should convert an empty workflow items collection to json', function(){
            var workflowItemsJson = JSON.stringify([]);
            var workflowItemCollection = new WorkflowItemCollection(workflowItemsJson);

            expect(workflowItemCollection.toJson()).to.be.equal(JSON.stringify([]));
        });
    });
});