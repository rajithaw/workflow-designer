/**
 * Created by Rajitha on 5/17/2015.
 */

var demoApp = angular.module("demoApp", ["ngRoute", "ngResource"]);

demoApp.config(function ($routeProvider) {
    $routeProvider
        .when('/workflows',
        {
            controller: 'WorkflowListController',
            templateUrl: 'app/partials/workflowList.html'
        })
        .when('/workflows/:workflowId',
        {
            controller: 'WorkflowController',
            templateUrl: 'app/partials/editWorkflow.html'
        })
        .otherwise({ redirectTo: '/workflows' });
});

