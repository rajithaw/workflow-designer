/**
 * Created by Rajitha on 5/17/2015.
 */

demoApp.controller("WorkflowsController", function($scope, $http, $routeParams, workflowService) {

    var initialize = function () {
        if ($routeParams.workflowId) {
            workflowService.getWorkflow($routeParams.workflowId).then(function (workflow) {

            });
        } else {
            workflowService.getWorkflows().then(function (workflows) {
                $scope.workflowList = workflows;
            });
        }
    };

    $scope.getWorkflows = function() {
        workflowService.getWorkflows().then(function(workflows){
            $scope.workflowList = workflows;
        });
    };

    $scope.deleteWorkflow = function(workflowId) {
        workflowService.deleteWorkflow(workflowId).then(function() {
            $scope.getWorkflows();
        });
    };

    $scope.onAddNodeClicked = function() {

    };

    $scope.onAddNodeClicked = function () {

    };

    initialize();
});
