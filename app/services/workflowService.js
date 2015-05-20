/**
 * Created by Rajitha on 5/18/2015.
 */

demoApp.factory("workflowService", function($q, $http) {
    var workflowList;

    var getWorkflows = function() {
        var deferred = $q.defer();

        if(!workflowList) {
            $http.get("app/data/sampleWorkflows.json")
                .success(function(data) {
                    workflowList = data;
                    deferred.resolve(workflowList);
                })
                .error(function(error) {
                    deferred.reject(error);
                });
        }
        else {
            deferred.resolve(workflowList);
        }

        return deferred.promise;
    };

    var getWorkflow = function(workflowId) {
        var deferred = $q.defer();

        if(!workflowList) {
            getWorkflows().then(function() {
                    try {
                        deferred.resolve(getWorkflowInternal(workflowId));
                    } catch (e) {
                        deferred.reject(e);
                    }
                },
                function(error) {
                    deferred.reject(error);
                });
        }
        else{
            deferred.resolve(getWorkflowInternal(workflowId));
        }

        return deferred.promise;
    };

    var getWorkflowInternal = function(workflowId) {
        var i;

        for(i = 0; i < workflowList.length; i++) {
            if(workflowList[i].id === workflowId) {
                return workflowList[i];
            }
        }

        throw "Could not find workflow. [ID: " + workflowId + "]";
    };

    var saveWorkflow = function(workflow) {
        var deferred = $q.defer();

        if(!workflowList) {
            getWorkflows().then(
                function() {
                    try {
                        saveWorkflowInternal(workflow);
                        deferred.resolve();
                    } catch (e) {
                        deferred.reject(e);
                    }
                },
                function(error) {
                    deferred.reject(error);
                });
        }
        else{
            saveWorkflowInternal(workflow);
            deferred.resolve();
        }

        return deferred.promise;
    };

    var saveWorkflowInternal = function(workflow) {
        if(workflow.id === 0) {
            // New workflow. Save and get new id
            createWorkflowInternal(workflow);
        }
        else{
            // Update workflow
            updateWorkflowInternal(workflow);
        }
    };

    var createWorkflowInternal = function(workflow) {
        var i,
            maxId = 0;

        for(i = 0; i < workflowList.length; i++) {
            if(workflowList[i].id > maxId) {
                maxId = workflowList[i].id;
            }
        }

        workflow.id = ++maxId;
        workflowList.push(workflow);
    };

    var updateWorkflowInternal = function(workflow) {
        var i;

        for(i = 0; i < workflowList.length; i++) {
            if(workflowList[i].id === workflow.Id) {
                break;
            }
        }

        if(i < workflowList.length) {
            workflowList[i] = workflow;
        }
        else {
            throw "Could not find workflow to update. [ID: " + workflow.id + "]";
        }
    };

    var deleteWorkflow = function(workflowId) {
        var deferred = $q.defer();

        if(!workflowList) {
            getWorkflows().then(
                function() {
                    deleteWorkflowInternal(workflowId);
                    deferred.resolve();
                },
                function(error) {
                    deferred.reject(error);
                });
        }
        else{
            deleteWorkflowInternal(workflowId);
            deferred.resolve();
        }

        return deferred.promise;
    };

    var deleteWorkflowInternal = function(workflowId) {
        var i;

        for(i = 0; i < workflowList.length; i++) {
            if(workflowList[i].id === workflowId) {
                break;
            }
        }

        if(i < workflowList.length) {
            workflowList.splice(i, 1);
        }
    };

    return {
        getWorkflows: getWorkflows,
        getWorkflow: getWorkflow,
        saveWorkflow: saveWorkflow,
        deleteWorkflow: deleteWorkflow
    }
});