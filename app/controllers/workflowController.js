/**
 * Created by Rajitha on 5/20/2015.
 */

demoApp.controller("WorkflowController", function($scope, $routeParams, workflowService) {

    var workflowId = $routeParams.workflowId;

    $scope.getWorkflow = function() {
        workflowService.getWorkflow(workflowId).then(function(workflow){
            $scope.workflow = workflow;
        });
    };

    $scope.onAddNodeClicked = function() {

    };

    $scope.onInsertNodeClicked = function () {

    };

    $scope.onDeleteNodeClicked = function () {

    };
});