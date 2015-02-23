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
       },
       jshint: {
           all: ["js/**/*.js", "tests/js/**/*.js"],
           options: {
               curly: true
           }
       },
       uglify: {
           development: {
               files:[{
                   expand: true,
                   cwd: ".",
                   src: "js/**/*.js",
                   dest: "dist"
               }]
           },
           options: {
               mangle: false,
               compress: {
                   drop_console: true
               },
               beautify: true
           }
       }
    });

    grunt.loadNpmTasks("grunt-mocha");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask("default", ["mocha"]);
};