/**
 * Created by Rajitha on 5/17/2015.
 */

var demoApp = angular.module("demoApp", ["ngRoute"]);

demoApp.config(function ($routeProvider) {
    $routeProvider
        .when('/workflows',
        {
            controller: 'WorkflowsController',
            templateUrl: 'app/partials/listWorkflows.html'
        })
        .when('/workflows/:workflowId',
        {
            controller: 'WorkflowsController',
            templateUrl: 'app/partials/editWorkflow.html'
        })
        .otherwise({ redirectTo: '/workflows' });
});

