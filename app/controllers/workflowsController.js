/**
 * Created by Rajitha on 5/17/2015.
 */

demoApp.controller("WorkflowsController", function($scope, $http) {

    var init = function() {
        initWorkflows();
    };

    var initWorkflows = function() {
        if(!$scope.workflowList){
            getWorkflows();
        }
    };

    var getWorkflows = function() {
        $http.get("app/data/sampleWorkflows.json").success(function(data) {
            $scope.workflowList = data;
        });
    };

    $scope.deleteWorkflow = function(workflowId){
        var i;

        for(i = 0; i < $scope.workflowList.length; i++) {
            if($scope.workflowList[i].id == workflowId) {
                break;
            }
        }

        $scope.workflowList.splice(i, 1);
    };

    init();
});
