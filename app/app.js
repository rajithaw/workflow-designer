/**
 * Created by Rajitha on 5/17/2015.
 */

var demoApp = angular.module("demoApp", ["ngRoute", "ngResource"]);

demoApp.config(function ($routeProvider) {
    $routeProvider
        .when('/workflows',
        {
            controller: 'WorkflowsController',
            templateUrl: 'app/partials/workflowsList.html'
        })
        .when('/workflows/:workflowId',
        {
            controller: 'WorkflowsController',
            templateUrl: 'app/partials/editWorkflow.html'
        })
        .otherwise({ redirectTo: '/workflows' });
});

