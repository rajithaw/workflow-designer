/**
 * Created by Rajitha on 5/20/2015.
 */

demoApp.controller("WorkflowController", function($scope, $routeParams, workflowService) {

    var workflowId = $routeParams.workflowId;

    var initialize = function() {
        workflowService.getWorkflow(workflowId).then(function(workflow){
            $scope.workflow = workflow;

            require(["main"], function(main) {
                $scope.main = main;
                $scope.main.createWorkflowDesigner("#display", $scope.workflow.data);
            });
        });
    };

    $scope.onAddNodeClicked = function() {

    };

    $scope.onInsertNodeClicked = function () {

    };

    $scope.onDeleteNodeClicked = function () {

    };

    initialize();
});