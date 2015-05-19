/**
 * Created by Rajitha on 5/17/2015.
 */

demoApp.controller("WorkflowsController", function($scope, $http, workflowService) {

    var initialize = function() {
        workflowService.getWorkflows().then(function(workflows){
            $scope.workflowList = workflows;
        });
    };

    $scope.getWorkflows = function() {
        workflowService.getWorkflows().then(function(workflows){
            $scope.workflowList = workflows;
        });
    };

    $scope.deleteWorkflow = function(workflowId){
        workflowService.deleteWorkflow(workflowId).then(function(){
            $scope.getWorkflows();
        })
    };

    initialize();
});
