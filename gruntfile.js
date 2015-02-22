/**
 * Created by Rajitha on 2/22/2015.
 */

module.exports = function (grunt) {
    grunt.initConfig({
       mocha: {
           all: {
               src: ["tests/TestRunner.html"],
               options: {
                   run: true,
                   log: true
               }
           }
       }
    });

    grunt.loadNpmTasks("grunt-mocha");

    grunt.registerTask("default", ["mocha"]);
};